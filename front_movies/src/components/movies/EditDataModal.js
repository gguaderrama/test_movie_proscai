import React, { useState } from 'react';
import {Modal, Button } from "react-bootstrap"
import { Form, Field } from 'react-final-form'
import axios from 'axios'


const EditDataModal = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const save = async values => {
      const body = {
        query: `
        mutation updateMovie($input: MovieUpdateInput!, $id: Int!) {
          updateMovie(input: $input, id :  $id ) 
        }
      `,
        variables: {
            "input": {
              "title": values.title,
              "year": parseInt(values.year),
              "image": values.image,
              "score": parseInt(values.score)
            },
            "id": props.data.id
          
        }
      }
  
    axios.post(`http://localhost:4000/graphql`, body)
    .catch(err => {
      console.error(err.data)
    })
    .then(res => {
      window.location.replace("/");
      console.log(res.data)
    })
  }   


  const initialValues = {
      "title": props.data.title || '',
      "year": props.data.year || '',
      "image": props.data.image || '',
      "score": props.data.score || ''
  };

    return (
        <>
          <Button variant="primary" onClick={handleShow}>
            Edit Movie
          </Button>
              <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>Edit CRUD
    
       <Form
        onSubmit={e => save(e)}
        initialValues={initialValues}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label style={{ padding: '10px' }}>Title</label>
              <Field name="title" component="input" placeholder="" />
            </div>
            <div>
            <label style={{ padding: '10px' }}>Year</label>
              <Field name="year" component="input" placeholder="" type= "number"/>
            </div>
            <div>
            <label style={{ padding: '10px' }}>Image</label>
              <Field name="image" component="input" placeholder="" />
            </div>
            <div>
            <label style={{ padding: '10px' }}>Score</label>
              <Field name="score" component="input" placeholder="" type= "number"/>
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        )}
      />











            </Modal.Body>
          </Modal>
        </>
      );

  }

  export default EditDataModal
