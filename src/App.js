import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import { config } from './AzureConfig';
import { PublicClientApplication } from '@azure/msal-browser';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: [],
      another: [],
      error: null,
      isAuthenticated: false,
      user: {}
    };

    this.login = this.login.bind(this);

    // Initialize MSAL explicitly and await it
    this.initializeMsal();
  }

  async initializeMsal() {
    try {
      this.publicClientApplication = new PublicClientApplication({
        auth: {
          clientId: config.appId,
          redirectUri: config.redirectUri,
          authority: config.authority // Replace with your actual client ID
        },
        system: {
          allowNativeBroker: true,
        },
      });

      await this.publicClientApplication.initialize();
    } catch (error) {
      console.error('MSAL initialization error:', error);
      this.setState({
        error: 'MSAL initialization error'
      });
    }
  }

  async componentDidMount() {
    console.log(process.env.REACT_APP_OTHER_VALUE);
    // Ensure MSAL is initialized before proceeding
    await this.initializeMsal();
    // You can optionally perform other actions here
    await this.getData();
    await this.getNewData();
  }

  async login() {
    try {
      // Ensure that MSAL is initialized before calling loginPopup
      if (!this.publicClientApplication) {
        console.error('MSAL is not initialized');
        return;
      }

      await this.publicClientApplication.loginPopup({
        scopes: config.scopes,
        prompt: 'select_account'
      });

      // Fetch user information after successful login
      //const user = this.publicClientApplication.getAccount();
      this.setState({
        isAuthenticated: true
        // user,
        // error: null
      });
    } catch (err) {
      console.error('Authentication error:', err);
      this.setState({
        isAuthenticated: false,
        user: {},
        error: err.message || 'Authentication error'
      });
    }
  }

  logout() {
    this.publicClientApplication.logout();
    this.setState({ isAuthenticated: false, user: {} });
  }

  getData = () => {
    client.get('/posts')
      .then((res) => this.setState({ value: res.data }))
      .catch((err) => console.log(err));
  };

  getNewData = () => {
    client.get('/users')
      .then((res) => this.setState({ another: res.data }))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <h2>hello</h2>
        {this.state.isAuthenticated ? <p>
            Successfully logged in!
            </p>:<p>
              <button onClick={()=>this.login()}>Login</button>
              </p>}
        <div className='class1'>
          {this.state.value.map((p) => {
            const { id } = p;
            return (
              <div className='content' key={id}>
                <p>{p.title}</p>
              </div>
            )
          })}
        </div>
        <div className='class2'>
          <h2>Names</h2>
          {this.state.another.map((p) => {
            const { id } = p;
            return (
              <div className='content' key={id}>
                <p>{p.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
