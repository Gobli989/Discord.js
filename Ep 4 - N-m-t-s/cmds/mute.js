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
  .addField("Használat:", "`!mute @ember`");

  let selfEmbed = new Discord.RichEmbed()
  .setTitle("Hibás hozzátartozók")
  .setColor("#ff0000")
  .setDescription("Magadat nem némíthatod le!");

  let higherEmbed = new Discord.RichEmbed()
  .setTitle("Hibás hozzátartozók")
  .setColor("#ff0000")
  .setDescription("Őt nem némíthatod le, mert nagyobb rangú!");

  let alreadyEmbed = new Discord.RichEmbed()
  .setTitle("Hibás hozzátartozók")
  .setColor("#ff0000")
  .setDescription("Ő már le van némítva.");

  let doneEmbed = new Discord.RichEmbed()
  .setTitle("Sikeres!")
  .setColor("#00ff00")
  .setDescription(`Sikeresen lenémítottad őt!`);

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(noPermEmbed).then(msg => {msg.delete(10000)});

  let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);

  if(!toMute) return message.channel.send(noArgsEmbed).then(msg => {msg.delete(10000)});

  if(toMute.id == message.author.id) return message.channel.send(selfEmbed).then(msg => {msg.delete(10000)});
  if(toMute.highestRole.positon >= message.member.highestRole.positon) return message.channel.send(higherEmbed).then(msg => {msg.delete(10000)});

  let role = message.guild.roles.find(r => r.name == "Némított");

  if(!role) {
    try {
      role = await message.guild.createRole({
        name: "Némított",
        color: "#000000",
        permissions: []
      });

      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(role, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch(e) {
      console.log(e.stack);
    }
  }

  let mutedEmbed = new Discord.RichEmbed()
  .setColor("#ff0000")
  .addField(":mute: Le lettél némítva!", `Ilyenkor: ${message.createdAt}`);

  if(toMute.roles.has(role.id)) return message.channel.send(alreadyEmbed).then(msg => {msg.delete(10000)});

  await toMute.addRole(role);
  message.channel.send(doneEmbed).then(msg => {msg.delete(10000)});
  toMute.send(mutedEmbed);
  return;
}

module.exports.help = {
  name: "mute"
}
