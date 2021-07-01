import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {Card, Form, Button, Col} from 'react-bootstrap';
import axios from 'axios';


const AnnouncementeEditForm = (props) => {

  const [id] = useState(props.match.params.id);
  const [titulo, setTitulo] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const history = useHistory();

  async function getAnnouncements() {
    await axios
      .get(`http://localhost:8080/anuncios/${id}`)
      .then((response) => {
        const announcement = response.data;
        const dataAPI = announcement.data

        const dataFormatada = dataAPI.split('/').reverse().join('-');

        setTitulo(announcement.titulo);
        setLocal(announcement.local);
        setDescricao(announcement.descricao);
        setData(dataFormatada);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getAnnouncements();
  }, []);

  const editAnnouncement = (event) => {
    event.preventDefault();

    const tituloForm = titulo
    const localForm = local
    const descricaoForm = descricao
    const dataFormat = data.split('-').reverse().join('/');

    const announcement = {
        id: id,
        titulo: tituloForm,
        local: localForm,
        descricao: descricaoForm,
        data: dataFormat.toString()
    }

    axios.put(`http://localhost:8080/anuncios/${id}`, announcement).
          then(response => {
            if(response.data != null) {
              history.push("/"); 
            }
          })
  
  }


  return (
    <Card className={"border border-dark bg-dark text-white"} id="teste">
      <Card.Header>
         Editar Anúncio
      </Card.Header>
      <Form  id="bookFormId" onSubmit={editAnnouncement}>
          <Card.Body>
              <Form.Row>
                  <Form.Group as={Col} controlId="formGridTitle">
                      <Form.Label>Título</Form.Label>
                      <Form.Control required
                          autocomplete="off"
                          type="test" name="titulo"
                          value={titulo}
                          onChange={e => setTitulo(e.target.value)}
                          className={"bg-dark text-white"}
                          placeholder="Digite um título" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridAuthor">
                      <Form.Label>Local</Form.Label>
                      <Form.Control required
                          autoComplete="off"
                          type="test" name="local"
                          value={local}
                          onChange={e => setLocal(e.target.value)}
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
                          value={descricao}
                          onChange={e => setDescricao(e.target.value)}
                          className={"bg-dark text-white"}
                          placeholder="Descrição" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridLanguage">
                      <Form.Label>Data</Form.Label>
                      <Form.Control required
                          type="date" name="data"
                          value={data}
                          onChange={e => setData(e.target.value)}
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
  )
}

export default AnnouncementeEditForm