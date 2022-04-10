import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

function AwardEditForm({ portfolioOwnerId, current, setUser, setIsEditing }) {
  const [title, setTitle] = useState(current?.title);
  const [description, setDescription] = useState(current?.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = portfolioOwnerId;
    await Api.put(`awards/${current.currentId}`, {
      user_id,
      title,
      description,
    });
    const res = await Api.get('awardlist', user_id);
    setUser(res.data);
    console.log(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title" className="mb-3">
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Control
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="outline-success" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="outline-danger" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardEditForm;
