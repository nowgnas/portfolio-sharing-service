import { Comment } from "../db";
import { v4 as uuidv4 } from "uuid";

class commentService {
  static async addComment({ commentTo, commenter, content, name }) {
    //   comment의 고유 id
    const id = uuidv4();
    const newComment = { commentTo, commenter, id, content, name };

    const addComment = await Comment.create({ newComment });
    return addComment;
  }

  static getAllComments({ commentTo }) {
    return Comment.findAllComment({ commentTo });
  }

  static deleteCommnet({ id, commenter }) {
    return Comment.delete({ id, commenter });
  }

  static async setComment({ id, update }) {
    let comment = await Comment.findById({ id });

    if (update.content) {
      const fieldToUpdate = "content";
      const newValue = update.content;
      comment = await Comment.update({ id, fieldToUpdate, newValue });
    }
    return comment;
  }
}

export { commentService };
