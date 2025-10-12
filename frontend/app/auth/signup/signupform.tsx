"use client";

import { signup } from "@/action/auth";
import SubmitButton from "@/components/master/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState } from "react";

function Signupform() {
  const [state, action] = useActionState(signup, undefined);

  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        {state?.message && (
          <div className="text-red-500 text-sm">{state.message}</div>
        )}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            className="w-full"
          />
        </div>
        {state?.error?.name && (
          <div className="text-red-500 text-sm">{state.error.name}</div>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="john@gmail.com"
            className="w-full"
          />
        </div>
        {state?.error?.email && (
          <div className="text-red-500 text-sm">{state.error.email}</div>
        )}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" />
        </div>
        {state?.error?.password && (
          <div className="text-red-500 text-sm">
            <ul>
              {state.error.password.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        <SubmitButton>Sign Up</SubmitButton>
      </div>
    </form>
  );
}

export default Signupform;
