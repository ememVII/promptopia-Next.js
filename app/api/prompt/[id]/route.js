import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET
export const GET = async (request, { params }) => {
    try {
        await connectToDB()
        
        const prompt = await Prompt.findById(params.id).populate('creator')
        
        if(!prompt) return new Response('Prompt Not Found', { status: 404 })
        
        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response('Failed to fetch posts', {status: 500})
    }
}

// PATCH
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json()
    
    try {
        await connectToDB()
        
        const existingPrompt = await Prompt.findById(params.id)
        
        if(!existingPrompt) return new Response('Prompt Not Found', {status: 404})
        
        // Update the prompt with new data
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        
        await existingPrompt.save()
        
        return new Response('Successfully updated the Prompt', {status: 200})
    } catch (error) {
        return new Response('Failed to update prompt', {status: 500})
    }
}
// DELETE
export const DELETE = async (request, {params}) => {
    try {
        await connectToDB()
        
        // Find the prompt by ID and remove it
        await Prompt.findByIdAndDelete(params.id)
                
        return new Response('Prompt Deleted Succefully', {status: 200})
    } catch (error) {
        return new Response('Failed to Delete prompt', {status: 500})
    }
}