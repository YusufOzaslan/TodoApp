import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TodoForm({ onAdd }: { onAdd: (text: string) => void }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onAdd(input.trim())
      setInput('')
    }
  }

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ scale: 0.98 }}
      animate={{ scale: 1 }}
      className="card p-3"
    >
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="input"
        />
        <button
          type="submit"
          className="btn-primary whitespace-nowrap"
        >
          Add Task
        </button>
      </div>
    </motion.form>
  )
} 