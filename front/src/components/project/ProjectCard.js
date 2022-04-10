import { Card, Button, Col } from 'react-bootstrap';
import ProjectEditForm from './ProjectEditForm';
import { useState } from 'react';
import * as Api from '../../api';

function ProjectCard({
  portfolioOwnerId,
  project,
  setProjectList,
  isEditable,
}) {
  const currentId = project?._id;
  const title = project?.title;
  const description = project?.description;
  const from_data = project?.from_data;
  const to_data = project?.to_data;
  const current = { currentId, title, description, from_data, to_data };
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e) => {
    //삭제 버튼을 누른 education의 id를 이용하여 삭제 요청을 보냄
    e.preventDefault();
    const user_id = portfolioOwnerId;
    await Api.delete(`projects/${current?.currentId}/delete`);
    const res = await Api.get('projectlist', user_id);
    setProjectList(res.data);
  };

  return (
    <div className="mb-2 ms-3 mr-5">
      <div>
        {isEditing ? (
          <ProjectEditForm
            portfolioOwnerId={portfolioOwnerId}
            current={current}
            setProjectList={setProjectList}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Card.Text>
            <div className="justify-content-between align-items-center mb-2 row">
              <div className="col">
                <span className="main"># {title}</span> <br />
                <span className="sub text-muted">- {description}</span> <br />
                <span className="sub text-muted">
                  - {from_data}~{to_data}
                </span>
              </div>
              {isEditable && (
                <Col className="text-center col-2">
                  <Button
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

export default ProjectCard;
