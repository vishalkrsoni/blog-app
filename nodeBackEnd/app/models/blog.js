
const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;


const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: [
      {
        type: String,
        required: true,
      },
    ],
    createdBy: {
      type: ObjectId,
      ref: "User",
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamps: true }
);

module.exports = model("Blog", BlogSchema);
