require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function migrate() {
    try {
        console.log('🔄 Iniciando migração de dados...');
        
        await client.connect();
        const db = client.db('DadosAssimilados');
        
        const usuariosCollection = db.collection('Usuarios');
        
        // Migrar skins
        console.log('📦 Migrando skins...');
        const skinsCollection = db.collection('skins');
        const skins = await skinsCollection.find({}).toArray();
        
        for (const skin of skins) {
            const { guildId, userId, skinId, skinName, userName } = skin;
            
            await usuariosCollection.updateOne(
                { userId },
                {
                    $set: {
                        userName: userName || 'Usuário',
                        [`guilds.${guildId}.skin`]: {
                            skinId: skinId || 'default',
                            skinName: skinName || 'Default',
                            updatedAt: new Date()
                        },
                        updatedAt: new Date()
                    },
                    $setOnInsert: {
                        createdAt: new Date(),
                        guilds: {}
                    }
                },
                { upsert: true }
            );
        }
        console.log(`✅ ${skins.length} skins migradas`);
        
        // Migrar baralhos - Copas
        console.log('📦 Migrando baralho Copas...');
        const copasCollection = db.collection('Copas');
        const copasDecks = await copasCollection.find({}).toArray();
        
        for (const deck of copasDecks) {
            const { guildId, guildName, userId, userName, cartasCopasDisponiveis } = deck;
            
            await usuariosCollection.updateOne(
                { userId },
                {
                    $set: {
                        userName: userName || 'Usuário',
                        [`guilds.${guildId}.guildName`]: guildName || 'Servidor',
                        [`guilds.${guildId}.decks.copas`]: cartasCopasDisponiveis || [],
                        updatedAt: new Date()
                    },
                    $setOnInsert: {
                        createdAt: new Date()
                    }
                },
                { upsert: true }
            );
        }
        console.log(`✅ ${copasDecks.length} baralhos Copas migrados`);
        
        // Migrar baralhos - Cartas (Ouros e Espadas)
        console.log('📦 Migrando baralhos Ouros e Espadas (coleção Cartas)...');
        const cartasCollection = db.collection('Cartas');
        const cartasDecks = await cartasCollection.find({}).toArray();
        
        for (const deck of cartasDecks) {
            const { guildId, guildName, userId, userName, cartasOurosDisponiveis, cartasEspadasDisponiveis } = deck;
            
            const updateFields = {
                userName: userName || 'Usuário',
                [`guilds.${guildId}.guildName`]: guildName || 'Servidor',
                updatedAt: new Date()
            };
            
            if (cartasOurosDisponiveis) {
                updateFields[`guilds.${guildId}.decks.ouros`] = cartasOurosDisponiveis;
            }
            
            if (cartasEspadasDisponiveis) {
                updateFields[`guilds.${guildId}.decks.espadas`] = cartasEspadasDisponiveis;
            }
            
            await usuariosCollection.updateOne(
                { userId },
                {
                    $set: updateFields,
                    $setOnInsert: {
                        createdAt: new Date()
                    }
                },
                { upsert: true }
            );
        }
        console.log(`✅ ${cartasDecks.length} registros de Cartas (Ouros/Espadas) migrados`);
        
        // Migrar baralhos - Fast
        console.log('📦 Migrando baralho Fast...');
        const fastCollection = db.collection('Fast');
        const fastDecks = await fastCollection.find({}).toArray();
        
        for (const deck of fastDecks) {
            const { guildId, guildName, userId, userName, cartasFastDisponiveis } = deck;
            
            await usuariosCollection.updateOne(
                { userId },
                {
                    $set: {
                        userName: userName || 'Usuário',
                        [`guilds.${guildId}.guildName`]: guildName || 'Servidor',
                        [`guilds.${guildId}.decks.fast`]: cartasFastDisponiveis || [],
                        updatedAt: new Date()
                    },
                    $setOnInsert: {
                        createdAt: new Date()
                    }
                },
                { upsert: true }
            );
        }
        console.log(`✅ ${fastDecks.length} baralhos Fast migrados`);
        
        // Migrar baralhos - Completo
        console.log('📦 Migrando baralho Completo...');
        const completoCollection = db.collection('Completo');
        const completoDecks = await completoCollection.find({}).toArray();
        
        for (const deck of completoDecks) {
            const { guildId, guildName, userId, userName, cartasBDisponiveis } = deck;
            
            await usuariosCollection.updateOne(
                { userId },
                {
                    $set: {
                        userName: userName || 'Usuário',
                        [`guilds.${guildId}.guildName`]: guildName || 'Servidor',
                        [`guilds.${guildId}.decks.completo`]: cartasBDisponiveis || [],
                        updatedAt: new Date()
                    },
                    $setOnInsert: {
                        createdAt: new Date()
                    }
                },
                { upsert: true }
            );
        }
        console.log(`✅ ${completoDecks.length} baralhos Completo migrados`);
        
        // Migrar fichas (collections por guild: Fichas_{guildId})
        console.log('📦 Migrando fichas...');
        const collections = await db.listCollections().toArray();
        const fichaCollections = collections.filter(c => c.name.startsWith('Fichas_'));
        
        let totalFichas = 0;
        for (const fichaCol of fichaCollections) {
            const guildId = fichaCol.name.replace('Fichas_', '');
            const fichasCollection = db.collection(fichaCol.name);
            const fichas = await fichasCollection.find({}).toArray();
            
            for (const ficha of fichas) {
                const { userId, userName, ...fichaData } = ficha;
                
                await usuariosCollection.updateOne(
                    { userId },
                    {
                        $push: {
                            [`guilds.${guildId}.fichas`]: {
                                ...fichaData,
                                fichaId: ficha._id?.toString() || new Date().getTime().toString(),
                                criadoEm: ficha.criadoEm || new Date()
                            }
                        },
                        $set: {
                            userName: userName || 'Usuário',
                            updatedAt: new Date()
                        },
                        $setOnInsert: {
                            createdAt: new Date()
                        }
                    },
                    { upsert: true }
                );
                totalFichas++;
            }
        }
        console.log(`✅ ${totalFichas} fichas migradas`);
        
        console.log('\n🎉 Migração concluída com sucesso!');
        console.log('\n📊 Resumo da migração:');
        console.log(`   - Skins migradas: ${skins.length}`);
        console.log(`   - Baralhos Copas: ${copasDecks.length}`);
        console.log(`   - Registros Cartas (Ouros/Espadas): ${cartasDecks.length}`);
        console.log(`   - Baralhos Fast: ${fastDecks.length}`);
        console.log(`   - Baralhos Completo: ${completoDecks.length}`);
        console.log(`   - Fichas migradas: ${totalFichas}`);
        
        console.log('\n⚠️  IMPORTANTE: Após verificar que tudo está funcionando, você pode remover as coleções antigas:');
        console.log('   - skins');
        console.log('   - Copas');
        console.log('   - Cartas (Ouros/Espadas)');
        console.log('   - Fast');
        console.log('   - Completo');
        console.log('   - Fichas_{guildId}');
        
    } catch (error) {
        console.error('❌ Erro durante a migração:', error);
    } finally {
        await client.close();
        console.log('🔌 Conexão fechada');
    }
}

// Executar migração se chamado diretamente
if (require.main === module) {
    migrate();
}

module.exports = { migrate };
