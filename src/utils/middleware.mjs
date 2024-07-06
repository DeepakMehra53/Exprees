import { students } from './constansts.mjs'
export const resolveMiddlewareUserById = (req, res, next) => {

    const id = req.params.id;
    const parsedId = parseInt(id)
    if (isNaN(parsedId)) return res.sendStatus(401).send({ msg: "Bad request" })
        const findUserIndex = students.findIndex((user) => user.id === parsedId)
    if (findUserIndex === -1) return res.sendStatus(404).send({ msg: "Bad Requset" })
        req.findUserIndex = findUserIndex;
    next()
}