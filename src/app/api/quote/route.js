import Quote from "../../../models/quotes";
import {connectToDB} from "../../../utils/database";

export const GET = async (request) =>{
    try {
        await connectToDB();
        const quotes = await Quote.find({}).populate("creator");
        return new Response(JSON.stringify(quotes),{status: 200})
    } catch (error) {
        return new Response("Failed to get quotes", { status: 500 })
    }
}