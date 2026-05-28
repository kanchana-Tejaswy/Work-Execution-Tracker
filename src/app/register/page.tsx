import Link from 'next/link'
import { signInWithGoogle } from '@/services/auth/auth.service'

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { message: string; error: string }
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-6 mx-auto min-h-[80vh] animate-fade-in">
      <div className="flex flex-col gap-2 text-center mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
        <p className="text-text-secondary text-sm">Join the platform using your enterprise account.</p>
      </div>

      <form action={signInWithGoogle} className="w-full">
        <button 
          className="btn-accent w-full py-4 flex items-center justify-center gap-3 text-base shadow-soft-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign up with Google
        </button>
      </form>
        
      {searchParams?.error && (
        <p className="p-4 bg-status-error/5 text-status-error text-sm text-center rounded-md border border-status-error/10">
          {searchParams.error}
        </p>
      )}

      <p className="text-sm text-center text-text-secondary">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  )
}
