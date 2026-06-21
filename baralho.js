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
        console.log('✅ Conectado ao MongoDB(Baralho Completo)');
    } catch (err) {
        console.error('Erro ao conectar no MongoDB(Baralho Completo):', err);
    }
}

const cartasB = [
    // Paus (P)
    { valor: 'A', naipe: 'Paus', nome: 'Ás de Paus', imagem: 'src/Cartas/AP.png'},
    { valor: '2', naipe: 'Paus', nome: '2 de Paus', imagem: 'src/Cartas/2p.png'},
    { valor: '3', naipe: 'Paus', nome: '3 de Paus', imagem: 'src/Cartas/3p.png'},
    { valor: '4', naipe: 'Paus', nome: '4 de Paus', imagem: 'src/Cartas/4p.png'},
    { valor: '5', naipe: 'Paus', nome: '5 de Paus', imagem: 'src/Cartas/5p.png'},
    { valor: '6', naipe: 'Paus', nome: '6 de Paus', imagem: 'src/Cartas/6p.png'},
    { valor: '7', naipe: 'Paus', nome: '7 de Paus', imagem: 'src/Cartas/7p.png'},
    { valor: '8', naipe: 'Paus', nome: '8 de Paus', imagem: 'src/Cartas/8p.png'},
    { valor: '9', naipe: 'Paus', nome: '9 de Paus', imagem: 'src/Cartas/9p.png'},
    { valor: '10', naipe: 'Paus', nome: '10 de Paus', imagem: 'src/Cartas/10p.png'},
    { valor: 'J', naipe: 'Paus', nome: 'Valete de Paus', imagem: 'src/Cartas/JP.png'},
    { valor: 'Q', naipe: 'Paus', nome: 'Dama de Paus', imagem: 'src/Cartas/QP.png'},
    { valor: 'K', naipe: 'Paus', nome: 'Rei de Paus', imagem: 'src/Cartas/KP.png'},

    // Ouros (O)
    { valor: 'A', naipe: 'Ouros', nome: 'Ás de Ouros', imagem: 'src/Cartas/AO.png'},
    { valor: '2', naipe: 'Ouros', nome: '2 de Ouros', imagem: 'src/Cartas/2o.png'},
    { valor: '3', naipe: 'Ouros', nome: '3 de Ouros', imagem: 'src/Cartas/3o.png'},
    { valor: '4', naipe: 'Ouros', nome: '4 de Ouros', imagem: 'src/Cartas/4o.png'},
    { valor: '5', naipe: 'Ouros', nome: '5 de Ouros', imagem: 'src/Cartas/5o.png'},
    { valor: '6', naipe: 'Ouros', nome: '6 de Ouros', imagem: 'src/Cartas/6o.png'},
    { valor: '7', naipe: 'Ouros', nome: '7 de Ouros', imagem: 'src/Cartas/7o.png'},
    { valor: '8', naipe: 'Ouros', nome: '8 de Ouros', imagem: 'src/Cartas/8o.png'},
    { valor: '9', naipe: 'Ouros', nome: '9 de Ouros', imagem: 'src/Cartas/9o.png'},
    { valor: '10', naipe: 'Ouros', nome: '10 de Ouros', imagem: 'src/Cartas/10o.png'},
    { valor: 'J', naipe: 'Ouros', nome: 'Valete de Ouros', imagem: 'src/Cartas/JO.png'},
    { valor: 'Q', naipe: 'Ouros', nome: 'Dama de Ouros', imagem: 'src/Cartas/QO.png'},
    { valor: 'K', naipe: 'Ouros', nome: 'Rei de Ouros', imagem: 'src/Cartas/KO.png'},

    // Espadas (E)
    { valor: 'A', naipe: 'Espadas', nome: 'Ás de Espadas', imagem: 'src/Cartas/AE.png'},
    { valor: '2', naipe: 'Espadas', nome: '2 de Espadas', imagem: 'src/Cartas/2e.png'},
    { valor: '3', naipe: 'Espadas', nome: '3 de Espadas', imagem: 'src/Cartas/3e.png'},
    { valor: '4', naipe: 'Espadas', nome: '4 de Espadas', imagem: 'src/Cartas/4e.png'},
    { valor: '5', naipe: 'Espadas', nome: '5 de Espadas', imagem: 'src/Cartas/5e.png'},
    { valor: '6', naipe: 'Espadas', nome: '6 de Espadas', imagem: 'src/Cartas/6e.png'},
    { valor: '7', naipe: 'Espadas', nome: '7 de Espadas', imagem: 'src/Cartas/7e.png'},
    { valor: '8', naipe: 'Espadas', nome: '8 de Espadas', imagem: 'src/Cartas/8e.png'},
    { valor: '9', naipe: 'Espadas', nome: '9 de Espadas', imagem: 'src/Cartas/9e.png'},
    { valor: '10', naipe: 'Espadas', nome: '10 de Espadas', imagem: 'src/Cartas/10e.png'},
    { valor: 'J', naipe: 'Espadas', nome: 'Valete de Espadas', imagem: 'src/Cartas/JE.png'},
    { valor: 'Q', naipe: 'Espadas', nome: 'Dama de Espadas', imagem: 'src/Cartas/QE.png'},
    { valor: 'K', naipe: 'Espadas', nome: 'Rei de Espadas', imagem: 'src/Cartas/KE.png'},

    // Copas (C)
    { valor: 'A', naipe: 'Copas', nome: 'Ás de Copas', imagem: 'src/Cartas/AC.png'},
    { valor: '2', naipe: 'Copas', nome: '2 de Copas', imagem: 'src/Cartas/2c.png'},
    { valor: '3', naipe: 'Copas', nome: '3 de Copas', imagem: 'src/Cartas/3c.png'},
    { valor: '4', naipe: 'Copas', nome: '4 de Copas', imagem: 'src/Cartas/4c.png'},
    { valor: '5', naipe: 'Copas', nome: '5 de Copas', imagem: 'src/Cartas/5c.png'},
    { valor: '6', naipe: 'Copas', nome: '6 de Copas', imagem: 'src/Cartas/6c.png'},
    { valor: '7', naipe: 'Copas', nome: '7 de Copas', imagem: 'src/Cartas/7c.png'},
    { valor: '8', naipe: 'Copas', nome: '8 de Copas', imagem: 'src/Cartas/8c.png'},
    { valor: '9', naipe: 'Copas', nome: '9 de Copas', imagem: 'src/Cartas/9c.png'},
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

    const colecao = db.collection('Completo');

    // Reset das cartas
    if (message.content.toLowerCase().startsWith('a.breset')) {
        await colecao.updateOne(
            { guildId, userId },
            { $set: { guildName, userName, cartasBDisponiveis: [...cartasB] } },
            { upsert: true }
        );

        const logChannel = message.guild.channels.cache.get(LOG_CHANNEL_ID);
        if (logChannel) logChannel.send(`${message.author.tag} resetou suas cartas de B em ${guildName}`);
        message.reply('Suas cartas do baralho foram resetados! Você tem 52 cartas novamente.');
        return true;
    }

    if (!message.content.toLowerCase().startsWith('a.b')) return false;

    try {
        let registro = await colecao.findOne({ guildId, userId });

        // Inicializa se não existir
        if (!registro) {
            registro = {
                guildId,
                guildName,
                userId,
                userName,
                cartasBDisponiveis: [...cartasB]
            };
            await colecao.insertOne(registro);
        }

        if (registro.cartasBDisponiveis.length === 0) {
            const embed = new EmbedBuilder()
                .setTitle('BARALHO COMPLETO - Sem Cartas')
                .setDescription('Você não tem mais cartas disponíveis!\nUse a.ereset para restaurar suas cartas.')
                .setImage('attachment://azul.png')
                .setColor(0xFFD700);
            message.channel.send({ embeds: [embed], files: ['src/Versos/azul.png'] });
            return true;
        }

        // Sorteia uma carta
        const indexAleatorio = Math.floor(Math.random() * registro.cartasBDisponiveis.length);
        const cartaSorteada = registro.cartasBDisponiveis.splice(indexAleatorio, 1)[0];

        // Atualiza banco
        await colecao.updateOne(
            { guildId, userId },
            { $set: { cartasBDisponiveis: registro.cartasBDisponiveis } }
        );

        const embed = criarEmbed(cartaSorteada, registro.cartasBDisponiveis.length);

        message.channel.send({ embeds: [embed], files: [cartaSorteada.imagem] });

    } catch (error) {
        console.error('Erro no comando Baralho Completo:', error);
    }

    return true;
}

module.exports = { handleCards, conectarDB };