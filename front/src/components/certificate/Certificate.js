import React, { useState, useEffect } from 'react';
import * as Api from '../../api';
import { Button, Card } from 'react-bootstrap';
import CertificateAddForm from './CertificateAddForm';
import CertificateCard from './CertificateCard';

function Certificate({ portfolioOwnerId, isEditable }) {
  //isAddAward 항목 추가 상태를 결정
  const [isAddCertificate, setIsAddCertificate] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await Api.get(`certificatelist/${portfolioOwnerId}`);
      setUser(res.data);
    };
    fetch();
  }, [portfolioOwnerId]);

  return (
    <Card className="mb-3 me-3">
      <Card.Body>
        <Card.Title className="comTitle">CERTIFICATE</Card.Title>
        {user !== null &&
          user.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              portfolioOwnerId={portfolioOwnerId}
              certificate={certificate}
              setUser={setUser}
              isEditable={isEditable}
            />
          ))}
        {isAddCertificate && (
          <CertificateAddForm
            setIsAddCertificate={setIsAddCertificate}
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
                onClick={(e) => setIsAddCertificate(true)}
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
export default Certificate;
