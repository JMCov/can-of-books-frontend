import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'
import './BestBooks.css'


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
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

  // REACT LIFECYCLE METHOD 

  componentDidMount() {
    this.getBooks();
  }



  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          // <p>Book Carousel coming soon</p>
          <Carousel>
            {this.state.books.map((book, idx) => {
            return (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100"
                src="https://media.wiley.com/product_data/coverImage300/27/07645011/0764501127.jpg"
                alt={book.title}
              />
              <Carousel.Caption>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
            )})}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
