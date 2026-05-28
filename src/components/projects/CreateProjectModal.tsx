'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CreateProjectModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      due_date: formData.get('due_date'),
    }

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsOpen(false)
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to create project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center gap-2"
      >
        <Plus size={16} />
        <span>Create Project</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-surface-border">
              <h2 className="text-xl font-bold">New Project</h2>
              <button onClick={() => setIsOpen(false)} className="text-text-muted hover:text-text-primary">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary" htmlFor="title">Project Title</label>
                <input 
                  id="title"
                  name="title"
                  className="input-field"
                  placeholder="e.g. Q3 Marketing Sprint"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary" htmlFor="description">Executive Summary</label>
                <textarea 
                  id="description"
                  name="description"
                  className="input-field min-h-[100px] resize-none"
                  placeholder="Brief overview of project goals..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary" htmlFor="due_date">Target Deadline</label>
                <input 
                  id="due_date"
                  name="due_date"
                  type="date"
                  className="input-field"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-outline flex-1 py-2.5"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="btn-accent flex-1 py-2.5 disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
