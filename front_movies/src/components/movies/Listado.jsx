import React from "react";

import Container from "react-bootstrap/Container";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import AddDataModal from "./AddDataModal";
import EditDataModal from "./EditDataModal";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { faStar } from '@fortawesome/free-solid-svg-icons'

class Listado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      allData: [],
      originalMovies: [],
      modalShow: false,
    };
    this.searchMovie = this.searchMovie.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData() {
    axios({
      url: "http://localhost:4000/graphql",
      method: "post",
      data: {
        query: `
          query movies {
            movies {
              id,
              title,
              year,
              image,
              score
            }
            }
          `,
      },
    }).then((result) => {
      this.setState({
        movies: result.data.data.movies,
        originalMovies: result.data.data.movies,
      });
    });
  }

  componentDidMount() {
    this.getData();
  }

  removeProduct(id) {
    const body = {
      query: `
      mutation deleteMovie($id: Int!) {
        deleteMovie(id :  $id ) 
      }
            `,
      variables: {
        id: id,
      },
    };

    axios
      .post(`http://localhost:4000/graphql`, body)
      .catch((err) => {
        console.error(err.data);
      })
      .then((res) => {
        this.getData();
        console.log(res.data);
      });

    console.log("hola mundo", id);
  }

  handleOnChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let fillValue = value;

    if (fillValue === "") {
      this.setState({ movies: this.state.originalMovies });
    }
    this.setState((prevState) => ({
      allData: {
        // object that we want to update
        ...prevState.allData, // keep all other key-value pairs
        [name]: fillValue, // update the value of specific key
      },
    }));
  }

  searchMovie(e) {
    let results = this.state.movies.filter((element) => {
      let upper = element.title.toLowerCase();
      let dataMovieText = this.state.allData.movie_input.toLowerCase();

      let upper2 = upper.replace(/\s/g, "");
      let dataMovieText2 = dataMovieText.replace(/\s/g, "");
      if (upper2 === dataMovieText2) {
        return element;
      }
      if (upper.includes(dataMovieText) === true) {
        return element;
      }
      return null;
    });
    if (results.length >= 1) {
      this.setState({ movies: results });
    }
  }

  render() {
    return (
      <Container>
        <Row style={{ marginBottom: "20px" }}>
          <Col sm="3"></Col>
          <Col sm="6">
            <Form.Group>
              <br />
              <Form.Control
                type="text"
                name="movie_input"
                placeholder="Search your favorite movie"
                onChange={(e) => {
                  this.handleOnChange(e);
                }}
              />
            </Form.Group>
            <Button
              style={{ marginRight: "14px" }}
              variant="primary"
              onClick={(e) => {
                this.searchMovie(e);
              }}
            >
              Search
            </Button>
            <AddDataModal showUp={this.state.modalShow} />
          </Col>
          <Col sm="3"></Col>
        </Row>

        <Row>
          {this.state.movies.map(function (item, i) {
            return (
              <Col sm="4" key={item.id}>
                <Card style={{ width: "18rem", marginBottom: "40px" }}>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Link to={{ pathname: `detalle/${item.id}` }}>
                      <Card.Text style={{ fontSize: 13 }}>
                        <strong style= {{ marginRight: "5px" }}>{item.title}</strong>
                    <span>
                      Score: 
                      {item.score}
                    < FontAwesomeIcon icon={faStar} />
                    </span>
                      </Card.Text>
                      <div>Year: {item.year}</div>
                    </Link>
                    <br />
                    <Button
                      style={{ marginRight: "14px" }}
                      variant="danger"
                      onClick={() => {
                        this.removeProduct(item.id);
                      }}
                    >
                      Delete Movie
                    </Button>
                    <EditDataModal data={item} />
                  </Card.Body>
                </Card>
              </Col>
            );
          }, this)}
        </Row>
      </Container>
    );
  }
}

export default Listado;
