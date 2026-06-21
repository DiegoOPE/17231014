const LOG_CHANNEL_ID = '1387454472472756374';
const { EmbedBuilder } = require('discord.js');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let db;

// Conecta no banco ao iniciar
async function conectarDB() {
    try {
        await client.connect();
        db = client.db('DadosAssimilados'); // Substitua pelo nome do seu banco
        console.log('✅ Conectado ao MongoDB(Fast)');
    } catch (err) {
        console.error('Erro ao conectar no MongoDB(Fast):', err);
    }
}

const cartasFast = [
    // Paus (P)
    { valor: '10', naipe: 'Paus', nome: '10 de Paus', imagem: 'src/Cartas/10p.png'},
    { valor: 'J', naipe: 'Paus', nome: 'Valete de Paus', imagem: 'src/Cartas/JP.png'},
    { valor: 'Q', naipe: 'Paus', nome: 'Dama de Paus', imagem: 'src/Cartas/QP.png'},
    { valor: 'K', naipe: 'Paus', nome: 'Rei de Paus', imagem: 'src/Cartas/KP.png'},

    // Ouros (O)
    { valor: '10', naipe: 'Ouros', nome: '10 de Ouros', imagem: 'src/Cartas/10o.png'},
    { valor: 'J', naipe: 'Ouros', nome: 'Valete de Ouros', imagem: 'src/Cartas/JO.png'},
    { valor: 'Q', naipe: 'Ouros', nome: 'Dama de Ouros', imagem: 'src/Cartas/QO.png'},
    { valor: 'K', naipe: 'Ouros', nome: 'Rei de Ouros', imagem: 'src/Cartas/KO.png'},

    // Espadas (E)
    { valor: '10', naipe: 'Espadas', nome: '10 de Espadas', imagem: 'src/Cartas/10e.png'},
    { valor: 'J', naipe: 'Espadas', nome: 'Valete de Espadas', imagem: 'src/Cartas/JE.png'},
    { valor: 'Q', naipe: 'Espadas', nome: 'Dama de Espadas', imagem: 'src/Cartas/QE.png'},
    { valor: 'K', naipe: 'Espadas', nome: 'Rei de Espadas', imagem: 'src/Cartas/KE.png'},

    // Copas (C)
    { valor: '10', naipe: 'Copas', nome: '10 de Copas', imagem: 'src/Cartas/10c.png'},
    { valor: 'J', naipe: 'Copas', nome: 'Valete de Copas', imagem: 'src/Cartas/JC.png'},
    { valor: 'Q', naipe: 'Copas', nome: 'Dama de Copas', imagem: 'src/Cartas/QC.png'},
    { valor: 'K', naipe: 'Copas', nome: 'Rei de Copas', imagem: 'src/Cartas/KC.png'}
];

function criarEmbed(carta, cartasRestantes) {
    const embed = new EmbedBuilder()
        .setTitle(carta.nome.toUpperCase())
        .setFooter({ text: `Restam ${cartasRestantes} cartas no baralho` })
        .setImage(`attachment://${carta.imagem.split('/').pop()}`)
        .setColor(0xffffff);

    return embed;
}

async function handleCards(message) {

    // 1. VERIFICAR SE É UMA DM
    // Se a mensagem for uma DM, saia da função imediatamente.
    if (!message.guild) {
        // Você pode adicionar um log para saber que o comando foi ignorado em DM
        console.log(`Comando de cartas ignorado em DM de ${message.author.tag}.`);
        return false;
    }

    if (!db) await conectarDB();

    const userId = message.author.id;
    const userName = message.author.username;
    const guildId = message.guild.id;
    const guildName = message.guild.name;

    const colecao = db.collection('Fast');

    // Reset das cartas
    if (message.content.toLowerCase().startsWith('a.freset')) {
        await colecao.updateOne(
            { guildId, userId },
            { $set: { guildName, userName, cartasFastDisponiveis: [...cartasFast] } },
            { upsert: true }
        );

        const logChannel = message.guild.channels.cache.get(LOG_CHANNEL_ID);
        if (logChannel) logChannel.send(`${message.author.tag} resetou suas cartas do Fastlay em ${guildName}`);
        message.reply('Suas cartas FastPlay foram restauradas! Você tem 16 cartas novamente.');
        return true;
    }

    if (!message.content.toLowerCase().startsWith('a.f')) return false;

    try {
        let registro = await colecao.findOne({ guildId, userId });

        // Inicializa se não existir
        if (!registro) {
            registro = {
                guildId,
                guildName,
                userId,
                userName,
                cartasFastDisponiveis: [...cartasFast]
            };
            await colecao.insertOne(registro);
        }

        if (registro.cartasFastDisponiveis.length === 0) {
            const embed = new EmbedBuilder()
                .setTitle('FASTPLAY - Sem Cartas')
                .setDescription('Você não tem mais cartas disponíveis!\nUse a.creset para restaurar suas cartas.')
                .setImage('attachment://azul.png')
                .setColor(0xFFD700);
            message.channel.send({ embeds: [embed], files: ['src/Versos/azul.png'] });
            return true;
        }

        // Sorteia uma carta
        const indexAleatorio = Math.floor(Math.random() * registro.cartasFastDisponiveis.length);
        const cartaSorteada = registro.cartasFastDisponiveis.splice(indexAleatorio, 1)[0];

        // Atualiza banco
        await colecao.updateOne(
            { guildId, userId },
            { $set: { cartasFastDisponiveis: registro.cartasFastDisponiveis } }
        );

        const embed = criarEmbed(cartaSorteada, registro.cartasFastDisponiveis.length);

        message.channel.send({ embeds: [embed], files: [cartaSorteada.imagem] });

    } catch (error) {
        console.error('Erro no comando Fast:', error);
    }

    return true;
}

module.exports = { handleCards, conectarDB };