/**
 * Função que trata o comando de ajuda.
 * Envia a mensagem de ajuda completa em formato de string.
 * @param {import('discord.js').Message} message O objeto da mensagem original do Discord.
 * @param {string[]} args A lista de argumentos passados (será ignorada).
 */
function handleHelp(message, args) {
    // Definimos a mensagem completa como uma string formatada em Markdown
    const helpMessage = `
# Ajuda e Comandos
## Dados Assimilados BOT

O BOT foi pensado para amenizar as consultas de tabelas do sistema, o Dados Assimilados tem os dados facetados e baralhos personalizados.

### Dados
**SKINS DOS DADOS**
\`/skin\` -> Para escolher a skin dos dados
(Você pode escolher a skin dos dados utilizando o comando "/skin" e selecionando a skin correspondente.)

\`/rolar\` -> Para realizar teste de dados
**Considerando X = quantidade de dados pretendidos**
\`Xd6\` -> Para rodar dados facetados de 6 faces.
\`Xd10\` -> Para rodar dados facetados de 10 faces.
\`Xd12\` -> Para rodar dados facetados de 12 faces.

Também pode rodar dados compostos utilizando "+"
Por exemplo: \`2d6+1d10\`

### Baralhos
O bot também conta com diversos baralhos diversos e personalizados, segue a lista de comandos.
\`/cartas <tipo>\` -> Puxar uma carta do seu Baralho escolhido
\`/reset <tipo>\` -> Resetar as cartas do Baralho escolhido

**ASSIMILAÇÕES EVOLUTIVAS  (Copas)**
**ASSIMILAÇÕES ADAPTATIVAS (Ouros)**
**ASSIMILAÇÕES INOPORTUNAS (Espadas)**
**BARALHO FASTPLAY**
**BARALHO COMPLETO**
`;

    // Apenas envia a mensagem de texto formatada
    return message.reply(helpMessage);
}

module.exports = { handleHelp };