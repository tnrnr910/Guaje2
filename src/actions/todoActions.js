export const addTodo = (todo) => {
  return {
    type: "ADD_TODO",
    payload: todo,
  };
};

export const toggleTodoStatus = (id) => {
  return {
    type: "TOGGLE_TODO_STATUS",
    payload: id,
  };
};

export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    payload: id,
  };
};
