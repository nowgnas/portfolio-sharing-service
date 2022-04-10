import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CertificateAddForm({
  setIsAddCertificate,
  portfolioOwnerId,
  setUser,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = portfolioOwnerId;
    try {
      // post요청
      await Api.post(`certificate/create`, {
        user_id,
        title,
        description,
        date,
      });
      // "certificatelist"에서 certificates 목록 다시 받아옴
      await Api.get('certificatelist', portfolioOwnerId).then((res) =>
        setUser(res.data)
      );
      // isEditing을 false로 세팅함.
      setIsAddCertificate(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="자격증"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="description" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="date" className="mt-3">
        <DatePicker selected={date} onChange={(e) => setDate(e)} />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="outline-success" type="submit" className="me-3">
            확인
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => setIsAddCertificate(false)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CertificateAddForm;
