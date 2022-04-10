import React, { useState, useEffect } from 'react';
import * as Api from '../../api';
import { Button, Card } from 'react-bootstrap';
import EducationAddFrom from './EducationAddForm';
import EducationCard from './EducationCard';

function Education({ portfolioOwnerId, isEditable }) {
  const [isAddEducation, setIsAddEducation] = useState(false);
  const [educationlist, setEducationList] = useState([]);
  useEffect(() => {
    // "educationlist/유저id" 엔드포인트로 GET 요청을 하고, educationlist를 response의 data로 세팅함.
    Api.get('educationlist', portfolioOwnerId).then((res) =>
      setEducationList(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card className="mb-3 me-3">
      <Card.Body>
        <Card.Title className="comTitle">EDUCATION</Card.Title>

        {educationlist !== null ? (
          educationlist.map((education) => (
            <EducationCard
              key={education.id}
              portfolioOwnerId={portfolioOwnerId}
              education={education}
              setEducationList={setEducationList}
              isEditable={isEditable}
            />
          ))
        ) : (
          <></>
        )}
        {isAddEducation ? (
          <EducationAddFrom
            setIsAddEducation={setIsAddEducation}
            portfolioOwnerId={portfolioOwnerId}
            setEducationList={setEducationList}
          />
        ) : (
          <></>
        )}
        {isEditable && (
          <div className="mt-3 text-center mb-4 row">
            <div className="col-sm-20">
              <Button
                className="plus"
                variant="outline-dark"
                onClick={(e) => setIsAddEducation(true)}
              >
                +
              </Button>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
export default Education;
