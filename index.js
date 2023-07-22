const { Configuration, OpenAIApi } = require("openai");
const readline = require("readline");
const Spinner = require("cli-spinner").Spinner;
const chalk = require("chalk");
require("dotenv").config();

const apiKey = process.env.OPENAI_API_KEY;

//Array to keep the context of previous messages
const messages = [];

console.log(
  "\n",
  chalk.yellow(
    "Your personal GOD welcomes you! (type ctrl+C to cancel anytime)"
  ),
  "\n"
);

const spinner = new Spinner("GOD is thinking.. %s");
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
  messages.push({ role: "user", content: prompt });
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });
  return completion;
}

async function readFromCLI() {
  rl.question(chalk.blueBright("Ask GOD: "), async (prompt) => {
    spinner.start();
    try {
      const response = await fetchChatGPTResponse(prompt);
      const answer = response.data.choices[0].message;
      messages.push(answer);
      spinner.stop(true);
      console.log(chalk.greenBright("Ans: ", answer?.content));
      console.log("--------------", "\n");

      readFromCLI();
    } catch (error) {
      spinner.stop(true);
      console.log(error);
    }
  });
}

readFromCLI();
