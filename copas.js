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
        console.log('✅ Conectado ao MongoDB(Copas)');
    } catch (err) {
        console.error('Erro ao conectar no MongoDB(Copas):', err);
    }
}

const cartasCopas = [
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

function criarEmbed(carta, cartasRestantes) {
    const embed = new EmbedBuilder();

    switch(carta.valor) {
        case 'A':
            embed.setTitle('ASSIMILAÇÃO ASTUTA - ÁS DE COPAS');
            break;
        case '2':
            embed.setTitle('ASSIMILAÇÃO DO ALTO REFLEXO - 2 DE COPAS');
            break;
        case '3':
            embed.setTitle('ASSIMILAÇÃO ATENTA - 3 DE COPAS');
            break;
        case '4':
            embed.setTitle('ASSIMILAÇÃO VIGOROSA - 4 DE COPAS');
            break;
        case '5':
            embed.setTitle('ASSIMILAÇÃO SILVESTRE - 5 DE COPAS');
            break;
        case '6':
            embed.setTitle('ASSIMILAÇÃO PUJANTE - 6 DE COPAS');
            break;
        case '7':
            embed.setTitle('ASSIMILAÇÃO IMPONENTE - 7 DE COPAS');
            break;
        case '8':
            embed.setTitle('ASSIMILAÇÃO ESGUIA - 8 DE COPAS');
            break;
        case '9':
            embed.setTitle('ASSIMILAÇÃO SENSITIVA - 9 DE COPAS');
            break;
        case '10':
            embed.setTitle('ASSIMILAÇÃO DA PRESA - 10 DE COPAS');
            break;
        case 'J':
            embed.setTitle('ASSIMILAÇÃO DE FEROMÔNIOS - VALETE DE COPAS');
            break;
        case 'Q':
            embed.setTitle('ASSIMILAÇÃO DA FLORA - DAMA DE COPAS');
            break;
        case 'K':
            embed.setTitle('ASSIMILAÇÃO DA FAUNA - REI DE COPAS');
            break;
    }

    embed.setFooter({ text: `Restam ${cartasRestantes} cartas de Copas` })
        .setImage(`attachment://${carta.imagem.split('/').pop()}`)
        .setColor(0xFF0000);

    switch(carta.valor) {
        case 'A':
            embed.setDescription(`<:0_:1349702526189961227>: +1 ponto em Sagacidade (pode ultrapassar o limite máximo).

<:0_:1349702526189961227><:0_:1349702526189961227>: Sempre que realizar um teste de Sagacidade, você pode usar 1 ponto de assimilação para adicionar 1<:2_:1349702910208114688> a face de um dado.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Sempre que realizar um teste de Infiltração, você pode ignorar 1<:1_:1349702857619804171> em um dado - requer Assimilação 3 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Sempre que realizar um teste de Sagacidade, você pode adicionar 1<:0_:1349702526189961227> à face de um dado - requer Assimilação 5 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Sempre que realizar um teste de Sagacidade, você pode substituir todas as <:2_:1349702910208114688> por <:0_:1349702526189961227> - requer Assimilação 7 para adquirir.`);
            break;
        case '2':
            embed.setDescription(`<:0_:1349702526189961227>: Adicione +1 ponto em Reação (pode ultrapassar o limite máximo).

<:0_:1349702526189961227><:0_:1349702526189961227>: Use 1 ponto de assimilação: adicione um <:2_:1349702910208114688> à face de um dado de Reação em uma rolagem.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Ignore uma <:1_:1349702857619804171> na sua primeira ação em um conflito - requer Assimilação 3 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227> : Adicione <:0_:1349702526189961227> à face de um dado de Reação - requer Assimilação 5 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227> : Pode substituir uma <:1_:1349702857619804171> por <:2_:1349702910208114688> em um dado de Reação - requer Assimilação 7 para adquirir.`);
            break;
        case '3':
            embed.setDescription(`<:0_:1349702526189961227>: Adicione +1 ponto em Percepção (pode ultrapassar o limite máximo).

<:0_:1349702526189961227><:0_:1349702526189961227>: Use 1 ponto de assimilação: adicione um <:0_:1349702526189961227> à face de um dado de Percepção em uma rolagem.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Uma vez por rodada você pode transferir um <:0_:1349702526189961227> em Percepção para um aliado sem pagar o custo de <:2_:1349702910208114688> - requer Assimilação 3 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Adicione <:2_:1349702910208114688> à face de um dado de Percepção - requer Assimilação 5 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Pode substituir uma <:2_:1349702910208114688> por <:0_:1349702526189961227> em um dado de Percepção - requer Assimilação 7 para adquirir.`);
            break;
        case '4':
            embed.setDescription(`<:0_:1349702526189961227>: Está imune aos efeitos da condição Ferido.

<:0_:1349702526189961227><:0_:1349702526189961227>: Dobra a quantidade de pontos de saúde no nível 5 (antes de morrer).

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Recupera 1 ponto de saúde extra por fase de recuperação - requer Assimilação 3 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Recebe um ponto de saúde máxima extra por nível - requer Assimilação 5 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Ignora até 2 <:1_:1349702857619804171> em dados de Resolução - requer Assimilação 7 para adquirir.`);
            break;
        case '5':
            embed.setDescription(`<:0_:1349702526189961227>: Adicione um <:0_:1349702526189961227> em um dado de Infiltração para se camuflar na vegetação.

<:0_:1349702526189961227><:0_:1349702526189961227>: Não sofre perda de Determinação por dormir ao relento.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Pode adicionar 1 <:0_:1349702526189961227> na face de um dado em testes baseados em olfato - requer Assimilação 3 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Pode se mover em velocidade normal nas copas das árvores - requer Assimilação 5 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: O Rei da Selva nunca é atacado por animais - requer Assimilação 7 para adquirir.`);
            break;
        case '6':
            embed.setDescription(`<:0_:1349702526189961227>: Pode usar <:2_:1349702910208114688> como <:0_:1349702526189961227> para ações de salto.

<:0_:1349702526189961227><:0_:1349702526189961227>: Converte <:2_:1349702910208114688> em <:0_:1349702526189961227> para deslocar objetos pesados.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Mantém um dado a mais para quebrar ou danificar objetos inanimados - requer Assimilação 3 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Pode utilizar armas improvisadas ou naturais com Prática de Armas como se fossem armas brancas - requer Assimilação 5 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Em rolagens assimiladas para testes de práticas esportivas os dados da prática não são descartados - requer Assimilação 7 para adquirir.`);
            break;
        case '7':
            embed.setDescription(`<:0_:1349702526189961227>: Adicione +1 ponto em Conhecimento Social (pode ultrapassar o limite máximo).

<:0_:1349702526189961227><:0_:1349702526189961227>: Em ações de Influência para intimidar ou demonstrar autoridade pode converter <:2_:1349702910208114688> em <:0_:1349702526189961227>.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: No início da fase de conflito pode usar um ponto de Assimilação para retirar um dado (à escolha do Assimilador) de Conflito que contenha ameaça senciente - requer Assimilação 3 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: O Líder Nato pode ceder <:0_:1349702526189961227> para anular de aliados - requer Assimilação 5 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Uma vez por Fase pode transferir um ponto de Determinação para um aliado - requer Assimilação 7 para adquirir.`);
            break;
        case '8':
            embed.setDescription(`<:0_:1349702526189961227>: Adicione +1 ponto em Prática de Infiltração (pode ultrapassar o limite máximo).

<:0_:1349702526189961227><:0_:1349702526189961227>: Se estiver se movendo furtivamente ao iniciar um Conflito, não precisa utilizar Reação na primeira rodada.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Em rolagem para evitar detecção, o esguio pode adicionar <:2_:1349702910208114688> à face de um dado de Infiltração - requer Assimilação 3 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Sempre que adicionar <:0_:1349702526189961227> para ação de Fuga em Conflito, adicione um a mais - requer Assimilação 5 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Ignora o requisito mínimo individual para Fuga coletiva de Conflito - requer Assimilação 7 para adquirir.`);
            break;
        case '9':
            embed.setDescription(`<:0_:1349702526189961227> : Consegue sentir olhares hostis mesmo sem ver a ameaça

<:0_:1349702526189961227><:0_:1349702526189961227> : Consegue sentir a presença de criaturas assimiladas em um raio de 15m

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227> : Pode usar <:2_:1349702910208114688> ou <:0_:1349702526189961227> em qualquer teste de interação social para saber o nível de Assimilação de uma criatura olhando fixamente por alguns segundos - requer Assimilação 3 para adquirir

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227> : Sempre que o Assimilador sacar uma carta do baralho de ameaças ele deve avisar isso antes ao Sensitivo - requer Assimilação 5 para adquirir

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227> : Pode mudar a ação declarada sem gastar <:2_:1349702910208114688> - requer Assimilação 7 para adquirir`);
            break;
        case '10':
            embed.setDescription(`<:0_:1349702526189961227>: Pode usar audição aguçada e gastar um ponto de Assimilação para agir com Percepção em qualquer situação em que agiria com Reação.

<:0_:1349702526189961227><:0_:1349702526189961227>: Pode usar um ponto de Assimilação para aumentar sua velocidade e manter um dado a mais em rolagem de Fuga.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Enxerga normalmente na penumbra - requer Assimilação 3 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Não pode ser rastreado - requer Assimilação 5 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Pode gastar um ponto de Assimilação e abdicar de sua próxima rolagem para cancelar uma ativação de Ameaça em um conflito - requer Assimilação 7 para adquirir.`);
            break;
        case 'J':
            embed.setDescription(`<:0_:1349702526189961227>: Conta como se tivesse um ponto a mais em Influência para atrair a atenção de criaturas da mesma espécie.

<:0_:1349702526189961227><:0_:1349702526189961227>: Feromônios de alarme transformam adaptações em sucessos em ações de intimidação.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Feromônios de trilha deixam um rastro que só pode ser seguido por aliados - requer Assimilação 3 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Feromônios de recrutamento indicam recursos na região (não precisa ser verdade), o Infectado escolhe quem capta esses sinais - requer Assimilação 5 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Feromônios de ataque custam 1 de mutação e aumentam 1d12 em todas as rolagens de Neutralização de Ameaças do Infectado e de seus aliados em cenas de conflito - requer Assimilação 7 para adquirir.`);
            break;
        case 'Q':
            embed.setDescription(`<:0_:1349702526189961227>: Adicione +1 ponto na Aptidão Conhecimento Agrário (pode ultrapassar o limite máximo).

<:0_:1349702526189961227><:0_:1349702526189961227>: Use 1 ponto de assimilação: revive vegetação morta, desde que ainda não esteja decomposta.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Consegue sentir as funções vitais da flora e curar suas enfermidades - demanda trabalho agrônomo - requer Assimilação 3 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: É capaz de realizar fotossíntese - requer Assimilação 5 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Pode acelerar em até 10 vezes o crescimento da vegetação - requer Assimilação 7 para adquirir.`);
            break;
        case 'K':
            embed.setDescription(`<:0_:1349702526189961227>: Adicione +1 ponto em Conhecimento Biológico (pode ultrapassar o limite máximo).

<:0_:1349702526189961227><:0_:1349702526189961227>: Use 1 ponto de assimilação: dobra a recuperação de saúde da criatura tocada por uma semana.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Consegue sentir as funções vitais da fauna e não é percebido como ameaça ou presa por animais - demanda trabalho agrônomo - requer Assimilação 3 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Pode domesticar animais silvestres através de um teste de Influência + Resolução - requer Assimilação 5 para adquirir.

<:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227><:0_:1349702526189961227>: Cria rebanho que o segue por conta própria testando Influência + Biológico - requer Assimilação 7 para adquirir.`);
            break;
    }

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

    const colecao = db.collection('Copas');

    // Reset das cartas
    if (message.content.toLowerCase().startsWith('a.creset')) {
        await colecao.updateOne(
            { guildId, userId },
            { $set: { guildName, userName, cartasCopasDisponiveis: [...cartasCopas] } },
            { upsert: true }
        );

        const logChannel = message.guild.channels.cache.get(LOG_CHANNEL_ID);
        if (logChannel) logChannel.send(`${message.author.tag} resetou suas cartas de Copas em ${guildName}`);
        message.reply('Suas cartas de Copas foram restauradas! Você tem 13 cartas novamente.');
        return true;
    }

    if (!message.content.toLowerCase().startsWith('a.c')) return false;

    try {
        let registro = await colecao.findOne({ guildId, userId });

        // Inicializa se não existir
        if (!registro) {
            registro = {
                guildId,
                guildName,
                userId,
                userName,
                cartasCopasDisponiveis: [...cartasCopas]
            };
            await colecao.insertOne(registro);
        }

        if (registro.cartasCopasDisponiveis.length === 0) {
            const embed = new EmbedBuilder()
                .setTitle('ASSIMILAÇÃO DE COPAS - Sem Cartas')
                .setDescription('Você não tem mais cartas disponíveis!\nUse a.creset para restaurar suas cartas.')
                .setImage('attachment://azul.png')
                .setColor(0xFFD700);
            message.channel.send({ embeds: [embed], files: ['src/Versos/azul.png'] });
            return true;
        }

        // Sorteia uma carta
        const indexAleatorio = Math.floor(Math.random() * registro.cartasCopasDisponiveis.length);
        const cartaSorteada = registro.cartasCopasDisponiveis.splice(indexAleatorio, 1)[0];

        // Atualiza banco
        await colecao.updateOne(
            { guildId, userId },
            { $set: { cartasCopasDisponiveis: registro.cartasCopasDisponiveis } }
        );

        const embed = criarEmbed(cartaSorteada, registro.cartasCopasDisponiveis.length);

        message.channel.send({ embeds: [embed], files: [cartaSorteada.imagem] });

    } catch (error) {
        console.error('Erro no comando Copas:', error);
    }

    return true;
}

module.exports = { handleCards, conectarDB };