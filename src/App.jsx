import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import { addTodo, toggleTodoStatus, deleteTodo } from "./actions/todoActions";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import todoReducer from "./reducers/todoReducer";

const App = ({ todos, addTodo, toggleTodoStatus, deleteTodo }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onChangeHandler = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "body") {
      setBody(e.target.value);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "" || body.trim() === "") {
      return;
    }
    const newTodo = {
      id: uuid(),
      title: title,
      body: body,
      isDone: false,
    };
    addTodo(newTodo);
    setTitle("");
    setBody("");
  };

  const ListView = () => {
    return (
      <div>
        <h2>진행 중</h2>
        {todos
          .filter((todo) => !todo.isDone)
          .map((todo) => (
            <div className="todo" key={todo.id}>
              <h3>{todo.title}</h3>
              <p>{todo.body}</p>
              <button onClick={() => toggleTodoStatus(todo.id)}>
                {todo.isDone ? "취소" : "완료"}
              </button>
              <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              <Link to={`/details/${todo.id}`}>상세보기</Link>
            </div>
          ))}
        <h2>완료</h2>
        {todos
          .filter((todo) => todo.isDone)
          .map((todo) => (
            <div className="todo" key={todo.id}>
              <h3>{todo.title}</h3>
              <p>{todo.body}</p>
              <button onClick={() => toggleTodoStatus(todo.id)}>
                {todo.isDone ? "취소" : "완료"}
              </button>
              <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              <Link to={`/details/${todo.id}`}>상세보기</Link>
            </div>
          ))}
      </div>
    );
  };

  const DetailsView = ({ match }) => {
    const todoId = match.params.id;
    const todo = todos.find((todo) => todo.id === todoId);
    return (
      <div>
        <h3>{todo.title}</h3>
        <p>{todo.body}</p>
        <button onClick={() => toggleTodoStatus(todo.id)}>
          {todo.isDone ? "취소" : "완료"}
        </button>
        <button onClick={() => deleteTodo(todo.id)}>삭제</button>
        <Link to="/">이전으로</Link>
      </div>
    );
  };

  return (
    <div>
      <h1>Todo List App</h1>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={title}
          onChange={onChangeHandler}
        />
        <textarea
          name="body"
          placeholder="내용"
          value={body}
          onChange={onChangeHandler}
        />
        <button type="submit">추가하기</button>
      </form>
      <Router>
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/details/:id" element={<DetailsView />} />
        </Routes>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (todo) => dispatch(addTodo(todo)),
  toggleTodoStatus: (id) => dispatch(toggleTodoStatus(id)),
  deleteTodo: (id) => dispatch(deleteTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
