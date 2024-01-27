import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HeroSection from "./components/HeroSection/HeroSection";
import TaskBoard from "./components/TaskBoard/TaskBoard";
import { useContext, useReducer, useState } from "react";
import { TaskContext } from "./context/TaskContext";
import { taskReducer } from "./reducers/taskReducer";

function App() {
  // const [taskList, setTaskList] = useState([]);
  const [taskList, dispatch] = useReducer(taskReducer, []);

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <TaskContext.Provider
      value={{ taskList, dispatch, searchTerm, setSearchTerm }}
    >
      {" "}
      <div>
        {" "}
        <Header></Header>
        <div className=" p-6 flex flex-col justify-center items-center">
          <HeroSection></HeroSection>

          <TaskBoard></TaskBoard>
        </div>
        <Footer></Footer>
      </div>
    </TaskContext.Provider>
  );
}

export default App;
