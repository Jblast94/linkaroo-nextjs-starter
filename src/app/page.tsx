'use client'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🦊 Link-a-Roo</h1>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/auth/signin" className="hover:underline">
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
          >
            Get Started Free
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <div
          className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/40"
          style={{ maskImage: 'linear-gradient(to bottom, white, transparent)' }}
        />
        <div className="relative z-10">
          <h2 className="text-6xl font-extrabold mb-4 leading-tight">
            One Link to Rule Them All
          </h2>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI-powered monetization and analytics for creators. Share all your content in one place and let our smart engine handle the rest.
          </p>
          <Link
            href="/auth/signup"
            className="bg-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-700 transition transform hover:scale-105"
          >
            Claim Your Username
          </Link>

          <div className="mt-16 w-full h-64 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(/globe.svg)',
                backgroundPosition: 'center 20%',
                animation: 'spin 60s linear infinite reverse',
                transformStyle: 'preserve-3d',
              }}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Free for creators. We monetize via smart affiliate links & ads.</p>
      </footer>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  )
}
