import React from 'react';
import axios from 'axios';
import './BestBooks.css'
import { Button, Form, Container, Modal } from 'react-bootstrap';

class BookFormModal extends React.Component{

  
// *** Create cat 2 handlers: 1 to handle the form submission & 1 to post to DB ***

handleBookSubmit = (event) => {
  event.preventDefault();

  // TODO: BUILD A Book OBJECT FROM MY FORM VALUES
  let newBook = {
    title: event.target.title.value,
    description: event.target.description.value,
    status: event.target.status.checked,
    
  }
  console.log('new Book from form>>>', newBook);

  // TODO: post my Book to DB using my 2nd handler
  this.postBooks(newBook);
  this.props.handleCloseModal();
}

// *** 2nd Handler to post to DB

postBooks = async (bookObj) => {
  try {
    // TODO: Create the url for axios to send book obj to server
    let url = `${process.env.REACT_APP_SERVER}/books`;

    // 2 args on a post: 1st is the url, 2nd is the data to send
    let createdBook = await axios.post(url, bookObj);

   
    let books = [...this.props.books, createdBook.data]
    this.props.handleSyncBooks(books);
    

    // TODO: receive a created book and add it to state
  } catch (error) {
    console.log(error.message);
  }
}


   render(){
    return (
      <Modal show={this.props.showModal} onHide={this.props.handleCloseModal}>
                <Container className="mt-5">
                  <Form onSubmit={this.handleBookSubmit}>
                    <Form.Group controlId="title">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group controlId="status">
                      <Form.Check type="checkbox" label="Status" />
                    </Form.Group>
                    <Button type="submit">Add a Book</Button>
                  </Form>
                </Container>
    </Modal>
    )
   }
}

export default BookFormModal;