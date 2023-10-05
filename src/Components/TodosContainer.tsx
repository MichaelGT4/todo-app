import { type Estado, type ListOfTodos, type TodoId, type onCompleteTodo } from '../types'
import { Todos } from './Todos'

interface Props {
    todos: ListOfTodos
    status: Estado
    isDragging: boolean
    handleUpdateList: (id: string, status: Estado) => void
    handleDragging: (dragging: boolean) => void

    onToggleCompleteTodo: ({ id, completed }: onCompleteTodo) => void
    onRemoveTodo: ({ id }: TodoId) => void
    
  }

export const TodosContainer: React.FC<Props> = ({todos, status, isDragging, handleDragging, handleUpdateList, onRemoveTodo, onToggleCompleteTodo}) => {
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        handleUpdateList(e.dataTransfer.getData('text'), status)
        handleDragging(false)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  return (
    <div>
      <div className={`m-5 min-h-0 rounded-lg justify-center border lg:p-8 sm:p-2 dark:bg-neutral-800/75 border-neutral-700 ${isDragging ? 'layout-dragging' : ''}`} onDrop={handleDrop} onDragOver={handleDragOver}>
        <h2 className={'mb-2 text-2xl font-semibold'}>{status}</h2>
          {
            todos.map(item => (
              status === item.completed 
              && <Todos 
                todo={item} 
                key={item.id}
                handleDragging={handleDragging} 
                onRemoveTodo={onRemoveTodo}
                onToggleCompleteTodo={onToggleCompleteTodo}
              />
            ))
          }
      </div>
    </div>
    )
}
