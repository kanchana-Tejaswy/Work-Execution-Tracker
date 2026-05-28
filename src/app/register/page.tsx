import Link from 'next/link'
import { signup } from '@/services/auth/auth.service'

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { message: string; error: string }
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-[80vh] animate-fade-in">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
        <p className="text-text-secondary text-sm">Join the execution intelligence platform.</p>
      </div>

      <form
        className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground"
        action={signup}
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="full_name">
            Full Name
          </label>
          <input
            className="input-field"
            name="full_name"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="input-field"
            name="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold" htmlFor="role">
            I am a...
          </label>
          <select 
            name="role" 
            className="input-field"
            defaultValue="freelancer"
          >
            <option value="manager">Manager / Agency</option>
            <option value="freelancer">Freelancer / Individual</option>
          </select>
        </div>

        <button className="btn-accent w-full py-2.5 mt-2">
          Sign Up
        </button>
        
        {searchParams?.error && (
          <p className="mt-4 p-4 bg-status-error/5 text-status-error text-sm text-center rounded-md border border-status-error/10">
            {searchParams.error}
          </p>
        )}

        <p className="text-sm text-center mt-6 text-text-secondary">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  )
}
