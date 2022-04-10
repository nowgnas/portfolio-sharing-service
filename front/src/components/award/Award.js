import React, { useState, useEffect } from 'react';
import * as Api from '../../api';
import { Button, Card } from 'react-bootstrap';
import AwardAddForm from './AwardAddForm';
import AwardCard from './AwardCard';

function Award({ portfolioOwnerId, isEditable }) {
  const [isAddAward, setIsAddAward] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get('awardlist', portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card className="mb-3 me-3">
      <Card.Body>
        <Card.Title className="comTitle">AWARDS</Card.Title>
        {user !== null &&
          user.map((award) => (
            <AwardCard
              key={award.id}
              portfolioOwnerId={portfolioOwnerId}
              award={award}
              setUser={setUser}
              isEditable={isEditable}
            />
          ))}
        {isAddAward && (
          <AwardAddForm
            setIsAddAward={setIsAddAward}
            portfolioOwnerId={portfolioOwnerId}
            setUser={setUser}
          />
        )}
        {isEditable && (
          <div className="mt-3 text-center mb-4 row">
            <div className="col-sm-20">
              <Button
                className="plus"
                variant="dark"
                onClick={(e) => setIsAddAward(true)}
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
export default Award;
