const LOG_CHANNEL_ID = '1387454472472756374';
const { EmbedBuilder } = require('discord.js');
const { setUserDeck, getUserDeck } = require('../database');

// Cartas de Copas
const cartasCopas = require('../../attached_assets/copas_1759516785499.js').cartasCopas || [
    { valor: 'A', nome: 'Ás', imagem: 'src/copas/A.png'},
    { valor: '2', nome: 'Dois', imagem: 'src/copas/2.png'},
    { valor: '3', nome: 'Três', imagem: 'src/copas/3.png'},
    { valor: '4', nome: 'Quatro', imagem: 'src/copas/4.png'},
    { valor: '5', nome: 'Cinco', imagem: 'src/copas/5.png'},
    { valor: '6', nome: 'Seis', imagem: 'src/copas/6.png'},
    { valor: '7', nome: 'Sete', imagem: 'src/copas/7.png'},
    { valor: '8', nome: 'Oito', imagem: 'src/copas/8.png'},
    { valor: '9', nome: 'Nove', imagem: 'src/copas/9.png'},
    { valor: '10', nome: 'Dez', imagem: 'src/copas/10.png'},
    { valor: 'J', nome: 'Valete', imagem: 'src/copas/J.png'},
    { valor: 'Q', nome: 'Dama', imagem: 'src/copas/Q.png'},
    { valor: 'K', nome: 'Rei', imagem: 'src/copas/k.png'}
];

// Importar função de criar embed do arquivo original
const { criarEmbed } = require('../../attached_assets/copas_1759516785499.js');

async function handleCards(message) {
    if (!message.guild) {
        console.log(`Comando de cartas ignorado em DM de ${message.author.tag}.`);
        return false;
    }

    const userId = message.author.id;
    const userName = message.author.username;
    const guildId = message.guild.id;
    const guildName = message.guild.name;

    // Reset das cartas
    if (message.content.toLowerCase().startsWith('a.creset')) {
        await setUserDeck(guildId, userId, userName, guildName, 'copas', [...cartasCopas]);

        const logChannel = message.guild.channels.cache.get(LOG_CHANNEL_ID);
        if (logChannel) logChannel.send(`${message.author.tag} resetou suas cartas de Copas em ${guildName}`);
        message.reply('Suas cartas de Copas foram restauradas! Você tem 13 cartas novamente.');
        return true;
    }

    if (!message.content.toLowerCase().startsWith('a.c')) return false;

    try {
        let cartasDisponiveis = await getUserDeck(guildId, userId, 'copas');

        // Inicializa se não existir
        if (cartasDisponiveis.length === 0) {
            cartasDisponiveis = [...cartasCopas];
            await setUserDeck(guildId, userId, userName, guildName, 'copas', cartasDisponiveis);
        }

        if (cartasDisponiveis.length === 0) {
            const embed = new EmbedBuilder()
                .setTitle('ASSIMILAÇÃO DE COPAS - Sem Cartas')
                .setDescription('Você não tem mais cartas disponíveis!\nUse a.creset para restaurar suas cartas.')
                .setImage('attachment://azul.png')
                .setColor(0xFFD700);
            message.channel.send({ embeds: [embed], files: ['src/Versos/azul.png'] });
            return true;
        }

        // Sorteia uma carta
        const indexAleatorio = Math.floor(Math.random() * cartasDisponiveis.length);
        const cartaSorteada = cartasDisponiveis.splice(indexAleatorio, 1)[0];

        // Atualiza banco
        await setUserDeck(guildId, userId, userName, guildName, 'copas', cartasDisponiveis);

        const embed = criarEmbed(cartaSorteada, cartasDisponiveis.length);

        message.channel.send({ embeds: [embed], files: [cartaSorteada.imagem] });

    } catch (error) {
        console.error('Erro no comando Copas:', error);
    }

    return true;
}

module.exports = { handleCards };
