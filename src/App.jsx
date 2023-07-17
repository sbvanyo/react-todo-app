import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import "./styles.css"
import { useEffect, useState } from "react"

export default function App() {
  // useState is what's allowing our data to persist. "Check our local storage and get the value if it exists, if not, default to an empty array." Then in useEffect, everytime we modify our todos, run the function we gave it and save the new value for my todos in local storage.
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  // Hook to allow data to persist. Takes a function as an argument. "Run this function everytime the objects inside the array of our second property--[todos]--change. When any values in [todos] change, go into our local storage, and set the item's property to the JSON stringified version of our todos." This stores our data in local storage, but in order to get it back out we use useState above, passing it a function. Returned value from the func is our default value.
  useEffect(() => {
    localStorage.setItem("ITEM", JSON.stringify(todos))
  }, [todos])

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
  <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
  </>
  )
}
