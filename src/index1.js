import express from 'express';

const app = express()
//it a built in middleWare that return a only parses json 
app.use(express.json())
const PORT = process.env.PORT || 3000;
/**Login Middleware */

const LogginMiddleware = (req, res, next) => {
    console.log(`${req.method}-${req.url}`)
    next()
}
app.use(LogginMiddleware)

const resolveIndexByUser = (req, res, next) => {
    const {
        params: { id },
    } = req;
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.sendStatus(401)
    const findUser = students.findIndex((user) => user.id === parsedId)
    if (findUser === -1) return res.sendStatus(404)
    req.findUser = findUser
    next()
}

const students = [
    { id: 1, username: "deepak", displayName: "Deepak" },
    { id: 2, username: "ashu", displayName: "Ashish" },
    { id: 3, username: "ankit", displayName: "Ankit" }
]

app.get('/', (req, res, next) => {
    console.log(`${req.method}-${req.url}`)

}, (req, res) => {
    res.send({ msg: "Hello World" })

})


app.get("/api/user/:id", (req, res) => {

    console.log(req.params)
    const parsedId = parseInt(req.params.id)
    if (isNaN(parsedId)) return res.sendStatus(401).send({ msg: "Invalid id" })
    const findUser = students.find((user) => user.id === parsedId)
    if (!findUser) return res.sendStatus(402).send({ msg: "User not found" })
    return res.send(findUser)


})

app.get("/api/user", (req, res) => {
    console.log(req.query)
    const {
        query: { filter, value },
    } = req;
    if (!filter && !value) return res.send(students)
    if (filter && value) return res.send(
        students.filter((user) => user[filter].includes(value))
    )
})

app.post('/api/user/', (req, res) => {
    console.log(req.body)
    const { body } = req
    const newUser = { id: students[students.length - 1].id + 1, ...body }
    students.push(newUser)

    return res.status(201).send(newUser)


})

app.put("/api/user/:id", resolveIndexByUser, (req, res) => {
    /**   // const body=req.body;
    // const id=req.params.id
    const { body, params: { id }, } = req;
    //checking the id is numeric or not
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.sendStatus(400).send({ msg: "Bad Request" })
    //finding user by findIndex method and its id 
    const findUser = students.findIndex((user) => user.id === parsedId)
    //Now we check that index is not -1 
    if (findUser === -1) return res.sendStatus(404)
    //Now we should remember that we updating the entire student data not only one field and we updating this field  on the bases on req body 
    //so we simple assign this user obj to    */
    const { body,findUser } = req
    students[findUser] = { id:students[findUser].id, ...body }
    return res.sendStatus(200)


})


app.patch('/api/user/:id', (req, res) => {
    const { body, params: { id }, } = req;
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.sendStatus(401)
    const findUser = students.findIndex((user) => user.id === parsedId)
    if (findUser === -1) return res.sendStatus(404)
    /*so here we are first taking all the current field value pairs and put it into this new object
    so all of this new object and then i am going to take all of the field value pair from the requested body 
    (...spreader oprator )  */
    students[findUser] = { ...students[findUser], ...body }
    return res.sendStatus(200)
})

app.delete("/api/user/:id", (req, res) => {
    const { params: { id }, } = req
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.sendStatus(400)
    const findUser = students.findIndex((user) => user.id === parsedId)
    if (findUser === -1) return res.sendStatus(404)
    students.slice(findUser, 1)
    return res.sendStatus(200)
})

app.listen(PORT, () => {
    console.log({ PORT })
})



