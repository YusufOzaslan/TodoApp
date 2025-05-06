import { Todo } from '../hooks/useTodos'
import { motion } from 'framer-motion'

export default function TodoItem({ todo, onDelete, onToggle }: {
  todo: Todo
  onDelete: (id: string) => Promise<boolean>
  onToggle: (id: string) => Promise<boolean>
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="card p-4 mb-3"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors
            ${todo.completed 
              ? 'bg-[rgb(var(--primary))] border-[rgb(var(--primary))]' 
              : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]'}`}
        >
          {todo.completed && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div 
          className={`flex-1 ${todo.completed ? 'text-[rgb(var(--muted-foreground))] line-through' : ''}`}
        >
          {todo.text}
        </div>

        <button
          onClick={() => onDelete(todo.id)}
          className="text-[rgb(var(--muted-foreground))] hover:text-red-500 transition-colors rounded-lg p-1 hover:bg-red-50 dark:hover:bg-red-950/20"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
} 