import React, {Component} from 'react';

class Todo extends Component {
  state = {
    text: '',
    todos: []
  };

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    this.setState({todos});
  }

  componentDidUpdate() {
    const {todos} = this.state;

    localStorage.setItem('todos', JSON.stringify(todos))
  }

  handleChange = (event) => {
    this.setState({text: event.target.value});
  };

  handleSubmit = (event) => {
    this.setState(state => ({todos: [...state.todos, {text: state.text}], text: ''}));

    event.preventDefault();
  };

  handleComplete = (text) => () => {
    this.setState(state => ({
      todos: state.todos.map(todo => todo.text === text ? {
        ...todo,
        isCompleted: true
      } : todo)
    }));
  };

  handleDelete = (text) => () => {
    this.setState(state => {
      const todos = state.todos.map(todo => todo.text === text ? null : todo).filter(Boolean);

      debugger;

      console.log(todos);

      return {
        todos
      }
    });
  };

  handleCompleteAll = () => {
    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        isCompleted: true
      }))
    }));
  };

  render() {
    const {text, todos} = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={text} onChange={this.handleChange}/>
          <button>Add</button>
        </form>
        <ul>
          {todos.map(todo =>
            <li key={todo.text} style={todo.isCompleted ? {textDecoration: 'line-through'} : {}}>
              {todo.text} | {todo.isCompleted ? <button onClick={this.handleDelete(todo.text)}>Delete</button> :
              <button onClick={this.handleComplete(todo.text)}>Complete</button>}
            </li>
          )}
        </ul>
        {todos.length > 0 && <button onClick={this.handleCompleteAll}>Complete all</button>}
      </div>
    );
  }
}

export default Todo;