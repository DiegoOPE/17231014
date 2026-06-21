const LOG_CHANNEL_ID = '1387520529065312256'; // Use o ID do seu canal de log
// IMPORTANTE: MANTENHA O SEU ARQUIVO config.js NO PROJETO!
const { getUserSkin, getEmoji } = require('./config');
const { EmbedBuilder } = require('discord.js');


// --- FUNÇÃO AUXILIAR: Envio de Log ---
async function enviarLog(client, source) {
    const isInteraction = source.type === 'interaction';
    // Pega o objeto base: interaction (para slash) ou message (para prefixo)
    const baseObject = isInteraction ? source.interaction : source;

    // Garante que temos um objeto de usuário válido
    const user = baseObject.user || baseObject.author;
    if (!user) {
        console.error('❌ Não foi possível extrair o usuário para o log.');
        return;
    }

    const content = isInteraction ? source.roll : baseObject.content;
    const msgContent = content || 'Sem conteúdo de rolagem';
    const guildName = baseObject.guild?.name || 'DM';
    const channelName = baseObject.channel?.name || 'DM';
    const channelId = baseObject.channel?.id || 'N/A';

    try {
        const logChannel = await client.channels.fetch(LOG_CHANNEL_ID);
        if (!logChannel) {
            console.error('❌ Canal de log não encontrado! ID:', LOG_CHANNEL_ID);
            return;
        }

        const logMessage =
            `--------------------------------------------------\n` +
            `Usuario: **${user.tag}** (${user.id})\n` +
            `Msg: **${msgContent}** \n` +
            `Server: **${guildName}** \n` +
            `Canal: **${channelName}** (ID: ${channelId})\n` +
            `Tipo: **${isInteraction ? 'Slash Command' : 'Message (Obsoleto)'}**\n` +
            `--------------------------------------------------`;

        await logChannel.send(logMessage);
    } catch (error) {
        console.error('Erro ao enviar log:', error);
    }
}


// --- FUNÇÃO AUXILIAR: Cálculo do Contador ---
function calcularContador(todosEmojis) {
    let totalS = 0;
    let totalA = 0;
    let totalP = 0;

    todosEmojis.forEach(emoji => {
        if (typeof emoji !== 'string' || emoji.startsWith('?(')) return;

        // Lógica de S
        if (emoji.includes('SSP')) {
            totalS += 2;
            totalP += 1;
        } else if (emoji.includes('SAP')) {
            totalS += 1;
            totalA += 1;
            totalP += 1;
        } else if (emoji.includes('SAAP')) {
            totalS += 1;
            totalA += 2;
            totalP += 1;
        } else if (emoji.includes('SS')) {
            totalS += 2;
        } else if (emoji.includes('SA')) {
            totalS += 1;
            totalA += 1;
        } else if (emoji.includes('S')) {
            totalS += 1;
        }

        // Lógica de P
        if (emoji.includes('PP')) {
            totalP += 2;
        } else if (emoji.includes('PA') && !emoji.includes('SAP') && !emoji.includes('SAAP')) {
            totalP += 1;
            totalA += 1;
        } else if (
            emoji.includes('P') &&
            !emoji.includes('PP') &&
            !emoji.includes('PA') &&
            !emoji.includes('SSP') &&
            !emoji.includes('SAP') &&
            !emoji.includes('SAAP')
        ) {
            totalP += 1;
        }

        // Lógica de A
        if (
            emoji.includes('A') &&
            !emoji.includes('PA') &&
            !emoji.includes('SA') &&
            !emoji.includes('SAP') &&
            !emoji.includes('SAAP')
        ) {
            totalA += 1;
        }
    });

    // Retorna a string do contador com os emojis
    return `<:AS:1422741535048470598>: ${totalS} | <:AA:1423017100192256073>: ${totalA} | <:AP:1423017120073125990>: ${totalP}`;
}


// --- FUNÇÃO PRINCIPAL: handleDiceRoll (CALCULA E SEPARA) ---
async function handleDiceRoll(client, source) {
    if (!source || (!source.interaction && !source.author)) {
        console.error('Erro: Objeto "source" inválido ou não fornecido.');
        return { dados: 'Erro interno: A fonte do comando é inválida.', contador: null };
    }

    const isInteraction = source.type === 'interaction';
    const baseObject = isInteraction ? source.interaction : source;

    const content = isInteraction ? source.roll : baseObject.content;
    const user = baseObject.user || baseObject.author;
    const guild = baseObject.guild;

    if (!user || user.bot) return { dados: 'Erro: bot não pode rolar dados.', contador: null };

    // Envia o log ANTES da rolagem
    await enviarLog(client, source);

    if (!content) {
        return { dados: 'Comando de rolagem inválido. Conteúdo não encontrado.', contador: null };
    }

    const regex = /(\d{1,2})d(6|10|12)/gi;
    const matches = content.match(regex);

    if (matches) {
        let totalDados = 0;
        matches.forEach(match => {
            const [quantidadeStr] = match.split('d');
            totalDados += parseInt(quantidadeStr);
        });

        if (totalDados > 60) {
            return { dados: 'Mano... Cê precisa mesmo de tanto dado? 😅 (Máximo: 60)', contador: null };
        }

        const resultados = [];
        const todosEmojis = [];

        // Buscar a skin do usuário
        const userSkin = await getUserSkin(guild?.id, user.id);

        for (const match of matches) {
            const [quantidadeStr, tipoDadoStr] = match.split('d');
            const quantidade = parseInt(quantidadeStr);
            const tipoDado = parseInt(tipoDadoStr);

            const resultadoRolagem = [];

            for (let i = 0; i < quantidade; i++) {
                const numero = Math.floor(Math.random() * tipoDado) + 1;
                let emoji;

                if ([6, 10, 12].includes(tipoDado)) {
                    emoji = getEmoji(userSkin, tipoDado, numero);
                }

                const resultadoFinal = emoji || `?(${numero})`;
                resultadoRolagem.push(resultadoFinal);

                if (emoji) {
                    todosEmojis.push(emoji);
                }
            }

            resultados.push(resultadoRolagem.join(' '));
        }

        let mensagemFinal = resultados.join('\n');

        if (!mensagemFinal || mensagemFinal.trim() === '') {
            mensagemFinal = 'Não foi possível gerar a mensagem de rolagem.';
        } else if (mensagemFinal.length > 2000) {
            mensagemFinal = `Os resultados excedem o limite de caracteres. Por favor, role menos dados.`;
        }

        const contadorString = calcularContador(todosEmojis);

        // NENHUMA CHAMADA DE interaction.reply/deferReply AQUI - APENAS RETORNO
        return { dados: mensagemFinal, contador: contadorString };
    }

    return { dados: 'Comando de rolagem inválido. Use NdY (ex: 3d10).', contador: null };
}

module.exports = {
    handleDiceRoll,
    enviarLog
};