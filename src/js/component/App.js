import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
function App() {
	const [todos, setTodos] = React.useState([]);
	const [todo, setTodo] = React.useState("");
	const [todoEditing, setTodoEditing] = React.useState(null);
	const [editingText, setEditingText] = React.useState("");

	React.useEffect(() => {
		const json = localStorage.getItem("todos");
		const loadedTodos = JSON.parse(json);
		if (loadedTodos) {
			setTodos(loadedTodos);
		}
	}, []);

	React.useEffect(() => {
		const json = JSON.stringify(todos);
		localStorage.setItem("todos", json);
	}, [todos]);

	function handleSubmit(e) {
		e.preventDefault();

		const newTodo = {
			id: new Date().getTime(),
			text: todo,
			completed: false,
		};

		setTodos([...todos].concat(newTodo));
		setTodo("");
	}

	function deleteTodo(id) {
		let updatedTodos = [...todos].filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
	}

	function toggleComplete(id) {
		let updatedTodos = [...todos].map((todo) => {
			if (todo.id === id) {
				todo.completed = !todo.completed;
			}
			return todo;
		});
		setTodos(updatedTodos);
	}

	function editTodo(id) {
		let updatedTodos = [...todos].map((todo) => {
			if (todo.id === id) {
				todo.text = editingText;
			}
			return todo;
		});
		setTodos(updatedTodos);
		setTodoEditing(null);
		setEditingText("");
	}

	return (
		<div className="App">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					onChange={(e) => setTodo(e.target.value)}
					value={todo}
				/>
				<button type="submit"> add Todos</button>
			</form>
			{todos.map((todo) => (
				<div key={todo.id}>
					{todo.id === todoEditing ? (
						<input
							type="text"
							onChange={(e) => setEditingText(e.target.value)}
							value={editingText}
						/>
					) : (
						<div>{todo.text}</div>
					)}

					<button onClick={() => deleteTodo(todo.id)}>Delete</button>

					<input
						type="checkbox"
						onChange={() => toggleComplete(todo.id)}
						checked={todo.completed}
					/>

					{todoEditing === todo.id ? (
						<button onClick={() => editTodo(todo.id)}>
							Submit Edits
						</button>
					) : (
						<button onClick={() => setTodoEditing(todo.id)}>
							Edit Todo
						</button>
					)}
				</div>
			))}
		</div>
	);
}

export default App;
