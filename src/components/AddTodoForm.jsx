import React, { useState } from "react";
import { connect } from "react-redux";

const AddTodoForm = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      addTodo({
        id: Date.now(),
        text: text.trim(),
      });
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a todo..."
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (todo) => dispatch({ type: "ADD_TODO", payload: todo }),
  };
};

export default connect(null, mapDispatchToProps)(AddTodoForm);
