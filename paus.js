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
        console.log('✅ Conectado ao MongoDB(Paus)');
    } catch (err) {
        console.error('Erro ao conectar no MongoDB(Paus):', err);
    }
}

const cartasPaus = [
    { valor: 'A', nome: 'Ás', imagem: 'src/Paus/A.png'},
    { valor: '2', nome: 'Dois', imagem: 'src/Paus/2.png'},
    { valor: '3', nome: 'Três', imagem: 'src/Paus/3.png'},
    { valor: '4', nome: 'Quatro', imagem: 'src/Paus/4.png'},
    { valor: '5', nome: 'Cinco', imagem: 'src/Paus/5.png'},
    { valor: '6', nome: 'Seis', imagem: 'src/Paus/6.png'},
    { valor: '7', nome: 'Sete', imagem: 'src/Paus/7.png'},
    { valor: '8', nome: 'Oito', imagem: 'src/Paus/8.png'},
    { valor: '9', nome: 'Nove', imagem: 'src/Paus/9.png'},
    { valor: '10', nome: 'Dez', imagem: 'src/Paus/10.png'},
    { valor: 'J', nome: 'Valete', imagem: 'src/Paus/J.png'},
    { valor: 'Q', nome: 'Dama', imagem: 'src/Paus/Q.png'},
    { valor: 'K', nome: 'Rei', imagem: 'src/Paus/K.png'}
];

