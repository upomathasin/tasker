export const taskReducer = (taskList, action) => {
  switch (action.type) {
    case "addTask":
      return [...taskList, action.task];
    case "deleteTask":
      return taskList.filter((t) => t.id !== action.taskId);
    case "deleteAllTask":
      return [];

    case "EditTask":
      return taskList.map((task) => {
        if (task.id === action.taskToUpdate.id) {
          return action.newTask;
        } else {
          return task;
        }
      });

    case "editFavourite":
      return taskList.map((task) => {
        if (task.id === action.taskId) {
          return { ...task, isFavorite: !task.isFavorite };
        } else {
          return task;
        }
      });
    default: {
      throw Error("No action matched !");
    }
  }
};
