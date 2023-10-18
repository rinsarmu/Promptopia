import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database";
import User from "@models/user";
// console.log({
//     clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET
// })

// connectToDB();
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],

    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            // consoless.log({ sessionUser })

            session.user.id = sessionUser._id.toString();
            return session;

        },

        async signIn({ profile }) {
            try {
                // 1.check if user exist
                console.log("SIGN IN", profile)


                await connectToDB();
                const userExist = await User.findOne({
                    email: profile.email
                })

                // 2. if not create a new user

                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture
                    })
                }

                console.log(userExist)


                return true;
            } catch (error) {
                console.error('ERROR IN THE SIGN IN PAGE')

            }

        }
    }

})

export { handler as GET, handler as POST }