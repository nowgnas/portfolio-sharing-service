import { Router } from "express";

import { commentService } from "../services/commentService";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";

const commentRouter = Router();

commentRouter.post(
  // 새 댓글 추가하기
  "/comment/create/:user_id",
  login_required,
  async (req, res, next) => {
    // 댓글을 받을 사람
    const commentTo = req.params.user_id;
    // 로그인한 사람
    const commenter = req.currentUserId;
    const content = req.body.content;

    const userName = await userAuthService.getUserInfo({ user_id: commenter });

    const newComment = await commentService.addComment({
      name: userName.name,
      commentTo,
      commenter,
      content,
    });

    if (newComment.errorMessage) {
      throw new Error(newComment.errorMessage);
    }

    res.status(201).json(newComment);
  }
);

commentRouter.get(
  // comment를 받는 사람 기준으로 모든 댓글 조회하기
  "/commentList/:user_id",
  login_required,
  async (req, res, next) => {
    try {
      const commentTo = req.params.user_id;

      const commentList = await commentService.getAllComments({
        commentTo,
      });

      if (commentList.errorMessage) {
        throw new Error(commentList.errorMessage);
      }

      res.status(200).json(commentList);
    } catch (error) {
      next(error);
    }
  }
);

commentRouter.delete(
  // 댓글을 단 사람과 해당 댓글의 id를 이용해서 삭제
  "/deleteComment/:id",
  login_required,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const commenter = req.currentUserId;

      const del = await commentService.deleteCommnet({ id, commenter });

      if (del.errorMessage) {
        throw new Error(del.errorMessage);
      }

      res.status(200).json({ status: "succ" });
    } catch (error) {
      next(error);
    }
  }
);

commentRouter.put("/comment/:id", login_required, async (req, res, next) => {
  try {
    const id = req.params.id;
    const content = req.body.content ?? null;

    const updateComment = await commentService.setComment({
      id,
      update: { content },
    });

    if (updateComment.errorMessage) {
      throw new Error(updateComment.errorMessage);
    }

    res.status(200).json(updateComment);
  } catch (error) {
    next(error);
  }
});
export { commentRouter };
