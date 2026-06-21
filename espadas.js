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
        console.log('✅ Conectado ao MongoDB(Espadas)');
    } catch (err) {
        console.error('Erro ao conectar no MongoDB(Espadas):', err);
    }
}

const cartasEspadas = [
    { valor: 'A', nome: 'Ás', imagem: 'src/Espadas/A.png'},
    { valor: '2', nome: 'Dois', imagem: 'src/Espadas/2.png'},
    { valor: '3', nome: 'Três', imagem: 'src/Espadas/3.png'},
    { valor: '4', nome: 'Quatro', imagem: 'src/Espadas/4.png'},
    { valor: '5', nome: 'Cinco', imagem: 'src/Espadas/5.png'},
    { valor: '6', nome: 'Seis', imagem: 'src/Espadas/6.png'},
    { valor: '7', nome: 'Sete', imagem: 'src/Espadas/7.png'},
    { valor: '8', nome: 'Oito', imagem: 'src/Espadas/8.png'},
    { valor: '9', nome: 'Nove', imagem: 'src/Espadas/9.png'},
    { valor: '10', nome: 'Dez', imagem: 'src/Espadas/10.png'},
    { valor: 'J', nome: 'Valete', imagem: 'src/Espadas/J.png'},
    { valor: 'Q', nome: 'Dama', imagem: 'src/Espadas/Q.png'},
    { valor: 'K', nome: 'Rei', imagem: 'src/Espadas/K.png'}
];

