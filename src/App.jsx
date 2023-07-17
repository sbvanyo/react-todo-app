import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { useState } from "react"

export default function App() {
  const [todos, setTodos] = useState([])

  function addTodo(title) {
    // Must pass a func to set state (setTodos) in order to modify existing data. Func takes one argument (current value of your state (currentTodos)) and returns whatever value you want the new state to be. This ensures that it will keep adding values to the new array as items are added (rather than restarting with an empty array each time the page renders, cancelling out previous items). Anytime we need to use the current value, we need to pass a function, otherwise we can just pass a value (as in our input's onChange below).
    setTodos(currentTodos => {
      return [
        ...currentTodos, 
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  // Takes in a todo's id and whether or not it is completed. We want to update our todos to change the id of the todo passed into this func to be completed. Map through all todos and for each one, check to see if it's the one I'm currently trying to toggle
  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          // Creates a brand new todo, spreads it out so we get a brand new state object, and changes one property on it (checked/completed) (since state is immutable and we can't change the original)
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      // Return a filtered version of currentTodos to show all todos except the one we want to remove. "If my todo id is not equal to this id, keep it, otherwise remove it"
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  console.log(todos);

  return (
  <>
  {/* PROPS! onSubmit is taco - passes addTodo func from this file into our custom NewTodoForm component so that it can access it. "There's a prop on our NewTodoForm called onSubmit, and we're passing it down this data." */}
  <NewTodoForm onSubmit={addTodo} />
  <h1 className="header">Todo List</h1>
  <ul className="list">
    {/* When there are no todos, display this message (&& = shortcircuiting) */}
    {todos.length === 0 && "No Todos"}
    {/* Loop through todos and render them out into list items */}
    {todos.map(todo => {
      return <li key={todo.id}>
      <label>
        <input 
        type="checkbox" 
        checked={todo.completed} 
        // On change, take in an event and call func toggleTodo (defined above return statement). This func takes in the todo's id and checks to see if the input is checked or not
        onChange={e => toggleTodo(todo.id, e.target.checked)}
        />
        {todo.title}
      </label>
      <button 
      // Usually want to pass a function into onClick, otherwise, we're calling deleteTodo() and then immediately passing the result/return value of that function as our click event listener.
      onClick={() => deleteTodo(todo.id)}
      className="btn btn-danger">Delete</button>
    </li>
    })}
  </ul>
  </>
  )
}
