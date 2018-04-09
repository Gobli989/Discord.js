const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();

    let kEmbed = new Discord.RichEmbed()
    .setColor("#7bff47")
    .addField(":bouquet: Virágcsokor", "Iratkozzatok fel rám! ;)")
    .addField(":bouquet: Virágcsokor", "Iratkozzatok fel rám! ;)");

    message.channel.send(kEmbed);
}

module.exports.help = {
  name: "embed"
}
