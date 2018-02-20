const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity("tutorials on SilentDiscord.ml", {type: "WATCHING"})
  //bot.user.setGame("SilentDiscord.ml");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  //if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(message.channel.type === "dm") {
    if(cmd.toLowerCase() === `${prefix}dm`) {
      return message.channel.send(":wave: This is a Direct Message. This command will not work in servers.");
    }
  }

  if(message.channel.type !== "dm") {
    if(cmd.toLowerCase() === `${prefix}ping`) {
      return message.channel.send(":ping_pong: Pong!");
    }
  }

//  if(cmd.toLowerCase() == `${prefix}ping`) {
//    return message.channel.send(":ping_pong: Pong!");
//  }
});

bot.login(botconfig.token);
