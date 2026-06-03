import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [tasks, setTasks] = useState("")
	const [list, setList] = useState([])

	const addTasks = (key) => {
		if (key == "Enter") {
			if (tasks == "") {
				return;
			}
			fetch('https://playground.4geeks.com/todo/todos/mario_r', {
				method: "POST",
				body: JSON.stringify({
					"label": tasks,
				}),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => {
					console.log(resp.ok); // Será true si la respuesta es exitosa
					console.log(resp.status); // El código de estado 201, 300, 400, etc.
					return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
				})
				.then(data => {
					// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
					console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
				})
				.catch(error => {
					// Manejo de errores
					console.log(error);
				});
			setTasks("")
		}
	}

	const deleteTask = () => {
		fetch('https://playground.4geeks.com/todo/users/mario_ramirez')
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Lee la respuesta como JSON
				return response.json();
			})
			.then(responseAsJson => {
				// Haz lo que quieras con la respuesta JSONificada
				console.log(responseAsJson.todos);
			})
			.catch(error => {
				console.log('Looks like there was a problem: \n', error);
			});
	}

	const getData = () => {
		fetch('https://playground.4geeks.com/todo/users/mario_ramirez')
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Lee la respuesta como JSON
				return response.json();
			})
			.then(responseAsJson => {
				// Haz lo que quieras con la respuesta JSONificada
				setList(responseAsJson.todos);
			})
			.catch(error => {
				console.log('Looks like there was a problem: \n', error);
			});
	}

	useEffect(() => {
		getData()
		deleteTask()
		console.log(list)
	}, [])

	return (
		<div className="d-flex-column justify-content-center">
			<div className="d-flex justify-content-center bg-primary p-2 mb-5">
				<h1 className="text-light">Welcome to you <strong>To Do List!</strong></h1>
			</div>
			<div className="d-flex flex-column justify-content-center align-items-center">
				<div className="toDo">
					<div className="input-group d-flex justify-content-center p-3">
						<div className="input-group-text bg-primary">
							<input className="form-check-input mt-0" type="text" value="" aria-label="Radio button for following text input" />
						</div>
						<input type="text" className="w-50 border border-info" onChange={event => setTasks(event.target.value)} onKeyUp={event => addTasks(event.key)} value={tasks} aria-label="Text input with radio button" placeholder=" What would you do today ?" />
					</div>
					<div>
						{list.map((tarea, indice) => {
							return (
								<>
									<ul className="d-flex row m-0 p-0">
										<li className="taskLine d-flex justify-content-between">
											{tarea.label}
											{/* <button type="button" className="boton btn btn-primary d-flex justify-content-center align-items-center m-2 p-2">
												
											</button> */}
											<i className="boton fa-solid fa-trash d-flex justify-content-end mb-3" style={{ color: "rgb(13, 234, 87)" }} onClick={() => deleteTask(tarea.id)}></i>
										</li>
										<hr />
									</ul>
								</>
							)
						})}
						<div className="m-2 mt-5">
							<p>You have <strong className="text-primary">{list.length}</strong> tasks for to do</p>
						</div>
					</div>
				</div>
			</div>

			<div className="d-flex row justify-content-center">
				<img className="w-50 m-5" src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
			</div>
		</div>
	);
};

export default Home;