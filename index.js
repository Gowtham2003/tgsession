#!/usr/bin/env node

const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const { Logger } = require("telegram/extensions");
const boxen = require("boxen");
const chalk = require("chalk");
const clear = require("clear");

Logger.setLevel("none");

(async () => {
  clear();
  const welcome = `${chalk.bold.greenBright(
    "Welcome To"
  )} ${chalk.bold.greenBright("TG Session Generator")}`;
  const box = boxen(welcome, { padding: 1, borderColor: "cyan" });

  const errorWarning =
    chalk.bold.redBright("Info: ") +
    chalk.yellow(
      "You May See An Error Called NetSocket. Feel Free to Ignore it \n\n"
    );
  console.log(box);

  console.log(errorWarning);
  const apiId = await input.text("API ID :");
  if (!apiId) {
    console.log(`${chalk.bold.redBright("Error No Id Provided")}`);
    console.log(`${chalk.red("Exitting...")}`);
    process.exit(0);
  }
  const apiHash = await input.text("API HASH :");
  if (!apiHash) {
    console.log(`${chalk.bold.redBright("Error No Hash Provided")}`);
    console.log(`${chalk.red("Exitting...")}`);
    process.exit(0);
  }
  const stringSession = new StringSession("");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Number :"),
    password: async () => await input.text("Password: "),
    phoneCode: async () => await input.text("Code : "),
    onError: (err) => {
      console.log(err);
    },
  });
  console.log(`${chalk.bold.greenBright("Connected to Telegram")}`);
  console.log("Done! \n Now Check Your Saved Messages for Session String");
  await client.sendMessage("me", {
    message: `Generated Session String \n ${client.session.save()}`,
  });
  process.exit(0);
})();
