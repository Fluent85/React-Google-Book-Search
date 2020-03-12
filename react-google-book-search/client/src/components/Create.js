import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API from '../utils/API'
​
​
class Create extends Component {
​
  constructor() {
    super();
    this.state = {
      books: [],
      title: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
    //this.setState({title:e.target.value})
  }
​
  save = (e) => {
    e.preventDefault();
​
    const { isbn, title, author, description, published_year, publisher } = this.state;
​
    axios.post('/routes/book', { isbn, title, author, description, published_year, publisher })
      .then((result) => {
        this.props.history.push("/")
      });
  }
​
  onSubmit = event =>{
    event.preventDefault();
    API.getGoogleBooks(this.state.title)
    .then(res=>{
      this.setState({ books: res.data.items });
      console.log(res)
    })
    //axios.get("")
  }
  
  render() {
    const { isbn, title, author, description, published_year, publisher } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD BOOK
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input 
                  type="text"
                  class="form-control"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  placeholder="Title" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
​
export default Create;