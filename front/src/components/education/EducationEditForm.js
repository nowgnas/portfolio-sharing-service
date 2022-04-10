import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function EducationEditFrom({
  portfolioOwnerId,
  current,
  setEducationList,
  setIsEditing,
}) {
  const [school, setSchool] = useState(current?.school);
  const [major, setMajor] = useState(current?.major);
  const [position, setPosition] = useState(current?.position);

  const handleChange = (event) => {
    setPosition(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = portfolioOwnerId;
    //id를 이용하여 수정 요청을 보냄
    await Api.put(`educations/${current.currentId}`, {
      user_id,
      school,
      major,
      position,
    });
    // 프로젝트 정보는 response의 data임.
    const res = await Api.get('educationlist', user_id);
    setEducationList(res.data);
    console.log(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="school">
        <Form.Control
          type="text"
          placeholder="학교 이름"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="major" className="mt-3">
        <Form.Control
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <FormControl className="mb-3 mt-3">
        <RadioGroup
          aria-labelledby="demo-row-controlled-radio-buttons-group"
          row
          name="controlled-radio-buttons-group"
          value={position}
          onChange={handleChange}
        >
          <FormControlLabel value="재학중" control={<Radio />} label="재학중" />
          <FormControlLabel
            value="학사졸업"
            control={<Radio />}
            label="학사졸업"
          />
          <FormControlLabel
            value="석사졸업"
            control={<Radio />}
            label="석사졸업"
          />
          <FormControlLabel
            value="박사졸업"
            control={<Radio />}
            label="박사졸업"
          />
        </RadioGroup>
      </FormControl>

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

export default EducationEditFrom;
