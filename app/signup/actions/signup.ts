'use server'
import prisma from "@/lib/prisma";
import * as argon2 from "argon2";

export default async function signup (formData: FormData) {    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const hashPassword = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        name, 
        email,
        password: hashPassword
      }
    })

    console.log(user);
  }