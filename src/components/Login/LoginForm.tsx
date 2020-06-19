import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

type LoginFormProps = {
    toggleForm: () => void,
    tryLogin: (email: string, password: string) => void
};
type LoginFormState = { 
    inputEmail: string,
    inputPassword: string,
    invalidEmail: boolean,
    invalidInput: boolean,
    loggingIn: boolean,
};

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    state = {
        inputEmail: "",
        inputPassword: "",
        invalidEmail: false,
        invalidInput: false,
        loggingIn: false
    }
    handleEmailChange = (e: React.SyntheticEvent): void => {
        let target = e.target as HTMLInputElement;
        this.setState({inputEmail: target.value});
    }
    handlePasswordChange = (e: React.SyntheticEvent): void => {
        let target = e.target as HTMLInputElement;
        this.setState({inputPassword: target.value});
    }
    handleLoginSubmit = (): void => {
        // TODO: feedback/erroring
        this.props.tryLogin(this.state.inputEmail, this.state.inputPassword);
    }
    render = () => {
        document.title = `sign in to roebling`;
        return (
            <div>
                <div className="field">
                    <label className="label">email</label>
                    <div className="control has-icons-left">
                        <input 
                            className={`input ${this.state.invalidEmail || this.state.invalidInput ? "is-danger": ""}`} 
                            type="email" 
                            placeholder="hello@roebling.matthewwang.me" 
                            value={this.state.inputEmail}
                            onChange={this.handleEmailChange} 
                        />
                        <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                    </div>
                    {
                        this.state.invalidInput && <p className="help is-danger">An account was not found for this email/password combination.</p>
                    }
                </div>
                <div className="field">
                    <label className="label">password</label>
                    <div className="control has-icons-left">
                        <input 
                            className={`input ${this.state.invalidInput ? "is-danger": ""}`} 
                            type="password" 
                            value={this.state.inputPassword}
                            onChange={this.handlePasswordChange} 
                        />
                        <span className="icon is-large is-left">
                            <FontAwesomeIcon icon={faLock} size="lg" fixedWidth pull="right"/>
                        </span>
                    </div>
                    {
                        this.state.invalidInput && <p className="help is-danger">An account was not found for this email/password combination.</p>
                    }
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={this.handleLoginSubmit}>sign in</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light" onClick={this.props.toggleForm}>create an account instead</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;