import "./styles.css"
import { useState } from "react"

export default function App() {
  const [newItem, setNewItem] = useState("")

  return (
  <>
  <form className="new-item-form">
    <div className="form-row">
      <label htmlFor="item">New Item</label>
      <input 
        // Value of our input is equal to whatever our new item is
        value={newItem} 
        // Takes in an event object, calls setNewItem func - gets value of input and sets that as the newItem value. Whenever an item is entered into the input, get the new value, set that as my newItem, rerun my component, and now that new value is set to the input's value above
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
