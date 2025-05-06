import { Todo } from '../hooks/useTodos'
import TodoItem from './TodoItem'
import { AnimatePresence } from 'framer-motion'

interface TodoListProps {
  todos: Todo[]
  onDelete: (id: string) => Promise<boolean>
  onToggle: (id: string) => Promise<boolean>
}

export default function TodoList({ todos, onDelete, onToggle }: TodoListProps) {
  const completedTodos = todos.filter(todo => todo.completed)
  const activeTodos = todos.filter(todo => !todo.completed)

  return (
    <div>
      {activeTodos.length > 0 && (
        <div className="mb-4">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Active Tasks</h2>
          <AnimatePresence>
            {activeTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
      
      {completedTodos.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 mt-6">Completed Tasks</h2>
          <div className="opacity-75">
            <AnimatePresence>
              {completedTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={onDelete}
                  onToggle={onToggle}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
} 