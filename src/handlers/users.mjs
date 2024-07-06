import { matchedData, validationResult } from "express-validator";
import { students } from "../utils/constansts.mjs";
import { hashPassword } from "../utils/helper.mjs";
import { User } from "../mongoose/schemas/user.mjs";
export const getUserByIdHandler=(req,res)=>{
    const {findUserIndex}=req;
    const findUser= students[findUserIndex];
    if(!findUser) return res.sendStatus(404)
    return res.send(findUser);
};
export const  createUserHandler =async (req, res) => {
    const {body}=req;

    const result = validationResult(req)
    if(!result.isEmpty()) return res.status(400).send(result.array())
    const data=matchedData(req)
   console.log(data)
    data.password=hashPassword(data.password  )
  
    const newUser = new User(data)
    try {
        const saveUser = await newUser.save()
        return res.status(201).send(saveUser)
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}