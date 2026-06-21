require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let db;

/**
 * Conecta ao MongoDB e retorna a instância do banco de dados
 */
async function conectarDB() {
    if (!db) {
        try {
            await client.connect();
            db = client.db('DadosAssimilados');
            console.log('✅ Conectado ao MongoDB (Schema Unificado)');
        } catch (err) {
            console.error('❌ ERRO ao conectar ao MongoDB:', err);
            throw err;
        }
    }
    return db;
}

/**
 * Obtém a coleção de usuários unificada
 */
async function getUsuariosCollection() {
    const database = await conectarDB();
    return database.collection('Usuarios');
}

/**
 * Obtém ou cria o documento de um usuário
 * @param {string} userId - ID do usuário
 * @param {string} userName - Nome do usuário
 */
async function getOrCreateUser(userId, userName) {
    const collection = await getUsuariosCollection();
    
    let user = await collection.findOne({ userId });
    
    if (!user) {
        user = {
            userId,
            userName,
            guilds: {},
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await collection.insertOne(user);
    }
    
    return user;
}

/**
 * Obtém ou cria os dados de um usuário em uma guild específica
 * @param {string} userId - ID do usuário
 * @param {string} userName - Nome do usuário
 * @param {string} guildId - ID da guild
 * @param {string} guildName - Nome da guild
 */
async function getOrCreateUserGuild(userId, userName, guildId, guildName) {
    const collection = await getUsuariosCollection();
    
    const guildPath = `guilds.${guildId}`;
    
    // Busca o usuário
    let user = await collection.findOne({ userId });
    
    if (!user) {
        // Cria usuário novo com a guild
        user = {
            userId,
            userName,
            guilds: {
                [guildId]: {
                    guildName,
                    skin: {
                        skinId: 'default',
                        skinName: 'Default',
                        updatedAt: new Date()
                    },
                    decks: {
                        copas: [],
                        ouros: [],
                        espadas: [],
                        fast: [],
                        completo: []
                    },
                    fichas: []
                }
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await collection.insertOne(user);
        return user.guilds[guildId];
    }
    
    // Se o usuário existe mas não tem dados nessa guild
    if (!user.guilds || !user.guilds[guildId]) {
        await collection.updateOne(
            { userId },
            {
                $set: {
                    [`${guildPath}`]: {
                        guildName,
                        skin: {
                            skinId: 'default',
                            skinName: 'Default',
                            updatedAt: new Date()
                        },
                        decks: {
                            copas: [],
                            ouros: [],
                            espadas: [],
                            fast: [],
                            completo: []
                        },
                        fichas: []
                    },
                    updatedAt: new Date()
                }
            }
        );
        
        user = await collection.findOne({ userId });
    }
    
    return user.guilds[guildId];
}

/**
 * Atualiza a skin do usuário em uma guild
 */
async function setUserSkin(guildId, userId, userName, guildName, skinId, skinName) {
    const collection = await getUsuariosCollection();
    
    await getOrCreateUserGuild(userId, userName, guildId, guildName);
    
    await collection.updateOne(
        { userId },
        {
            $set: {
                [`guilds.${guildId}.skin`]: {
                    skinId,
                    skinName,
                    updatedAt: new Date()
                },
                userName,
                updatedAt: new Date()
            }
        }
    );
}

/**
 * Obtém a skin do usuário em uma guild
 */
async function getUserSkin(guildId, userId) {
    const collection = await getUsuariosCollection();
    const user = await collection.findOne({ userId });
    
    if (!user || !user.guilds || !user.guilds[guildId] || !user.guilds[guildId].skin) {
        return { skinId: 'default', skinName: 'Default' };
    }
    
    return user.guilds[guildId].skin;
}

/**
 * Atualiza um deck específico do usuário
 */
async function setUserDeck(guildId, userId, userName, guildName, deckType, cards) {
    const collection = await getUsuariosCollection();
    
    await getOrCreateUserGuild(userId, userName, guildId, guildName);
    
    await collection.updateOne(
        { userId },
        {
            $set: {
                [`guilds.${guildId}.decks.${deckType}`]: cards,
                userName,
                updatedAt: new Date()
            }
        }
    );
}

/**
 * Obtém um deck específico do usuário
 */
async function getUserDeck(guildId, userId, deckType) {
    const collection = await getUsuariosCollection();
    const user = await collection.findOne({ userId });
    
    if (!user || !user.guilds || !user.guilds[guildId] || !user.guilds[guildId].decks) {
        return [];
    }
    
    return user.guilds[guildId].decks[deckType] || [];
}

/**
 * Adiciona uma ficha de personagem
 */
async function addFicha(guildId, userId, userName, guildName, fichaData) {
    const collection = await getUsuariosCollection();
    
    await getOrCreateUserGuild(userId, userName, guildId, guildName);
    
    const ficha = {
        ...fichaData,
        fichaId: new Date().getTime().toString(),
        criadoEm: new Date()
    };
    
    await collection.updateOne(
        { userId },
        {
            $push: {
                [`guilds.${guildId}.fichas`]: ficha
            },
            $set: {
                userName,
                updatedAt: new Date()
            }
        }
    );
    
    return ficha;
}

/**
 * Obtém todas as fichas de um usuário em uma guild
 */
async function getUserFichas(guildId, userId) {
    const collection = await getUsuariosCollection();
    const user = await collection.findOne({ userId });
    
    if (!user || !user.guilds || !user.guilds[guildId]) {
        return [];
    }
    
    return user.guilds[guildId].fichas || [];
}

/**
 * Fecha a conexão com o banco
 */
async function closeDB() {
    if (client) {
        await client.close();
        console.log('🔌 Conexão com MongoDB fechada');
    }
}

module.exports = {
    conectarDB,
    getUsuariosCollection,
    getOrCreateUser,
    getOrCreateUserGuild,
    setUserSkin,
    getUserSkin,
    setUserDeck,
    getUserDeck,
    addFicha,
    getUserFichas,
    closeDB
};
