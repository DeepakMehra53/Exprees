import e, { Router } from 'express'
import { students } from '../utils/constansts.mjs'
import { query, validationResult, checkSchema, matchedData } from "express-validator"
import { createUserValidationSchema } from '../utils/ValidationSchema.mjs'
import { resolveMiddlewareUserById } from '../utils/middleware.mjs'
import {User} from '../mongoose/schemas/user.mjs'
import { hashPassword } from '../utils/helper.mjs'
import {getUserByIdHandler,createUserHandler } from '../handlers/users.mjs'

const router = Router()

router.get("/api/users",
    query("filter")
        .isString()
        .notEmpty()
        .withMessage("Must not be empty")
        .isLength({ min: 3, max: 10 })
        .withMessage("Must be atleast 3-10 characters"),
    (req, res) => {
        console.log(req.session)
        req.sessionStore.get(req.session.id,(err,sessionData)=>{
            if(err){
                console.log(err)
                throw err;
            }
            console.log(sessionData)
        })
        const result = validationResult(req)
        console.log(result)
        const { query: { filter, value }, } = req
        if (!filter && !value) return res.send(students)

        if (filter && value) return res.send(
            students.filter((user) => user[filter].includes(value))
        )
        // if(filter && value) return res.send(students.filter((user)=>user[username,displayName].includes[value]))
        return res.send(students)

    })


router.get("/api/users/:id", resolveMiddlewareUserById, (req, res) => {
    const parsedId = parseInt(req.params.id)
    if (isNaN(parsedId)) return res.sendStatus(402).send({ msg: "Bad Request" })
    const findUserIndex = students.find((user) => user.id === parsedId)
    if (!findUserIndex) return res.sendStatus(402).send({ msg: "Bad Request" })
    return res.send(findUserIndex)

})
 
router.get('/api/users/:id',resolveMiddlewareUserById,getUserByIdHandler)


router.post( "/api/users",checkSchema(createUserValidationSchema),createUserHandler)

router.put('/api/users/:id', resolveMiddlewareUserById, (req, res) => {
    const { body, findUserIndex } = req
    students[findUserIndex] = { id: students[findUserIndex].id, ...body };
    return res.sendStatus(200)
})

router.patch("/api/users/:id", resolveMiddlewareUserById, (req, res) => {
    const { body, findUserIndex } = req
    students[findUserIndex] = { ...students[findUserIndex], ...body }
    return res.sendStatus(200)
})

router.delete('/api/users/:id', resolveMiddlewareUserById, (req, res) => {

    const { findUserIndex } = req
    students.splice(findUserIndex, 1)
    return res.sendStatus(200)
})


export default router