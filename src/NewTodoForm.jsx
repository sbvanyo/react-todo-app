import { useState } from "react"
import PropTypes from 'prop-types'

export function NewTodoForm({ onSubmit }) {
  // Gives us whatever we passed into onSubmit prop in app.jsx file (our addTodo function)
  const [newItem, setNewItem] = useState("")

  function handleSubmit(e) {
    // Keeps page from refreshing
    e.preventDefault()
    if (newItem === "") return

    // Call addTodo func defined in app.jsx and pass in new item
    onSubmit(newItem)

  // Clears input box after each submit by setting it to an empty string
    setNewItem("")
  }

  return (
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
  )
}

NewTodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
