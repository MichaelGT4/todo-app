import React, { useEffect, useState } from 'react'
import './App.css'
import { type onCompleteTodo, type TodoId, type Estado, type ListOfTodos } from './types'
import { TodosContainer } from './Components/TodosContainer'
import axios from 'axios'

const statusTypes: Estado[] =  ["Ideas","En Proceso", "Terminado"]

function App (): JSX.Element {
  const [todos, setTodos] = useState<ListOfTodos>([])
  const [requestMade, setRequestMade] = useState(false);
  const [dataText, setDataText] = useState('')

  const [isDragging, setIsDragging] = useState(false)
  const handleDragging = (dragging: boolean) => setIsDragging(dragging)

  const handleUpdateList = (id: string, status: Estado) => {
    let card = todos.find(item => item.id === id)
    if (card && card.completed !== status) {
        card.completed = status
        axios.put(`http://localhost:3000/tasks/${card.id}`, {"completed": card.completed})
    }
}

  function handleRemove ({ id }: TodoId): void {
    axios.delete(`http://localhost:3000/tasks/${id}`)
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

  useEffect(() => {
    if (!requestMade) {
      setRequestMade(true);
      axios.get('http://localhost:3000/tasks').then(response => { 
        let data = response.data
        setTodos(data)
      })
    }
  }, [todos, requestMade])


  async function handlePost (e :React.KeyboardEvent): Promise<void> {
    if (e.key === "Enter"){
      try{
        if (dataText == ''){
          throw Error("No se puede enviar texto vacio")
        } else{
          await axios.post("http://localhost:3000/tasks",{"title": dataText})
          setDataText('')
          setRequestMade(false)
        }
      } catch (e) {
        console.error('Error enviando peticion POST: ', e)
      }
    }
  }

  function onChangeDataText (e: React.ChangeEvent<HTMLInputElement>): void{
    setDataText(e.target.value)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-20">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex-row">
        <h1 className="fixed left-0 top-2 text-4xl flex w-full justify-center items-center lg:static lg:p-4">
          To Do App&nbsp;
          <code className="font-mono self-center text-base opacity-50">by <a href="https://github.com/MichaelGT4">MichaelGT4</a></code>
        </h1>
        <div className='flex w-full justify-center items-center'>
          <input name="hola" onChange={onChangeDataText} value={dataText} onKeyDown={handlePost} className='m-5 min-h-10 rounded-lg self-center w-3/4 border py-2 px-6 text-xl dark:bg-neutral-800/75 border-neutral-700' type="text" placeholder='Ingrese una tarea' /> 
        </div>
      </div>
      <div className="w-full grid text-center lg:mb-0 lg:grid-cols-3 md:grid-cols-2 justify-center lg:text-left">
       
        {statusTypes.map(status => (
          <TodosContainer 
            todos={todos} 
            status={status} 
            key={status} 
          
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
