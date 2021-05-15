#!/usr/bin/env node

const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");
const { Logger } = require("telegram/extensions");

Logger.setLevel("none");

(async () => {
  console.log("Welcome To TgSession Generator");
  const apiId = await input.text("API ID :");
  const apiHash = await input.text("API HASH :");
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
  console.log("Connected");
  console.log("Done! \n Now Check Your Saved Messages for Session String");
  await client.sendMessage("me", {
    message: `Generated Session String \n ${client.session.save()}`,
  });
  process.exit(0);
})();
