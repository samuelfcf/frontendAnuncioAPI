import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Card, Table, ButtonGroup, Button } from "react-bootstrap";
import axios from "axios";

const AnnouncementeList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const history = useHistory();

  async function getAnnouncements() {
    await axios
      .get("http://localhost:8080/anuncios/")
      .then((response) => {
        const data = response.data;
        const announcement = data.content;

        setAnnouncements(announcement);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getAnnouncements();
  }, []);

  console.log(announcements);

  const deleteAnnouncement = (announcementID) => {
    axios
      .delete(`http://localhost:8080/anuncios/${announcementID}`)
      .then((response) => {
        if (response.data != null) {
          setAnnouncements(
            announcements.filter(
              (announcement) => announcement.id !== announcementID
            )
          );
        }
      });

    history.push("/");
  };

  return (
    <Card className={"border border-white bg-dark text-white"}>
      <Card.Header className={"card-header"}>Anúncios</Card.Header>
      <Card.Body>
        <Table bordered hover striped variant="dark">
          <thead>
            <tr>
              <th>Título</th>
              <th>Local</th>
              <th>Descrição</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            {announcements.map((announcement, index) => (
              <tr key={index}>
                <td className={"campos"}>{announcement.titulo}</td>
                <td className={"campos"}>{announcement.local}</td>
                <td id={"descricao"}>{announcement.descricao}</td>
                <td className={"campos"}>{announcement.data}</td>
                <td>
                  <ButtonGroup>
                    <Link to={{
                      pathname: `edit/${announcement.id}`,
                      state: {
                        titulo: announcement.titulo,
                        local: announcement.local,
                        descricao: announcement.descricao,
                        data: announcement.data
                      }
                    }}
                     className="btn btn-sm btn-outline-primary" 
                    
                     >
                      Editar
                    </Link>{" "}
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={deleteAnnouncement.bind(this, announcement.id)}
                    >
                      Deletar
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default AnnouncementeList;
