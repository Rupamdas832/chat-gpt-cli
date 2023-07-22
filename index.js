const { Configuration, OpenAIApi } = require("openai");
const readline = require("readline");
const Spinner = require("cli-spinner").Spinner;

require("dotenv").config();
const apiKey = process.env.OPENAI_API_KEY;

console.log("Your personal god welcomes you!. Type ctrl+C to cancel anytime");

const spinner = new Spinner("processing.. %s");
spinner.setSpinnerString("|/-\\");

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
    spinner.start();
    try {
      const response = await fetchChatGPTResponse(prompt);
      const answer = response.data.choices[0].message;
      spinner.stop();
      console.log("Ans: ", answer);
    } catch (error) {
      spinner.stop();
      console.log(error);
    }
  });
}

readLineFromCLI();
