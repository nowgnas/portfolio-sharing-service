import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import CommentEditForm from "./CommentEditForm";
import * as Api from "../../api";

function CommentCard({
  portfolioOwnerId,
  currentUserId,
  comment,
  setCommentList,
  isEditable,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = portfolioOwnerId;
    await Api.delete(`deleteComment/${comment.id}`);
    const res = await Api.get("commentList", user_id);
    setCommentList(res.data);
  };
  return (
    <div className="mb-2 ms-3 mr-5">
      <div>
        {isEditing ? (
          <CommentEditForm
            portfolioOwnerId={portfolioOwnerId}
            currentUserId={currentUserId}
            comment={comment}
            setCommentList={setCommentList}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Card.Text>
            <div className="justify-content-between align-items-center mb-2 row">
              <div className="col">
                {comment.name}:{comment.content} <br />
              </div>
              <div className="col-5">
                {currentUserId === comment.commenter && (
                  <div style={{ display: "flex" }}>
                    <Button
                      style={{ margin: "auto" }}
                      variant="outline-dark"
                      size="sm"
                      onClick={() => {
                        setIsEditing(true);
                      }}
                    >
                      편집
                    </Button>

                    <Button
                      style={{ margin: "auto" }}
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      삭제
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card.Text>
        )}
      </div>
    </div>
  );
}

export default CommentCard;
