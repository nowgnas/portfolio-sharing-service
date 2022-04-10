import { Card, Button, Col } from 'react-bootstrap';
import AwardEditForm from './AwardEditForm';
import { useState } from 'react';
import * as Api from '../../api';

function AwardCard({ portfolioOwnerId, award, setUser, isEditable }) {
  const currentId = award?.id;
  const title = award?.title;
  const description = award?.description;
  const current = { currentId, title, description };
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await Api.delete('awardDelete', award?.id);
      setUser((current) => {
        const deleted = current.filter((e) => e.id !== award.id);
        return deleted;
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mb-2 ms-3 mr-5">
      <div>
        {isEditing ? (
          <AwardEditForm
            portfolioOwnerId={portfolioOwnerId}
            current={current}
            setUser={setUser}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Card.Text>
            <div className="justify-content-between align-items-center mb-2 row">
              <Col>
                <span className="main"># {title}</span> <br />
                <span className="sub text-muted ">- {description}</span>
              </Col>
              {isEditable && (
                <Col className="text-center col-2">
                  <Button
                    variant="outline-dark"
                    onClick={() => setIsEditing(true)}
                  >
                    편집
                  </Button>
                  <Button variant="secondary" onClick={handleDelete}>
                    삭제
                  </Button>
                </Col>
              )}
            </div>
          </Card.Text>
        )}
      </div>
    </div>
  );
}

export default AwardCard;
