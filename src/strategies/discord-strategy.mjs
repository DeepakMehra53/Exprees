import passport from "passport";
import { Strategy } from "passport-discord";
import { DiscordUser } from "../mongoose/schemas/discord-user.mjs";

passport.serializeUser((user, done) => {
    console.log(`Insider Serializer`)
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser(async(id,done)=>{
    try {
        const findUser = await DiscordUser.findById(id)
        return findUser ? done(null,findUser):done(null,null)
    } catch (error) {
        done(err,null)
    }
})



export default passport.use(
    // passing option and verifing function
    new Strategy({
        clientID: "1257922696944160888",
        clientSecret: '0t9f2Gcvb0_mlP9rpfHDbahMwxJ8q5SC',
        callbackURL: 'http://localhost:3000/api/auth/discord/redirect',
        scope: ['identify']
    }, async (accessToken, refreshToken, profile, done) => {
        let findUser;
        try {
            findUser = await DiscordUser.findOne({ discordId: profile.id })
        } catch (error) {
            return done(err, null)
        }
        try {
            if (!findUser) {
                const newUser = new DiscordUser({ username: profile.username, discordId: profile.id })
                const newSaveUser = await newUser.save()
                return done(null, newSaveUser)
            }
            return done(null,findUser)
        } catch (error) {
            console.log(err)
            return done(err, null)
        }

    })
)