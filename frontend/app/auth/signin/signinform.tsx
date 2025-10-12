"use client";

import { signin } from "@/action/auth";
import SubmitButton from "@/components/master/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useActionState } from "react";

export default function Signinform() {
  const [state, action] = useActionState(signin, undefined);
  return (
    <form action={action}>
      <div className="flex flex-col gap-2 w-64">
        {state?.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="john@gmail.com"
            className="w-full"
            defaultValue="admin@gmail.com"
          />
        </div>
        {state?.error?.email && (
          <div className="text-red-500 text-sm">{state.error.email}</div>
        )}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            defaultValue="test123"
          />
        </div>
        {state?.error?.password && (
          <div className="text-red-500 text-sm">{state.error.password}</div>
        )}
        <Link className="text-sm underline" href="#">
          Forgot your password?
        </Link>

        <SubmitButton>Sign In</SubmitButton>
        <div className="flex justify-between text-sm">
          <p>Don't have an account?</p>
          <Link className="underline" href={"/auth/signup"}>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
}
