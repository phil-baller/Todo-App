import { useState, useEffect } from 'react';
import './todo.json';
import { Trash } from 'lucide-react';
import axios from 'axios';


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
  // Decleration of States
  const [todoTask, setTodoTask] = useState('');
  const [descript, setDescription] = useState('');
  const [taskData, setData] = useState([]);

  //Creating todo Task
  function CreateTodoTask(e) {
    e.preventDefault();
    const todoData = {
      name: todoTask,
      description: descript
    }
    axios.post("http://127.0.0.1:5001", todoData)
      .then((res) => {
        setData(res.data)
        console.log(todoData)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(`Error connecting to server ${err}`)
      })
  }

  //Getting data from the API's
  const getData = async () => {
    const response = await fetch('http://127.0.0.1:5001/')
    try {
      const responseJson = await response.json();
      setData(responseJson);
    } catch (err) {
      console.error(err)
    }
  }

  //Initializing getData function
  useEffect(() => {
    getData()
  }, [])

  //Delete task by passing user ID
  function deleteTodoTask(index) {
    axios.delete(`http://127.0.0.1:5001/${index}`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(`Error: ${err}`)
      })
  }

  return (
    <div>
      <form className="flex flex-col" onSubmit={CreateTodoTask}>
        <label className='my-1 font-medium text-neutral-600'>Enter a task you have to do</label>
        <input className="border-2 border-purple-400 rounded-md p-2 my-2" placeholder="Enter Name" value={todoTask} onChange={(event) => {
          setTodoTask(event.target.value)
        }} />
        <input className="border-2 border-purple-400 rounded-md p-2 my-2" placeholder="Enter Description" value={descript} onChange={(event) => {
          setDescription(event.target.value)
        }} />
        <button className="bg-purple-800 rounded-md p-2 my-2 text-white hover:bg-purple-600 font-medium" type='submit'>Add</button>
      </form>
      <div className="grid grid-cols-3 gap-6 mt-4" >

        {/* Mapping taskData to list of tasks */}
        {
          taskData.map((item) => (
            <div className="flex flex-row justify-between" key={item.id}>
              <div className="flex flex-row md:flex-col">
                <div className='flex flex-col'>
                  <p className="ml-2 font-medium text-lg text-purple-800 w-80">~ {item.name}</p>
                  <p className="ml-2 font-medium text-lg text-neutral-700 w-80">{item.description}</p>
                </div>
              </div>
              <Trash className="text-red-400 hover:text-red-700 hover:fill-red-600" onClick={() => deleteTodoTask(item.id)} />
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
