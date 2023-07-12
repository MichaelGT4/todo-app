import { type TodoId, type onCompleteTodo, Todo as TodoType } from '../types'
import { Todo } from './Todo'

interface Props {
  todo: TodoType
  handleDragging: (dragging: boolean) => void
  onToggleCompleteTodo: ({ id, completed }: onCompleteTodo) => void
  onRemoveTodo: ({ id }: TodoId) => void
}

export const Todos: React.FC<Props> = ({ todo, handleDragging, onToggleCompleteTodo, onRemoveTodo }) => {
  const handleDragEnd = () => handleDragging(false)

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData("text", `${todo.id}`);
    handleDragging(true)
  }

  return (
        <ul className='w-full items-center justify-center'>
          <li className={'group/item bg-transparent hover:bg-gray-800 rounded-lg'} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed } onRemoveTodo={onRemoveTodo} onToggleCompleteTodo={onToggleCompleteTodo}/>
          </li>

        </ul>
  )
}
