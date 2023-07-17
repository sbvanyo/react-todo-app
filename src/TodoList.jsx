import PropTypes from 'prop-types'
import { TodoItem } from './TodoItem';

export function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul className="list">
    {/* When there are no todos, display this message (&& = shortcircuiting) */}
    {todos.length === 0 && "No Todos"}
    {/* Loop through todos and render them out into list items */}
    {todos.map(todo => {
      return (
        // Spread syntax passes all the props of this component exactly as they are--equivalent to listing out "id={todo.id} completed={todo.completed} title={todo.title}"
        <TodoItem {...todo} key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      )
    })}
  </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.string,
  toggleTodo: PropTypes.func,
  deleteTodo: PropTypes.func
};
