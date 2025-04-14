// import { Button, Select, Label, TextInput } from "flowbite-react";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import uuid from "react-uuid";

// export default function Batches() {
//   const [openModal, setOpenModal] = useState(false);
//   const [batchName, setBatchName] = useState('');
//   const [course, setCourse] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [EndDate, setEndDate] = useState('');
//   const [instructor, setInstructor] = useState('');
//   const [manager, setManager] = useState('');
//   const [batches, setBatches] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const navigate = useNavigate(); 
 
//   const instructorKey = uuid()//


//   const [instructorList, setInstructorList] = useState([]);



//   useEffect(() => {
//     const storedData = JSON.parse(localStorage.getItem("batches")) || [];
//     setBatches(storedData);

//     const storedInstructors = JSON.parse(localStorage.getItem('instructors')) ||[]
//     setInstructorList(storedInstructors);
//   }, []);

//   const handleOpenModal = (index = null) => {
//     if (index !== null) {
//       setEditIndex(index);
//       const batch = batches[index];
//       setBatchName(batch.batchName);
//       setCourse(batch.course);
//       setStartDate(batch.startDate);
//       setEndDate(batch.EndDate);
//       setInstructor(batch.instructor);
//       setManager(batch.manager);
//     } else {
//       setEditIndex(null);
//       setBatchName('');
//       setCourse('');
//       setStartDate('');
//       setEndDate('');
//       setInstructor('');
//       setManager('');
//     }

//     setOpenModal(true);
//     document.body.style.overflow = "hidden"; 
//   };


//   const handleCloseModal = () => {
//     setOpenModal(false);
//     document.body.style.overflow = "auto"; // Restore background scrolling
//   };

//   const handleSaveBatch = (e) => {
//     e.preventDefault();

//     if (!batchName || !course || !startDate || !EndDate || !instructor || !manager) {
//       alert("All fields are required.");
//       return;
//     }

//     const newBatch = { batchName, course, startDate, EndDate, instructor, manager };
//     let updatedBatches = [...batches];

//     if (editIndex !== null) {
//       updatedBatches[editIndex] = newBatch;
//     } else {
//       updatedBatches.push(newBatch);
//       localStorage.setItem(uuid(), JSON.stringify(newBatch));
//     }

//     setBatches(updatedBatches);
//     localStorage.setItem("batches", JSON.stringify(updatedBatches));
//     handleCloseModal();
//   };

//   const handleDeleteBatch = (index) => {
//     if (window.confirm("Are you sure you want to delete this batch?")) {
//       const updatedBatches = batches.filter((_, i) => i !== index);
//       setBatches(updatedBatches);
//       localStorage.setItem("batches", JSON.stringify(updatedBatches));
//     }
//   };

//   function rowHandler(curriculum){
//     console.log(curriculum);
//     //navigate  (`/routename/${course.id}`);
//     console.log(curriculum.id);
    
//     navigate('/curriculum')
//   }

//   return (
//     <>
//       <div style={{ margin: "10px" }}>
//         <h1 style={{ fontSize: "30px" }}>
//           <b>Batches</b>
//         </h1>
//         <p>Manage batches and curriculum for your courses </p>
//         <div>
//           <Button
//             onClick={() => handleOpenModal()}
//             className="bg-gradient-to-l from-blue-500 to-blue-700 text-white 
//              px-1 py-1 rounded-lg shadow-md hover:shadow-lg 
//              hover:from-blue-700 hover:to-blue-700 transition-all duration-300"
//             style={{ marginLeft: "63rem" }}
//           >
//             + Create Batch
//           </Button>

//           {/* Modal Overlay */}
//           <div
//             className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
//               openModal
//                 ? "opacity-100 visible bg-black/50"
//                 : "opacity-0 invisible"
//             }`}
//             onClick={handleCloseModal}
//           ></div>

//           {/* Modal Sliding Animation */}
//           <div
//             className={`fixed top-0 right-0 h-full  w-1/4 bg-white shadow-lg p-6 z-50 transform transition-transform duration-300 ease-in-out 
//         ${openModal ? "translate-x-0" : "translate-x-full"}`}
//           >
//             {/* Close "X" Button */}
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
//             >
//               ✖
//             </button>

