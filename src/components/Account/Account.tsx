import React from "react";

type AccountProps = {
    db: firebase.firestore.Firestore,
    homeid: string,
    displayName: string,
    user: string,
};

type AccountState = {
    displayNameValue: string
}

class AccountPage extends React.Component<AccountProps, AccountState> {
    state = {
        displayNameValue: this.props.displayName
    }

    handleDisplayNameChange = (e: React.SyntheticEvent): void => {
        let target = e.target as HTMLInputElement;
        this.setState({displayNameValue: target.value});
    }

    handleUpdateDisplayName = () => {
        alert("lol matt didn't implement this yet");
    }

    handleUpdateDefaultHome = () => {
        alert("lol matt didn't implement this yet");
    }

    handleDeleteAccount = () => {
        alert("lol matt didn't implement this yet");
    }

    render = () => {
        document.title = `${this.props.displayName}'s account`;
        return (
            <div>
                <section className="hero is-light">
                    <div className="hero-body">
                        <div className="container">
                        <h1 className="title">
                            hey {this.props.displayName}, how can we help?
                        </h1>
                        <h2 className="subtitle">
                            something wrong? yell at matt
                        </h2>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <h2 className="title">Account Management</h2>

                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Display Name</label>
                            </div>
                            <div className="field-body">
                                <div className="field has-addons">
                                    <div className="control">
                                        <input 
                                            className="input" 
                                            type="text" 
                                            value={this.state.displayNameValue} 
                                            onChange={this.handleDisplayNameChange}
                                        />
                                    </div>
                                    <div className="control">
                                        <button 
                                            className="button is-info" 
                                            onClick={this.handleUpdateDisplayName}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Account UID</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input 
                                            className="input is-static" 
                                            type="text" 
                                            value={this.props.user} 
                                            disabled 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Default Home</label>
                            </div>
                            <div className="field-body">
                                <div className="field has-addons">
                                    <div className="control">
                                    <span className="select">
                                        <select>
                                            <option selected>{this.props.homeid}</option>
                                            <option>matt hasn't implemented this yet</option>
                                            <option>sorry bout that</option>
                                        </select>
                                    </span>
                                    </div>
                                    <div className="control">
                                        <button 
                                            className="button is-info" 
                                            onClick={this.handleUpdateDefaultHome}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Delete Account</label>
                            </div>
                            <div className="field-body">
                                <button className="button is-danger" onClick={this.handleDeleteAccount}>
                                    Yes, I Want to Delete My Account
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default AccountPage;