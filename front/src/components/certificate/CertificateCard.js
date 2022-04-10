import { Card, Button, Col } from 'react-bootstrap';
import CertificateEditForm from './CertificateEditForm';
import { useState } from 'react';
import * as Api from '../../api';

function CertificateCard({
  portfolioOwnerId,
  certificate,
  setUser,
  isEditable,
}) {
  const currentId = certificate?.id;
  const title = certificate?.title;
  const description = certificate?.description;
  const date = certificate?.date;
  const current = { currentId, title, description, date };
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await Api.delete('certificates', certificate?.id);
      setUser((current) => {
        const deleted = current.filter((e) => e.id !== certificate.id);
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
          <CertificateEditForm
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
                <span className="sub text-muted">- {description}</span> <br />
                <span className="sub text-muted">
                  - {date.substring(0, 10)}
                </span>
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

export default CertificateCard;
