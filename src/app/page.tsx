import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-5xl font-bold mb-4">🦊 Link-a-Roo</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        One link. All your platforms. AI-powered. Monetized for you.
      </p>
      <div className="space-x-4">
        <Link
          href="/auth/signin"
          className="bg-white text-purple-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-900 transition"
        >
          Get Started Free
        </Link>
      </div>
      <p className="mt-12 text-sm opacity-70">
        Free for creators. We monetize via smart affiliate links & ads.
      </p>
    </div>
  )
}
