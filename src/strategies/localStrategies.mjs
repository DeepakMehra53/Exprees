import passport from "passport";
import { Strategy } from 'passport-local'
import { students } from "../utils/constansts.mjs";
import { User } from "../mongoose/schemas/user.mjs";
import { camparePassword } from "../utils/helper.mjs";
passport.serializeUser((user, done) => {
    console.log(`Insider Serializer`)
    console.log(user)
    done(null, user.id)
})
passport.deserializeUser(async(id, done) => {
    console.log(`Insider deserialize `)

    try {
        const findUser = await User.findById(id)
        if (!findUser) throw new Error("User Not Found")
        done(null, findUser)
    } catch (err) {
        done(err, null)
    }
})

export default passport.use(
    new Strategy(async (username, password, done) => {

        try {
            const findUser = await User.findOne({ username });
            if (!findUser) return done(null, false, { message: "User not found" });
            const isMatch = camparePassword(password, findUser.password); // Assuming comparePassword is an async function
            if (!isMatch) return done(null, false, { message: "Bad credentials" });
            done(null,findUser)
        } catch (err) {
            done(err, null);
        }

    })
)
/**
 * passport.serializeUser(function(user, done) {
    done(null, user.id);
});              │
                 │ 
                 │
                 └─────────────────┬──→ saved to session
                                   │    req.session.passport.user = {id: '..'}
                                   │
                                   ↓           
passport.deserializeUser(function(id, done) {
                   ┌───────────────┘
                   │
                   ↓ 
    User.findById(id, function(err, user) {
        done(err, user);
    });            └──────────────→ user object attaches to the request as req.user   
});
 * 
 * 
 * 
 * https://localhost:3000/api/auth/discord/redirect
 * 1257641939172593705
 * 0739f4f4494fb364c74bf2943994950c2af23551f4f95851cb2af9fcf458ddad
 */