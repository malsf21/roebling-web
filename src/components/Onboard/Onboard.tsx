import React from "react";

import convertToSlug from '../../lib/convertToSlug';

type OnboardingProps = {
    tryCreateHome: (uid: string, homeName: string) => void,
    user: string
};

type OnboardingState = { 
    homeNameInput: string,
    invalidHomeName: boolean,
};

class OnboardingPage extends React.Component<OnboardingProps, OnboardingState>{
    state = {
        homeNameInput: "",
        invalidHomeName: false
    }

    handleEmailChange = (e: React.SyntheticEvent): void => {
        let target = e.target as HTMLInputElement;
        this.setState({homeNameInput: target.value});
    }
    handleSubmit = (): void => {
        if (this.state.homeNameInput !== ""){
            this.props.tryCreateHome(this.props.user, this.state.homeNameInput);
        }
    }
    render = () => {
        document.title = `welcome to roebling`;
        return (
            <div>
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title is-1">
                                hey there!
                            </h1>
                            <h2 className="subtitle">
                                looks like you don't have a home yet. let's make you one.
                            </h2>
                            <p>need to be added to an existing home? matt hasn't coded that yet, give him a bit.</p>
                        </div>
                    </div>
                </section>
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h2 className="title is-4">
                                first, let's decide on a name for your new home.
                            </h2>
                            <div className="field">
                                <label className="label">home name (you can change this later)</label>
                                <div className="control has-icons-left">
                                    <input 
                                        className={`input ${this.state.invalidHomeName ? "is-danger": ""}`} 
                                        type="text" 
                                        placeholder="a nice name" 
                                        value={this.state.homeNameInput}
                                        onChange={this.handleEmailChange} 
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-home"></i>
                                    </span>
                                </div>
                                <p>
                                    your home will have an id of <b>{convertToSlug(this.state.homeNameInput)}</b>
                                </p>
                                {
                                    this.state.invalidHomeName && <p className="help is-danger">something something bad home name</p>
                                }
                            </div>
                        </div>
                    </div>
                </section>
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <p className="subtitle">
                                and that's it! easy, right?
                            </p>
                            <button className="button is-success" onClick={this.handleSubmit}>
                                make this my home
                            </button>
                            <hr />
                            <p>or in other words, matt has added like no features to this app yet.</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default OnboardingPage;