import PropTypes from 'prop-types'

export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
  return (
    <li>
      <label>
        <input 
        type="checkbox" 
        checked={completed} 
        // On change, take in an event and call func toggleTodo (defined above return statement). This func takes in the todo's id and checks to see if the input is checked or not
        onChange={e => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button 
      // Usually want to pass a function into onClick, otherwise, we're calling deleteTodo() and then immediately passing the result/return value of that function as our click event listener.
      onClick={() => deleteTodo(id)}
      className="btn btn-danger">Delete</button>
    </li>
  )
}

TodoItem.propTypes = {
  completed: PropTypes.bool,
  id: PropTypes.string,
  title: PropTypes.string,
  toggleTodo: PropTypes.func,
  deleteTodo: PropTypes.func
}
