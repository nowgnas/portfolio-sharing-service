import { Card, Button, Col } from 'react-bootstrap';
import EducationEditForm from './EducationEditForm';
import { useState } from 'react';
import * as Api from '../../api';

function EducationCard({
  portfolioOwnerId,
  education,
  setEducationList,
  isEditable,
  admin,
}) {
  const currentId = education?.id;
  const school = education?.school;
  const major = education?.major;
  const position = education?.position;
  const current = { currentId, school, major, position };
  const [isEditing, setIsEditing] = useState(false);
  console.log(admin);
  const handleSubmit = async (e) => {
    //삭제 버튼을 누른 education의 id를 이용하여 삭제 요청을 보냄
    e.preventDefault();
    const user_id = portfolioOwnerId;
    await Api.delete(`educationDelete/${current?.currentId}`);
    const res = await Api.get('educationlist', user_id);
    setEducationList(res.data);
  };

  return (
    <div className="mb-2 ms-3 mr-5">
      <div>
        {isEditing ? (
          <EducationEditForm
            portfolioOwnerId={portfolioOwnerId}
            current={current}
            setEducationList={setEducationList}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Card.Text>
            <div className="justify-content-between align-items-center mb-2 row">
              <div className="col">
                <span className="main"># {school}</span> <br />
                <span className="sub text-muted">- {major}</span> <br />
                <span className="sub text-muted">- {position}</span>
              </div>
              {isEditable && (
                <Col className="text-center col-2">
                  <Button
                    style={{ marginRight: '10px' }}
                    variant="outline-dark"
                    onClick={() => setIsEditing(true)}
                  >
                    편집
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
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

export default EducationCard;
