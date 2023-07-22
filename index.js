const { Configuration, OpenAIApi } = require("openai");
const readline = require("readline");

require("dotenv").config();
const apiKey = process.env.OPENAI_API_KEY;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

async function fetchChatGPTResponse(prompt) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  return completion;
}

async function readLineFromCLI() {
  rl.question("Ask God: ", async (prompt) => {
    try {
      const answer = await fetchChatGPTResponse(prompt);
      console.log(answer);
    } catch (error) {
      console.log(error);
    }
  });
}

readLineFromCLI();
