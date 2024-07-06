import { Router } from "express";
const router = Router()
router.get("/api/products", (req, res) => {
    console.log(req.headers.cookie)
    console.log(req.cookies)
    if(req.cookies.Hello && req.cookies.Hello==="World")
    return res.send([{ id: 123, name: "Dum Aaloo", price: 150 }])
    return res.send({msg:"Invalid cookies "})
})
export default router;