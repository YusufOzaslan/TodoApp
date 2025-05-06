'use client'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { motion } from 'framer-motion'
import { useTodos } from '../hooks/useTodos'

export default function TodoApp() {
  const { todos, loading, error, addTodo, deleteTodo, toggleTodo } = useTodos();
  
  return (
    <div className="min-h-screen bg-[rgb(var(--background))]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-xl mx-auto px-4 py-12"
      >
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
              Todo App
            </h1>
          </div>

          <TodoForm onAdd={addTodo} />
          
          {loading ? (
            <div className="text-center py-6">Loading todos...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-6">{error}</div>
          ) : (
            <TodoList 
              todos={todos} 
              onDelete={deleteTodo}
              onToggle={toggleTodo}
            />
          )}
        </div>
      </motion.div>
    </div>
  )
}
