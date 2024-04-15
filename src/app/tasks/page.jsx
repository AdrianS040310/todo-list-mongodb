'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import instance from '@/utils/axios';

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [dataUser, setDataUser] = useState({});
    const idUser = dataUser.id;

    // Obtener tareas del servidor
    const getTasksFromServer = async () => {
        try {
            const response = await instance.get(`/v1/tasks/${dataUser.id}`);
            const tasksData = response.data;
            const formattedTasks = tasksData.map(task => ({
                id: task._id,
                text: task.task,
                completed: task.status
            }));
            setTasks(formattedTasks);
        } catch (error) {
            // console.error('Error fetching tasks:', error);
        }
    };

    const handleAddTask = async () => {
        try {
            if (taskInput.trim() !== '') {
                const newTask = { id: Date.now(), text: taskInput, completed: false };
                await addTaskToServer(taskInput);
                setTasks([...tasks, newTask]);
                setTaskInput('');
            }
        } catch (error) {
            // console.error('Error al añadir tarea:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTaskFromServer(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            // console.error('Error al eliminar tarea:', error);
        }
    };

    const handleEditTask = async (taskId, newText) => {
        try {
            await updateTaskOnServer(taskId, newText);
            setTasks(tasks.map(task => task.id === taskId ? { ...task, text: newText } : task));
        } catch (error) {
            // console.error('Error al editar tarea:', error);
        }
    };

    const handleToggleComplete = async (taskId, status) => {
        try {
            const updatedTask = await toggleTaskCompletionOnServer(taskId, !status);
            setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
        } catch (error) {
            // console.error('Error al marcar tarea como completada:', error);
        }
    };

    //Funcion para añadir una tarea al servidor
    const addTaskToServer = async (task) => {
        try {
            const sendable = {
                idUser,
                task,
                status: false,
            };
            const response = await instance.post("/v1/tasks", sendable);
            // console.log(response.data);
        } catch (error) {
            // console.log("Error al añadir tarea", error);
        }

    };

    //Funcion para actualizar una tarea del servidor
    const updateTaskOnServer = async (tasksId, newText) => {
        try {
            const sendable = {
                id: tasksId,
                task: newText
            };
            const response = await instance.put("/v1/tasks", sendable);
            // console.log(sendable)
        } catch (error) {
            // console.log("Error al actualizar tarea: ", error);
        }

    };

    //Funcion para eliminar una tarea del servidor
    const deleteTaskFromServer = async (tasksId) => {
        try {
            const response = await instance.delete(`/v1/tasks/${tasksId}`);
            console.log(response.data);
        } catch (error) {
            // console.log("Error al eliminar tarea: ", error)
        }
    };

    //Funcion para marcar como completada una tarea del servidor
    const toggleTaskCompletionOnServer = async (taskId, status) => {
        try {
            const sendable = {
                id: taskId,
                status: status
            };
            const response = await instance.patch("/v1/tasks", sendable);
        } catch (error) {
            // console.log("Error al marcar como completada la tarea", error)
        }
    };


    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            setDataUser(userData);
        }
    }, []);

    useEffect(() => {
        if (dataUser.id) {
            getTasksFromServer();
        }
    }, [dataUser]);

    return (
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                <h1 className={styles.title}>Tasks</h1>
                <div className={styles.addTask}>
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder="Ingresa una tarea..."
                        className={styles.input}
                    />
                    <button className={styles.btnAddTask} onClick={handleAddTask}>Add Task</button>
                </div>

                <ul className={styles.listTasks}>
                    {tasks.map(task => (
                        <li className={styles.li} key={task.id}>
                            <div className={styles.list}>
                                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
                                <div className={styles.options}>
                                    <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
                                    <button onClick={() => handleToggleComplete(task.id, task.completed)}>
                                        {task.completed ? 'Marcar incompleta' : 'Marcar completada'}</button>
                                    <button onClick={() => {
                                        const newText = prompt('Ingresa el nuevo nombre de la tarea:', task.text);
                                        if (newText !== null) {
                                            handleEditTask(task.id, newText);
                                        }
                                    }}>Editar</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
