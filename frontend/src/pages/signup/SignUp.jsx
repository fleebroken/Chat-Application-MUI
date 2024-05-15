import { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import { Box, Button, TextField } from "@mui/material";

const SignUp = () => {
    const [inputs,setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    });

const {loading, signup} = useSignup()

const handleCheckboxChange = (gender) => {
    setInputs({...inputs,gender})
}

const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    }

  
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
                Sign Up 
                {/* <span className="text-blue-500">Chat App</span> */}
            </h1>
                <Box 
                    onSubmit={handleSubmit}
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { mt: 1, width: '100%'},
                        '& .MuiInputLabel-root': { color: "white" },
                        '& .MuiInputBase-input': { color: 'white' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField 
                            id ="outlined-basic" 
                            label = "Full Name"
                            value={inputs.fullName}
                            onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <TextField 
                            id ="outlined-basic" 
                            label = "Username"
                            value={inputs.username}
                            onChange={(e) => setInputs({...inputs, username: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <TextField 
                            id ="outlined-basic" 
                            label = "Password"
                            value={inputs.password}
                            type="password"
                            onChange={(e) => setInputs({...inputs, password: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <TextField 
                            id ="outlined-basic" 
                            label = "Confirm Password"
                            value={inputs.confirmPassword}
                            type="password"
                            onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
                            required
                        />
                    </div>

                                    {/* GENDER CHECKBOX GOES HERE */}
                <GenderCheckbox onCheckboxChange = {handleCheckboxChange} selectedGender = {inputs.gender} />
                    <Link 
                    to={"/login"} 
                    className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white">
                        Already have an account?
                    </Link>
                    <div>
                        <Button 
                            type="submit"
                            variant="contained"
                            sx={{ borderRadius: "20em", margin: 'auto', mt: 2, display: 'block', padding: '.2rem 3em'}}
                            disabled={loading}
                        >
                            {loading ? <span className="loading loading-spinner"></span>  : "Sign Up"}
                        </Button>
                    </div>
                </Box>

        </div>
    </div>
  )
}

export default SignUp;