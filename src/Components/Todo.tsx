import { type onCompleteTodo, type TodoId, type Todo as TodoType } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void
  onToggleCompleteTodo: ({ id, completed }: onCompleteTodo) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleteTodo }) => {
  return (
    <div>
      <div className="flex mb-4 p-2 rounded-lg items-center">
        <input className="m-2 w-6 h-6 rounded-full" type="checkbox" checked={completed === "Terminado" ?  true : false} onChange={(e) => e.target.checked ? onToggleCompleteTodo({ id, completed: "Terminado" } ) : onToggleCompleteTodo({ id, completed: "Ideas" } )}/>
        <label className={`w-full text-grey-darkest ${completed === "Terminado" ? 'line-through text-gray-500' : ''}`}>{title}</label>
        <button className='group/edit mr-2  rounded text-red invisible group-hover/item:visible bg-transparent hover: border-red hover:text-white' onClick={() => { onRemoveTodo({ id }) }}><span>X</span></button>
      </div>
    </div>
  )
}