function criarEmbed(carta, cartasRestantes) {
    const embed = new EmbedBuilder();

    switch(carta.valor) {
        case 'A':
            embed.setTitle('ASSIMILAÇÃO DO BOSQUE - ÁS DE PAUS');
            break;
        case '2':
            embed.setTitle('ASSIMILAÇÃO CAMPINA - 2 DE PAUS');
            break;
        case '3':
            embed.setTitle('ASSIMILAÇÃO CERRADO - 3 DE PAUS');
            break;
        case '4':
            embed.setTitle('ASSIMILAÇÃO COLINA - 4 DE PAUS');
            break;
        case '5':
            embed.setTitle('ASSIMILAÇÃO DESERTICA - 5 DE PAUS');
            break;
        case '6':
            embed.setTitle('ASSIMILAÇÃO FLORESTAL - 6 DE PAUS');
            break;
        case '7':
            embed.setTitle('ASSIMILAÇÃO MANGUEZAL - 7 DE PAUS');
            break;
        case '8':
            embed.setTitle('ASSIMILAÇÃO MARINHA - 8 DE PAUS');
            break;
        case '9':
            embed.setTitle('ASSIMILAÇÃO MONTANHA - 9 DE PAUS');
            break;
        case '10':
            embed.setTitle('ASSIMILAÇÃO PÂNTANO - 10 DE PAUS');
            break;
        case 'J':
            embed.setTitle('ASSIMILAÇÃO CAATINGA - VALETE DE PAUS');
            break;
        case 'Q':
            embed.setTitle('ASSIMILAÇÃO SUBTERRÂNEA - DAMA DE PAUS');
            break;
        case 'K':
            embed.setTitle('ASSIMILAÇÃO TUNDRA - REI DE PAUS');
            break;
    }

    embed.setFooter({ text: `Restam ${cartasRestantes} cartas de Paus` })
        .setImage(`attachment://${carta.imagem.split('/').pop()}`)
        .setColor(0x580068);

switch(carta.valor) {
    case 'A':
        embed.setDescription(`<:AA:1423017100192256073><:AS:1422741535048470598> — Embaúba
A cada hora imóvel com os pés ou mãos em contato direto com vegetação viva ou solo úmido, entra em estado de simbiose e regenera 1 ponto de Saúde <:SM:1423452861236379770>. Dobra todo dano sofrido nesse período. Sofrer dano interrompe o efeito.

<:AS:1422741535048470598><:AP:1423017120073125990> — Eucalyptus
Se for reduzido aos <:SA:1423452896141512866> níveis 1 ou 2 de Saúde, o Infectado pode optar por permanecer imóvel por 6 horas em contato com solo fértil para habilitar sua recuperação como se estivesse no <:SA:1423452896141512866> nível 3. Se for interrompido durante o processo, qualquer teste de *__Medicina__* para viabilizar a Recuperação receberá <:AP:1423017120073125990> adicional no resultado.

<:AA:1423017100192256073><:AP:1423017120073125990> — Araucária
Se passar mais de 24 horas sem contato direto com vegetação viva ou solo fértil, o Infectado sofre uma penalidade de <:AS:1422741535048470598> em todo teste que inclua *__Sobrevivência__* até restabelecer esse contato por pelo menos 1 hora.`);
        break;
    case '2':
        embed.setDescription(`<:AA:1423017100192256073><:AS:1422741535048470598> — Alecrim
Durante o dia, enquanto estiver exposto à luz solar direta por pelo menos 1 hora, pode gastar 1 ponto de Determinação <:PD:1423112067464040510> para dispensar a necessidade de alimentação e água por 24 horas. Esse efeito não se acumula e é anulado por ambientes sem luz natural (interiores, subsolo ou neblina densa).

<:AS:1422741535048470598><:AP:1423017120073125990> — Cágado
A epiderme do Infectado se torna parcialmente transparente para otimizar a absorção solar. Enquanto exposto ao sol, recupera um ponto de Saúde <:SM:1423452861236379770> por cena automaticamente. Contudo, sofre um <:LG:1423145531076645025> de ataques baseados em calor ou luz intensa (como fogo, laser ou clarões bioluminescentes).

<:AA:1423017100192256073><:AP:1423017120073125990> — Maria-da-campina
A pele fotossintética do Infectado não tolera bem a ausência de luz natural. A cada dia passado sem exposição direta ao sol (ou fonte equivalente), sofre uma penalidade de <:AS:1422741535048470598> em testes de *__Resolução__* até que a exposição seja restabelecida por ao menos 1 hora.`);
        break;
    case '3':
        embed.setDescription(`<:AA:1423017100192256073><:AS:1422741535048470598> — Tatu-canastra
Enquanto estiver sob sol forte ou clima seco, você recebe um ponto de dano a menos de ataques físicos. Esse bônus se perde se estiver em clima úmido, submerso ou sob chuva intensa.

<:AS:1422741535048470598><:AP:1423017120073125990> — Mandacaru
Sempre que sofrer dois ou mais pontos de dano em um mesmo ataque, a camada externa de sua carapaça se fragmenta em estilhaços, ferindo quem estiver em alcance corpo a corpo. O atacante sofre um ponto de dano direto, mas você também sofre uma penalidade de <:AS:1422741535048470598> em testes de *__Reação__* até a carapaça regenerar (o que só ocorre após o fim da cena).

<:AA:1423017100192256073><:AP:1423017120073125990> — Lobo-guará
Sua anatomia reage mal à umidade. Sempre que entrar em contato prolongado com água (chuva intensa, submersão, clima encharcado), sofre uma penalidade de <:AS:1422741535048470598> em testes que incluam *__Potência__* ou *__Furtividade__* até se secar completamente.`);
        break;
    case '4':
        embed.setDescription(`<:AA:1423017100192256073><:AS:1422741535048470598> — Caxinguelê
Ignora penalidades por terreno inclinado, escorregadio ou irregular durante deslocamentos e escaladas. Sempre que investir <:AS:1422741535048470598> em *__Fuga__*, adicione <:AS:1422741535048470598>. Além disso, não pode ser derrubado ou desequilibrado por meios físicos, a menos que o ataque cause dano.

<:AS:1422741535048470598><:AP:1423017120073125990> — Porco-do-mato
Recebe <:AS:1422741535048470598> adicional em testes que incluam *__Atletismo__* ao correr, saltar ou escalar, mas sofre a penalidade de <:AP:1423017120073125990> adicional em testes que incluam *__Furtividade__* devido à rigidez dos movimentos.

<:AA:1423017100192256073><:AP:1423017120073125990> — Jabuti-piranga
Em ambientes planos ou excessivamente nivelados (ambientes urbanos, corredores, pisos industriais), sofre menos <:AS:1422741535048470598> em testes que incluam *__Reação__* até deixar o local ou se adaptar por uma cena inteira.`);
        break;
    case '5':
        embed.setDescription(`<:AA:1423017100192256073><:AS:1422741535048470598> — Suculenta
Pode permanecer até 5 dias sem consumir água sem sofrer penalidades.

<:AS:1422741535048470598><:AP:1423017120073125990> — Diabo-espinhoso
O corpo libera secreções que irritam olhos e mucosas. Agressores corpo a corpo sofrem <:LG:1423145531076645025> de dano ou <:AS:1422741535048470598> adicional em neutralização da Ameaça. Toda <:AP:1423017120073125990> mantida pelo resto da cena causa <:LG:1423145531076645025> de dano a um aliado próximo.

<:AA:1423017100192256073><:AP:1423017120073125990> — Esquilo Terrestre
Passa a cavar buracos para dormir em segurança, perde um ponto de Determinação <:PD:1423112067464040510> se não dormir em uma toca.`);
        break;
    case '6':
        embed.setDescription(`<:AA:1423017100192256073><:AS:1422741535048470598> — Morcego-narigudo
Passa a ignorar penalidades por baixa luminosidade natural, incluindo crepúsculo, sombra densa ou penumbra. Esse efeito não se aplica à escuridão total nem à ausência de luz artificial.

<:AS:1422741535048470598><:AP:1423017120073125990> — Sucuri
Os sons são absorvidos pela pele. Recebe <:AA:1423017100192256073> adicional em testes que incluem *__Furtividade__* ao se mover em vegetação densa, mas sofre <:AP:1423017120073125990> em testes que incluem *__Expressão__*, pois a vocalização do Infectado se torna abafada e pouco audível.

<:AA:1423017100192256073><:AP:1423017120073125990> — Rato-do-mato
Ao sair abruptamente de ambiente sombreado para um muito iluminado, sofre uma penalidade de <:AS:1422741535048470598> em testes que incluem *__Percepção__* por 1 cena, devido à saturação do nervo óptico.`);
        break;
    case '7':
        embed.setDescription(`<:AA:1423017100192256073><:AS:1422741535048470598> — Mangue-vermelho
Pode consumir água salobra ou salina sem qualquer prejuízo.

<:AS:1422741535048470598><:AP:1423017120073125990> — Caramujo-do-mangue
Consegue respirar parcialmente pela pele em ambientes alagadiços, permanecendo submerso por até 10 minutos. No entanto, a pele do Infectado torna-se vulnerável, sofrendo um ponto de dano adicional contra ataques físicos.

<:AA:1423017100192256073><:AP:1423017120073125990> — Sururu
Ao passar mais de 6 horas em ambientes secos (ambiente urbano, cerrado, alta montanha), a pele começa a rachar. Sofre uma penalidade de <:AS:1422741535048470598> em testes que incluam *__Reação__* até ser reidratado por imersão ou umidade ambiental.`);
        break;
    case '8':
        embed.setDescription(`<:AA:1423017100192256073><:AS:1422741535048470598> — Toninha
Você se move duas vezes mais rápido na água do que um humano comum, e não precisa testar *__Atletismo__* para nadar, exceto em tempestades ou redemoinhos. Dobre todos os <:AS:1422741535048470598> investidos em Fuga nadando.

<:AS:1422741535048470598><:AP:1423017120073125990> — Biguá
Tem <:AS:1422741535048470598> adicional em testes que incluem *__Atletismo__* na água ou areia fofa, e adiciona <:AP:1423017120073125990> em testes que incluem *__Manufaturas__*, pois a motricidade fina dos dedos foi comprometida.

<:AA:1423017100192256073><:AP:1423017120073125990> — Tartaruga-aruanã
Sempre que estiver correndo ou saltando em pisos rígidos (metal, concreto, pedra), sofre <:AP:1423017120073125990> em testes que incluem *__Potência__*, devido ao formato instável das extremidades.`);
        break;
    case '9':
        embed.setDescription(`<:AA:1423017100192256073><:AS:1422741535048470598> — Urubu-Rei
Não sofre qualquer penalidade por altitudes elevadas ou ar rarefeito, mesmo acima de 3000m. Pode manter esforço físico moderado por mais tempo sem fadiga.

<:AS:1422741535048470598><:AP:1423017120073125990> — Calango-bandeira
Pode prender a respiração por até 10 minutos mesmo em movimento, mas em climas quentes e secos perde <:AA:1423017100192256073> em testes de *__Influência__* ou *__Expressão__*, devido à rouquidão.

<:AA:1423017100192256073><:AP:1423017120073125990> — Tucanuçu
Ao passar mais de 1 hora em ambientes abafados ou com alta umidade, tem a Sagacidade reduzida em um (mínimo 0), como se estivesse em constante mal-estar leve.`);
        break;
    case '10':
        embed.setDescription(`<:AA:1423017100192256073><:AS:1422741535048470598> — Guaiamu
Ignora penalidades de movimento em terrenos encharcados ou instáveis. Pode atravessar até 2 metros de profundidade de água ou lama sem necessidade de teste.

<:AS:1422741535048470598><:AP:1423017120073125990> — Garça-azul
Possui A adicional em testes que incluem *__Furtividade__* ao caminhar sobre lama ou folhas alagadas, pois seus passos não fazem barulho. Contudo, sofre <:AP:1423017120073125990> adicional em testes que incluam *__Reação__* em ambientes fechados, onde o alongamento das pernas prejudica o equilíbrio.

<:AA:1423017100192256073><:AP:1423017120073125990>  — Sapo-cururu
Se for derrubado ou sofrer queda, deve fazer um teste de *__Potência__* ou irá sofrer um ponto de dano adicional de todos os ataques até o fim da cena, por instabilidade nas articulações.`);
        break;
    case 'J':
        embed.setDescription(`<:AA:1423017100192256073><:AS:1422741535048470598> — Rola-bosta
Reduz em um ponto todo dano cortante ou perfurante sofrido por fontes naturais (espinhos, facas, garras). Esse efeito não se aplica a armas de fogo ou ataques energéticos.

<:AS:1422741535048470598><:AP:1423017120073125990>  — Asa-branca
A pele do Infectado o protege contra insolação e exposição solar extrema por até 2 cenas, mesmo sem abrigo ou água. Tem *__Influência__* reduzida em um (mínimo 0), devido à aparência enrijecida e aspecto vítreo.

<:AA:1423017100192256073><:AP:1423017120073125990>  — Teiú
Em ambientes úmidos ou com pouca circulação de ar, acumula calor corporal, sofrendo uma penalidade de <:AS:1422741535048470598> em testes que incluem *__Reação__* após 2 horas.`);
        break;
    case 'Q':
        embed.setDescription(`<:AA:1423017100192256073><:AS:1422741535048470598> — Tatu-canastra
Detecta movimentos ou presenças num raio de 10 metros se estiver tocando o chão com as mãos ou pés descalços, mesmo na escuridão. Não identifica outros detalhes, somente a intensidade e a distância.

<:AS:1422741535048470598><:AP:1423017120073125990> — Coruja-buraqueira
Recebe <:AS:1422741535048470598> adicional em testes que incluem *__Percepção__* para identificar sons abafados ou ecos subterrâneos, mas sofre <:AP:1423017120073125990> adicional em testes que incluem *__Reação__* relacionados a ruídos altos repentinos (tiros, explosões), por conta do sistema auditivo hipersensível.

<:AA:1423017100192256073><:AP:1423017120073125990> — Morcego-de-cauda-livre
Ambientes com múltiplos sons sobrepostos (máquinas, motores, grandes multidões) te sobrecarregam. Tem a *__Sagacidade__* reduzida em um (mínimo 0) nesses locais até que se isole.`);
        break;
    case 'K':
        embed.setDescription(`<:AA:1423017100192256073><:AS:1422741535048470598> — Líquen-de-mapa
Não sofre penalidades por frio intenso ou neve, mesmo abaixo de –20°C. Pode dormir ao relento sem risco de congelamento ou exaustão térmica.

<:AS:1422741535048470598><:AP:1423017120073125990> — Marmota-alpina
Pode entrar voluntariamente em estado de torpor por até 12 horas, reduzindo consumo de oxigênio e estabilizando ferimentos (não morre por sangramento nesse estado). Contudo, ao sair do torpor, a *__Potência__* é reduzida em um (mínimo 0) até o próximo descanso.

<:AA:1423017100192256073><:AP:1423017120073125990>  — Husky siberiano
Os pelos de todo o corpo crescem muito formando uma proteção contra o frio. Em ambientes quentes sofre <:AP:1423017120073125990> adicional em testes que incluam *__Atletismo__*.`);
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

    const colecao = db.collection('Cartas');

    // Reset das cartas
    if (message.content.toLowerCase().startsWith('a.preset')) {
        await colecao.updateOne(
            { guildId, userId },
            { $set: { guildName, userName, cartasPausDisponiveis: [...cartasPaus] } },
            { upsert: true }
        );

        const logChannel = message.guild.channels.cache.get(LOG_CHANNEL_ID);
        if (logChannel) logChannel.send(`${message.author.tag} resetou suas cartas de Paus em ${guildName}`);
        message.reply('Suas cartas de Paus foram restauradas! Você tem 13 cartas novamente.');
        return true;
    }

    if (!message.content.toLowerCase().startsWith('a.p')) return false;

    try {
        let registro = await colecao.findOne({ guildId, userId });

        // Inicializa se não existir
        if (!registro) {
            registro = {
                guildId,
                guildName,
                userId,
                userName,
                cartasPausDisponiveis: [...cartasPaus]
            };
            await colecao.insertOne(registro);
        }

        if (registro.cartasPausDisponiveis.length === 0) {
            const embed = new EmbedBuilder()
                .setTitle('ASSIMILAÇÃO DE PAUS - Sem Cartas')
                .setDescription('Você não tem mais cartas disponíveis!\nUse a.preset para restaurar suas cartas.')
                .setImage('attachment://azul.png')
                .setColor(0x580068);
            message.channel.send({ embeds: [embed], files: ['src/Versos/azul.png'] });
            return true;
        }

        // Sorteia uma carta
        const indexAleatorio = Math.floor(Math.random() * registro.cartasPausDisponiveis.length);
        const cartaSorteada = registro.cartasPausDisponiveis.splice(indexAleatorio, 1)[0];

        // Atualiza banco
        await colecao.updateOne(
            { guildId, userId },
            { $set: { cartasPausDisponiveis: registro.cartasPausDisponiveis } }
        );

        const embed = criarEmbed(cartaSorteada, registro.cartasPausDisponiveis.length);

        message.channel.send({ embeds: [embed], files: [cartaSorteada.imagem] });

    } catch (error) {
        console.error('Erro no comando Copas:', error);
    }

    return true;
}

module.exports = { handleCards, conectarDB, criarEmbed };