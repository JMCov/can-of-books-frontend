import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'
import './BestBooks.css'
import { Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import BookUpdateModal from './BookUpdateModal';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showUpdateModal: false

    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {
    try {
      // TODO: use axios to call out to my server get all the cats from the DB
      let url = `${process.env.REACT_APP_SERVER}/books`

      let bookData = await axios.get(url);

      this.setState({
        books: bookData.data
      });
      console.log(this.state.books);

    } catch (error) {
      console.log(error.response)
    }
  }

  deleteBooks = async (singleBook) => {
    try {
      // TODO: use axios to send the ID to the server on the path param
      let url = `${process.env.REACT_APP_SERVER}/books/${singleBook._id}`

      await axios.delete(url);

      // TODO: update state to remove the deleted book
      let updatedBooks = this.state.books.filter(book => book._id !== singleBook._id);

      this.setState({
        books: updatedBooks
      });

    } catch (error) {
      console.log(error.message)
    }
  }

  handleUpdateBooks = async (bookUpdate) => {
    try {
      // this.props.handleOpenModal();
      let url = `${process.env.REACT_APP_SERVER}/books/${bookUpdate._id}`
      console.log('book update >>>>', bookUpdate)
      console.log('URL >>>', url)
      let updatedBook = await axios.put(url, bookUpdate);
      console.log('updatedBook.data >>>>>', updatedBook.data)
      let updatedArr = this.state.books.map(existingBook => {
        return existingBook._id === bookUpdate._id
          ? updatedBook.data
          : existingBook
      });

      this.setState({
        books: updatedArr
      })


    } catch (error) {
      console.log(error.message)
    }

  }

  handleSyncBooks = (sync) => {
    this.setState({
      books: sync
    })
  }

  // REACT LIFECYCLE METHOD 

  componentDidMount() {
    this.getBooks();
  }

  handleBook = () => {
    this.props.handleOpenModal();
  }

  handleUpdateModal = () => {
    this.setState({
      showUpdateModal: true
    })
  }

  closeUpdateModal = () => {
    this.setState({
      showUpdateModal: false
    })
  }

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (

          <Carousel>
            {this.state.books.map((book, idx) => {
              
              return (
              
                <Carousel.Item key={idx}>
                  <img
                    className="d-block w-50"
                    src="https://media.wiley.com/product_data/coverImage300/27/07645011/0764501127.jpg"
                    alt={book.title}
                  />
                  <Carousel.Caption>
                    <Button onClick={() => { this.deleteBooks(book) }}>Delete</Button>
                    <Button onClick={() => { this.handleUpdateModal() }}>Update</Button>

                    <h3>{book.title}</h3>
                    <p>{book.description}</p>
                  </Carousel.Caption>
                  <BookUpdateModal
                    handleCloseModal={this.closeUpdateModal}
                    showModal={this.state.showUpdateModal}
                    book={book}
                    handleUpdateBooks={this.handleUpdateBooks}
                  />
                </Carousel.Item>
              )
            })}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
        <Button onClick={this.handleBook}>Add a Book</Button>
        <BookFormModal
          handleCloseModal={this.props.handleCloseModal}
          showModal={this.props.showModal}
          books={this.state.books}
          handleSyncBooks={this.handleSyncBooks}
        />
      </>
    )
  }
}

export default BestBooks;
