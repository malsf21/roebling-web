import React from "react";

type HomeProps = {
    db: firebase.firestore.Firestore,
    homeid: string,
    displayName: string,
    user: string,
};
type HomeState = { 
    showCreate: boolean,
    retrievedHome: boolean,
    items: Item[],
};

type Item = {
    name: string,
    amount: string,
    unit: string,
}

class Login extends React.Component<HomeProps,HomeState> {
    constructor(props: HomeProps){
        super(props);
        this.state = {
            retrievedHome: false,
            showCreate: false,
            items: [],
        }
    }
    componentDidMount = () => {
        // if selectedHome changes, we need to recall this. probably some sort of componentWillUpdate or smth?
        document.title = `${this.props.displayName} @ ${this.props.homeid}`;
        this.props.db.collection(`homes/${this.props.homeid}/items`).onSnapshot((collectionSnapshot) => {
            let items: Item[] = [];
            collectionSnapshot.forEach((doc) => {
                let item = doc.data() as Item;
                items.push(item);
            })
            console.log(items);
            this.setState({items: items});
        })
    }
    render = () => {
        return (
            <div>
                <section className="hero is-light">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title title-3">
                                welcome home, {this.props.displayName}.
                            </h1>
                            <h2 className="subtitle">
                                how can I help you at {this.props.homeid} today?
                            </h2>
                        </div>
                    </div>
                </section>
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns">
                                <div className="column">
                                    <div className="card">
                                        <header className="card-header">
                                            <h3 className="card-header-title">
                                                Available Recipes
                                            </h3>
                                        </header>
                                        <div className="card-content">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Recipe</th>
                                                        <th>% avail</th>
                                                        <th>Serves</th>
                                                        <th>Prep Time</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Fried Rice</td>
                                                        <td>200%</td>
                                                        <td>4</td>
                                                        <td>45 min</td>
                                                        <td className="buttons">
                                                            <button className="button">View Recipe</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <footer className="card-footer">
                                            {/* eslint-disable-next-line */}
                                            <a href="#" className="card-footer-item">New Recipe</a>
                                            {/* eslint-disable-next-line */}
                                            <a href="#" className="card-footer-item">View All Recipes</a>
                                        </footer>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="card">
                                        <header className="card-header">
                                            <h3 className="card-header-title">
                                                Ingredients
                                            </h3>
                                        </header>
                                        <div className="card-content">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Amount</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.items.map((item, index) => {
                                                        return(
                                                            <tr key={index}>
                                                                <td>{item.name}</td>
                                                                <td>{`${item.amount} ${item.unit !== "item" ? item.unit: ""}`}</td>
                                                                <td>
                                                                    <p className="buttons">
                                                                        <button className="button is-small">+</button>
                                                                        <button className="button is-small">-</button>
                                                                        <button className="button is-small">x</button>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                    <tr>
                                                        <td>
                                                            <input />
                                                        </td>
                                                        <td>
                                                            <input />
                                                        </td>
                                                        <td>
                                                            <button className="button is-small">add</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Login;