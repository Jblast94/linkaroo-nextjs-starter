'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import LinkForm from '@/components/LinkForm'
import ThemeToggle from '@/components/ThemeToggle'
import { User } from '@supabase/supabase-js'

type Link = {
  id: number;
  title: string;
  url: string;
  icon: string;
  order_index: number;
};

type Profile = {
  id: string;
  username: string;
  display_name: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [links, setLinks] = useState<Link[]>([])
  const [editingLink, setEditingLink] = useState<Link | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/signin')
        return
      }
      setUser(user)

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setProfile(profileData)

      const { data: linksData } = await supabase
        .from('user_links')
        .select('*')
        .eq('profile_id', user.id)
        .order('order_index')
      setLinks(linksData || [])
    }
    loadUserData()
  }, [router])

  const handleAddLink = async (linkData: Omit<Link, 'id' | 'order_index' | 'profile_id'>) => {
    if (!user) return
    if (editingLink) {
      // Update existing link
      await supabase
        .from('user_links')
        .update({ ...linkData })
        .eq('id', editingLink.id)
      
      setLinks(links.map(l => l.id === editingLink.id ? { ...l, ...linkData } : l))
      setEditingLink(null)
    } else {
      // Create new link
      const { data: newLink, error } = await supabase
        .from('user_links')
        .insert({
          profile_id: user.id,
          ...linkData,
          order_index: links.length
        })
        .select()
        .single()

      if (newLink) {
        setLinks([...links, newLink])
      }
      if (error) {
        console.error('Error adding link:', error)
        // Optionally: show an error message to the user
      }
    }
  }

  const handleEditLink = (link: Link) => {
    setEditingLink(link)
  }

  const handleDeleteLink = async (id: number) => {
    await supabase
      .from('user_links')
      .delete()
      .eq('id', id)
    
    setLinks(links.filter(l => l.id !== id))
  }

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <main className="min-h-screen p-8 bg-gray-50 dark:bg-slate-900">
      <div className="flex justify-end mb-4">
        <ThemeToggle />
      </div>
      
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Welcome, {profile?.display_name || user.email}!
      </h1>
      
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Your Public Page</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Visit your page: 
          <a 
            href={`/@${profile?.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline ml-2 font-mono"
          >
            {typeof window !== 'undefined' && `${window.location.origin}/@${profile?.username}`}
          </a>
        </p>
        <button 
          onClick={() => navigator.clipboard.writeText(`${window?.location?.origin}/@${profile?.username}`)}
          className="text-sm bg-gray-200 dark:bg-slate-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200"
        >
          Copy Link
        </button>
      </div>

      <LinkForm 
        key={editingLink?.id || 'new'}
        onSubmit={handleAddLink} 
        initialData={editingLink}
      />

      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Your Links</h2>
        {links.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No links yet. Add one above!</p>
        ) : (
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.id} className="flex items-center justify-between p-3 border rounded bg-gray-50 dark:bg-slate-700 dark:border-slate-600">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">
                    {link.icon === 'video' ? '🎬' :
                     link.icon === 'music' ? '🎵' :
                     link.icon === 'store' ? '🛍️' :
                     link.icon === 'donate' ? '💖' : '🔗'}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{link.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{link.url}</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditLink(link)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLink(link.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
