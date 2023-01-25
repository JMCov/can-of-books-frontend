import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from './About.js'


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      
    }
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true,
      // title: title,
      // description: description,
      // status: status
    });
    // console.log(this.state.description)
  }
  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  }



  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks 
                      handleOpenModal={this.handleOpenModal}
                      showModal={this.state.showModal}
                      handleCloseModal={this.handleCloseModal}/>}
            >
            </Route>
            <Route 
              exact path="/about"
              element={<About />}
            >
            </Route>
            
          </Routes>

          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
