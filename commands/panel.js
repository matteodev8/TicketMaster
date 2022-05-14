const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('panel')
        .setDescription('Creates a ticket panel inside of an channel'),
    async execute(interaction) { 
        const panelRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('openTicket')
                    .setLabel('Open Ticket')
                    .setStyle('SUCCESS')
            );
        
        const wait = require('node:timers/promises').setTimeout;
        
        const filter = i => i.customId === 'openTicket';
        const collector = interaction.channel.createMessageComponentCollector({ filter });

        collector.on('collect', async i => {
            if (i.customId === 'openTicket') {
                await i.deferUpdate();
                await wait(250);
                await i.followUp({ content: 'Opening ticket...', ephemeral: true });
                const ticketThreadName = `ticket-${i.user.id}-${i.user.name}`
                const ticketThread = await interaction.channel.threads.create({
                    name: ticketThreadName,
                    autoArchiveDuration: 60,
                });
                const ticketThreadAdder = interaction.channel.threads.cache.find(x => x.name === ticketThreadName);
                await ticketThread.members.add(i.user.id);
            }
        });

        panelEmbed = new MessageEmbed()
            .setTitle('Open ticket')
            .setDescription('Press the green button down below to open a ticket!')
            .setColor('GREEN')
        await interaction.reply({ embeds: [panelEmbed], components: [panelRow], fetchReply: true });
    }
};