import path from 'path';
import fs from 'fs';
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { getReceiverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
  try {
    const { type } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let content, mimeType, message;

    if (type === 'image' && req.file) {
      const imgPath = path.resolve(req.file.path);
      const imgData = fs.readFileSync(imgPath);
      content = imgData.toString('base64');
      mimeType = req.file.mimetype;
      fs.unlinkSync(imgPath);
    } else if (type === 'text' && req.body.message) {
      message = req.body.message;
    }

    // Validate required fields
    if ((!message && type === 'text') || (!content && type === 'image')) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      type,
      content,
      mimeType,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // This will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY STARTS HERE
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // io.to(<socket_id).emit() used to send events to specifc client
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log('Error in sendMessage controller: ', error.message);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [userToChatId, senderId] },
    }).populate('messages');

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log('Error in getMessages controller: ', error.message);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};


export default getMessages;

//old code reference //
// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// export const sendMessage = async (req, res) => {
//     try {
//         const {message} = req.body;
//         const {id:receiverId} = req.params;
//         const senderId = req.user._id

//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderId, receiverId]},
//         });

//         if(!conversation) {
//             conversation = await Conversation.create({
//                 participants: [senderId, receiverId]
//             });
//         }

//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             message
//         });

//         if (newMessage) {
//             conversation.messages.push(newMessage._id);
//         }
//         // await conversation.save();
//         // await newMessage.save();

//         //This will run in parallel
//         await Promise.all([conversation.save(), newMessage.save()]);


//         // SOCKET IO FUNCTIONALITY STARTS HERE
//         const receiverSocketId = getReceiverSocketId (receiverId);
//         if(receiverSocketId) {
//             // io.to(<socket_id).emit() used to send events to specifc client
//             io.to(receiverSocketId).emit("newMessage", newMessage);
//         }


//         res.status(201).json(newMessage);
//     } catch (error) {
//         console.log("Error in sendMessage controller: ", error.message)
//         res.status(500).json({
//             error: "Internal Server Error"
//         });
//     }
// }

// export const getMessages = async (req, res) => {
//     try {
//         const {id:userToChatId} = req.params;
//         const senderId = req.user._id;

//         const converstation = await Conversation.findOne({
//             participants: { $all: [userToChatId, senderId] }
//         }).populate("messages");

//         if(!converstation) return res.status(200).json([]);

//         const messages = converstation.messages;

//         res.status(200).json(messages);

//     } catch (error) {
//         console.log("Error in sendMessage controller: ", error.message)
//         res.status(500).json({
//             error: "Internal Server Error"
//         })
//     }
// }