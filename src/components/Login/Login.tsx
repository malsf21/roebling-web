import React from 'react';
import smartHome from '../../svg/smart-home.svg';

import CreateUserForm from './CreateUserForm';
import LoginForm from './LoginForm';


type LoginProps = {
    tryCreateUser: (email: string, password: string) => void,
    tryLogin: (email: string, password: string) => void
};
type LoginState = { 
    showCreate: boolean,
};

class Login extends React.Component<LoginProps,LoginState> {
    state = {
        showCreate: false,
    }
    toggleForm = () => {
        this.setState((prevState: LoginState) => {
            return ({showCreate: !prevState.showCreate})
        });
    }
    render = () => {
        return (
            <section className="hero is-light is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns">
                            <div className="column">
                                <h1 className="title">
                                    welcome to roebling
                                </h1>
                                <h2 className="subtitle">
                                    your not-that-smart home assistant
                                </h2>
                                {
                                    this.state.showCreate ? 
                                        <CreateUserForm toggleForm={this.toggleForm} tryCreateUser={this.props.tryCreateUser}/> :
                                        <LoginForm toggleForm={this.toggleForm} tryLogin={this.props.tryLogin} />
                                }
                            </div>
                            <div className="column">
                                <img src={smartHome} className="login-splash" alt="a simple decorative login splash" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Login;