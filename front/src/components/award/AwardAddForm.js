import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

function AwardAddForm({ setIsAddAward, portfolioOwnerId, setUser }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = portfolioOwnerId;
    await Api.post(`award/create`, {
      user_id,
      title,
      description,
    });

    const res = await Api.get('awardlist', user_id);
    setUser(res.data);
    console.log(res.data);
    // isEditing을 false로 세팅함.
    setIsAddAward(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="outline-success" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="outline-danger" onClick={() => setIsAddAward(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardAddForm;
