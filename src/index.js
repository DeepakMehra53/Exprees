
import mongoose from 'mongoose';
import { createApp } from './createApp.mjs';

// import './strategies/discord-strategy.mjs'

mongoose.connect('mongodb://127.0.0.1:27017/express_tutorial')
    .then(() => console.log("connected to data base"))
    .catch((err) => console.log(`Error :${err}`))
const app =createApp()

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Running on Port ${PORT}`)
})



/*Routes Params */


/*Query selector */



/*Post requests */


/*PUT Request */


/*PATCH Req */


/*DELETE Req */


