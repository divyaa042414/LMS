


import React, { useState } from "react";
import { Button, Select, Textarea, TextInput, Label } from "flowbite-react";
import './Addnewdata.css'

export default function AddnewData() {
  const [openModal, setOpenModal] = useState(false);
   const [selectedQuestionType, setSelectedQuestionType] = useState("");
   const [question, setQuestion] = useState("");
   const [difficulty, setDifficulty] = useState("");
   const [marks, setMarks] = useState("");
   const [negativeMarks, setNegativeMarks] = useState("");
   const [questionsList, setQuestionsList] = useState([]);
   const [trueFalseAnswer, setTrueFalseAnswer] = useState(null);
   const [options, setOptions] = useState([{ id: 1, value: "", selected: false }]);
   const [errors, setErrors] = useState({});
 
   const addOption = () => {
     const lastOption = options[options.length - 1];
     if (!lastOption.value.trim()) return;
     setOptions([...options, { id: options.length + 1, value: "", selected: false }]);
   };
 
   const handleOptionChange = (id, value) => {
     setOptions((prev) =>
       prev.map((opt) => (opt.id === id ? { ...opt, value } : opt))
     );
   };
 
   const handleOptionSelect = (id) => {
     setOptions((prev) =>
       prev.map((opt) =>
         selectedQuestionType === "single"
           ? { ...opt, selected: opt.id === id }
           : { ...opt, selected: opt.id === id ? !opt.selected : opt.selected }
       )
     );
   };
 
   const validate = () => {
     let newErrors = {};
     if (!selectedQuestionType) newErrors.selectedQuestionType = "Please select a question type.";
     if (!question.trim()) newErrors.question = "Question cannot be empty.";
     if (!difficulty) newErrors.difficulty = "Please select a difficulty level.";
     if ((selectedQuestionType === "single" || selectedQuestionType === "multiple") && !options.some((opt) => opt.selected)) {
       newErrors.options = "Please select at least one correct option.";
     }
     if (selectedQuestionType === "true_false" && trueFalseAnswer === null) {
       newErrors.trueFalseAnswer = "Please select True or False.";
     }
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };
 
   const handleSubmit = (e) => {
     e.preventDefault();
     if (!validate()) return;
 
     const newQuestion = {
       type: selectedQuestionType,
       question,
       difficulty,
       marks,
       negativeMarks,
       options:
         selectedQuestionType === "true_false"
           ? [{ value: trueFalseAnswer, selected: true }]
           : options,
     };
 
     setQuestionsList([...questionsList, newQuestion]);
     setOpenModal(false);
     resetForm();
   };
 
   const resetForm = () => {
     setSelectedQuestionType("");
     setQuestion("");
     setDifficulty("");
     setMarks("");
     setNegativeMarks("");
     setTrueFalseAnswer(null);
     setOptions([{ id: 1, value: "", selected: false }]);
     setErrors({});
   };
 
   return (
     <>
       <h1 className="text-xl font-bold mb-4 a_heading" style={{ display: "inline-block" }}>Questions</h1>
       <button
         className="bg-blue-600 text-white px-5 py-2 rounded-md mt-3 a_button"
         onClick={() => setOpenModal(true)}
       >
         Add New Question
       </button>
 
       <div className="mt-6">
         {questionsList.length > 0 ? (
           <div className="border p-4 rounded-lg">
             <h2 className="text-lg font-semibold mb-2">Added Questions</h2>
             {questionsList.map((q, index) => (
               <div key={index} className="p-3 border-b last:border-0">
                 <p className="font-semibold">{q.question}</p>
                 <p className="text-sm text-gray-500">
                   Type: {q.type} | Difficulty: {q.difficulty} 
                 </p>
                 {q.options.map((opt, i) => (
                   <p key={i} className={opt.selected ? "text-green-600" : ""}>
                     {opt.selected ? "✔" : "✖"} {opt.value}
                   </p>
                 ))}
               </div>
             ))}
           </div>
         ) : (
           <p className="text-gray-500">No questions added yet.</p>
         )}
       </div>
 
       <div
         className={`fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50 transition-opacity duration-500 ease-in-out ${openModal ? "opacity-100 visible" : "opacity-0 invisible"}`}
         onClick={() => setOpenModal(false)}
       >
         <div
           className={`w-[30%] h-full bg-white shadow-lg p-6 rounded-l-lg transform transition-transform duration-500 ease-in-out ${openModal ? "translate-x-0" : "translate-x-full"} overflow-y-auto`}
           onClick={(e) => e.stopPropagation()}
         >
           <div className="flex justify-between items-center border-b pb-3">
             <h3 className="text-xl font-semibold">Add Question</h3>
             <button onClick={() => setOpenModal(false)} className="text-gray-500 hover:text-gray-700 text-lg">
               &times;
             </button>
           </div>
 
           <form onSubmit={handleSubmit} className="mt-4 space-y-4">
             <div>
               <Label htmlFor="question_type" value="Question Type" />
               <Select id="question_type" value={selectedQuestionType} onChange={(e) => setSelectedQuestionType(e.target.value)}>
                 <option value="">Select Question Type</option>
                 <option value="single">MCQ - Single Correct</option>
                 <option value="multiple">MCQ - Multiple Correct</option>
                 <option value="subjective">Subjective</option>
                 <option value="true_false">True/False</option>
               </Select>
               {errors.selectedQuestionType && <p className="text-red-500 text-sm">{errors.selectedQuestionType}</p>}
             </div>
 
             <div>
               <Label htmlFor="question" value="Question" />
               <Textarea id="question" rows={3} value={question} onChange={(e) => setQuestion(e.target.value)} />
               {errors.question && <p className="text-red-500 text-sm">{errors.question}</p>}
             </div>
 
             <div>
               <Label htmlFor="difficulty_level" value="Difficulty Level" />
               <div className="flex gap-2">
                 <Button className="a_button" color={difficulty === "easy" ? "green" : "gray"} onClick={() => setDifficulty("easy")}>Easy</Button>
                 <Button className="a_button" color={difficulty === "medium" ? "yellow" : "gray"} onClick={() => setDifficulty("medium")}>Medium</Button>
                 <Button className="a_button" color={difficulty === "hard" ? "red" : "gray"} onClick={() => setDifficulty("hard")}>Hard</Button>
               </div>
               {errors.difficulty && <p className="text-red-500 text-sm">{errors.difficulty}</p>}
             </div>
 
             {(selectedQuestionType === "single" || selectedQuestionType === "multiple") && (
               <div>
                 {options.map((opt) => (
                   <div key={opt.id} className="flex items-center gap-3 p-3 border rounded-lg">
                     <input
                       type={selectedQuestionType === "single" ? "radio" : "checkbox"}
                       checked={opt.selected}
                       onChange={() => handleOptionSelect(opt.id)}
                     />
                     <TextInput
                       value={opt.value}
                       onChange={(e) => handleOptionChange(opt.id, e.target.value)}
                       placeholder={`Option ${opt.id}`}
                     />
                   </div>
                 ))}
                 <Button color="gray" className="a_button mt-2" onClick={addOption}>Add Option</Button>
                 {errors.options && <p className="text-red-500 text-sm">{errors.options}</p>}
               </div>
             )}
 
             {selectedQuestionType === "true_false" && (
               <div className="flex gap-4">
                 <Button className="a_button" color={trueFalseAnswer === "true" ? "green" : "gray"} onClick={() => setTrueFalseAnswer("true")}>True</Button>
                 <Button className="a_button" color={trueFalseAnswer === "false" ? "red" : "gray"} onClick={() => setTrueFalseAnswer("false")}>False</Button>
                 {errors.trueFalseAnswer && <p className="text-red-500 text-sm">{errors.trueFalseAnswer}</p>}
               </div>
             )}
 
             <div>
               <Label htmlFor="marks" value="Marks" />
               <TextInput id="marks" value={marks} onChange={(e) => setMarks(e.target.value)} />
             </div>
 
             <div>
               <Label htmlFor="negative_marks" value="Negative Marks" />
               <TextInput id="negative_marks" value={negativeMarks} onChange={(e) => setNegativeMarks(e.target.value)} />
             </div>
 
            
 
             <Button color="blue" className="a_button" type="submit">Save Question</Button>
           </form>  
         </div>
       </div>
     </>
   );
}





