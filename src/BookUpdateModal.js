import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

class BookUpdateModal extends React.Component{

  
// *** Create cat 2 handlers: 1 to handle the form submission & 1 to post to DB ***

handleBookSubmit = (event) => {
 
  event.preventDefault();
  console.log('testing props 1 >>>', this.props.book)

  // TODO: BUILD A Book OBJECT FROM MY FORM VALUES
  let bookUpdate = {
    title: event.target.title.value,
    description: event.target.description.value,
    status: event.target.status.checked,
    _id: this.props.book._id
    
  }
 this.props.handleUpdateBooks(bookUpdate);
console.log('testing props 2 >>>>', this.props.book)
 
  // this.postBooks(newBook);
  this.props.handleCloseModal();
}

   render(){
    return (
      <Modal show={this.props.showModal} onHide={this.props.handleCloseModal}>
                
                  <Form onSubmit={this.handleBookSubmit}>
                    <Form.Group controlId="title">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" defaultValue={this.props.book.title}/>
                    </Form.Group>
                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="text" defaultValue={this.props.book.description}/>
                    </Form.Group>
                    <Form.Group controlId="status">
                      <Form.Check type="checkbox" label="Status" defaultChecked={this.props.book.status}/>
                    </Form.Group>
                    <Button type="submit">Update a Book</Button>
                  </Form>
                
    </Modal>
    )
   }
}

export default BookUpdateModal;