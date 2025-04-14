"use client";

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Login/Nav";
import Header from "./navigation/Header";
import SideNav from "./navigation/SideNav";
import About from "./components/About";
import Batches from "./components/Batches/BatchesHome";
import QuestionBank from "./components/QuestionBank/QuestionBank";
import Curriculum1 from "./components/Curriculum/Curriculum";
import AddnewData from "./components/AddnewData/AddnewData";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import AddInstructorsTable from "./components/Admin and Instructor/AddInstructorsTable";
import StudyMaterials from "./components/StudyMaterials/StudyMaterials";
import Learners from "./components/Learners/Learners";
import Curriculum from "./components/Curriculum/Curriculum";
// import AddInstructors from "./components/admin/addInstructors";

function App() {
  return (
    <>
       <Header/>
      <SideNav/> 
       <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">          
            <Routes>                   
                <Route path="about" element={<About />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="/" element={<Home />}>
                  <Route index element={<Home />} />
                  </Route>
                <Route path="learners" element={<Learners></Learners>}></Route>
                <Route path="studymaterials" element={<StudyMaterials></StudyMaterials>}></Route>
                <Route path="batches" element={<Batches></Batches>}></Route>
                <Route path="questionbank" element={<QuestionBank></QuestionBank>}></Route>
                <Route path='curriculum' element={<Curriculum></Curriculum>}></Route>
                <Route path="addnewdata" element={<AddnewData></AddnewData>}></Route>
                <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
                <Route path="login" element={<Login></Login>}></Route>
                <Route path="addinstructors" element={<AddInstructorsTable></AddInstructorsTable>}></Route>

            </Routes>
            
        </div>
      </div> 
      {/* <AddInstructorsTable></AddInstructorsTable> */}
{/* <Users1></Users1> */}
{/* <Nav></Nav> */}
    </>
  );
}

export default App;
