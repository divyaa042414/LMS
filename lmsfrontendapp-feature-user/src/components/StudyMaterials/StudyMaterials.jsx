import React, { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function StudyMaterials() {
  const [openSectionModal, setOpenSectionModal] = useState(false);
   const [openCloneModal, setOpenCloneModal] = useState(false);
   const [openMaterialModal, setOpenMaterialModal] = useState(false);
   const [sections, setSections] = useState([]);
   const [selectedSection, setSelectedSection] = useState(null);
   const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
   const [newSection, setNewSection] = useState({ name: "", description: "", prerequisite: false });
   const navigate = useNavigate(); 

   // New state for Text/HTML Material
   const [textMaterial, setTextMaterial] = useState({ name: "", content: "" });
 
   useEffect(() => {
     const storedSections = JSON.parse(localStorage.getItem("sections")) || [];
     setSections(storedSections);
   }, []);
 
   function rowHandler(studymaterials){
    console.log(studymaterials);
    //navigate(`/routename/${course.id}`);
    console.log(studymaterials.id);
    
    navigate('/questionbank')
  }
   const handleChange = (e) => {
     const { name, value, type, checked } = e.target;
     setNewSection((prev) => ({
       ...prev,
       [name]: type === "checkbox" ? checked : value,
     }));
   };
 
   const handleSaveSection = () => {
     if (!newSection.name.trim()) return;
     const updatedSections = [...sections, { ...newSection, materials: [] }];
     setSections(updatedSections);
     localStorage.setItem("sections", JSON.stringify(updatedSections));
     setNewSection({ name: "", description: "", prerequisite: false });
     setOpenSectionModal(false);
   };
 
   const handleCloneSection = () => {
     if (selectedSection !== null) {
       const clonedSection = {
         ...sections[selectedSection],
         name: `${sections[selectedSection].name} (Copy)`,
       };
       const updatedSections = [...sections, clonedSection];
       setSections(updatedSections);
       localStorage.setItem("sections", JSON.stringify(updatedSections));
     }
     setOpenCloneModal(false);
   };
 
   const handleAddTextMaterial = () => {
     setTextMaterial({ name: "", content: "" });
     setOpenMaterialModal(true);
   };
 
   const handleSaveTextMaterial = () => {
     if (!textMaterial.name || !textMaterial.content || selectedSectionIndex === null) return;
     const updatedSections = [...sections];
     const section = updatedSections[selectedSectionIndex];
     section.materials = section.materials || [];
     section.materials.push({ type: "text", name: textMaterial.name, content: textMaterial.content });
     setSections(updatedSections);
     localStorage.setItem("sections", JSON.stringify(updatedSections));
     setOpenMaterialModal(false);
     setSelectedSectionIndex(null);
     setTextMaterial({ name: "", content: "" });
   };
 
   return (
     <div className="relative">
       <h1 className="m-5 text-lg font-bold">Create and Edit Your Study Material</h1>
 
       <div className="w-full flex justify-end p-4 space-x-4">
         <Button onClick={() => setOpenCloneModal(true)} className="bg-purple-600 hover:bg-purple-700">
           Clone Section
         </Button>
         <Button onClick={() => setOpenSectionModal(true)}>+ Add Section</Button>
       </div>
 
       {(openSectionModal || openCloneModal || openMaterialModal) && (
         <div
           className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 z-40"
           onClick={() => {
             setOpenSectionModal(false);
             setOpenCloneModal(false);
             setOpenMaterialModal(false);
             setSelectedSectionIndex(null);
           }}
         />
       )}
 
       {/* Add Section Drawer */}
       <div className={`fixed top-0 right-0 w-96 bg-white shadow-lg transition-transform duration-500 ease-in-out z-50 ${openSectionModal ? "translate-x-0" : "translate-x-full"}`}>
         <div className="p-6 flex justify-between items-center border-b">
           <h3 className="text-lg font-medium text-gray-900">Add New Section</h3>
           <button onClick={() => setOpenSectionModal(false)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">✖</button>
         </div>
         <div className="p-6 overflow-y-auto h-[90vh]">
           <Label htmlFor="sectionName" value="Section Name" />
           <TextInput id="sectionName" name="name" value={newSection.name} onChange={handleChange} placeholder="Section Name" required />
           <Label htmlFor="sectionDesc" value="Short Description" className="mt-2" />
           <Textarea id="sectionDesc" name="description" rows={2} value={newSection.description} onChange={handleChange} placeholder="Section description" />
           <div className="flex items-center space-x-2 mt-2">
             <Checkbox id="prerequisite" name="prerequisite" checked={newSection.prerequisite} onChange={handleChange} />
             <Label htmlFor="prerequisite">Make this a prerequisite</Label>
           </div>
           <div className="flex justify-end space-x-2 mt-3">
             <Button color="gray" onClick={() => setOpenSectionModal(false)}>Back</Button>
             <Button onClick={handleSaveSection}>Add Section</Button>
           </div>
         </div>
       </div>
 
       {/* Clone Section Drawer */}
       <div className={`fixed top-0 right-0 w-96 bg-white shadow-lg transition-transform duration-500 ease-in-out z-50 ${openCloneModal ? "translate-x-0" : "translate-x-full"}`}>
         <div className="p-6 flex justify-between items-center border-b">
           <h3 className="text-lg font-medium text-gray-900">Clone Section</h3>
           <button onClick={() => setOpenCloneModal(false)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">✖</button>
         </div>
         <div className="p-6 h-[90vh]">
           <Label htmlFor="cloneSelect" value="Select Section to Clone" />
           <select id="cloneSelect" className="w-full border p-2 rounded-lg" onChange={(e) => setSelectedSection(Number(e.target.value))}>
             <option value="" disabled selected>Choose a section</option>
             {sections.map((section, index) => (
               <option key={index} value={index}>{section.name}</option>
             ))}
           </select>
           <div className="flex justify-end space-x-2 mt-3">
             <Button color="gray" onClick={() => setOpenCloneModal(false)}>Cancel</Button>
             <Button onClick={handleCloneSection} disabled={selectedSection === null}>Clone Section</Button>
           </div>
         </div>
       </div>
 
       {/* Accordion for Sections */}
       <Accordion collapseAll className="m-6">
         {sections.length > 0 ? sections.map((section, index) => (
           <AccordionPanel key={index}>
             <div className="flex justify-between items-center w-full">
               <AccordionTitle className="w-3/4">{section.name}</AccordionTitle>
               <Button size="xs" color="blue" onClick={() => {
                 setSelectedSectionIndex(index);
                 handleAddTextMaterial();
               }}>
                 + Add Material
               </Button>
             </div>
             <AccordionContent style={{cursor:"pointer"}} onClick={()=>rowHandler(section)}>
               <p>{section.description}</p>
               {section.materials?.length > 0 && (
                 <div className="mt-4 space-y-2">
                   <h4 className="font-semibold text-gray-800">Materials:</h4>
                   {section.materials.map((mat, i) => (
                     <div key={i} className="p-2 border border-gray-200 rounded bg-gray-50 text-sm">
                       {mat.name && <strong className="block mb-1">{mat.name}</strong>}
                       {mat.type === "text" && (
                         <div dangerouslySetInnerHTML={{ __html: mat.content }} />
                       )}
                     </div>
                   ))}
                 </div>
               )}
             </AccordionContent>
           </AccordionPanel>
         )) : (
           <p className="text-gray-500 p-6">No sections added yet.</p>
         )}
       </Accordion>
 
       {/* Add Material Drawer */}
       <div className={`fixed top-0 right-0 w-96 bg-white shadow-lg transition-transform duration-700 ease-in-out z-50 ${openMaterialModal ? "translate-x-0" : "translate-x-full"}`}>
         <div className="p-6 flex justify-between items-center border-b">
           <h3 className="text-lg font-medium text-gray-900">Add Text/HTML Material</h3>
           <button onClick={() => {
             setOpenMaterialModal(false);
             setSelectedSectionIndex(null);
           }} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">✖</button>
         </div>
         <div className="p-6 overflow-y-auto h-[90vh]">
           <Label htmlFor="materialName" value="Material Name" />
           <TextInput
             id="materialName"
             name="materialName"
             placeholder="Enter material name"
             value={textMaterial.name}
             onChange={(e) => setTextMaterial((prev) => ({ ...prev, name: e.target.value }))}
             className="mb-4"
           />
           <Label htmlFor="materialContent" value="Material Content (HTML/Text)" />
           <Textarea
             id="materialContent"
             rows={6}
             name="materialContent"
             placeholder="Enter HTML or plain text content"
             value={textMaterial.content}
             onChange={(e) => setTextMaterial((prev) => ({ ...prev, content: e.target.value }))}
           />
           <div className="flex justify-end mt-4 space-x-2">
             <Button color="gray" onClick={() => {
               setOpenMaterialModal(false);
               setSelectedSectionIndex(null);
             }}>
               Cancel
             </Button>
             <Button onClick={handleSaveTextMaterial} disabled={!textMaterial.name || !textMaterial.content}>
               Save Material
             </Button>
           </div>
         </div>
       </div>
     </div>
   );
}

export default StudyMaterials;
