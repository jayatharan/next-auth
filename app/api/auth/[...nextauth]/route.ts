import NextAuth, { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import * as argon2 from "argon2";
import prisma from "@/lib/prisma";

const comparePassword = async (password: string, check_password: string) => {
    return await argon2.verify(check_password, password);
}

export const authOptions: AuthOptions = {
    session: {
        maxAge: 30 * 24 * 60 * 60
    },
    providers: [
        Credentials({
            id: "credentials",
            name: "credentials",
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email'
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                try {
                    const { email, password } = credentials as { email: string, password: string };
                    const user = await prisma.user.findFirst({
                        where: { email }
                    })
                    if (!user) return null;

                    const isValidPassword = await argon2.verify(user.password??'', password);
                    
                    if (!isValidPassword) return null;


                    return { id: user.id, email: user.email, role:user.role, name: user.name };
                } catch (error) {
                    return null;
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return {...token, ...user};
        },
        async session({ session, token, user }) {
            session.user.role = token.role! as string;
            session.user.id = token.id! as number;
            return session
        },
    },
    pages: {
        signIn: "/signin"
    },
    secret: process.env.JWT_SECRET,
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };