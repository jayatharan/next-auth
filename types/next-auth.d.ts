import { Role } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth"


declare module "next-auth" {
    
    interface User {
        id:number;
        name?: string | null | undefined;
        email: string;
        role: string;
    } 

    interface Session {
        user: User;
    }

}