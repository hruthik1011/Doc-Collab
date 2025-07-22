// require('dotenv').config(); 
// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("MongoDB connected successfully");
// }).catch((err) => {
//     console.error("MongoDB connection error:", err);
// });

// const docSchema = mongoose.Schema({
//   title: String,
//   content: {
//     type: String,
//     default: ""
//   },
//   uploadedBy: String,
//   date: {
//     type: Date,
//     default: Date.now
//   },
//   lastUpdate: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Document', docSchema);

const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  title: String,
  content: {
    type: String,
    default: ""
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collaborators: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    accessLevel: {
      type: String,
      enum: ['viewer', 'editor'],
      default: 'viewer'
    }
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  lastEditedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Document', docSchema);