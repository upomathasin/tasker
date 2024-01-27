import React, { useContext, useState } from "react";
import TaskAction from "../TaskAction/TaskAction";
import TaskList from "../TaskList/TaskList";
import AddTask from "../AddTask/AddTask";
import { TaskContext } from "../../context/TaskContext";
import SearchTask from "../SearchTask/SearchTask";
export default function TaskBoard() {
  const [showModal, setShowModal] = useState(false);
  const { taskList, setTaskList } = useContext(TaskContext);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleDeleteAll = () => {
    dispatch({
      type: "deleteAllTask",
    });
  };

  const handleEdit = (task) => {
    setShowModal(true);
    setTaskToUpdate(task);
  };

  return (
    <div>
      <section className="mb-20" id="tasks">
        <div className="container">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            {showModal && (
              <AddTask
                showModal={handleShowModal}
                taskToUpdate={taskToUpdate}
                onCancel={() => {
                  setTaskToUpdate(null);
                }}
              ></AddTask>
            )}

            <TaskAction
              showModal={handleShowModal}
              deleteAll={handleDeleteAll}
            ></TaskAction>
            <TaskList onEdit={handleEdit}></TaskList>
          </div>
        </div>
      </section>
    </div>
  );
}
