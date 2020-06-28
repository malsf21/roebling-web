import React from "react";

type IngredientsViewProps = {
    db: firebase.firestore.Firestore,
    items: Item[],
    user: string,
    homeid: string,
};
type IngredientsViewState = { 
    newIngredientName: string,
    newIngredientAmount: Number,
    newIngredientUnit: string
};

type Item = {
    name: string,
    amount: string,
    unit: string,
}

const defaultIngredientState = {
    newIngredientName: "",
    newIngredientAmount: 0,
    newIngredientUnit: "item"
}

class IngredientsView extends React.Component<IngredientsViewProps,IngredientsViewState> {
    state = defaultIngredientState;
    handleNameChange = (e: React.SyntheticEvent): void => {
        // TODO: change behaviour on existing ingredient?
        let target = e.target as HTMLInputElement;
        this.setState({newIngredientName: target.value});
    }
    handleAmountChange = (e: React.SyntheticEvent): void => {
        // TODO: change behaviour on existing ingredient?
        let target = e.target as HTMLInputElement;
        this.setState({newIngredientAmount: Number(target.value)});
    }
    handleUnitChange = (e: React.SyntheticEvent): void => {
        // TODO: change behaviour on existing ingredient?
        let target = e.target as HTMLInputElement;
        this.setState({newIngredientUnit: target.value});
    }
    tryAddIngredient = () => {
        // TODO: checks on existing ingredients, better validate inputs, etc.

        if (this.state.newIngredientName === "" || this.state.newIngredientAmount === 0){
            return;
        }

        this.props.db
            .collection("homes")
            .doc(this.props.homeid)
            .collection("items")
            .add({
                amount: this.state.newIngredientAmount,
                name: this.state.newIngredientName,
                unit: this.state.newIngredientUnit
            })
        .then(() => {
            console.log("Transaction successfully committed!");
            this.setState(defaultIngredientState);
        })
        .catch((error) => {
            console.error("Transaction failed: ", error);
        });
    }
    render = () => {
        return (
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
                            {this.props.items.map((item, index) => {
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
                                    <input 
                                        className="input" 
                                        type="text" 
                                        placeholder="new ingredient"
                                        value={this.state.newIngredientName}
                                        onChange={this.handleNameChange}
                                    />
                                </td>
                                <td>
                                    <div className="field has-addons">
                                        <div className="control">
                                            <input 
                                                className="input" 
                                                type="number" 
                                                placeholder="amount" 
                                                value={this.state.newIngredientAmount}
                                                onChange={this.handleAmountChange}
                                            />
                                        </div>
                                        <div className="control">
                                            <span className="select">
                                                <select onChange={this.handleUnitChange} value={this.state.newIngredientUnit}>
                                                    {/* TODO: generate these from a constants file */}
                                                    <option value="item">item</option>
                                                    <option value="lb">lb</option>
                                                    <option value="g">g</option>
                                                </select>
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <button className="button is-success" onClick={this.tryAddIngredient}>add</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default IngredientsView;