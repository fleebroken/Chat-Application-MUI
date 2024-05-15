import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";


const GenderCheckbox = ({onCheckboxChange, selectedGender}) => {
  return (
        <div className="flex text-white">
            <FormGroup>
            <FormControlLabel 
            label="Male" 
            className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected": ""}`}
            control={<Checkbox 
                    checked={selectedGender === "male"} 
                    onChange={() => onCheckboxChange("male")}
                     />} 
            
            />
            </FormGroup>
            <FormGroup>
            <FormControlLabel 
            label="Female" 
            className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected": ""}`}
            control={<Checkbox 
                    checked={selectedGender === "female"} 
                    onChange={() => onCheckboxChange("female")}
                     />} 
            
            />
            </FormGroup>


        </div>
  );
};

export default GenderCheckbox;