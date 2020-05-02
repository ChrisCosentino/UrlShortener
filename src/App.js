import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import LinkArea from '../src/LinkArea';

class App extends Component{

  state = {
    shortUrl: "",
    longUrl: "",
    date: "",
    urlCode: "",
    __v: "",
    _id: "",
    valid: false,
    copied: false
  };

  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit(event){
    event.preventDefault();
    // const data = new FormData(event.target.value);
    const data = { longUrl: event.target.longUrl.value };
    console.log(event.target.longUrl.value);
    console.log(JSON.stringify(data));
    fetch('http://localhost:5000/api/url/shorten', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState(data);
      this.setState({valid: true});
    })
    .catch(err => alert(err))
  }

  copyToClipboard = () => {

    var text = document.getElementById('text').innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    this.setState({copied: true});
  }


  render(){
    return(
      <div className="App">
        <h1 className="display-1">URL Shortener</h1>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formUrl">
              
              <Form.Control name="longUrl" type="url" placeholder="Enter Url" className="form-control-lg"/>
            </Form.Group>

            <Button className="btn-lg" variant="success" type="submit" block={true}>
              Submit
            </Button>
          </Form>

        <div 
          className="bg-light my-5 p-3"
          onClick={() => this.copyToClipboard()} 
          style={{ display: this.state.valid ? "block" : "none" }} >
        <span ref={(textarea) => this.textArea = textarea} id="text">
          {this.state.shortUrl}
        </span>
       </div> 
      
       </Container>
      </div>
    );
  }
}

export default App;
