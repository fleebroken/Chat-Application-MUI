import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {loading, login} = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login (username, password)
    }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
            <h1 className="text-3xl font-semibold text-center text-gray-300">
                Login
            {/* <span className="text-blue-500"> Chat App </span> */}
            </h1>

        <Box onSubmit={handleSubmit}
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
                    id="outlined-username"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </div>
            <div>
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />                    
            </div>
            <Link 
                to="/signup" 
                className="text-sm hover-underline hover:text-blue-600 mt-3 mb-4 inline-block text-white">
                    {"Don't"} have an account?
                </Link>
                <div>
                    <Button 
                    type="submit"
                    variant="contained"
                    // className="btn btn-block btn-sm mt-2"
                    sx={{ borderRadius: "20em", margin: 'auto', display: 'block', padding: '.2rem 3em'}}
                    disabled={loading}
                >
                    {loading ? <span className="loading loading-spinner"></span> : "Login"}
                </Button>

                </div>
        </Box>





        </div>
    </div>
  );
};

export default Login;

