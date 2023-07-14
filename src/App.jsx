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
  <h1 className="header">To-do List</h1>
  <ul className="list">
    <li>
      <label>
        <input type="checkbox"></input>
        Item 1
      </label>
      <button className="btn btn-danger">Delete</button>
    </li>
    <li>
      <label>
        <input type="checkbox"></input>
        Item 2
      </label>
      <button className="btn btn-danger">Delete</button>
    </li>
  </ul>
  </>
  )
}
