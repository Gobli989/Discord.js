const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
    let noPermEmbed = new Discord.RichEmbed()
    .setTitle("Nincs jogod ehez!")
    .setColor("#ff0000")
    .setDescription("Ehez a parancshoz nincs jogod!")
    .setThumbnail("http://elitedivat.hu/wp-content/uploads/2016/04/milker-X-icon.png");

    let noArgsEmbed = new Discord.RichEmbed()
    .setTitle("Hibás hozzátartozók!")
    .setColor("#ff0000")
    .addField("Használat:", "`!unmute @ember`");

    let alreadyEmbed = new Discord.RichEmbed()
    .setTitle("Hibás hozzátartozók")
    .setColor("#ff0000")
    .setDescription("Ő nincs lenémítva!");

    let doneEmbed = new Discord.RichEmbed()
    .setTitle("Sikeres!")
    .setColor("#00ff00")
    .setDescription(`Sikeresen feloldottad némítást róla!`);

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(noPermEmbed).then(msg => {msg.delete(10000)});

    let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);

    if(!toMute) return message.channel.send(noArgsEmbed).then(msg => {msg.delete(10000)});

    let role = message.guild.roles.find(r => r.name == "Némított");

    if(!toMute.roles.has(role.id)) return message.channel.send(alreadyEmbed).then(msg => {msg.delete(10000)});

    let unmutedEmbed = new Discord.RichEmbed()
    .setColor("#00ff00")
    .addField(":loud_sound: A némításod fel lett oldva!", `Ilyenkor: ${message.createdAt}`);

    await toMute.removeRole(role);
    message.channel.send(doneEmbed);
    toMute.send(unmutedEmbed)
    return;
}

module.exports.help = {
  name: "unmute"
}
