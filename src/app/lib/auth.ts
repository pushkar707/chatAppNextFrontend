import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import generateUsername from './generateUsername';
import prisma from './prismaClient';

export const authOptions: NextAuthOptions = {
    // Secret for Next-auth, without this JWT encryption/decryption won't work
    secret: process.env.NEXTAUTH_SECRET,

    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_APP_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_APP_CLIENT_SECRET as string,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_APP_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET as string
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
              name: { label: "Name", type: "text", placeholder:"Your Name" },
              userName: { label: "Username", type: "text", placeholder:"Unique username" },
              email: { label: "Email", type: "email", placeholder:"Email"},
              password: { label: "Password", type: "password", placeholder:"Password"},
            },
            authorize(credentials: any, req) {
              // database operations
              return {
                id: "1",
                Email: credentials.email,
              };
            },
          }),
    ],

    callbacks: {
        async signIn({user}) {
            const username: string = generateUsername(user.name || "")
            await prisma.user.create({
                data: {
                    name:user.name || "",
                    email: user.email || "",
                    imageUrl: user.image || "",
                    username
                }
            })
            
            return true
        }
    }
};