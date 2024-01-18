import { useState, useEffect } from 'react';
import './todo.json';
import { Trash } from 'lucide-react';


function ToDoContainer({ children }) {
  return (
    <div className="w-fit h-fit py-8 bg-purple-100 rounded-md mx-auto my-32 flex flex-col px-4">
      {children}
    </div>
  )
}

function TodoHeader() {
  return (
    <div className="flex font-bold text-2xl text-purple-900 text-center">
      Todo App
    </div>
  )
}

function TodoForm() {
  const [todo, setTodo] = useState(["someone"]);
  const [todoTask, setTodoTask] = useState('');

  function CreateTodoTask(e) {
    e.preventDefault();
    if (todoTask.trim() !== "") {
      setTodo(t => [...t, todoTask]);
      setTodoTask('');
    }
  }

  function deleteTodoTask(index) {
    const updateTasks = todo.filter((_, id) => id !== index);
    setTodo(updateTasks);
  }

  return (
    <div>
      <form className="flex flex-col" onSubmit={(e) => CreateTodoTask(e)}>
        <label className='my-1 font-medium text-neutral-600'>Enter a task you have to do</label>
        <input className="border-2 border-purple-400 rounded-md p-2 my-2" placeholder="Add a new todo" name={todoTask} onChange={(event) => {
          setTodoTask(event.target.value)
        }} />
        <button className="bg-purple-800 rounded-md p-2 my-2 text-white hover:bg-purple-600 font-medium" type='submit'>Add</button>
      </form>
      <div className="grid grid-cols-3 gap-6 mt-4" >
        {
          todo.map((item, id) => (
            <div className="flex flex-row justify-between" key={id}>
              <div className="flex flex-row">
                <p className="ml-2 font-medium text-lg text-neutral-700 w-80">~ {item}</p>
              </div>
              <Trash className="text-red-400 hover:text-red-700 hover:fill-red-600" onClick={() => deleteTodoTask(id)} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

function App() {
  return (
    <ToDoContainer>
      <TodoHeader />
      <TodoForm />
    </ToDoContainer>
  )
}

export default App;
