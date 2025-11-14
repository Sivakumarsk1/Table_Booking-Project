// Form handler chnage function's 

export const handleFormChange = (e, setFormData)=>{
    const {name, value} = e.target;
    setFormData((prevData)=>({
        ...prevData,
         [name]:value
    }));
} 
