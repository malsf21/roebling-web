import React from "react";

import IngredientsView from './IngredientsView';
import RecipesView from './RecipesView';

type HomeProps = {
    db: firebase.firestore.Firestore,
    homeid: string,
    displayName: string,
    user: string,
};
type HomeState = { 
    items: Item[],
    recipes: Recipe[],
};

type Item = {
    name: string,
    amount: string,
    unit: string,
}

type Recipe = {
    name: string,
    prepTime: string,
    cookTime: string,
    description: string,
    servings: number,
}

class Home extends React.Component<HomeProps,HomeState> {
    // these shouldn't be any eventually
    ingredientListener: any;
    recipeListener: any;
    constructor(props: HomeProps){
        super(props);
        this.state = {
            items: [],
            recipes: [],
        }
        this.ingredientListener = () => {return;};
        this.recipeListener = () => {return;};
    }
    componentDidMount = () => {
        // if selectedHome changes, we need to recall this. probably some sort of componentWillUpdate or smth?
        document.title = `${this.props.displayName} @ ${this.props.homeid}`;
        this.ingredientListener = this.props.db.collection(`homes/${this.props.homeid}/items`).onSnapshot((collectionSnapshot) => {
            let items: Item[] = [];
            collectionSnapshot.forEach((doc) => {
                let item = doc.data() as Item;
                items.push(item);
            })
            this.setState({items: items});
        })

        this.recipeListener = this.props.db.collection(`homes/${this.props.homeid}/recipes`).onSnapshot((collectionSnapshot) => {
            let recipes: Recipe[] = [];
            collectionSnapshot.forEach((doc) => {
                let recipe = doc.data() as Recipe;
                recipes.push(recipe);
            })
            this.setState({recipes: recipes});
        })
    }

    componentWillUnmount = () => {
        this.ingredientListener();
        this.recipeListener();
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
                                    <RecipesView db={this.props.db} user={this.props.user} homeid={this.props.homeid} recipes={this.state.recipes} />
                                    {/* <div className="card">
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
                                            <a href="#" className="card-footer-item">New Recipe</a>
                                            <a href="#" className="card-footer-item">View All Recipes</a>
                                        </footer>
                                    </div> */}
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