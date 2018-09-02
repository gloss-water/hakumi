import Discord from "discord.js";
import { DateTime } from "luxon";
import config from "./config";

const simpleEmbed = (user: Discord.User, title: string) => {
    return new Discord.MessageEmbed()
        .setTitle(title)
        .addField(user.username, `${user} \n ${user.id}`)
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp(new Date());
};

const richerEmbed = (member: Discord.GuildMember, title: string) => {
    return new Discord.MessageEmbed()
        .setTitle(title)
        .setDescription(
            `${member} ${member.displayName} ${member.user.username}#${
                member.user.discriminator
            }`,
        )
        .addField(
            "Created",
            DateTime.fromMillis(member.user.createdTimestamp).toFormat(
                "yyyy LLL dd HH:mm",
            ),
            true,
        )
        .addField(
            "Joined",
            DateTime.fromMillis(member.joinedTimestamp).toFormat(
                "yyyy LLL dd HH:mm",
            ),
            true,
        )
        .addField("Roles", member.roles.array().join(" "))
        .setColor(config.color)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp(new Date());
};
//  .setDescription(message.url);

const deleteEmbed = (message: Discord.Message) => {
    const response = new Discord.MessageEmbed()
        .setTitle(
            `Message from ${message.author.username} deleted in #${
                (message.channel as Discord.TextChannel).name
            }`,
        )
        .addField("Links", `${message.author} @ ${message.channel}`)
        .setTimestamp(new Date())
        .setColor(config.color);
    // Things that may or may not exist.
    if (message.cleanContent) {
        response.addField("Deleted Text", message.cleanContent);
    }
    const attachment = message.attachments.first();
    if (attachment && attachment.proxyURL) {
        response.addField(
            "Deleted Attachment",
            `[View Attachment](${attachment.proxyURL})`,
        );
    }
    return response;
};

export { richerEmbed, deleteEmbed, simpleEmbed };