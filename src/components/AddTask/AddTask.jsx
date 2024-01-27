import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";

export default function AddTask({ showModal, taskToUpdate, onCancel }) {
  const { taskList, dispatch } = useContext(TaskContext);
  const [isAddMode, setIsAddMode] = useState(Object.is(taskToUpdate, null));
  const [newTask, setNewTask] = useState();
  const [task, setTask] = useState(
    taskToUpdate || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      tags: [],
      priority: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    if (
      e.target.title.value === "" ||
      e.target.description.value === "" ||
      e.target.tags.value.length === 0 ||
      e.target.priority.value === ""
    ) {
      alert("Empty field not allowed");
    } else {
      const title = e.target.title.value;
      const description = e.target.description.value;
      const tags = e.target.tags.value.split(",");
      const priority = e.target.priority.value;

      const newTaskValue = {
        id: crypto.randomUUID(),
        title: title,
        description: description,
        tags: tags,
        priority: priority,
        isFavorite: false,
      };
      setNewTask(newTaskValue);
      const found = taskList.find((t) => t.title === title);
      if (isAddMode) {
        if (found) {
          alert("Task Already Exists !");
        } else {
          dispatch({
            type: "addTask",
            task: newTaskValue,
          });
        }
      } else {
        dispatch({
          type: "EditTask",
          newTask: newTaskValue,
          taskToUpdate: taskToUpdate,
        });
      }

      showModal();
    }
  };
  return (
    <>
      <div className=" bg-black  bg-opacity-50 w-full h-full  z-10 absolute top-0 left-0"></div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-10 absolute top-1/4 left-1/4"
      >
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {isAddMode ? "Add New Task" : "Edit Task"}
        </h2>
        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              defaultValue={taskToUpdate && task.title}
              required
            />
          </div>

          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              defaultValue={taskToUpdate && task.description}
              required
            ></textarea>
          </div>

          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                defaultValue={taskToUpdate && task.tags.join(",")}
                required
              />
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                defaultValue={taskToUpdate && task.priority}
                required
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-around lg:mt-20">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            {isAddMode ? " Create new Task" : "Edit Task"}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onCancel();
              setTask(null);
              showModal(false);
            }}
            className="rounded bg-red-500 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
