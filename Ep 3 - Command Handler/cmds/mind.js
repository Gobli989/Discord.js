const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
      let mEmbed = new Discord.RichEmbed()
      .setTitle("Itt a tavasz, nagyon örülök.")
      .setColor("#fbff47")
      .setDescription("A tavasz az egy hónap!")
      .setThumbnail(message.author.avatarURL)
      .addField(":bouquet: Virágcsokor", "Ez egy virágcsokor.")
      .addBlankField()
      .addField(":bouquet: Virágcsokor", ":rose: Rózsa", true)
      .addField(":tulip: Tulipán", ":cherry_blossom: Valami amit nem tudok", true)
      .addField(":sunflower: Napraforgó", ":hibiscus: Hibiszkusz", true)
      .setFooter("Valami alcím! :)");

      message.channel.send(mEmbed);
}

module.exports.help = {
  name: "mind"
}
