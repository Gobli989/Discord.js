const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");

bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() == "js");
  if(jsfiles.length <= 0) {
    console.log("Nincsenek parancsok implementálva.");
    return;
  }

  console.log(`${jsfiles.length} parancs betöltve.`);

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);

    bot.commands.set(props.help.name, props);
  });
})

bot.on("ready", async () => {
  console.log(`${bot.user.username} mostmár online ${bot.guilds.size} szerveren!`);
  console.log(bot.commands);
});

bot.on("message", async message => {

  if(message.author.bot) return;
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  let cmds = bot.commands.get(cmd.slice(prefix.length));

  if(cmds) cmds.run(bot, message, args);

  if(message.channel.type == "dm") {
    return message.channel.send(":x: Csak szerveren tudok parancsokat futtatni! :x:")
  }
});

bot.login(botconfig.token);
