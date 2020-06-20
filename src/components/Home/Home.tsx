import React from "react";

import IngredientsView from './IngredientsView';

type HomeProps = {
    db: firebase.firestore.Firestore,
    homeid: string,
    displayName: string,
    user: string,
};
type HomeState = { 
    items: Item[],
};

type Item = {
    name: string,
    amount: string,
    unit: string,
}

class Home extends React.Component<HomeProps,HomeState> {
    constructor(props: HomeProps){
        super(props);
        this.state = {
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
                                    <IngredientsView db={this.props.db} user={this.props.user} homeid={this.props.homeid} items={this.state.items} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;