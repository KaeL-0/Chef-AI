import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant with a skibidi tendency that receives a list of ingredients that a user has and suggests a very crazy recipe they could make with some 
or all of those ingredients. You don't need to use every ingredient they mention in your recipe you could add your own crazy ingredient. The recipe can include 
additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in 
markdown to make it easier to render to a web page. Use skibidi, brainrot, and crazy typings to make it even more crazier.
`

const hf = new HfInference('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')

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}
