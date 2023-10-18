import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    if (prompts.length === 0) {
      return new Response("No data yet", { status: 500 });
    }

    return new Response(JSON.stringify(prompts));
  } catch (error) {
    console.error(error);
  }
};
