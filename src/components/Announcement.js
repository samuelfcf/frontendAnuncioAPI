import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Card, Form, Button, Col} from 'react-bootstrap';
import axios from 'axios';

const initialState = {
  titulo: '',
  local: '',
  descricao: '',
  data: '',
  show: false
}

const AnnouncementForm = (props) => {

  const [fields, setFields] = useState(initialState);
  const history = useHistory();

  const resetAnnouncements = () => {
    setFields(initialState)
  }

  const announcementChange = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value
    });
  }


  const submitAnnouncement = (event) => {
    event.preventDefault();

    const data = fields.data;
    const dataFormat = data.split('-').reverse().join('/');

    const announcement = {
      titulo: fields.titulo,
      local: fields.local,
      descricao: fields.descricao,
      data: dataFormat.toString()
    }

    axios.post("http://localhost:8080/anuncios", announcement)
            .then(response => {
              if(response.data != null) {
                history.push("/")
              } 
            });
    setFields(initialState);
  }

  return (
    <Card className={"border border-dark bg-dark text-white"} id="teste">
      <Card.Header>
         Informações
      </Card.Header>
      <Form onReset={resetAnnouncements} onSubmit={submitAnnouncement} id="bookFormId">
          <Card.Body>
              <Form.Row>
                  <Form.Group as={Col} controlId="formGridTitle">
                      <Form.Label>Título</Form.Label>
                      <Form.Control required
                          autocomplete="off"
                          type="test" name="titulo"
                          value={fields.titulo}
                          onChange={announcementChange}
                          className={"bg-dark text-white"}
                          placeholder="Digite um título" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridAuthor">
                      <Form.Label>Local</Form.Label>
                      <Form.Control required
                          autoComplete="off"
                          type="test" name="local"
                          value={fields.local}
                          onChange={announcementChange}
                          className={"bg-dark text-white"}
                          placeholder="Digite o local" />
                  </Form.Group>
              </Form.Row>
              <Form.Row>
                  <Form.Group as={Col} controlId="formGridPrice">
                      <Form.Label>Description</Form.Label>
                      <Form.Control required
                          autoComplete="off"
                          type="test" as="textarea" name="descricao"
                          value= {fields.descricao}
                          onChange={announcementChange}
                          className={"bg-dark text-white"}
                          placeholder="Descrição" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridLanguage">
                      <Form.Label>Data</Form.Label>
                      <Form.Control required
                          type="date" name="data"
                          value={fields.data}
                          onChange={announcementChange}
                          className={"bg-dark text-white"}
                          placeholder="dd/mm/yyyy" />
                  </Form.Group>
              </Form.Row>
          </Card.Body>
          <Card.Footer style={{"textAlign":"right"}}>
              <Button size="sm" variant="success" type="submit">
                  Submit
              </Button>
          </Card.Footer>
      </Form>
</Card>
  );
};

export default AnnouncementForm;