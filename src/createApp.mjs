import express from 'express'
import routers from './routes/index.mjs'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport'
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import "./strategies/localStrategies.mjs"


export function createApp() {
    const app = express();
    app.use(express.json());
    app.use(cookieParser())
    app.use(session({
        secret: "deepak",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60,

        },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
        }),
    })
    )

    app.use(passport.initialize())

    app.use(passport.session())

    app.use(routers)


    app.post("/api/auth", passport.authenticate('local'), (req, res) => {
        res.sendStatus(200)

    })
    app.get("/api/auth/status", (req, res) => {
        return req.user
            ? res.send(req.user)
            : res.sendStatus(401);

    })

    /*Get request */
    app.get('/', (request, response) => {
        console.log(request.session)
        console.log(request.session.id)
        request.session.visited = true;
        response.cookie("Hello", "World", { maxAge: 10000 })
        response.send(students)

    })

    app.post('/api/auth', (req, res) => {
        const { body: { username, password } } = req
        const findUser = students.find((user) => user.username === username)
        if (!findUser || findUser.password !== password) return res.sendStatus(402).send({ msg: "Bad Request" })
        req.session.user = findUser
        return res.status(200).send(findUser)
    })

    app.get('/api/auth/status', (req, res) => {
        req.sessionStore.get(req.sessionID, (err, session) => console.log(session))
        return req.session.user ? res.status(200).send(req.session.user) : res.sendStatus(401).send({ msg: "Bad Request" })
    })

    app.get('/api/auth/logout', (req, res) => {
        if (!req.user) return res.sendStatus(401)
        req.logOut((err) => {
            if (err) return res.status(400)
            res.send(200)
        })
    })




    app.get('/api/auth/discord', passport.authenticate('discord'))
    app.get('/api/auth/discord/redirect', passport.authenticate('discord'), (req, res) => {
        console.log(req.session)
        console.log(req.user)
        res.sendStatus(200)
    })

    app.post('/api/cart', (req, res) => {
        if (!req.session.user) return res.sendStatus(401)
        const { body: item } = req
        const { cart } = req.session
        if (cart) {
            cart.push(item)
        } else {
            req.session.cart = [item]
        }
        return res.status(201).send(item)

    })
    app.get("/api/cart", (req, res) => {
        if (!req.session.user) return res.sendStatus(401)
        return res.send(req.session.cart ?? [])
    })
    return app
}