import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import './style.css';

/**
 * Title Component
 */
const Title = () => {
  return <h1>Register Form</h1>;
}

/**
 * Submit Button Component
 */
const SubmitButton = (props) => {
  return <button type="submit" >Submit</button>;
}

/**
 * Register Form Component
 */
class RegisterForm extends Component {

    constructor(props) {

    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      contact: ''
    };

    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.contactChange = this.contactChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


   firstNameChange(event) {
    this.setState({
      firstName: event.target.value
    });
    console.log(event.target.value);
  }

     lastNameChange(event) {
    this.setState({
      lastName: event.target.value
    });
  }

     emailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

     contactChange(event) {
    this.setState({
      contact: event.target.value
    });
  }

  handleSubmit(event) {
    console.log("form has been submitted: ");
    console.log(this.state.firstName+" - "+this.state.lastName+" - "+this.state.email+" - "+this.state.contact);

    const formData = new FormData();
    formData.append("fname", this.state.firstName);
    formData.append("lname", this.state.lastName);
     
  
    axios.post("https://hooks.airtable.com/workflows/v1/genericWebhook/appdJiIV5uts1mBoO/wflUDDZgFfHc8IlQF/wtrrWcbvIUrkdwriS", formData).then(res => {
      console.log(res);
      console.log(res.data);
    });

    event.preventDefault();
  }


 render() {
    return (
     
        <form onSubmit={this.handleSubmit}>  
          <label for="fname">FirstName: </label>
          <input id="fname" type="text" value={this.state.firstName} onChange={this.firstNameChange} />
          <br/><br/>
          <label for="lname">LastName: </label>
          <input id="lname" type="text" value={this.state.lastName} onChange={this.lastNameChange} />
          <br/><br/>
          
          
          <SubmitButton />
        </form>
     
    );
  }

}

const App = () => {
  return (
      <div>
        <Title />
        <RegisterForm />
      </div>
    );
}

render(<App />, document.getElementById('root'));
