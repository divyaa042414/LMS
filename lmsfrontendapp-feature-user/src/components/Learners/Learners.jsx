import { Button, Dropdown, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Learners() {
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); 


  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [reg, setReg] = useState("");

  // Error State
  const [errors, setErrors] = useState({});

  // Learners List
  const [learner, setLearner] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("learners")) || [];
    setLearner(storedData);
  }, []);

  function validateForm() {
    let newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format";

    if (!number.trim()) newErrors.number = "Mobile number is required";
    else if (!/^\d{10}$/.test(number)) newErrors.number = "Invalid mobile number (10 digits required)";

    if (!reg.trim()) newErrors.reg = "Registration No is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    let updatedLearners;
    if (editId) {
      updatedLearners = learner.map((l) =>
        l.id === editId ? { ...l, name, email, number, reg } : l
      );
    } else {
      const newLearner = { id: Date.now(), name, email, number, reg };
      updatedLearners = [...learner, newLearner];
    }

    setLearner(updatedLearners);
    localStorage.setItem("learners", JSON.stringify(updatedLearners));
    setOpenModal(false);
    resetForm();
  }

  function resetForm() {
    setName("");
    setEmail("");
    setNumber("");
    setReg("");
    setErrors({});
    setEditId(null);
  }

  function handleEdit(id) {
    const user = learner.find((l) => l.id === id);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setNumber(user.number);
      setReg(user.reg);
      setEditId(user.id);
      setOpenModal(true);
    }
  }

  function handleDelete(id) {
    const updatedLearners = learner.filter((l) => l.id !== id);
    setLearner(updatedLearners);
    localStorage.setItem("learners", JSON.stringify(updatedLearners));
  }

  function rowHandler(batches){
    console.log(batches);
    //navigate(`/routename/${course.id}`);
    console.log(batches.id);
    
    navigate('/batches')
  }

  // ✅ Filter learners dynamically based on search input
  const filteredLearners = learner.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.number.includes(searchTerm) ||
      l.reg.includes(searchTerm)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Learners</h1>
      <p className="text-gray-600">Create and manage learners for your branches</p>

      {/* ✅ Search & Bulk Actions */}
      <div className="flex justify-between items-center space-x-4 my-4">
        <TextInput
          type="search"
          placeholder="Search learners..."
          className="w-30% p-2 text-sm  focus:border-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex space-x-2">
          <Dropdown label="Bulk Actions">
            <Dropdown.Item href="#">Add Learners</Dropdown.Item>
            <Dropdown.Item>Send Reset Password Link</Dropdown.Item>
            <Dropdown.Item>Bulk Archive Learners</Dropdown.Item>
          </Dropdown>

          <Button onClick={() => setOpenModal(true)} className="bg-blue-600 text-white px-2 py-1 rounded-lg hover:bg-blue-700">
            + Add Learner
          </Button>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
          <div className="w-1/4 h-full bg-white shadow-lg p-6 rounded-l-lg transform transition-transform ease-in-out overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-xl font-medium">{editId ? "Edit Learner" : "New Enrollment"}</h3>
              <button onClick={() => setOpenModal(false)} className="text-gray-500 hover:text-gray-700 text-lg">
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" value="Name" />
                <TextInput id="name" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email" value="Email" />
                <TextInput id="email" type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="number" value="Mobile Number" />
                <TextInput id="number" type="tel" placeholder="Enter mobile number" onChange={(e) => setNumber(e.target.value)} value={number} />
                {errors.number && <p className="text-red-500">{errors.number}</p>}
              </div>

              <div>
                <Label htmlFor="reg" value="Registration No" />
                <TextInput id="reg" type="text" placeholder="Enter registration no." onChange={(e) => setReg(e.target.value)} value={reg} />
                {errors.reg && <p className="text-red-500">{errors.reg}</p>}
              </div>

              <div className="flex space-x-4">
                <Button type="submit" color="green">
                  {editId ? "Update Learner" : "Register Learner"}
                </Button>
                <Button type="button" color="red" onClick={() => setOpenModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Learners Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Mobile</th>
              <th className="px-6 py-3">Reg. No.</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLearners.map((l, index) => (
              <tr key={l.id} className="bg-white border-b hover:bg-gray-50"
              style={{cursor: "pointer"}}
                onClick={(e)=> rowHandler(l)}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{l.name}</td>
                <td className="px-6 py-4">{l.email}</td>
                <td className="px-6 py-4">{l.number}</td>
                <td className="px-6 py-4">{l.reg}</td>
                <td className="px-6 py-3 flex justify space-x-1">
                  <Button size="xs" color="green" onClick={() => handleEdit(l.id)}>✏ Edit</Button>
                  <Button size="xs" color="red" onClick={() => handleDelete(l.id)}>🗑 Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
