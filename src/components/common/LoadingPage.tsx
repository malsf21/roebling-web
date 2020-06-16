import React from "react";

class LoadingPage extends React.Component {
    render = () => {
        document.title = `loading...`;
        return (
            <section className="hero is-light is-fullheight">
                <div className="hero-body">
                    <div className="container">
                    <h1 className="title">
                        loading...
                    </h1>
                    <h2 className="subtitle">
                        taking too long? yell at matt
                    </h2>
                    </div>
                </div>
            </section>
        );
    }
}

export default LoadingPage;