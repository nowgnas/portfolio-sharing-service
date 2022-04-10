import React, { useState, useEffect } from 'react';
import { Button, Form, Col, Row, Card } from 'react-bootstrap';
import * as Api from '../../api';

function ExportToPdf({ setIsPdf, user_id, saved }) {
  const [name, setName] = useState(saved?.savedName);
  const [email, setEmail] = useState(saved?.savedEmail);
  const [tel, setTel] = useState('');
  const [description, setDescription] = useState(saved?.savedDescription);

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  //핸드폰 번호가 000-000-0000 또는 000-0000-0000 형태인지 regex를 이용해 확인함.
  const validateTel = (tel) => {
    return tel.toLowerCase().match(/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/);
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  //위 validateTel 함수를 통해 핸드폰 형태 적합 여부를 확인함.
  const isEmailTel = validateTel(tel);

  //핸드폰 "-" 자동입력.
  useEffect(() => {
    if (tel.length > 3 && tel.length < 7) {
      setTel(tel.replace(/(\d{3})(\d{1})/, '$1-$2'));
    } else if (tel.length > 7 && tel.length < 11) {
      setTel(tel.replace(/(\d{3})(\d{1})/, '$1-$2'));
    } else if (tel.length === 13) {
      setTel(
        tel.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
      );
    }
  }, [tel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user_id);
    const response = await Api.post(
      `pdf/create/${user_id}`,
      {
        name,
        email,
        tel,
        description,
      },
      { responseType: 'blob' }
    );
    setIsPdf(false);
    //data를 임시 url로 변경
    const url = window.URL.createObjectURL(new Blob([response.data]));
    //임시 url을 a로 할당
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'resume.pdf'); //or any other extension
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Control
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isEmailValid && (
              <Form.Text className="text-success">
                이메일 형식이 올바르지 않습니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="tel">
            <Form.Control
              type="text"
              placeholder="핸드폰"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
            {!isEmailTel && (
              <Form.Text className="text-success">
                핸드폰 번호 형식이 올바르지 않습니다.
              </Form.Text>
            )}
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
              <Button variant="outline-danger" onClick={() => setIsPdf(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ExportToPdf;