//             <h1 className="text-lg font-semibold">
//               {editIndex !== null ? "Edit Batch" : "Create Batch"}
//             </h1>
//             <br></br>
//             <form className="flex flex-col gap-4">
//               <div>
//                 <Label htmlFor="batchName" value="Batch Name" />
//                 <TextInput
//                   id="batchName"
//                   placeholder="Enter Batch Name"
//                   value={batchName}
//                   onChange={(e) => setBatchName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="course" value="Course" />
//                 <Select
//                   id="course"
//                   value={course}
//                   onChange={(e) => setCourse(e.target.value)}
//                   required
//                 >
//                   <option value="">Select Course</option>
//                   <option value="Java">Java</option>
//                   <option value="JavaScript">JavaScript</option>
//                   <option value="HTML">HTML</option>
//                 </Select>
//               </div>
//               <div>
//                 <Label htmlFor="startDate" value="Start Date" />
//                 <TextInput
//                   id="startDate"
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="EndDate" value="End Date" />
//                 <TextInput
//                   id="EndDate"
//                   type="date"
//                   value={EndDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="instructor" value="Instructor" />
//                 <Select
//                   id="instructor"
//                   value={instructor}
//                   onChange={(e) => setInstructor(e.target.value)}
//                   required
//                 >
//                   {/* {instructorList.map((name, index) => (
//                     <option key={index} value={name}>
//                       {name}
//                     </option>
//                   ))} */}

//                   {instructorList.map((instructor, index) => (
//                     <option key={index} value={instructor.id}>
//                       {instructor.name}
//                     </option>
//                   ))}
//                 </Select>
//               </div>
//               <div>
//                 <Label htmlFor="manager" value="Batch Manager" />
//                 <Select
//                   id="manager"
//                   value={manager}
//                   onChange={(e) => setManager(e.target.value)}
//                   required
//                 >
//                   <option value="">Select Manager</option>
//                   <option value="Manager1">Manager1</option>
//                   <option value="Manager2">Manager2</option>
//                   <option value="Manager3">Manager3</option>
//                 </Select>
//               </div>
//               <div className="flex space-x-2 mt-3">
//                 <Button onClick={handleSaveBatch} color="green">
//                   {editIndex !== null ? "Save Changes" : "Create Batch"}
//                 </Button>
//                 <Button color="red" onClick={handleCloseModal}>
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Batch List Table */}
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
//           <table className="w-full text-sm text-left text-gray-500">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3">SL</th>
//                 <th className="px-6 py-3">Batch Name</th>
//                 <th className="px-6 py-3">Course</th>
//                 <th className="px-6 py-3">Start Date</th>
//                 <th className="px-6 py-3">End Date</th>
//                 <th className="px-6 py-3">Instructor</th>
//                 <th className="px-6 py-3">Batch Manager</th>
//                 <th className="px-6 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {batches.length > 0 ? (
//                 batches.map((batch, index) => (
//                   <tr
//                     key={batch.index}
//                     className="bg-white border-b hover:bg-gray-50"
//                     style={{ cursor: "pointer" }}
//                     onClick={(e) => rowHandler(batch)}
//                   >
//                     <td className="px-6 py-4">{index + 1}</td>
//                     <td className="px-6 py-4">{batch.batchName}</td>
//                     <td className="px-6 py-4">{batch.course}</td>
//                     <td className="px-6 py-4">{batch.startDate}</td>
//                     <td className="px-6 py-4">{batch.EndDate}</td>
//                     <td className="px-6 py-4">{batch.instructor}</td>
//                     <td className="px-6 py-4">{batch.manager}</td>
//                     <td className="px-6 py-4 flex space-x-2">
//                       <Button
//                         color="green"
//                         size="xs"
//                         onClick={() => handleOpenModal(index)}
//                       >
//                         ✏ Edit
//                       </Button>
//                       <Button
//                         color="red"
//                         size="xs"
//                         onClick={() => handleDeleteBatch(index)}
//                       >
//                         🗑 Delete
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="px-6 py-3 text-center">
//                     No Batches
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }



