'use client'
import { useState, FormEvent, useEffect } from 'react'

type Link = {
  id: number;
  title: string;
  url: string;
  icon: string;
};

type LinkFormProps = {
  onSubmit: (data: Omit<Link, 'id'>) => void;
  initialData?: Link | null;
};

export default function LinkForm({ onSubmit, initialData = null }: LinkFormProps) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [icon, setIcon] = useState('link')

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '')
      setUrl(initialData.url || '')
      setIcon(initialData.icon || 'link')
    } else {
      setTitle('')
      setUrl('')
      setIcon('link')
    }
  }, [initialData])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ title, url, icon })
    if (!initialData?.id) {
      setTitle('')
      setUrl('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">
        {initialData?.id ? 'Edit Link' : 'Add New Link'}
      </h3>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="e.g. My YouTube Channel"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="https://youtube.com/@..."
          required
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Icon (optional)</label>
        <select
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="link">Link</option>
          <option value="video">Video</option>
          <option value="music">Music</option>
          <option value="store">Store</option>
          <option value="donate">Donate</option>
        </select>
      </div>
      
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {initialData?.id ? 'Update Link' : 'Add Link'}
      </button>
    </form>
  )
}
