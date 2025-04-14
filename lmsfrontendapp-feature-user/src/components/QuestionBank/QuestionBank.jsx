import React, { useState, useEffect } from "react";
import { Button, TextInput, Textarea, Table, Label, Select } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function QuestionBank() {
    const [openModal, setOpenModal] = useState(false);
    const [questionBanks, setQuestionBanks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        name: "",
        exam: "",
        subject: "",
        topic: "",
        difficulty: "",
        description: "",
    });

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("questionBanks")) || [];
        setQuestionBanks(storedData);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedData;

        if (isEditing) {
            updatedData = questionBanks.map((item, index) =>
                index === editId ? formData : item
            );
            setIsEditing(false);
            setEditId(null);
        } else {
            updatedData = [...questionBanks, formData];
        }

        localStorage.setItem("questionBanks", JSON.stringify(updatedData));
        setQuestionBanks(updatedData);
        setOpenModal(false);
        setFormData({ name: "", exam: "", subject: "", topic: "", difficulty: "", description: "" });
    };

    const handleEdit = (index) => {
        setFormData(questionBanks[index]);
        setIsEditing(true);
        setEditId(index);
        setOpenModal(true);
    };
    function rowHandler(questionbank){
        console.log(questionbank);
        //navigate(`/routename/${course.id}`);
        console.log(questionbank.id);
        
        navigate('/addnewdata')
      }
    

    const handleDelete = (index) => {
        if (window.confirm("Are you sure you want to delete this question bank?")) {
            const updatedData = questionBanks.filter((_, i) => i !== index);
            localStorage.setItem("questionBanks", JSON.stringify(updatedData));
            setQuestionBanks(updatedData);
        }
    };

    const filteredQuestionBanks = questionBanks.filter((item) =>
        Object.values(item).some((value) =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">Question Bank</h1>
            <p className="mb-4 text-gray-600">Manage Question Banks to be used across Assessments</p>

            {/* Search Bar & Add Button - Now Aligned Next to Each Other */}
            <div className="flex items-center space-x-4 mb-4" style={{marginLeft:'48rem'}}>
                <TextInput
                    type="search"
                    placeholder="Search..."
                    className="w-30% p-1 text-sm  focus:border-blue-500"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button 
                    onClick={() => setOpenModal(true)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py- px-2 rounded-lg transition duration-300"
                >
                    + Add Question Bank
                </Button>
            </div>
            

            {/* Table */}
            {filteredQuestionBanks.length > 0 ? (
                <Table className="mt-6">
                    <Table.Head>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Exam</Table.HeadCell>
                        <Table.HeadCell>Subject</Table.HeadCell>
                        <Table.HeadCell>Topic</Table.HeadCell>
                        <Table.HeadCell>Difficulty</Table.HeadCell>
                        <Table.HeadCell className="text-center w-40">Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {filteredQuestionBanks.map((item, index) => (
                            <Table.Row key={item.index}  style={{cursor: "pointer"}}
                            onClick={(e)=> rowHandler(item)}>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>{item.exam}</Table.Cell>
                                <Table.Cell>{item.subject}</Table.Cell>
                                <Table.Cell>{item.topic}</Table.Cell>
                                <Table.Cell>{item.difficulty}</Table.Cell>
                                <Table.Cell className="flex space-x-2">
                                    <Button size="xs" color="blue" className="hover:bg-blue-700" onClick={() => handleEdit(index)}>
                                        ✏ Edit
                                    </Button>
                                    <Button size="xs" color="red" className="hover:bg-red-700" onClick={() => handleDelete(index)}>
                                        🗑 Delete
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <p className="mt-4 text-gray-500">No question banks available.</p>
            )}

            {/* Sliding Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 transition-opacity duration-300">
                    <div className="fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg p-6 z-50 transform transition-transform">
                        {/* Modal Header with Close Button */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">{isEditing ? "Edit Question Bank" : "Add Question Bank"}</h2>
                            <button onClick={() => setOpenModal(false)} className="text-gray-600 hover:text-gray-900 text-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name" value="Name" />
                                <TextInput id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="exam" value="Exam" />
                                <TextInput id="exam" name="exam" value={formData.exam} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="subject" value="Subject" />
                                <TextInput id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="topic" value="Topic" />
                                <TextInput id="topic" name="topic" value={formData.topic} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="difficulty" value="Difficulty" />
                                <Select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange} required>
                                    <option value="">Select Difficulty</option>
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="description" value="Description" />
                                <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
                            </div>
                            <div className="flex space-x-2">
                                <Button type="submit" color="green">{isEditing ? "Update" : "Add"}</Button>
                                <Button color="red" onClick={() => setOpenModal(false)}>Cancel</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuestionBank;
