import { Todo } from '../app/page'
import TodoItem from './TodoItem'
import { AnimatePresence } from 'framer-motion'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, newText: string) => void
}

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
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
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
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
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
} 