import React from "react"
import IngredientsList from "/components/main_components/IngredientsList.jsx"
import ClaudeRecipe from "/components/main_components/ClaudeRecipe"
import { getRecipeFromMistral } from "/ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState(["chicken", "all the main spices", "corn", "heavy cream", "pasta"])
    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)

    React.useEffect(()=>{
        if(recipe !== "" && recipeSection.current !== null) {
            const yCoord = recipeSection.current.getBoundingClientRect().top + window.pageYOffset
            window.scroll({
                top: yCoord,
                behavior: 'smooth'
            })
        }
    }, [recipe])

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(event) {
        event.preventDefault()
        const form = event.target; // form element
        const formData = new FormData(form);
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        form.reset();
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    refs={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}