import React from "react";

type CreateUserFormProps = {
    toggleForm: () => void,
    tryCreateUser: (email: string, password: string) => void
};
type CreateUserFormState = { 
    inputEmail: string,
    inputPassword: string,
    inputConfirmPassword: string,
    invalidEmail: boolean,
    invalidInput: boolean,
    loggingIn: boolean,
};

class CreateUserForm extends React.Component<CreateUserFormProps, CreateUserFormState> {
    state = {
        inputEmail: "",
        inputPassword: "",
        inputConfirmPassword: "",
        invalidEmail: false,
        invalidInput: false,
        loggingIn: false
    }
    handleEmailChange = (e: React.SyntheticEvent): void => {
        // TODO: check if email is valid with regex
        // TODO: check if email is taken; or just let firebase handle this one?
        let target = e.target as HTMLInputElement;
        this.setState({inputEmail: target.value});
    }
    handlePasswordChange = (e: React.SyntheticEvent): void => {
        // TODO: password length checker
        let target = e.target as HTMLInputElement;
        this.setState({inputPassword: target.value});
    }
    handleConfirmPasswordChange = (e: React.SyntheticEvent): void => {
        // TODO: check if password and confirm password don't match up
        let target = e.target as HTMLInputElement;
        this.setState({inputConfirmPassword: target.value});
    }
    handleCreateUserSubmit = (): void => {
        // TODO: re-perform all checks
        // TODO: feedback/erroring
        this.props.tryCreateUser(this.state.inputEmail, this.state.inputPassword);
    }
    render = () => {
        document.title = `create a roebling account`;
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
                            <i className="fas fa-envelope"></i>
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
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                    </div>
                    {
                        this.state.invalidInput && <p className="help is-danger">An account was not found for this email/password combination.</p>
                    }
                </div>
                <div className="field">
                    <label className="label">confirm password</label>
                    <div className="control has-icons-left">
                        <input 
                            className={`input ${this.state.invalidInput ? "is-danger": ""}`} 
                            type="password" 
                            value={this.state.inputConfirmPassword}
                            onChange={this.handleConfirmPasswordChange} 
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                    </div>
                    {
                        this.state.invalidInput && <p className="help is-danger">An account was not found for this email/password combination.</p>
                    }
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" onClick={this.handleCreateUserSubmit}>create account</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light" onClick={this.props.toggleForm}>sign in instead</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUserForm;