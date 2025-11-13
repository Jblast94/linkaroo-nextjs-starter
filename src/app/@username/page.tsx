import { supabase } from '@/lib/supabase'
import { injectAffiliate } from '@/lib/affiliateEngine'

export default async function CreatorPage({ params }: { params: { username: string } }) {
  // In a real app, we'd look up by username, but for now we'll use ID
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.username)
    .single()

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Creator not found</h1>
      </div>
    )
  }

  const { data: links } = await supabase
    .from('user_links')
    .select('*')
    .eq('profile_id', profile.id)
    .order('order_index', { ascending: true })

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
          <h1 className="text-2xl font-bold">{profile.display_name || profile.email}</h1>
          <p className="text-gray-600 mt-2">{profile.bio || 'Link-a-Roo creator'}</p>
        </div>

        <div className="space-y-3">
          {links?.map((link) => (
            <a
              key={link.id}
              href={injectAffiliate(link.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center font-medium transition"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
