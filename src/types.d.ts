export type Status = 'Ideas' | 'En Proceso' | 'Terminado'
export interface Todo {
  id: string
  title: string
  completed: Status
}

export type TodoId = Pick<Todo, 'id'>

export type onCompleteTodo = Pick<Todo, 'id' | 'completed'>

export type ListOfTodos = Todo[]
