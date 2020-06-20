import React from "react";

type RecipesViewProps = {
    db: firebase.firestore.Firestore,
    recipes: Recipe[],
    user: string,
    homeid: string,
};
type RecipesViewState = { 
};

type Recipe = {
    name: string,
    prepTime: string,
    cookTime: string,
    description: string,
    servings: number
}

// TODO: move this to a library; text manipulation maybe? also maybe a better number
const truncate100 = (input: string): string => input.length > 100 ? `${input.substring(0, 100)}...` : input;

class RecipesView extends React.Component<RecipesViewProps,RecipesViewState> {
    render = () => {
        return (
            <div className="box">
                <h2 className="title">available recipes</h2>
                {this.props.recipes.map((recipe, index) => {
                    return(
                        <div className="card" key={index}>
                            <div className="card-content">
                                <h3 className="title is-5">{recipe.name}</h3>
                                <p className="subtitle">
                                    {truncate100(recipe.description)}
                                </p>
                                <div className="tags are-small">
                                    <span className="tag">serves: {recipe.servings}</span>
                                    <span className="tag">prep time: {recipe.prepTime}</span>
                                    <span className="tag">cook time: {recipe.cookTime}</span>
                                    <span className="tag">ingredients: 100%</span>
                                </div>
                                <button className="button">
                                    View Full Recipe
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default RecipesView;