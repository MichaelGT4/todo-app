import { type TodoId, type ListOfTodos, type onCompleteTodo } from '../types'
import { Todo } from './Todo'

interface Props {
  todos: ListOfTodos
  onToggleCompleteTodo: ({ id, completed }: onCompleteTodo) => void
  onRemoveTodo: ({ id }: TodoId) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleteTodo }) => {
  return (
        <ul className='w-full items-center justify-center'>
            {todos.map(todo => (
                <li key={todo.id} className={'group/item bg-transparent hover:bg-gray-800 rounded-lg'}>
                    <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed } onRemoveTodo={onRemoveTodo} onToggleCompleteTodo={onToggleCompleteTodo}/>
                </li>
            ))}
        </ul>
  )
}