import { Button, Select, Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

export default function Batches() {
  const [openModal, setOpenModal] = useState(false);
  const [batchName, setBatchName] = useState('');
  const [course, setCourse] = useState('');
  const [startDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');
  const [instructor, setInstructor] = useState('');
  const [manager, setManager] = useState('');
  const [batches, setBatches] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const [instructorList, setInstructorList] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("batches")) || [];
    setBatches(storedData);

    const storedInstructors = JSON.parse(localStorage.getItem("instructors")) || [];
    setInstructorList(storedInstructors);
  }, []);

  const handleOpenModal = (index = null) => {
    if (index !== null) {
      const batch = batches[index];
      setEditIndex(index);
      setEditId(batch.id);
      setBatchName(batch.batchName);
      setCourse(batch.course);
      setStartDate(batch.startDate);
      setEndDate(batch.EndDate);
      setInstructor(batch.instructor);
      setManager(batch.manager);
    } else {
      setEditIndex(null);
      setEditId(null);
      setBatchName('');
      setCourse('');
      setStartDate('');
      setEndDate('');
      setInstructor('');
      setManager('');
    }

    setOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    document.body.style.overflow = "auto";
  };

  const handleSaveBatch = (e) => {
    e.preventDefault();

    if (!batchName || !course || !startDate || !EndDate || !instructor || !manager) {
      alert("All fields are required.");
      return;
    }

    let updatedBatches = [...batches];
    let batchId = editId || uuid();

    const newBatch = { id: batchId, batchName, course, startDate, EndDate, instructor, manager };

    if (editIndex !== null) {
      updatedBatches[editIndex] = newBatch;
    } else {
      updatedBatches.push(newBatch);
    }

    // Save batch under its own unique ID
    localStorage.setItem(batchId, JSON.stringify(newBatch));

    // Save updated batch list
    localStorage.setItem("batches", JSON.stringify(updatedBatches));

    setBatches(updatedBatches);
    handleCloseModal();
  };

  const handleDeleteBatch = (index) => {
    if (window.confirm("Are you sure you want to delete this batch?")) {
      const deletedBatch = batches[index];
      const updatedBatches = batches.filter((_, i) => i !== index);
      setBatches(updatedBatches);

      // Remove batch from localStorage by ID
      localStorage.removeItem(deletedBatch.id);

      // Update the main list
      localStorage.setItem("batches", JSON.stringify(updatedBatches));
    }
  };

  const rowHandler = (batch) => {
    navigate(`/curriculum/${batch.id}`);
  };

  return (
    <>
      <div style={{ margin: "10px" }}>
        <h1 style={{ fontSize: "30px" }}><b>Batches</b></h1>
        <p>Manage batches and curriculum for your courses</p>
        <div>
          <Button
            onClick={() => handleOpenModal()}
            className="bg-gradient-to-l from-blue-500 to-blue-700 text-white 
              px-1 py-1 rounded-lg shadow-md hover:shadow-lg 
              hover:from-blue-700 hover:to-blue-700 transition-all duration-300"
            style={{ marginLeft: "63rem" }}
          >
            + Create Batch
          </Button>

          {/* Modal Overlay */}
          <div
            className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
              openModal ? "opacity-100 visible bg-black/50" : "opacity-0 invisible"
            }`}
            onClick={handleCloseModal}
          ></div>

          {/* Modal Sliding Panel */}
          <div
            className={`fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg p-6 z-50 transform transition-transform duration-300 ease-in-out 
            ${openModal ? "translate-x-0" : "translate-x-full"}`}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ✖
            </button>

            <h1 className="text-lg font-semibold">
              {editIndex !== null ? "Edit Batch" : "Create Batch"}
            </h1>
            <br />
            <form className="flex flex-col gap-4">
              <div>
                <Label htmlFor="batchName" value="Batch Name" />
                <TextInput
                  id="batchName"
                  placeholder="Enter Batch Name"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="course" value="Course" />
                <Select
                  id="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                >
                  <option value="">Select Course</option>
                  <option value="Java">Java</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="HTML">HTML</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="startDate" value="Start Date" />
                <TextInput
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="EndDate" value="End Date" />
                <TextInput
                  id="EndDate"
                  type="date"
                  value={EndDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="instructor" value="Instructor" />
                <Select
                  id="instructor"
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  required
                >
                  <option value="">Select Instructor</option>
                  {instructorList.map((inst, index) => (
                    <option key={index} value={inst.id}>
                      {inst.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="manager" value="Batch Manager" />
                <Select
                  id="manager"
                  value={manager}
                  onChange={(e) => setManager(e.target.value)}
                  required
                >
                  <option value="">Select Manager</option>
                  {instructorList.map((inst, index) => (
                    <option key={index} value={inst.id}>
                      {inst.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex space-x-2 mt-3">
                <Button onClick={handleSaveBatch} color="green">
                  {editIndex !== null ? "Save Changes" : "Create Batch"}
                </Button>
                <Button color="red" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Batch Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">SL</th>
                <th className="px-6 py-3">Batch Name</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Start Date</th>
                <th className="px-6 py-3">End Date</th>
                <th className="px-6 py-3">Instructor</th>
                <th className="px-6 py-3">Batch Manager</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.length > 0 ? (
                batches.map((batch, index) => (
                  <tr
                    key={batch.id}
                    className="bg-white border-b hover:bg-gray-50"
                    style={{ cursor: "pointer" }}
                    onClick={() => rowHandler(batch)}
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{batch.batchName}</td>
                    <td className="px-6 py-4">{batch.course}</td>
                    <td className="px-6 py-4">{batch.startDate}</td>
                    <td className="px-6 py-4">{batch.EndDate}</td>
                    <td className="px-6 py-4">{batch.instructor}</td>
                    <td className="px-6 py-4">{batch.manager}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <Button
                        color="green"
                        size="xs"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          handleOpenModal(index);
                        }}
                      >
                        ✏ Edit
                      </Button>
                      <Button
                        color="red"
                        size="xs"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          handleDeleteBatch(index);
                        }}
                      >
                        🗑 Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-3 text-center">
                    No Batches
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
