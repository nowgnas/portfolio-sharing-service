import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ProjectAddFrom({ setIsAddProject, portfolioOwnerId, setProjectList }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectStart, setProjectStart] = useState(new Date());
  const [projectEnd, setProjectEnd] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = portfolioOwnerId;
    const from_data = projectStart.toISOString().split('T')[0];
    const to_data = projectEnd.toISOString().split('T')[0];

    await Api.post(`project/create`, {
      user_id,
      title,
      description,
      from_data,
      to_data,
    });
    // 프로젝트 정보는 response의 data임.
    // 해당 프로젝트 정보로 education을 세팅함.
    const res = await Api.get('projectlist', user_id);
    setProjectList(res.data);
    console.log(res.data);
    // isEditing을 false로 세팅함.
    setIsAddProject(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
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

      <Form.Group controlId="projectBody" className="mt-3 row">
        <Form.Group className="col-auto">
          <DatePicker
            selected={projectStart}
            onChange={(date) => setProjectStart(date)}
          />
        </Form.Group>
        <Form.Group className="col-auto">
          <DatePicker
            selected={projectEnd}
            onChange={(date) => setProjectEnd(date)}
          />
        </Form.Group>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="outline-success" type="submit" className="me-3">
            확인
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => setIsAddProject(false)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectAddFrom;
