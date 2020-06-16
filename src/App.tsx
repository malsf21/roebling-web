import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home/Home';
import LoadingPage from './components/common/LoadingPage';
import Login from './components/Login/Login';

import * as firebase from "firebase/app";
import "firebase/auth";

import './App.sass';
import './App.css';

type AppProps = {
  db: firebase.firestore.Firestore,
};
type AppState = { 
  checkedAuth: boolean,
  loggedIn: boolean,
  displayName: string,
  homeName: string,
  selectedHome: string,
  user: string,
};

type User = {
  name: string,
  selectedHome: string,
};

class App extends React.Component<AppProps, AppState> {
  authListener: any;
  unsubscribeUser: any;
  constructor(props: AppProps){
    super(props);
    this.state = {
      checkedAuth: false,
      loggedIn: false,
      displayName: "",
      homeName: "",
      selectedHome: "",
      user: "",
    }
    this.authListener = () => {return;};
    this.unsubscribeUser = () => {return;};
  }

  componentDidMount = () => {
    this.authListener = firebase.auth().onAuthStateChanged(async (user) => {
      await this.onAuthHandler(user);
    });
  }; 

  componentWillUnmount = () => {
    this.authListener();
    this.unsubscribeUser();
  }

  onAuthHandler = async (user: any) => {
    if (user) {
      let userRef = this.props.db.collection("users").doc(user.uid);
      userRef.get().then((doc) => {
        let currentUser = doc.data() as User;
        this.setState({ 
          checkedAuth: true, 
          loggedIn: true,
          user: user.uid,
          displayName: currentUser.name,
          selectedHome: currentUser.selectedHome
        });
        this.unsubscribeUser = this.props.db.collection("users").doc(user.uid).onSnapshot((doc) => {
          let currentUser = doc.data() as User;
          this.setState({
            displayName: currentUser.name,
            selectedHome: currentUser.selectedHome
          })
        });
      })
    } else {
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
              {this.state.displayName}
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
      return <LoadingPage />;
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
              <Route exact path="/"
                render={(props) => (
                  <Home 
                    db={this.props.db}
                    homeid={this.state.selectedHome}
                    user={this.state.user}
                    displayName={this.state.displayName}
                  />
                )}
              />
              <Route
                path="/h/:homeid/home"
                render={(props) => (
                  <Home 
                    db={this.props.db}
                    homeid={props.match.params.homeid}
                    user={this.state.user}
                    displayName={this.state.displayName}
                  />
                )}
              />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
