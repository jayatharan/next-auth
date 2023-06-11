'use client'

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {getCsrfToken, getProviders, useSession} from "next-auth/react"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [action, setAction] = useState("");
  const [csrfToken, setCsrfToken] = useState("")
  const {data: session} = useSession();

  console.log(session);

  const initializeForm = async () => {
    try{
      const formAction = (await getProviders())?.credentials.callbackUrl
      const formCsrfToken = await getCsrfToken()
      setAction(formAction??"");
      setCsrfToken(formCsrfToken??"");
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    initializeForm();
  },[])

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <form method="post" action={action}>
        <div className="mx-auto flex w-full max-w-[780px] flex-col gap-4">
          <p className="text-2xl font-bold">Sign in</p>
          <input type="hidden" name="csrfToken" value={csrfToken} />
          <Input name="email" type="email" placeholder="Email" required={true} />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required={true}
            name="password"
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="show-password"
              checked={showPassword}
              onClick={() => setShowPassword((prev) => !prev)}
            />
            <Label htmlFor="show-password">Show password</Label>
          </div>
          <Button className="mt-2">Sign in</Button>
        </div>
      </form>
    </section>
  )
}
