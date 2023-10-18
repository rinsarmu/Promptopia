import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    // console.log(prompts);
    if (prompts.length === 0) {
      return new Response("No data yet", { status: 500 });
    }

    return new Response(JSON.stringify(prompts));
  } catch (error) {
    console.error(error);
  }
};
