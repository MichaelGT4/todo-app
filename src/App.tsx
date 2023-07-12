import { useState } from 'react'
import './App.css'
import { type onCompleteTodo, type TodoId, type Estado } from './types'
import { TodosContainer } from './Components/TodosContainer'

const todoList = [
  {
    id: '1',
    title: 'Crear un Portfolio',
    completed: "Ideas"
  },
  {
    id: '2',
    title: 'Hacer los deberes',
    completed: "En Proceso"
  },
  {
    id: '3',
    title: 'Botar la basura',
    completed: "Terminado"
  },
  {
    id: '4',
    title: 'Pintar la casa',
    completed: "Terminado"
  }
]

const statusTypes: Estado[] =  ["Ideas","En Proceso", "Terminado"]

function App (): JSX.Element {
  const [todos, setTodos] = useState(todoList)

  const [isDragging, setIsDragging] = useState(false)
  const handleDragging = (dragging: boolean) => setIsDragging(dragging)

  const handleUpdateList = (id: string, status: Estado) => {
    let card = todos.find(item => item.id === id)
    if (card && card.completed !== status) {
        card.completed = status
        setTodos( prev => ([
             card!,
             ...prev.filter(item => item.id !== id)
         ]))
    }
}

  function handleRemove ({ id }: TodoId): void {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  function handleCompleted ({ id, completed }: onCompleteTodo): void {
    let card = todos.find(item => item.id === id)
    if (card && card.completed !== completed) {
        card.completed = completed
        if (Array.isArray(todos)){
          setTodos( prev => ([
            card!,
            ...prev.filter(item => item.id !== id)
          ]))
        }
    }
    // const newTodos = todos.map(todo => {
    //   if (todo.id === id) {
    //     return {
    //       ...todo,
    //       completed
    //     }
    //   }
    //   return todo
    // })
    // setTodos(newTodos)
  }

  return (
    <main className="flex min-h-screen flex-col items-center dark:bg-slate-900 justify-center p-20">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <h1 className="fixed left-0 top-2 text-4xl flex w-full justify-center items-center lg:static lg:p-4">
          To Do App&nbsp;
          <code className="font-mono self-center text-base opacity-50">by <a href="https://github.com/MichaelGT4">MichaelGT4</a></code>
        </h1>
      </div>
      <div className="w-full grid text-center lg:mb-0 lg:grid-cols-3 md:grid-cols-2 justify-center lg:text-left">
       
        {statusTypes.map(stat => (
          <TodosContainer 
            todos={todos} 
            status={stat} 
            key={stat} 
            
            isDragging={isDragging} 
            handleDragging={handleDragging} 
            handleUpdateList={handleUpdateList}
            onRemoveTodo={handleRemove}
            onToggleCompleteTodo={handleCompleted} />
        ))}
      </div>
    </main>
  )
}

export default App
