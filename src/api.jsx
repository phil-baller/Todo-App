import { useState, useEffect } from 'react';

function CreateTodoTask(e) {
    useEffect(() => {
        e.preventDefault();
        axios.post("http://127.0.0.1:3001/api/tasks", (name, description) => {
            name: setTodoTask
            description: setDescription
        })
            .then((res) => {
                setTodo(res.data)
                console.log("Task Created successfully")
            })
    }, [todo])
}

export default CreateTodoTask;