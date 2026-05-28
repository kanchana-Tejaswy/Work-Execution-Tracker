'use client'

import { useState } from 'react'
import { Send, X, Sparkles, BrainCircuit } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SubmitUpdateModalProps {
  projectId: string
  projectTitle: string
}

export function SubmitUpdateModal({ projectId, projectTitle }: SubmitUpdateModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      projectId: projectId,
      updateText: formData.get('update_text'),
      progressPercentage: parseInt(formData.get('progress') as string),
    }

    try {
      const response = await fetch('/api/updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsOpen(false)
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to submit update:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-text-muted hover:text-primary-accent hover:bg-primary-accent/5 p-2 rounded-lg transition-all"
        title="Submit Update"
      >
        <Send size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background-white rounded-3xl shadow-elevated w-full max-w-md overflow-hidden relative z-10 border border-surface-border"
            >
              <div className="flex justify-between items-center p-8 border-b border-surface-border">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-black tracking-tight text-text-primary">Log Progress</h2>
                  <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Operational Signal Update</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 hover:bg-background-main rounded-full transition-colors text-text-muted hover:text-text-primary"
                >
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
                <div className="flex items-center gap-3 p-4 bg-background-main rounded-2xl border border-surface-border">
                  <div className="w-10 h-10 rounded-xl bg-primary-accent/10 flex items-center justify-center text-primary-accent">
                    <BrainCircuit size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Active Context</span>
                    <span className="text-sm font-bold text-text-primary truncate">{projectTitle}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary px-1" htmlFor="update_text">Execution Details</label>
                  <textarea 
                    id="update_text"
                    name="update_text"
                    className="input-field min-h-[140px] resize-none font-medium text-sm leading-relaxed"
                    placeholder="Describe specific achievements, technical hurdles, or current momentum..."
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-text-secondary px-1" htmlFor="progress">Velocity Status (%)</label>
                  <div className="flex items-center gap-4">
                    <input 
                      id="progress"
                      name="progress"
                      type="number"
                      min="0"
                      max="100"
                      defaultValue="0"
                      className="input-field w-24 font-bold tabular"
                      required
                    />
                    <div className="flex-1 h-2 bg-surface-border rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className="h-full bg-primary-accent/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <button 
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="btn-outline flex-1 py-3 text-[12px] font-bold uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "btn-accent flex-1 py-3 text-[12px] font-bold uppercase tracking-widest relative overflow-hidden",
                      isLoading && "bg-primary-accent/80"
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div 
                          key="loading"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Analyzing...</span>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="static"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <Sparkles size={14} className="animate-pulse" />
                          <span>Sync Intelligence</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {isLoading && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

