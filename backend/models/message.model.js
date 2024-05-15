import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: function() {
      return this.type === 'text';
    },
  },
  type: {
    type: String,
    enum: ['text', 'image'],
    default: 'text',
  },
  content: {
    type: String, // Will store base64 for images
    required: function() {
      return this.type === 'image';
    },
  },
  mimeType: {
    type: String,
    required: function() {
      return this.type === 'image';
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;




//old code reference
// import mongoose from 'mongoose';

// const messageSchema = new mongoose.Schema({
//     senderId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     receiverId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     message: {
//         type: String,
//         required: true
//     }
//     // createdAt, updatedAt
// }, {timestamps: true});

// const Message = mongoose.model('Message', messageSchema);

// export default Message;