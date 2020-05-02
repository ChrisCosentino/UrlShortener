import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

class App extends Component{

  state = {
    copied: false
  };

  constructor(){
    super();
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
       <div className="bg-light my-5 p-3" onClick={() => this.copyToClipboard()}>
        <span ref={(textarea) => this.textArea = textarea} id="text">
          {this.state.shortUrl}
        </span>
       </div>

       
      </div>
    );
  }
}

export default App;
