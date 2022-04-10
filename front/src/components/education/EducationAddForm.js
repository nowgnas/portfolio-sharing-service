import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function EducationAddFrom({
  setIsAddEducation,
  portfolioOwnerId,
  setEducationList,
}) {
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [position, setPosition] = useState('재학중');

  const handleChange = (event) => {
    setPosition(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = portfolioOwnerId;
    await Api.post(`education/create`, {
      user_id,
      school,
      major,
      position,
    });
    // 유저 정보는 response의 data임.
    // 해당 유저 정보로 user을 세팅함.
    const res = await Api.get('educationlist', user_id);
    setEducationList(res.data);
    console.log(res.data);
    // isEditing을 false로 세팅함.
    setIsAddEducation(false);
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
          <Button
            variant="outline-danger"
            onClick={() => setIsAddEducation(false)}
          >
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationAddFrom;
