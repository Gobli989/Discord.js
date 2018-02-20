const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} mostmár online!`)
});

bot.on("message", async message => {
  if(message.author.bot) return;
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(message.channel.type == "dm") {
    if(cmd.toLowerCase() == `${prefix}hello`) {
      return message.channel.send(":wave: Szia!");
    }
  }

  if(message.channel.type != "dm") {
    if(cmd.toLowerCase() == `${prefix}ping`) {
      return message.channel.send("!ping");
    }
  }

});

bot.login(botconfig.token);
