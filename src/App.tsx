import { useState } from 'react'
import { Todos } from './Components/Todos'
import './App.css'
import { type onCompleteTodo, type TodoId } from './types'

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


function App (): JSX.Element {
  const [todos, setTodos] = useState(todoList)
  const Ideas = todos.filter(todo => todo.completed === "Ideas")
  const porHacer = todos.filter(todo => todo.completed === "En Proceso")
  const Completed = todos.filter(todo => todo.completed === "Terminado")

  function handleRemove ({ id }: TodoId): void {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  function handleCompleted ({ id, completed }: onCompleteTodo): void {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
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

        {/* Ideas */}
        <div className=" m-5 min-h-0 rounded-lg justify-center border lg:p-8 sm:p-2 dark:bg-neutral-800/50 border-neutral-700" onDrop="dropIt(event)" ondragover="allowDrop(event)">
          <h2 className={'mb-2 text-2xl font-semibold'}>Ideas</h2>
          <Todos todos={Ideas} onRemoveTodo={handleRemove} onToggleCompleteTodo={handleCompleted} />
        </div>

        {/* /* En Proceso **/}
        <div className=" m-5 min-h-0 rounded-lg justify-center border lg:p-10 sm:p-2 dark:bg-neutral-800/50 border-neutral-700">
          <h2 className={'mb-2 text-2xl font-semibold'}>En Proceso</h2>
          <Todos todos={porHacer} onRemoveTodo={handleRemove} onToggleCompleteTodo={handleCompleted} />
        </div>

        {/* Terminado */}
        <div className=" m-5 min-h-0 rounded-lg justify-center border lg:p-10 sm:p-2 dark:bg-neutral-800/50 border-neutral-700">
          <h2 className={'mb-2 text-2xl font-semibold'}>Terminado</h2>
          <Todos todos={Completed} onRemoveTodo={handleRemove} onToggleCompleteTodo={handleCompleted} />
        </div>
      </div>
    </main>
  )
}

export default App
