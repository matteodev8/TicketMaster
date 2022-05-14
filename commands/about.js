const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { version } = require('../package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('About the bot'),
    async execute(interaction) { 
        aboutEmbed = new MessageEmbed()
            .setTitle('About the bot')
            .setDescription('TicketMaster is a just for fun project. This bot allows you to manage support on your server much easier.')
            .addFields(
                { name: 'Version', value: version, inline: true },
                { name: 'GitHub', value: '[GitHub Page](https://github.com/xtari/TicketMaster)', inline: true },
                { name: 'Discord', value: '[Discord Server](https://discord.gg/3FqkT86kfn)', inline: true },
                { name: 'Developer', value: 'tari#1109', inline: true }
            )
        const message = await interaction.reply({ embeds: [aboutEmbed], fetchReply: true });
        message.react('❤️');
    }
};