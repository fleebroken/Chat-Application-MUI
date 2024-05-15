import { useState } from "react";
import { BsImage, BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { Button, Box, TextField } from "@mui/material";
import { IoMdCloseCircle } from "react-icons/io";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const { loading, sendMessage, sendImageMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !image) return;

    if (image) {
      await sendImageMessage(image);
      setImage(null);
      setImagePreview("");
    } else {
      const formData = new FormData();
      formData.append("type", "text");
      formData.append("message", message);
      await sendMessage(formData);
    }

    setMessage("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setImagePreview("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': { m: 0, p: 1, width: '100%' },
        '& .MuiInputLabel-root': { color: "white" },
        '& .MuiInputBase-input': { color: 'white' },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
            borderRadius: '20em'
          },
        }
      }}
    >
      <div className="w-full relative">
        <TextField
          id="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message ..."
          sx={{
            '& input': { color: 'white' },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputBase-root' : {backgroundColor: 'rgba(228, 230, 235, 0.2)', borderRadius: '20em'}
          }}
          InputProps={{
            endAdornment: (
              <>
                {/* {imagePreview && (
                  <div className="relative">

                  </div>
                )} */}
                <Button
                  component="label"
                  className="flex items-center p-1"
                  sx={{ minWidth: 0 }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                  />
                  <BsImage />
                </Button>
                <Button
                  type="submit"
                  className="flex items-center p-1"
                  disabled={loading}
                  sx={{ minWidth: 0 }}
                >
                  {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
                </Button>
              </>
            ),
            startAdornment: imagePreview && (
              <>
              <img
                src={imagePreview}
                alt="Selected"
                style={{ maxHeight: '50px', marginRight: '10px' }}
              />
              <button
              onClick={handleImageRemove}
              style={{ transform: "translate(0%, -50%)" }}
            >
              <IoMdCloseCircle />
            </button>
            </>
            )
          }}
        />
      </div>
    </Box>
  );
};

export default MessageInput;









// old code reference
// import { useState } from "react";
// import {BsImage, BsSend} from "react-icons/bs";
// import useSendMessage from "../../hooks/useSendMessage";
// import { Button, Box, TextField } from "@mui/material";

// const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const {loading, sendMessage} = useSendMessage ();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if(!message) return;
//     await sendMessage(message);
//     setMessage("");
//   };
  
//   // Function to handle file upload
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0]; // Get the selected file
//     if (file) {
//       // Do something with the selected file
//       console.log("Selected file:", file);
//     }
//   };
  
//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{
//         '& .MuiTextField-root': { m: 0, p: 1, width: '100%'},
//         '& .MuiInputLabel-root': { color: "white" },
//         '& .MuiInputBase-input': { color: 'white' },  
//         '& .MuiOutlinedInput-root': {
//           '& fieldset': {
//             borderColor: 'white',
//             borderRadius: '20em'
//           },
//         }     
//       }}
//     >
//       <div className="w-full relative ">
//         <TextField
//           id="outlined"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Send a message ..."
//           sx={{
//             '& input': { color: 'white' },
//             '& .MuiInputLabel-root': { color: 'white' },
//           }}
//           InputProps={{
//             endAdornment: (
//               <>
//                 <Button
//                   component="label" 
//                   className="flex items-center p-1"
//                   sx={{minWidth: 0}}
//                 >
//                   <input
//                     type="file"
//                     accept="image/*"
//                     style={{ display: "none" }} 
//                     onChange={handleFileUpload} 
//                   />
//                   <BsImage />
//                 </Button>
//                 <Button 
//                   type="submit"
//                   className="flex items-center p-1"
//                   disabled={loading}
//                   sx={{ minWidth: 0 }}
//                 >
//                   {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
//                 </Button>
//               </>
//             )
//           }}
//         />
//       </div>
//     </Box>
//   );
// }

// export default MessageInput;
