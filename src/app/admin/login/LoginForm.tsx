"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "./actions";

const initialState: SignInState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className="block text-xs text-sand/50">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full border border-sand/20 bg-transparent px-3 py-2.5 text-sand outline-none focus:border-sand/50"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-xs text-sand/50">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full border border-sand/20 bg-transparent px-3 py-2.5 text-sand outline-none focus:border-sand/50"
        />
      </div>

      {state.error && <p className="text-sm text-[#FF7A3D]">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-sand px-4 py-2.5 text-sm font-semibold text-ink disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
