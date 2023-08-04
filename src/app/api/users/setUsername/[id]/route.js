import User from "../../../../../models/user";
import { connectToDB } from "../../../../../utils/database";

export const PATCH = async (request, { params }) => {
    const { username, password } = await request.json();

    try {
        await connectToDB();
        // Find the existing prompt by ID
        const existingUser = await User.findById(params.id);
        if (!existingUser) {
            return new Response("User not found", { status: 404 });
        }
        // Update the prompt with new data
        existingUser.username = username;
        existingUser.password = password;

        await existingUser.save();

        return new Response("Successfully updated the User", { status: 200 });
    } catch (error) {
        return new Response("Error Updating User", { status: 500 });
    }
};