const mongoose =require("mongoose");

const messageSchema = new mongoose.Schema({
      text: {
        type: String,
        require: true,
      },
      users: {
        type: [String], // Define it as an array of strings
        default: [],   // Optional: set a default value (empty array)
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
      },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Messages", messageSchema)