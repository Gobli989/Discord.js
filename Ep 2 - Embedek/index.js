const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} mostmár online!`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  if(message.channel.type == "dm") {
    return message.channel.send(":x: Csak szerveren tudok parancsokat futtatni! :x:")
  }

  if(message.channel.type != "dm") {
    if(cmd == `${prefix}embed`) {
      message.delete();

      let gobliEmbed = new Discord.RichEmbed()
      .setColor("#ff0000")
      .addField(":bouquet: Virágcsokor", "Iratkozzatok fel rám! ;)");

      message.channel.send(gobliEmbed);
    }

    if(cmd == `${prefix}mind`) {
      message.delete();

      let mindEmbed = new Discord.RichEmbed()

      .setTitle("Cím")
      .setColor("#00ff00")
      .setThumbnail(message.author.avatarURL)
      .addField("Első sor", "Második sor")
      .addBlankField()
      .addField(":bouquet: Virágcsokor", ":rose: Piros Rózsa", true)
      .addField(":hibiscus: Hibiszkusz", ":tulip: Tulipán", true)
      .addField(":cherry_blossom: Valami amit nem ismerek.", ":sunflower: Napraforgó", true)
      .setFooter("message.author.displayAvatarURL")
      .setAuthor(message.author.username);

      message.channel.send(mindEmbed);
    }
  }
});

bot.login(botconfig.token);
