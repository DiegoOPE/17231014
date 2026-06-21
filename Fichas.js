const LOG_CHANNEL_ID = '1387454472472756374';
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let db;

// Conecta no banco ao iniciar
async function conectarDB() {
    try {
        await client.connect();
        db = client.db('DadosAssimilados'); // Substitua pelo nome do seu banco
        console.log('✅ Conectado ao MongoDB(Fichas)');
    } catch (err) {
        console.error('Erro ao conectar no MongoDB(Fichas):', err);
    }
}

async function handleCards(message) {
    if (!db) await conectarDB();

    const userId = message.author.id;
    const userName = message.author.username;
    const guildId = message.guild.id;
    const guildName = message.guild.name;

    const colecao = db.collection('Ficahs');