function criarEmbed(carta, cartasRestantes) {
    const embed = new EmbedBuilder();

    switch(carta.valor) {
        case 'A':
            embed.setTitle('ASSIMILAÇÃO ATROFIANTE - ÁS DE ESPADAS');
            break;
        case '2':
            embed.setTitle('ASSIMILAÇÃO NEUROPÁTICA - 2 DE ESPADAS');
            break;
        case '3':
            embed.setTitle('ASSIMILAÇÃO DEVORADORA - 3 DE ESPADAS');
            break;
        case '4':
            embed.setTitle('ASSIMILAÇÃO SECRETORA - 4 DE ESPADAS');
            break;
        case '5':
            embed.setTitle('ASSIMILAÇÃO CALCIFICANTE - 5 DE ESPADAS');
            break;
        case '6':
            embed.setTitle('ASSIMILAÇÃO FOTOSSENSÍVEL - 6 DE ESPADAS');
            break;
        case '7':
            embed.setTitle('ASSIMILAÇÃO LITODÉRMICA - 7 DE ESPADAS');
            break;
        case '8':
            embed.setTitle('ASSIMILAÇÃO ENTORPECIDA - 8 DE ESPADAS');
            break;
        case '9':
            embed.setTitle('ASSIMILAÇÃO ABERRANTE - 9 DE ESPADAS');
            break;
        case '10':
            embed.setTitle('ASSIMILAÇÃO HIPERSENSÍVEL - 10 DE ESPADAS');
            break;
        case 'J':
            embed.setTitle('ASSIMILAÇÃO MIOCLÔNICA - VALETE DE ESPADAS');
            break;
        case 'Q':
            embed.setTitle('ASSIMILAÇÃO DISFÁSICA - DAMA DE ESPADAS');
            break;
        case 'K':
            embed.setTitle('ASSIMILAÇÃO TERMINAL - REI DE ESPADAS');
            break;
    }

    embed.setFooter({ text: `Restam ${cartasRestantes} cartas de Espadas` })
        .setImage(`attachment://${carta.imagem.split('/').pop()}`)
        .setColor(0x000000);

switch(carta.valor) {
    case 'A':
        embed.setDescription(`<:AP:1423017120073125990> – Rigidez Muscular
Um processo degenerativo faz com que o Infectado sofra rigidez muscular que penaliza em <:AA:1423017100192256073> em testes que incluam *__Potência__*.

<:AP:1423017120073125990><:AP:1423017120073125990> – Rigidez Articular
A progressão da Assimilação gera rigidez nas articulações e encurtamento das fibras musculares, limitando a capacidade de movimentos contínuos. Sempre que o Infectado realizar um teste que inclua *__Potência__* ou *__Atletismo__* em ações como corrida, escalada ou natação, sofre uma penalidade de <:AS:1422741535048470598> no resultado.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Nervos Atrofiados
O processo degenerativo inicial da Assimilação atinge terminações nervosas periféricas. Sempre que o Infectado realizar um teste que inclua *__Reação__* para reagir a estímulos rápidos, sofre uma penalidade de <:AS:1422741535048470598> no resultado.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Digestão Ineficiente
A atrofia atinge o sistema digestivo do Infectado, fazendo com que precise comer constantemente (mínimo de 3 vezes por hora) em pequenas quantidades ou sua próxima fase de recuperação não terá efeito. Se o Infectado ingere porções maiores de alimento, tudo que foi ingerido é regurgitado e perde um ponto de Determinação <:PD:1423112067464040510> e um ponto de Saúde <:SM:1423452861236379770>.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Atrofia Muscular
A atrofia gera uma perda significativa de resistência. Sempre que o Infectado falhar em qualquer teste que inclua *__Potência__* ou *__Resolução__*, sofre um ponto de dano à Saúde <:SM:1423452861236379770> por <:AP:1423017120073125990> mantida.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Falência
A falência atinge nível sistêmico que fragiliza todo o corpo do Infectado. Todo dano físico e todas as penalidades de <:SA:1423452896141512866>Nível de Saúde são dobrados contra ele.`);
        break;
    case '2':
        embed.setDescription(`<:AP:1423017120073125990> – Debilidade
A Assimilação danifica o equilíbrio elétrico dos neurônios motores do Infectado. Sempre que realizar testes que incluam *__Atletismo__*, sofre uma penalidade de <:AS:1422741535048470598> no resultado.

<:AP:1423017120073125990><:AP:1423017120073125990> – Inabilidade
A degeneração nervosa reduz a adaptabilidade do controle motor fino. Sempre que o Infectado realizar testes que incluam *__Manufaturas__*, *__Erudição__* ou *__Expressão__*, sofre uma penalidade de <:AA:1423017100192256073> no resultado.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Tremores
A instabilidade neuromuscular gera tremores involuntários sob estresse. Perde um ponto de Determinação <:PD:1423112067464040510> adicional por <:AP:1423017120073125990> mantida em qualquer teste.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Desorientação
A neuropatia afeta o senso de orientação espacial. Sempre que o Infectado realizar testes que incluam *__Percepção__* ou *__Sobrevivência__* envolvendo distância ou direção, sofre uma penalidade de <:AS:1422741535048470598><:AS:1422741535048470598>.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Fragilidade
A progressão da falha neural compromete a resistência corporal, amplificando a percepção da dor. Sempre que o Infectado sofrer dano físico direto, perde um ponto adicional de Determinação <:PD:1423112067464040510>. Caso o dano reduza seu <:SA:1423452896141512866>Nível de Saúde, perde dois pontos adicionais de Determinação <:PD:1423112067464040510>.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Inaptidão
A falência nervosa atinge estágio crítico. Durante Conflitos, todas as Ações do Infectado sofrem penalidade de <:AS:1422741535048470598> e <:AA:1423017100192256073>.`);
        break;
    case '3':
        embed.setDescription(`<:AP:1423017120073125990> – Glutonice
A Assimilação altera o metabolismo do Infectado, exigindo constante ingestão de matéria orgânica. Sempre que passar mais de quatro horas sem comer, sofre uma penalidade de <:AS:1422741535048470598> em todos os testes até saciar a fome.

<:AP:1423017120073125990><:AP:1423017120073125990> – Ignorância
A necessidade alimentar afeta a cognição. Se estiver há mais de duas horas sem comer, o Infectado sofre uma penalidade de <:AS:1422741535048470598> sempre que realizar testes que incluam *__Conhecimentos__*.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990>– Desarticulação
O instinto predatório se intensifica. Se estiver há mais de duas horas sem comer, o Infectado sofre uma penalidade de <:AP:1423017120073125990> adicional em qualquer teste que inclua *__Influência__*.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Fome Corrosiva
A degradação física avança. O Infectado perde um ponto de Saúde <:SM:1423452861236379770> se passar mais de seis horas sem ingerir porção maior que cem gramas de alimento orgânico. Perde um ponto adicional a cada hora sem se alimentar depois das seis primeiras.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Fome Vacilante
A assimilação do sistema digestivo atinge estágio crítico de ineficiência no consumo alimentar. Se o Infectado ficar um dia inteiro (24 horas) sem comer, perde todos os seus pontos de Determinação <:PD:1423112067464040510>, se tornando Suscetível.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Fome Terrível
O controle sobre a fome enfraquece. Caso não tenha se alimentado por duas cenas inteiras, o Infectado perde o controle para a fome desde o início da terceira cena. Se isso acontecer, qualquer Ação que o Infectado tentar que não vise exclusivamente a ingestão de matéria orgânica será rolada com *__Resolução__* como o Instinto selecionado. O Infectado perde um ponto de Determinação <:PD:1423112067464040510> para cada <:BA:1423110545657298995>Nível de Assimilação sempre que o fizer. Após saciar a fome o Infectado volta para o controle do jogador e precisa lidar com as consequências de seus atos.`);
        break;
    case '4':
        embed.setDescription(`<:AP:1423017120073125990> – Fedido
O corpo do Infectado passa a secretar constantemente uma substância pegajosa e de odor forte, mesmo em repouso. Sempre que o Infectado realizar testes que incluam *__Expressão__* em ambientes fechados ou com pouca ventilação, sofre uma penalidade de <:AS:1422741535048470598>.

<:AP:1423017120073125990><:AP:1423017120073125990> – Inchaço Debilitante
A pele do Infectado acumula gordura e umidade, tornando difícil o manuseio de objetos delicados. Sempre que realizar testes que incluam *__Manufaturas__* ou *__Armas__* para manipular armas de fogo, sofre penalidade de <:AS:1422741535048470598>.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Escorregadio
A secreção constante forma um filme escorregadio em sua pele, comprometendo equilíbrio e tração. Sempre que realizar testes que incluam *__Atletismo__* em superfícies instáveis ou escorregadias, sofre uma penalidade de <:AS:1422741535048470598>.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990>– Fragilidade Térmica
A presença da secreção interfere na regulação térmica. Sempre que o infectado estiver em ambientes extremos (calor ou frio intensos), dobre a penalidade aplicada.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Inflamável
A secreção do corpo do Infectado se torna inflamável, fazendo com que qualquer contato com fogo cause um ponto de dano à Saúde <:SM:1423452861236379770> para cada ponto de Assimilação <:PA:1423143615068115206> restante do Infectado e zerando esses pontos, deixando-o livre da secreção pelo restante da cena.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Bufotoxina
A secreção de seu corpo é tóxica. Qualquer toque causa um <:LG:1423145531076645025> de dano. Dormir no mesmo cômodo fechado que o Infectado exige de qualquer outro personagem um teste de *__Resolução__* com *__Medicina__* que tenha pelo menos <:AS:1422741535048470598><:AS:1422741535048470598> ou perde um <:SA:1423452896141512866>Nível de saúde completo.`);
        break;
    case '5':
        embed.setDescription(`<:AP:1423017120073125990> – Endurecido
A Assimilação endurece ligamentos e tendões de forma irregular. Sempre que o Infectado realizar testes que incluam *__Furtividade__* ou *__Atletismo__* em ações que exijam leveza ou equilíbrio, sofre uma penalidade de <:AA:1423017100192256073>.

<:AP:1423017120073125990><:AP:1423017120073125990> – Descoordenado
Pequenas formações ósseas irregulares se acumulam em articulações e regiões móveis. Sempre que o Infectado realizar qualquer Ação com múltiplos movimentos corporais sucessivos – saltar e correr, atacar e se mover, levantar e atirar (...) – sofre penalidade de <:AS:1422741535048470598> por ação adicional, além dos custos normais da Ação.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Hesitante
A calcificação avança para a coluna, limitando movimentação. Sempre que o Infectado realizar testes para Fuga, cancele metade dos <:AS:1422741535048470598> mantidos, arredondando para cima.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Travado
A progressão da Assimilação causa episódios de travamento articular. A cada <:AP:1423017120073125990> mantida em testes de *__Potência__* ou *__Reação__* em Conflito, aumente no mesmo valor a quantidade de <:AS:1422741535048470598> necessários para a Fuga do Infectado.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Combalido
As articulações do Infectado se tornaram tão rígidas que todos seus testes físicos substituem os <:LG:1423145531076645025> que seriam rolados por <:QU:1423145549560942612>.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Decrépito
A calcificação atinge grau tão severo que o Infectado sofre uma penalidade de <:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> adicionais em todos os testes físicos.`);
        break;
    case '6':
        embed.setDescription(`<:AP:1423017120073125990> – Visão Sensível
A Assimilação altera a pigmentação e sensibilidade dos olhos do Infectado, tornando-os incapazes de se adaptar bem à claridade. Sempre que o Infectado estiver exposto à luz intensa, sofre penalidade de<:AA:1423017100192256073> em testes que incluam *__Percepção__*.

<:AP:1423017120073125990><:AP:1423017120073125990> – Pele de Vampiro
A sensibilidade começa a reagir negativamente à radiação solar. Sempre que o Infectado passar mais de trinta minutos sob luz solar direta, perde um ponto de Determinação <:PD:1423112067464040510> em ponto de Saúde <:SM:1423452861236379770>.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Enxaqueca
A fotossensibilidade provoca enxaquecas severas. Sempre que o Infectado passar uma cena inteira em local iluminado, não recupera Determinação <:PD:1423112067464040510> em sua próxima recuperação.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Visão Sensível
As pupilas do Infectado não conseguem mais se adaptar rapidamente. Sempre que sair de um ambiente escuro para um iluminado ou vice-versa, sofre uma penalidade de <:AS:1422741535048470598><:AS:1422741535048470598> em todos os testes nas primeiras rodadas.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Visão Curta
A Assimilação afeta a percepção de contraste e profundidade. O Infectado sofre penalidade permanente de <:AS:1422741535048470598> em todos os testes de ataque de longo alcance.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Visão Noturna
O Infectado só é capaz de enxergar na ausência total de luz. Qualquer luz é capaz de ofuscá-lo, forçando-o a fazer qualquer teste com o
Instinto de *__Percepção__* e impondo penalidade de <:AS:1422741535048470598><:AS:1422741535048470598> ao resultado.`);
        break;
    case '7':
        embed.setDescription(`<:AP:1423017120073125990> – Afasta Animais
A infecção mineral se intensifica, alterando a bioquímica superficial da pele do Infectado. Um odor ferroso passa a exalar de seu corpo, provocando reações defensivas nos animais ao redor. Qualquer teste que envolva interação com animais sofre uma penalidade de <:AS:1422741535048470598>.

<:AP:1423017120073125990><:AP:1423017120073125990> – Ossos Frágeis
Cristais minerais começam a se formar nos ossos do Infectado, criando saliências visíveis em partes do corpo. Essas formações comprometem a flexibilidade e a capacidade de absorção de impactos da pele, fazendo com que todo dano de impacto contra o Infectado seja aumentado em um ponto.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Eletrossensível
As estruturas cristalinas tornam-se um condutor elétrico e comprometem o funcionamento das glândulas sudoríparas, dificultando a regulação térmica. Sempre que o Infectado sofrer dano elétrico, o valor do dano é dobrado. Sempre que sofrer dano por calor ou queimadura, perde também um ponto de Determinação <:PD:1423112067464040510>.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Carapaça Disforme
As formações minerais atravessam a derme, provocando dor contínua e extrema sensibilidade ao contato rígido. O Infectado não pode usar peças de vestuário estruturadas ou armaduras rígidas — como coletes, trajes de contenção ou qualquer equipamento similar. Além disso, caso não durma sobre uma superfície macia, sua próxima recuperação não terá efeito.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Muco Oxidante
O corpo do Infectado passa a liberar resíduos oxidados pelas formações minerais, secretando um muco que enferruja qualquer equipamento ou artefato metálico em contato com o corpo do Infectado por uma cena completa, reduzindo um nível de Qualidade. Adicionalmente, sempre que estiver segurando um equipamento metálico que não seja um artefato e gastar um ponto de Assimilação <:PA:1423143615068115206>, qualquer <:AP:1423017120073125990> mantida no resultado reduz um nível de Qualidade do equipamento.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Fígado Estragado
A infecção mineral é Assimilada ao sangue, sobrecarregando o fígado. O Infectado precisa fazer tratamento semanal com sangria ou desenvolverá cirrose hepática. Caso desenvolva a doença o Infectado perde um <:SA:1423452896141512866>Nível de Saúde por semana até que faça um transplante de fígado que exige tratamento cirúrgico com o teste de Medicina de pelo menos <:AS:1422741535048470598><:AS:1422741535048470598><:AS:1422741535048470598><:AS:1422741535048470598><:AS:1422741535048470598>.`);
        break;
    case '8':
        embed.setDescription(`<:AP:1423017120073125990> – Agorafobia
A Assimilação afeta as conexões entre os nervos ópticos e o cérebro. O Infectado sofre percepção distorcida de movimento e contraste em ambientes amplos ou abertos. Sempre que realizar testes que incluam *__Percepção__* em áreas externas ou grandes espaços, sofre penalidade de <:AS:1422741535048470598>.

<:AP:1423017120073125990><:AP:1423017120073125990> – Sensibilidade Auditiva
A audição do Infectado se torna aguda e sensível. Qualquer som repentino ou alto pode provocar vertigem ou desorientação. Sempre que estiver exposto a ruídos intensos (explosões, sirenes, gritos), perde um ponto de Determinação <:PD:1423112067464040510>.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Sentidos Sobrecarregados
Os sentidos do Infectado se sobrecarregam ao mesmo tempo. Se sofrer simultaneamente exposição a múltiplos estímulos sensoriais intensos, sofre uma penalidade de <:AS:1422741535048470598> em todas as Ações.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Desorientação Aguda
O desgaste nos sentidos faz com que o Infectado sofra uma penalidade de <:AP:1423017120073125990> adicional ao resultado de testes que incluam *__Percepção__* ou *__Reação__*.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990>– Alucinações
O cérebro passa a gerar alucinações táteis, visuais e sonoras espontâneas. Uma vez por sessão de jogo, em momentos de grande tensão, o Assimilador pode introduzir um estímulo falso, dificultando a Ação do Infectado, com isso reduzindo em <:AS:1422741535048470598><:AS:1422741535048470598> o resultado do teste. O Assimilador deve descrever a cena com as ilusões da alucinação e em seguida o que de fato aconteceu.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Dessensibilização Aguda
O Infectado perde 85% de todos os sentidos, perdendo todos os níveis em *__Percepção__* na Ficha de Infectado, ficando com zero. Esses níveis não podem ser comprados novamente e só retornam se forem anuladas todas as <:AP:1423017120073125990> dessa mutação através de Clareza de Propósito. Toda rolagem que inclua *__Percepção__* só será feita se houver outra Aptidão selecionada fornecendo dados para a rolagem, do contrário é falha automática.`);
        break;
    case '9':
        embed.setDescription(`<:AP:1423017120073125990> – Deformidade
O corpo do Infectado desenvolve órgãos e tecidos desnecessários em uma busca desesperada por evolução. A má formação afeta um de seus Instintos à escolha do jogador, reduzindo em um ponto o Instinto escolhido na Ficha do Infectado. Escolha um Instinto no qual tenha pelo menos dois pontos.

<:AP:1423017120073125990><:AP:1423017120073125990> – Pernas Disformes
Má formação nas pernas causa perda de mobilidade. Em cada Conflito, remova o primeiro <:AS:1422741535048470598> que investir em Fuga.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Hipersensibilidade
A Assimilação afeta as terminações nervosas, tornando-as hipersensíveis ao toque. Sempre que o Infectado for tocado firmemente ou sofrer dano, perde um ponto de Determinação <:PD:1423112067464040510>.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Recuperação Debilitada
Os órgãos redundantes drenam recursos fisiológicos. Sempre que o Infectado ativar uma recuperação, restaura apenas metade dos pontos de Saúde <:SM:1423452861236379770> e Determinação <:PD:1423112067464040510>, arredondado para cima. Se já tiver outra penalidade que afete a recuperação, apenas a mais severa deve ser aplicada.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Descoordenação
Certas partes do corpo começam a operar de forma autônoma e não coordenada com o resto do organismo. Sempre que o Infectado obtiver <:AS:1422741535048470598><:AS:1422741535048470598> em um teste, um deles se transformará em <:AP:1423017120073125990>, representando um espasmo, bloqueio ou conflito interno.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990>– Aberração
O corpo do Infectado se torna completamente irreconhecível, mudando completamente a aparência e a voz do Infectado para um aspecto de aberração retorcida e mal formada, podendo afetar até mesmo o número de membros, à escolha do Assimilador.`);
        break;
    case '10':
        embed.setDescription(`<:AP:1423017120073125990> – Vulnerabilidade a Dor
O sistema nervoso do Infectado se torna excessivamente responsivo a estímulos externos. Sempre que sofrer dano físico, mesmo que mínimo, o Infectado sofre também uma penalidade de <:AS:1422741535048470598> no próximo teste que incluir *__Potência__*, *__Reação__* ou *__Resolução__*.

<:AP:1423017120073125990><:AP:1423017120073125990> – Vulnerabilidade Emocional
A sensibilidade se expande para o campo emocional. Sempre que o Infectado receber uma crítica, provocação ou escárnio (mesmo que narrativamente leve), sofre uma penalidade de <:AA:1423017100192256073> em todos os testes pelo restante da cena.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Dor Degradante
O limiar de dor do Infectado se reduz drasticamente. Toda vez que sofrer dano físico por ataque corpo a corpo ou queda, perde um ponto adicional de Determinação <:PD:1423112067464040510>.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Sensibilidade Radical
Estímulos ambientais se tornam insuportáveis. Em cenas com barulho intenso, temperatura extrema ou iluminação incômoda, o Infectado sofre uma penalidade de <:AS:1422741535048470598><:AS:1422741535048470598> em todos os testes com *__Conhecimentos__* ou *__Expressão__*.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Recuperação Debilitada
A hipersensibilidade nervosa impede o descanso reparador. Recuperações perdem 50% de eficácia caso o repouso não aconteça em ambiente controlado (ruídos reduzidos, luz baixa e temperatura amena). Essa limitação se acumula com outras penalidades de recuperação.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Sensibilidade Extrema
O sistema nervoso entra em colapso ao ser exposto a múltiplos estímulos simultâneos. Sempre que houver três ou mais fontes de estímulo (danos, ruídos, cheiros, calor...), o Infectado perde imediatamente um ponto de Saúde <:SM:1423452861236379770> e um de Determinação <:PD:1423112067464040510> e não pode manter mais do que um dado em qualquer teste feito até o fim da cena.`);
        break;
    case 'J':
        embed.setDescription(`<:AP:1423017120073125990> – Espasmos Involuntários
O corpo do Infectado responde com movimentos bruscos a estímulos banais. Sempre que o jogador obtiver qualquer <:AP:1423017120073125990> em uma rolagem, o Assimilador pode narrar um pequeno espasmo ou reação involuntária, como um susto, chute leve ou se virar bruscamente.

<:AP:1423017120073125990><:AP:1423017120073125990> – Ansiedade Grave
Os impulsos se intensificam em situações de tensão. Sempre que o Infectado estiver em uma Cena de Conflito, sofre uma penalidade de <:AS:1422741535048470598> em qualquer Ação que requeira controle corporal — incluindo recarga de armas, furtividade ou evitar armadilhas.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Movimentos Involuntários
A Assimilação gera impulsos sem relação com o ambiente. Ao entrar em uma nova cena, o Assimilador deve escolher aleatoriamente um dos membros do corpo (braço, perna, pescoço etc.), que será afetado por movimentos involuntários. Durante essa cena, o Infectado sofre penalidade de <:AP:1423017120073125990> em qualquer ação que dependa daquele membro.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Barulhos Involuntários
O corpo passa a responder a não-estímulos. Em qualquer situação de calma ou silêncio absoluto, o Infectado é compelido a emitir sons involuntários (como estalar a língua, ranger os dentes, bater os dedos ou emitir ruídos com a garganta), o que anula automaticamente qualquer tentativa de surpresa, camuflagem ou emboscada.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Agitação Constante
A Assimilação interfere na rotina motora. O Infectado não consegue permanecer imóvel por mais de um minuto, mesmo que queira. Sempre que for necessário repousar ou aguardar em posição, ele perde um ponto de Determinação <:PD:1423112067464040510> por minuto.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Debilidade
Extrema <:AS:1422741535048470598> compulsão se torna debilitante. Em qualquer teste físico, Infectado sofre penalidade de <:AS:1422741535048470598>, além de <:AP:1423017120073125990> adicional. Além disso, deve descartar imediatamente a face de dado com maior número de <:AS:1422741535048470598> após cada rolagem.`);
        break;
    case 'Q':
        embed.setDescription(`<:AP:1423017120073125990> – Desvio de Fala
O Infectado passa a sofrer lapsos de linguagem em momentos de tensão. Sempre que rolar qualquer <:AP:1423017120073125990> em uma ação que envolva comunicação verbal, o Assimilador pode narrar um erro de fala — troca de palavras, gagueira ou silêncio repentino — que compromete a ação ou exige retratação.

<:AP:1423017120073125990><:AP:1423017120073125990> – Fala Debilitada
A Assimilação desorganiza o acesso à linguagem em situações sociais. Sempre que o Infectado realizar testes que incluam *__Expressão__* ou *__Influência__* em diálogo com personagens do Assimilador, sofre uma penalidade de <:AS:1422741535048470598> se tentar formular frases complexas ou expor argumentos longos.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Memória Debilitada
O distúrbio afeta a memória verbal. O Infectado não consegue repetir corretamente instruções ou relatos com mais de uma frase. Sempre que tentar transmitir informação recebida ou repassar mensagens, o conteúdo é truncado, invertido ou alterado. O Assimilador decide como a informação chega ao destino.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Fala Simplificada
A Assimilação afeta a articulação vocal. O Infectado não consegue pronunciar corretamente palavras que envolvam nomes próprios, números ou conceitos técnicos. Em testes envolvendo *__Engenharia__*, *__Medicina__* ou qualquer *__Conhecimento__*, sofre penalidade de <:AS:1422741535048470598><:AS:1422741535048470598> se a comunicação verbal estiver envolvida.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Letra Ilegível
O distúrbio se alastra para a linguagem escrita. Toda vez que o Infectado tentar se comunicar por escrito, símbolos se confundem, letras se embaralham, e a mensagem não é compreendida — exceto se for entregue pessoalmente junto a um teste de *__Influência__* ou *__Expressão__* com, no mínimo, <:AS:1422741535048470598><:AS:1422741535048470598>.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Fala Incompreensível 
O colapso da linguagem é completo. O Infectado perde a capacidade de produzir fala compreensível durante as cenas de Conflito ou mesmo em situação de narrativa fluida que envolvam grande tensão. Se limita a emitirsons desconexos, sílabas soltas ou palavras trocadas. Todas as ações que dependam de comunicação verbal devem ser substituídas por mímica, desenhos ou sofrer penalidade de <:AP:1423017120073125990><:AP:1423017120073125990> adicionais. A fala normal retorna apenas fora de cena ou com ajuda externa, como outro Infectado de intérprete através de um teste bem-sucedido de Influência.`);
        break;
    case 'K':
        embed.setDescription(`<:AP:1423017120073125990> – Pressão Estendida
O corpo do Infectado começa a exibir falhas de funcionamento. Sempre que sofrer uma penalidade por <:AP:1423017120073125990>, essa penalidade persiste por uma cena adicional, mesmo que a causa original tenha desaparecido.

<:AP:1423017120073125990><:AP:1423017120073125990> – Recuperação Sofrida
A recuperação do organismo se torna ineficaz. Sempre que recuperar qualquer quantidade de Saúde, o Infectado sofre 1 ponto de dano direto antes da recuperação.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Pressão por Fracasso
A Assimilação desregula respostas motoras e cognitivas. Sempre que o Infectado falhar em um teste (não mantiver qualquer <:AS:1422741535048470598>), sofre penalidade de <:AP:1423017120073125990> no próximo teste — acumula se persistir falhando.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Aptidões Arruinadas
Aptidões começam a se desintegrar. No início de cada cena, o Assimilador escolhe aleatoriamente uma Aptidão do Infectado (*__Instinto__*, *__Conhecimento__* ou *__Prática__*). Todas as rolagens envolvendo essa Aptidão são tratadas como se não tivesse nenhum nível até o final da cena.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Determinação Hesitante
O corpo perde consistência nas respostas. Sempre que o Infectado usar um ponto de Determinação <:PD:1423112067464040510> para manter dados adicionais, ele deve descartar automaticamente <:AS:1422741535048470598> ou <:AA:1423017100192256073> do resultado, escolhido pelo Assimilador.

<:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990><:AP:1423017120073125990> – Inaptidão Extrema
O colapso corporal é inevitável. Todos os testes do Infectado sofrem penalidade de <:AP:1423017120073125990><:AP:1423017120073125990> e ele perde permanentemente um ponto de uma Aptidão base (à escolha do Assimilador). Esta perda permanece até que esta Assimilação seja anulada. Uma Aptidão pode ser reduzida a 0 desta forma, impossibilitando qualquer teste associado a ela.`);
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
    if (message.content.toLowerCase().startsWith('a.ereset')) {
        await colecao.updateOne(
            { guildId, userId },
            { $set: { guildName, userName, cartasEspadasDisponiveis: [...cartasEspadas] } },
            { upsert: true }
        );

        const logChannel = message.guild.channels.cache.get(LOG_CHANNEL_ID);
        if (logChannel) logChannel.send(`${message.author.tag} resetou suas cartas de Espadas em ${guildName}`);
        message.reply('Suas cartas de Espadas foram restauradas! Você tem 13 cartas novamente.');
        return true;
    }

    if (!message.content.toLowerCase().startsWith('a.e')) return false;

    try {
        let registro = await colecao.findOne({ guildId, userId });

        // Inicializa se não existir
        if (!registro) {
            registro = {
                guildId,
                guildName,
                userId,
                userName,
                cartasEspadasDisponiveis: [...cartasEspadas]
            };
            await colecao.insertOne(registro);
        }

        if (registro.cartasEspadasDisponiveis.length === 0) {
            const embed = new EmbedBuilder()
                .setTitle('ASSIMILAÇÃO DE ESPADAS - Sem Cartas')
                .setDescription('Você não tem mais cartas disponíveis!\nUse a.ereset para restaurar suas cartas.')
                .setImage('attachment://azul.png')
                .setColor(0xFFD700);
            message.channel.send({ embeds: [embed], files: ['src/Versos/azul.png'] });
            return true;
        }

        // Sorteia uma carta
        const indexAleatorio = Math.floor(Math.random() * registro.cartasEspadasDisponiveis.length);
        const cartaSorteada = registro.cartasEspadasDisponiveis.splice(indexAleatorio, 1)[0];

        // Atualiza banco
        await colecao.updateOne(
            { guildId, userId },
            { $set: { cartasEspadasDisponiveis: registro.cartasEspadasDisponiveis } }
        );

        const embed = criarEmbed(cartaSorteada, registro.cartasEspadasDisponiveis.length);

        message.channel.send({ embeds: [embed], files: [cartaSorteada.imagem] });

    } catch (error) {
        console.error('Erro no comando Copas:', error);
    }

    return true;
}

module.exports = { handleCards, conectarDB, criarEmbed };