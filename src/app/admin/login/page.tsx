import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#150711] px-5 text-sand">
      <div className="w-full max-w-sm">
        <p className="text-xs tracked text-sand/50">PLOT TWIST</p>
        <h1 className="mt-1 text-2xl font-semibold">Casting sign-in</h1>
        <p className="mt-1 text-sm text-sand/60">Internal only. Not a public page.</p>
        <LoginForm />
      </div>
    </main>
  );
}
