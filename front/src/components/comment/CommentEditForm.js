import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function CommentEditForm({
  portfolioOwnerId,
  currentUserId,
  comment,
  setCommentList,
  setIsEditing,
}) {
  const [content, setContent] = useState(comment?.content);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = portfolioOwnerId;
    console.log(comment.id);
    await Api.put(`comment/${comment.id}`, {
      commentTo: user_id,
      commenter: currentUserId,
      content,
    });
    // 유저 정보는 response의 data임.
    const res = await Api.get("commentList", user_id);
    setCommentList(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="댓글을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="outline-success" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="outline-danger" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CommentEditForm;
