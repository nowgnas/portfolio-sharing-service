import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    commentTo: {
      type: String,
      required: true,
    },
    commenter: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommnetModel = model("Comment", CommentSchema);
export { CommnetModel };
