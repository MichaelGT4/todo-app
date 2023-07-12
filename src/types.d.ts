export type Status = {ideas: 'Ideas', porHacer: 'En Proceso', terminado: 'Terminado'}

export interface Todo {
  id: string
  title: string
  completed: Estado
}

export type Estado = typeof Status[keyof typeof Status]

export type TodoId = Pick<Todo, 'id'>

export type onCompleteTodo = Pick<Todo, 'id' | Estado>

export type ListOfTodos = Todo[]
