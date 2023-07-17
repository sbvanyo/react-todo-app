import "./styles.css"
import { useState } from "react"

export default function App() {
  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState([])

  function handleSubmit(e) {
    // Keeps page from refreshing
    e.preventDefault()
    // Must pass a func to set state (setTodos) in order to modify existing data. Func takes one argument (current value of your state (currentTodos)) and returns whatever value you want the new state to be. This ensures that it will keep adding values to the new array as items are added (rather than restarting with an empty array each time the page renders, cancelling out previous items). Anytime we need to use the current value, we need to pass a function, otherwise we can just pass a value (as in our input's onChange below).
    setTodos(currentTodos => {
      return [
        ...currentTodos, 
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ]
    })
  // Clears input box after each submit by setting it to an empty string
    setNewItem("")
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
  <form onSubmit={handleSubmit} className="new-item-form">
    <div className="form-row">
      <label htmlFor="item">New Item</label>
      <input 
        // Value of our input is equal to whatever our new item is (determined onChange below)
        value={newItem} 
        // onChange takes in an event object and calls setNewItem func. setNewItem gets the value of a user's input and sets that as the newItem value. "Whenever text is entered into the input, get this value, set that as my newItem, rerun my component, and now that new value will be set to the input's value (above)."
        onChange= {e => setNewItem(e.target.value)}
        type="text" 
        id="item"></input>
    </div>
    <button className="btn">Add</button>
  </form>
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
