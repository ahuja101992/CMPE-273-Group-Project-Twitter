import React, { Component } from 'react';
import {Redirect} from 'react-router';

class NavPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users:
        [
        ]
    }

    this.handleRefresh = this.handleRefresh.bind(this)
    this.getUser = this.getUser.bind(this)
  }

  handleRefresh() {
    //dispatch
    return new Promise((resolve) => {
      this.getUser()
    });
  }
  componentWillMount() {
    this.getUser()
  }

  getUser() {
    fetch('https://randomuser.me/api/')
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(data => {
        this.setState({
          users: [
            {
              name: data.results[0].name,
              image: data.results[0].picture.medium,
              tweet: data.results[0].email,
            },
            ...this.state.users,
          ]
        });
      })
      .catch(error => {
        console.log(error);
      });
  }



  render() {
    return (
        <Redirect to="/home"/>
    );
  }
}

export default NavPage;

