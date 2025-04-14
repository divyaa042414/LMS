

import React, { useEffect, useState } from 'react';
import {
  Button,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'flowbite-react';
import uuid from 'react-uuid';

function SeparateTable() {
  const [instructors, setInstructors] = useState([]);
  const [searchDetails, setSearchDetails] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [radioSelect, setRadioselect] = useState("");
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    branch: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [branchError, setBranchError] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [editKey, setEditKey] = useState(null);

  // Load instructors from localStorage (single key: "instructors")
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("instructors")) || [];
    setInstructors(storedData);
  }, []);

  const clearErrors = () => {
    setNameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setBranchError("");
    setError("");
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setFormdata({ name: "", email: "", phone: "", password: "", branch: "" });
    setFile(null);
    clearErrors();
    setIsEdit(false);
    setEditKey(null);
    setRadioselect("");
  };

  const handleChange = (e) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "text/csv") {
      setFile(selected);
      setError("");
    } else {
      setError("Please upload a valid CSV file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (radioSelect === "fileUpload") {
      if (!file) {
        setError("Please upload a CSV file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.trim().split("\n");
        const headers = rows[0].split(",").map(h => h.trim().toLowerCase());

        const newInstructors = rows.slice(1).map(row => {
          const values = row.split(",").map(v => v.trim());
          const entry = {};
          headers.forEach((header, index) => {
            entry[header] = values[index] || "";
          });
          return {
            id: uuid(),
            name: entry.name || "",
            email: entry.email || "",
            phone: entry.phone || "",
            password: entry.password || "",
            branch: entry.branch || "",
            dateAdded: new Date().toLocaleDateString()
          };
        });

        const updatedList = [...instructors, ...newInstructors];
        localStorage.setItem("instructors", JSON.stringify(updatedList));
        setInstructors(updatedList);
        onCloseModal();
      };

      reader.readAsText(file);
    } else {
      let hasError = false;

      if (formdata.name.trim() === "") {
        setNameError("Name is required.");
        hasError = true;
      } else {
        setNameError("");
      }
      if (formdata.email.trim() === "") {
        setEmailError("Email is required.");
        hasError = true;
      } else {
        setEmailError("");
      }
      if (formdata.phone.trim() === "") {
        setPhoneError("Phone number is required.");
        hasError = true;
      } else {
        setPhoneError("");
      }
      if (formdata.password.trim() === "") {
        setPasswordError("Password is required.");
        hasError = true;
      } else {
        setPasswordError("");
      }
      if (formdata.branch.trim() === "") {
        setBranchError("Branch is required.");
        hasError = true;
      } else {
        setBranchError("");
      }
      if (hasError) return;

      const currentDate = new Date().toLocaleDateString();
      const newInstructor = {
        id: isEdit ? editKey : uuid(),
        name: formdata.name,
        email: formdata.email,
        phone: formdata.phone,
        password: formdata.password,
        branch: formdata.branch,
        dateAdded: isEdit
          ? instructors.find(i => i.id === editKey)?.dateAdded || currentDate
          : currentDate
      };

      let updatedList = [];
      if (isEdit && editKey) {
        updatedList = instructors.map((inst) =>
          inst.id === editKey ? newInstructor : inst
        );
      } else {
        updatedList = [...instructors, newInstructor];
      }
      localStorage.setItem("instructors", JSON.stringify(updatedList));
      setInstructors(updatedList);
      onCloseModal();
    }
  };

  const handleEdit = (id) => {
    const item = instructors.find(i => i.id === id);
    if (item) {
      setFormdata({
        name: item.name || "",
        email: item.email || "",
        phone: item.phone || "",
        password: item.password || "",
        branch: item.branch || "",
      });
      setIsEdit(true);
      setEditKey(id);
      setRadioselect("manual");
      setOpenModal(true);
    }
  };

  const handleDelete = (id) => {
    const updated = instructors.filter((inst) => inst.id !== id);
    localStorage.setItem("instructors", JSON.stringify(updated));
    setInstructors(updated);
  };

  const filteredInstructors = instructors.filter((instructor) =>
    Object.values(instructor).some(
      (val) => val?.toString().toLowerCase().includes(searchDetails.toLowerCase())
    )
  );

  return (
    <>
      <div className="AddInstructorsTable">
        <h1 className="heading3"style={{fontSize:"20px"}}><b>Admins & Instructors</b></h1>
        <p>Create and manage users with different roles on the platform</p>

        <div className="flex flex-col sm:flex-row justify-between items-center gap- mt-2" style={{marginLeft:'55rem'}}>
  <div className="w-full sm:w-1/2" >
    <input
      type="search"
      id="default-search"
      className="searchbar block w-full p-3 ps-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
      placeholder="Search..."
      onChange={(e) => setSearchDetails(e.target.value)}
    />
  </div>

  <Button
    color="blue"
    className="addinstructorButton whitespace-nowrap"
    onClick={() => setOpenModal(true)}
  >
    + Add Instructor
  </Button>
</div>
</div>

      {/* Modal */}
      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <ModalHeader>
          <h2 className="text-xl font-semibold text-gray-900">{isEdit ? "Edit Instructor" : "Add Instructor"}</h2>
        </ModalHeader>
        <ModalBody className="space-y-6">
          {/* Radio Select */}
          {!isEdit && (
            <div>
              <h3 className="text-lg font-medium text-gray-800">Select Mode of Import</h3>
              <div className="mt-2 space-y-3">
                <label className="flex items-center space-x-3 p-3 border rounded-md cursor-pointer">
                  <input
                    type="radio"
                    value="manual"
                    checked={radioSelect === "manual"}
                    onChange={(e) => setRadioselect(e.target.value)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="text-gray-800">Enter manually</span>
                </label>
                <label className="flex items-center space-x-3 p-3 border rounded-md cursor-pointer">
                  <input
                    type="radio"
                    value="fileUpload"
                    checked={radioSelect === "fileUpload"}
                    onChange={(e) => setRadioselect(e.target.value)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="text-gray-800">Upload a file</span>
                </label>
              </div>
            </div>
          )}

          {/* Manual Entry Form */}
          {radioSelect === "manual" && (
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" value="Name" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formdata.name}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border rounded-lg bg-gray-50"
                    placeholder="John Doe"
                  />
                  {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                </div>
                <div>
                  <Label htmlFor="email" value="Email" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formdata.email}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border rounded-lg bg-gray-50"
                    placeholder="john@example.com"
                    disabled={isEdit}
                  />
                  {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" value="Phone Number" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formdata.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border rounded-lg bg-gray-50"
                    placeholder="123-456-7890"
                  />
                  {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
                </div>
                <div>
                  <Label htmlFor="branch" value="Branch" />
                  <select
                    id="branch"
                    name="branch"
                    value={formdata.branch}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border rounded-lg bg-gray-50"
                  >
                    <option value="">Select a branch</option>
                    <option value="podbic">Podbic</option>
                  </select>
                  {branchError && <p className="text-red-500 text-sm">{branchError}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="password" value="Password" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formdata.password}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-lg bg-gray-50"
                  placeholder="••••••••"
                />
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              </div>
            </form>
          )}

          {/* File Upload */}
          {radioSelect === "fileUpload" && (
            <div className="text-center">
              <Label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">Click to upload a CSV file (.csv)</p>
                  <p className="text-xs text-gray-400">Max size: 2MB</p>
                </div>
                <FileInput id="dropzone-file" className="hidden" onChange={handleFileChange} accept=".csv" />
              </Label>
              {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <div className="flex justify-end w-full space-x-4">
            <Button color="gray" onClick={onCloseModal}>Cancel</Button>
            <Button color="blue" onClick={handleSubmit}>
              {isEdit ? "Update Instructor" : "Register Instructor"}
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">

            <tr className="text-center">
              <th className="px-6 py-3">Sl</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Date Added</th>
              <th className="px-6 py-3">Branch</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredInstructors.length > 0 ? (
              filteredInstructors.map((instructor, index) => (
                <tr key={index} className="text-center bg-white border-b hover:bg-gray-100">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{instructor.name || "N/A"}</td>
                  <td className="px-6 py-4">{instructor.email || "N/A"}</td>
                  <td className="px-6 py-4">{instructor.phone || "N/A"}</td>
                  <td className="px-6 py-4">{instructor.dateAdded || "N/A"}</td>
                  <td className="px-6 py-4">{instructor.branch || "N/A"}</td>
                  <td className="px-6 py-4">
                    <td className="px-6 py-4 flex space-x-2">
                    <Button color="green" size="xs" onClick={() => handleEdit(instructor.email)}>✏ Edit</Button>
                  <Button color="red" size="xs" onClick={() => handleDelete(index)}>🗑 Delete</Button>

                    </td>
                  </td> 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">
                  No instructors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SeparateTable;



