import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

function Curriculum() {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [curriculum, setCurriculum] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const navigate = useNavigate(); 


  // ✅ Load curriculum from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("curriculum")) || [];
    setCurriculum(storedData);
  }, []);

  // ✅ Open Modal
  function handleOpenModal() {
    setOpenModal(true);
  }

  // ✅ Close Modal
  function handleCloseModal() {
    setOpenModal(false);
    setName("");
    setBranch("");
    setCurrentId(null);
  }
  function rowHandler(curriculum){
    console.log(curriculum);
    //navigate(`/routename/${course.id}`);
    console.log(curriculum.id);
    
    navigate('/studymaterials')
  }

  // ✅ Add or Update Curriculum
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !branch) {
      alert("Please fill out all fields.");
      return;
    }

    let updatedCurriculum;
    if (currentId) {
      updatedCurriculum = curriculum.map((item) =>
        item.id === currentId ? { ...item, name, branch } : item
      );
    } else {
      const newCurriculum = { id: uuid(), name, branch };
      updatedCurriculum = [...curriculum, newCurriculum];
    }

    localStorage.setItem("curriculum", JSON.stringify(updatedCurriculum));
    setCurriculum(updatedCurriculum);
    handleCloseModal();
  };

  // ✅ Delete Curriculum
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this curriculum?")) {
      const updatedCurriculum = curriculum.filter((item) => item.id !== id);
      localStorage.setItem("curriculum", JSON.stringify(updatedCurriculum));
      setCurriculum(updatedCurriculum);
    }
  };

  // ✅ Edit Curriculum
  const handleEdit = (id) => {
    const itemToEdit = curriculum.find((item) => item.id === id);
    if (itemToEdit) {
      setName(itemToEdit.name);
      setBranch(itemToEdit.branch);
      setCurrentId(id);
      handleOpenModal();
    }
  };

  // ✅ Filtered Curriculum List
  const filteredCurriculum = curriculum.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* ✅ Page Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Curriculum</h1>
        <p className="text-gray-600">Manage all your course curriculum in one place.</p>
      </div>

      {/* ✅ Search & Add Button */}
      <div className="flex items-center justify-end space-x-4 mb-4">
        <TextInput
          type="search"
          placeholder="Search..."
          className="w-25% p-1 text-sm focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          onClick={handleOpenModal}
          className="bg-gradient-to-l from-blue-500 to-blue-700 text-white 
                    px-1 py-1 rounded-lg shadow-md hover:shadow-lg 
                    hover:from-blue-700 hover:to-blue-700 transition-all duration-300"
        >
          + Add Curriculum
        </Button>
      </div>

      {/* ✅ Modal Sliding Animation */}
      {openModal && (
        <>
          {/* Modal Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={handleCloseModal}
          ></div>

          {/* Modal Content */}
          <div
            className={`fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg p-6 z-50 
                        transform transition-transform duration-500 ease-in-out 
                        ${openModal ? "translate-x-0" : "translate-x-full"}`}
          >
            {/* Close "X" Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ✖
            </button>

            <h1 className="text-lg font-semibold">{currentId ? "Edit Curriculum" : "Create Curriculum"}</h1>
            <br />

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name" value="Name" />
                <TextInput
                  id="name"
                  placeholder="Enter Curriculum Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="branch" value="Branch" />
                <Select
                  id="branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  required
                >
                  <option value="">Select Branch</option>
                  <option value="Podbic">Podbic</option>
                </Select>
              </div>

              <div className="flex space-x-2 mt-3">
                <Button type="submit" color="green">
                  {currentId ? "Save Changes" : "Create"}
                </Button>
                <Button color="red" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* ✅ Table to Display Curriculum */}
      <div className="overflow-auto">
        <table className="w-full min-w-max text-sm text-left text-gray-500">
          <thead className="bg-gray-100 text-gray-700 text-center">
            <tr>
              <th className="px-6 py-3">SR</th>
              <th className="px-6 py-3">Curriculum Name</th>
              <th className="px-6 py-3">Branch</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCurriculum.length > 0 ? (
              filteredCurriculum.map((item, index) => (
                <tr key={item.id} className="text-center bg-white border-b"
                style={{cursor: "pointer"}}
                onClick={(e)=> rowHandler(item)}>
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{item.name}</td>
                  <td className="px-6 py-3">{item.branch}</td>
                  <td className="px-6 py-3 flex justify-center space-x-2">
                    <Button size="xs" color="green" onClick={() => handleEdit(item.id)}>
                      ✏ Edit
                    </Button>
                    <Button size="xs" color="red" onClick={() => handleDelete(item.id)}>
                      🗑 Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-3 text-center">
                  No Curriculum Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Curriculum;
