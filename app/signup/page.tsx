"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import signup from "./actions/signup"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <form action={signup}>
        <div className="mx-auto flex w-full max-w-[780px] flex-col gap-4">
          <p className="text-2xl font-bold">Sign up</p>
          <Input name="name" type="text" placeholder="Name" required={true} /> 
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required={true}
          />
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
          <Button className="mt-2">Sign up</Button>
        </div>
      </form>
    </section>
  )
}
