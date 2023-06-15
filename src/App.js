import React, { useState } from "react";
import "./App.css";

function App() {
  // 상태 변수들
  const [title, setTitle] = useState(""); // 제목 상태 변수
  const [body, setBody] = useState(""); // 내용 상태 변수
  const [todos, setTodos] = useState([]); // Todo 목록 상태 변수

  // input 값 변경 핸들러
  const onChangeHandler = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value); // 제목 값 변경
    } else if (e.target.name === "body") {
      setBody(e.target.value); // 내용 값 변경
    }
  };

  // 폼 제출 핸들러
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "" || body.trim() === "") {
      return;
    }
    const newTodo = {
      id: todos.length,
      title: title,
      body: body,
      isDone: false,
    };
    setTodos([...todos, newTodo]); // 새로운 Todo 추가
    setTitle(""); // 제목 초기화
    setBody(""); // 내용 초기화
  };

  // Todo 완료 상태 변경 핸들러
  const toggleTodoStatus = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  // Todo 삭제 핸들러
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>Todo List App</h1>
      <div className="container">
        {/* Todo 추가 폼 */}
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

        <div className="todos">
          {/* 진행중인 Todo 목록 */}
          <h2>진행 중</h2>
          {todos
            .filter((todo) => !todo.isDone) // 완료되지 않은 Todo만 필터링
            .map((todo) => (
              <div className="todo" key={todo.id}>
                <h3>{todo.title}</h3>
                <p>{todo.body}</p>
                <button onClick={() => toggleTodoStatus(todo.id)}>
                  {todo.isDone ? "취소" : "완료"}
                </button>
                <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              </div>
            ))}

          {/* 완료된 Todo 목록 */}
          <h2>완료</h2>
          {todos
            .filter((todo) => todo.isDone) // 완료된 Todo만 필터링
            .map((todo) => (
              <div className="todo" key={todo.id}>
                <h3>{todo.title}</h3>
                <p>{todo.body}</p>
                <button onClick={() => toggleTodoStatus(todo.id)}>
                  {todo.isDone ? "취소" : "완료"}
                </button>
                <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
