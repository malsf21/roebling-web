import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LoadingPage from './components/common/LoadingPage';
import Login from './components/Login/Login';

import * as firebase from "firebase/app";
import "firebase/auth";

import './App.sass';
import './App.css';

type AppProps = {};
type AppState = { 
  checkedAuth: boolean,
  loggedIn: boolean,
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: any){
    super(props);
    this.state = {
      checkedAuth: false,
      loggedIn: false,
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      await this.onAuthHandler(user);
    });
  }; 

  onAuthHandler = async (user: any) => {
    console.log("checking auth");
    if (user) {
      console.log("found user");
      this.setState({ checkedAuth: true, loggedIn: true });
    } else {
      console.log("no user found");
      this.setState({ checkedAuth: true, loggedIn: false });
    }
  };

  tryLogin = (email: string, password: string) => {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      console.error(`Error code: ${error.code}. Error message: ${error.message}`)
    });
  }

  tryLogout = (): void => {
    firebase.auth().signOut();
  }

  renderHeader = () => {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/"><b>roebling</b></Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="https://github.com/malsf21/roebling-web" target="_blank" rel="noreferrer noopener">
              docs
            </a>
          </div>
          <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            {/* eslint-disable-next-line */}
            <a className="navbar-link" role="button">
              matt
            </a>

            <div className="navbar-dropdown is-right">
              <Link className="navbar-item" to="/">
                account
              </Link>
              <hr className="navbar-divider" />
              <button className="navbar-item button is-danger" onClick={this.tryLogout}>
                sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    );
  }
  render = () => {
    if (!this.state.checkedAuth){
      return <LoadingPage/>;
    }
    if (!this.state.loggedIn){
      return <Login tryLogin={this.tryLogin} />
    }
    return (
      <div className="App">
        <Router>
          {this.renderHeader()}
            {/*
              A <Switch> looks through all its children <Route>
              elements and renders the first one whose path
              matches the current URL. Use a <Switch> any time
              you have multiple routes, but you want only one
              of them to render at a time
            */}
            <Switch>
              <Route exact path="/">
                A
              </Route>
              <Route path="/about">
                C
              </Route>
              <Route path="/dashboard">
                F
              </Route>
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
