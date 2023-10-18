import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { useSession } from "next-auth/react";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create new prompt", { status: 500 });
  }
};