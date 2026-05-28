import Link from 'next/link'
import { login, continueAsGuest } from '@/services/auth/auth.service'
import { Sparkles } from 'lucide-react'

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string; error: string }
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-[80vh] animate-fade-in">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-text-secondary text-sm">Enter your credentials to access your dashboard.</p>
      </div>

      <form
        className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground"
        action={login}
      >
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

        <button className="btn-accent w-full py-2.5 mt-2">
          Sign In
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-surface-border"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background-main px-2 text-text-muted">Or continue with</span>
          </div>
        </div>

        <button 
          formAction={continueAsGuest}
          className="btn-outline w-full py-2.5"
        >
          <Sparkles size={16} className="text-primary-accent" />
          Continue as Guest
        </button>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-primary/5 text-primary text-sm text-center rounded-md border border-primary/10">
            {searchParams.message}
          </p>
        )}
        {searchParams?.error && (
          <p className="mt-4 p-4 bg-status-error/5 text-status-error text-sm text-center rounded-md border border-status-error/10">
            {searchParams.error}
          </p>
        )}
        
        <p className="text-sm text-center mt-6 text-text-secondary">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  )
}
