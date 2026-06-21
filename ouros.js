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
        console.log('✅ Conectado ao MongoDB(Ouros)');
    } catch (err) {
        console.error('Erro ao conectar no MongoDB(Ouros):', err);
    }
}

const cartasOuros = [
    { valor: 'A', nome: 'Ás', imagem: 'src/Ouros/A.png'},
    { valor: '2', nome: 'Dois', imagem: 'src/Ouros/2.png'},
    { valor: '3', nome: 'Três', imagem: 'src/Ouros/3.png'},
    { valor: '4', nome: 'Quatro', imagem: 'src/Ouros/4.png'},
    { valor: '5', nome: 'Cinco', imagem: 'src/Ouros/5.png'},
    { valor: '6', nome: 'Seis', imagem: 'src/Ouros/6.png'},
    { valor: '7', nome: 'Sete', imagem: 'src/Ouros/7.png'},
    { valor: '8', nome: 'Oito', imagem: 'src/Ouros/8.png'},
    { valor: '9', nome: 'Nove', imagem: 'src/Ouros/9.png'},
    { valor: '10', nome: 'Dez', imagem: 'src/Ouros/10.png'},
    { valor: 'J', nome: 'Valete', imagem: 'src/Ouros/J.png'},
    { valor: 'Q', nome: 'Dama', imagem: 'src/Ouros/Q.png'},
    { valor: 'K', nome: 'Rei', imagem: 'src/Ouros/K.png'}
];

function criarEmbed(carta, cartasRestantes) {
    const embed = new EmbedBuilder();

    switch(carta.valor) {
        case 'A':
            embed.setTitle('ASSIMILAÇÃO ANATÔMICA - ÁS DE OUROS');
            break;
        case '2':
            embed.setTitle('ASSIMILAÇÃO CUTÂNEA - 2 DE OUROS');
            break;
        case '3':
            embed.setTitle('ASSIMILAÇÃO CAMALEÔNICA - 3 DE OUROS');
            break;
        case '4':
            embed.setTitle('ASSIMILAÇÃO ESCAMOSA - 4 DE OUROS');
            break;
        case '5':
            embed.setTitle('ASSIMILAÇÃO ÓSSEA - 5 DE OUROS');
            break;
        case '6':
            embed.setTitle('ASSIMILAÇÃO GASTROINTESTINAL - 6 DE OUROS');
            break;
        case '7':
            embed.setTitle('ASSIMILAÇÃO RESPIRATÓRIA - 7 DE OUROS');
            break;
        case '8':
            embed.setTitle('ASSIMILAÇÃO TERMOREGULADORA - 8 DE OUROS');
            break;
        case '9':
            embed.setTitle('ASSIMILAÇÃO NEURAL - 9 DE OUROS');
            break;
        case '10':
            embed.setTitle('ASSIMILAÇÃO CARDIOVASCULAR - 10 DE OUROS');
            break;
        case 'J':
            embed.setTitle('ASSIMILAÇÃO FITOMÓRFICA - VALETE DE OUROS');
            break;
        case 'Q':
            embed.setTitle('ASSIMILAÇÃO QUIMIORECEPTORA - DAMA DE OUROS');
            break;
        case 'K':
            embed.setTitle('ASSIMILAÇÃO METABÓLICA - REI DE OUROS');
            break;
    }

    embed.setFooter({ text: `Restam ${cartasRestantes} cartas de Ouros` })
        .setImage(`attachment://${carta.imagem.split('/').pop()}`)
        .setColor(0xFFD700);

    switch(carta.valor) {
        case 'A':
            embed.setDescription(`<:AA:1423017100192256073> – Presas Aumentadas
Gasta um ponto de Determinação <:PD:1423112067464040510> para usar a característica __Letal__ (pag. XX) ao morder. Depois de ingerir carne crua, ignora o custo pelas próximas 4 horas.

<:AA:1423017100192256073><:AA:1423017100192256073> – Nadadeiras
Gasta um ponto de Assimilação <:PA:1423143615068115206> para se deslocar debaixo d´água na velocidade normal. Perde um nível em *__Furtividade__* (mínimo 0).

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Guelras
Guelras funcionais se formam nas laterais do pescoço, permitindo respirar debaixo d’água, porém consome o dobro de água.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Braços alongados: <:BA:1423110545657298995> __Assimilação 3+__
Os braços do Infectado se alongam, aumentando seu alcance. Quando investe pontos em Neutralizar Ameaça, o alvo perde <:AP:1423017120073125990> no resultado do turno seguinte. Perde um nível em *__Manufaturas__* (mínimo 0)

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Besta de carga: <:BA:1423110545657298995> __Assimilação 5+__
O tronco e os membros permitem carregar o triplo da carga normal e dobra os pontos investidos em Neutralização de Ameaça. Perde permanentemente todos os níveis em *__Manufaturas__*.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Alado: <:BA:1423110545657298995> __Assimilação 7+__
Desenvolve asas de queratina orgânica capazes de voo pleno. Ações de Fuga recebem AA adicionais. A estrutura das asas impede o uso de coletes, mochilas ou vestimentas que cubram os ombros ou tórax.`);
            break;
        case '2':
            embed.setDescription(`<:AA:1423017100192256073> – Pele Aderente
A pele do Infectado passa a transpirar com substâncias adesivas e mutáveis.
Pode aderir a superfícies verticais e se mover por paredes ou tetos sem testes que incluam *__Atletismo. Contudo__*, resultados em testes de Fuga correndo são reduzidos em <:AS:1422741535048470598>.

<:AA:1423017100192256073><:AA:1423017100192256073>– Pele Ajustável
A pele se ajusta à iluminação do ambiente, tornando o Infectado mais difícil de perceber em áreas escuras ou em sombras. Mantenha um dado a mais em testes que incluam *__Furtividade__* em baixa luz. Sofre penalidade de <:AS:1422741535048470598> em testes que incluam *__Expressão__* sob luz direta.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Sentir Vibrações
A epiderme se torna altamente sensível, permitindo detectar vibrações e pressões em superfícies. Adicione <:AS:1422741535048470598> em testes que incluam *__Percepção__* tátil. Estímulos inesperados causam reações abruptas, reduzindo em <:AS:1422741535048470598> testes que incluam *__Reação__*.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Cheiro Nocivo: <:BA:1423110545657298995> Assimilação 3+
Pelo custo de um ponto de Assimilação <:PA:1423143615068115206>, a pele do Infectado libera compostos químicos que geram uma penalidade padrão <:PS:1423452839820136639> a seres vivos pelo restante da cena, aumentando em <:AP:1423017120073125990> o custo de ativações ou anulando <:AS:1422741535048470598> em testes, conforme o caso. O odor liberado provoca uma redução de <:AS:1422741535048470598> em testes sociais do Infectado e do atacante afetado por 2 cenas, contando a cena em que foi usado.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Mudar Corpo: <:BA:1423110545657298995> Assimilação 5+
O Infectado pode controlar pequenas alterações de cor, calor ou textura em sua pele. Gaste um ponto de Assimilação <:PA:1423143615068115206> para adicionar <:AS:1422741535048470598><:AS:1422741535048470598> em um teste que inclua *__Furtividade__*, disfarce ou atuação corporal por cena. Roupas que cobrem o tronco anulam o efeito.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Sentir o Ar: <:BA:1423110545657298995> Assimilação 7+
A pele se torna um sistema de absorção sensorial completo. O Infectado detecta sinais elétricos, variações de temperatura e vibrações em um raio de 3 quilômetros. Pode ignorar testes que incluam *__Percepção__* em situações em que a informação seja tátil, auditiva ou sísmica. A pele queima sob sol direto, levando à perda de três pontos de Saúde <:SM:1423452861236379770> por hora exposta sem proteção.`);
            break;
        case '3':
            embed.setDescription(`<:AA:1423017100192256073> – Camaleônico
A pigmentação da pele do Infectado pode se fundir ao ambiente. Adicione <:AS:1422741535048470598> em testes que incluam *__Furtividade__* ao se manter imóvel. Perde um ponto de Determinação <:PD:1423112067464040510> sempre que sofre queimaduras de sol, mesmo que suaves.

<:AA:1423017100192256073><:AA:1423017100192256073> – Mudar o Rosto
O Infectado pode tensionar músculos e deslocar cartilagens menores para alterar parcialmente o formato do rosto. Mantém 1 dado adicional em testes para se disfarçar. Contudo, sofre penalidade de <:AS:1422741535048470598> em testes que incluam *__Percepção__* quando o sentido testado for audição.

<:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598> – Camuflagem
O corpo do Infectado passa a reagir reflexivamente a padrões visuais externos para se ocultar. Os dados de *__Furtividade__* são substituídos por <:HX:1423454726657151047>.

<:AA:1423017100192256073><:AA:1423017100192256073><:AP:1423017120073125990><:AP:1423017120073125990> – Visão Periférica: <:BA:1423110545657298995> __Assimilação 3+__
Os olhos do Infectado saltam levemente para fora das órbitas aumentando a
visão periférica e podem se virar em direções distintas. Recebe um ponto em *__Percepção__* que pode ultrapassar o limite máximo e reduz a visão de profundidade, sofrendo uma penalidade de <:AA:1423017100192256073> em testes de pontaria que incluam *__Atletismo__* ou *__Armas__*.

<:AA:1423017100192256073><:AA:1423017100192256073><:AP:1423017120073125990> – Malemolência: <:BA:1423110545657298995> __Assimilação 5+__
O corpo do Infectado passa a reagir a alterações emocionais, adaptando sua aparência inconscientemente ao seu humor no momento. O Infectado adiciona <:AS:1422741535048470598><:AS:1422741535048470598> em interações sociais, exceto quando está tentando esconder informações, situação em que sofre penalidade de <:AP:1423017120073125990> adicional.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598><:AS:1422741535048470598> – Invisibilidade: <:BA:1423110545657298995> __Assimilação 7+__
O Infectado consegue gastar um ponto de Assimilação <:PA:1423143615068115206> para ficar completamente invisível pelo restante da cena. O Infectado não pode voltar a ficar visível antes disso mesmo que deseje.`);
            break;
        case '4':
            embed.setDescription(`<:AA:1423017100192256073> – Escamoso
Escamas reduzem em um o dano cortante sofrido. Perde <:AS:1422741535048470598> em testes que incluam *__Expressão__* com pessoas não Assimiladas que desconhecem Assimilações.

<:AA:1423017100192256073><:AA:1423017100192256073> – Escalador
Escamas surgem nas mãos e pés. Anda ou escala superfícies ásperas, mantendo um dado adicional em testes que incluam *__Atletismo__*. Perde <:AS:1422741535048470598> em testes de *__Furtividade__* em ambientes urbanos.

<:AA:1423017100192256073><:AA:1423017100192256073><:AP:1423017120073125990> – Escorregadio
As escamas se deslocam e se adaptam melhorando a locomoção em superfícies instáveis ou escorregadias. Ao tentar manter estabilidade mantém um dado adicional. Troca de pele a cada mês, sofrendo dano dobrado por 24 horas pós a troca.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AP:1423017120073125990> – Escamas Reativas: <:BA:1423110545657298995> __Assimilação 3+__
As escamas se endurecem e podem retaliar ao toque, causando um <:LG:1423145531076645025> de dano em quem o atacar ou adiciona <:AS:1422741535048470598> para Neutralização da Ameaça, conforme o caso. O toque se torna áspero, adicionando <:AP:1423017120073125990> a manifestações táteis de afeto.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598> – Evasão Natural: <:BA:1423110545657298995> __Assimilação 5+__
O corpo se adapta para reagir a ataques e deslocamento. Se alvejado, o Infectado causa duas penalidades padrão <:PS:1423452839820136639> ao atacante, aumentando em <:AP:1423017120073125990><:AP:1423017120073125990> o custo de suas ativações ou anulando <:AS:1422741535048470598><:AS:1422741535048470598> do resultado, conforme o caso.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598><:AS:1422741535048470598> – Imunidade ao Calor: <:BA:1423110545657298995> __Assimilação 7+__
As escamas se aprimoram e são capazes de absorver calor ou luminosidade. O Infectado é imune a qualquer dano térmico (fogo, calor, abrasão...), mas se torna reluzente sob iluminação artificial, sofre uma penalidade de <:AS:1422741535048470598><:AS:1422741535048470598> em testes de *__Furtividade__* nesse contexto.`);
            break;
        case '5':
            embed.setDescription(`<:AA:1423017100192256073> – Ossos Reativos
Espículos ósseos brotam da pele. Sempre que sofre dano de um golpe corpo a corpo, causa um ponto de dano ao agressor. Contudo, sofre uma penalidade de <:AS:1422741535048470598> em testes que incluam *__Expressão__* com as protuberâncias expostas.

<:AA:1423017100192256073><:AA:1423017100192256073> – Maleabilidade:
As articulações do Infectado se tornam hipermóveis, capazes de se dobrarem em ângulos incomuns. Mantenha um dado adicional em testes que incluam *__Furtividade.__* Contudo, sofre penalidade de <:AS:1422741535048470598> em testes que incluam *__Atletismo__* que envolvam postura ou equilíbrio.

<:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598> – Lâminas Ósseas
O corpo projeta lâminas ósseas nos antebraços ou joelhos. Adiciona <:AS:1422741535048470598> em testes de ataque corpo a corpo com *__Armas__* ou *__Atletismo__*. Contudo, adiciona <:AP:1423017120073125990> ao resultado de testes com *__Medicina__* ou *__Biologia__* usados no corpo do Infectado.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AP:1423017120073125990> – Presas de Mamute: <:BA:1423110545657298995> __Assimilação 3+__
O Infectado cria presas de mamute. Em Conflito adiciona <:AS:1422741535048470598> e reduz uma <:AA:1423017100192256073> no resultado de testes para Neutralizar Ameaça.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598><:AS:1422741535048470598> – Exoesqueleto: <:BA:1423110545657298995> __Assimilação 5+__
Por três pontos de Assimilação <:PA:1423143615068115206> o Infectado pode, até o final da cena, estender e projetar seus ossos para fora do corpo, fazendo a função de exoesqueleto. Fontes de dano cortante ou perfurante (incluindo balas de armas de fogo de até médio calibre) são ignoradas nesse tempo, período em que o Infectado não pode mover sua mandíbula, impossibilitado de falar.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598><:AS:1422741535048470598> – Gigante: <:BA:1423110545657298995> __Assimilação 7+__
Por quatro pontos de Assimilação <:PA:1423143615068115206>, o Infectado pode dobrar de tamanho, ganhando força e agilidade sobre-humanas até o fim da cena. Todas os testes físicos do Infectado mantém dois dados adicionais, mas adiciona <:AP:1423017120073125990> a todos os testes com *__Furtividade__* e/ou *__Percepção__* durante o efeito.`);
            break;
        case '6':
            embed.setDescription(`<:AA:1423017100192256073> – Saliva Ácida
O sistema digestivo do Infectado pode consumir qualquer matéria orgânica. O odor de seus ácidos estomacais causa desconforto, gerando uma penalidade de <:AA:1423017100192256073> em testes que incluam *__Influência__*.

<:AA:1423017100192256073><:AA:1423017100192256073> – Ruminante
Estômago segmentado permite ao Infectado armazenar alimento para até uma semana, mas precisa ruminar após cada refeição.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Estômago Restaurador
Regenera um ponto de Saúde <:SM:1423452861236379770> por refeição completa, mas não consegue comer comida processada.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Jato Ácido: <:BA:1423110545657298995> __Assimilação 3+__
O Infectado pode gastar um ponto de Assimilação <:PA:1423143615068115206> e <:AS:1422741535048470598> de seu resultado em Ação para expelir ácido digestivo em um alvo, causando uma penalidade padrão <:PS:1423452839820136639>, aumentando em <:AP:1423017120073125990> o custo
de suas as ativações ou reduzindo em <:AS:1422741535048470598> os resultados obtidos em testes, conforme o caso. Este efeito dura uma rodada por <:BA:1423110545657298995>Nível de Assimilação do Infectado. A saliva do Infectado é ácida e causa queimaduras, mesmo quando não há intenção.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Imunidade à Intoxicação: <:BA:1423110545657298995> __Assimilação 5+__
O Infectado não sofre nenhum tipo de intoxicação ou envenenamento, porém não sente prazer em refeições, mesmo que especiais – o Infectado não recupera Determinação <:PD:1423112067464040510> comendo algo raro ou que goste muito, como para outros personagens.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Gremlin: <:BA:1423110545657298995> __Assimilação 7+__
O Infectado pode se alimentar de qualquer coisa que consiga mastigar e engolir. Se ficar um dia inteiro sem comer sofre grave desconforto estomacal e perde um ponto de Determinação <:PD:1423112067464040510> por hora.`);
            break;
        case '7':
            embed.setDescription(`<:AA:1423017100192256073> – Pulmão Grosso
Respira ar rarefeito, fumaça ou detritos sem penalidades, mas adiciona <:AP:1423017120073125990> em testes que incluam *__Furtividade__*, pois sua respiração é ruidosa.

<:AA:1423017100192256073><:AS:1422741535048470598> – Fôlego Estendido
Prende a respiração por até 5 minutos sem realizar testes. Odores fortes ou ataques ao olfato resultam em perda de um ponto de Determinação <:PD:1423112067464040510>.

<:AA:1423017100192256073><:AA:1423017100192256073><:AP:1423017120073125990> – Sopro Poderoso
Gasta um ponto de Assimilação <:PA:1423143615068115206> para expirar com grande pressão torácica. Empurra três metros ou cobre de poeira uma Ameaça, mesmo sem causar dano, adicionando <:AS:1422741535048470598><:AS:1422741535048470598> para Fuga no Conflito. Sempre fala de forma estrondosa, reduz <:AA:1423017100192256073> de seus testes sociais com *__Furtividade__* que envolvam a voz, como sussurrar ou falar discretamente.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Fôlego Inumano: <:BA:1423110545657298995> __Assimilação 3+__
Com uma inspiração profunda aumenta sua tolerância ao estresse físico. Pode Agir por Instinto sem custo de Assimilação. Sofre penalidade de um dado mantido em testes que envolvam *__Conhecimentos__* até o final da cena.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Fôlego Reparador: <:BA:1423110545657298995> __Assimilação 5+__
O controle respiratório restaura o equilíbrio psicológico. Ao perder pontos de Determinação <:PD:1423112067464040510> pode perder pontos de Assimilação <:PA:1423143615068115206> no lugar – se aplica apenas para perda, não para usos ativos de pontos de Determinação <:PD:1423112067464040510>.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598><:AS:1422741535048470598> – Fôlego Infinito: <:BA:1423110545657298995> __Assimilação 7+__
Pulmões do Infectado evoluem. O Infectado sobrevive sem ar por tempo indefinido. Dobra qualquer efeito de veneno ou intoxicação por vias aéreas.`);
            break;
        case '8':
            embed.setDescription(`<:AA:1423017100192256073> – Resistência Térmica
Temperatura corporal controlada. Frio ou calor moderados não o afetam, mas sua sudorese é constante e ácida, provocando irritação em quem o toca. Contato físico prolongado com outro personagem (ex: imobilizações, transporte ou socorro) o faz adicionar <:AP:1423017120073125990> em todo teste até o fim da cena (não cumulativo).

<:AA:1423017100192256073><:AA:1423017100192256073> – Conduzir Calor
O Infectado absorve parte do calor do ambiente. Aquece objetos ou pessoas ao toque, impede hipotermia de personagens ou reduz a temperatura de alimentos. Sua recuperação é reduzida pela metade sem fontes de calor para absorver.

<:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598> – Gerar Calor
Libera pulsos de calor. Gastar um ponto de Assimilação <:PA:1423143615068115206> aumenta a temperatura ambiente, penalizando em <:AS:1422741535048470598> por fatiga todos os presentes na cena nos testes que incluam *__Resolução__* ou *__Potência__*. Ou aumentam em <:AP:1423017120073125990> o custo das Ativações de Ameaça.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598> – Sangue Quente: <:BA:1423110545657298995> __Assimilação 3+__
O sangue aquece e acelera a circulação, melhorando reflexos. Gastar um ponto de Assimilação e permite manter dois dados adicionais em testes que incluam *__Reação__*. Isso sobrecarrega o corpo fazendo-o perder um ponto de Determinação <:PD:1423112067464040510> em ações físicas até o fim da cena.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598> – Exala Vapor: <:BA:1423110545657298995> __Assimilação 5+__
O Infectado emite vapor constante, ofuscando a visão dos adversários. Ataques de longo alcance
que mirem alvos na área sofrem duas penalidades padrão <:PS:1423452839820136639>, aumentando em <:AP:1423017120073125990><:AP:1423017120073125990> o custo de ativações ou perdendo <:AS:1422741535048470598><:AS:1422741535048470598> dos resultados, conforme o caso. Ataques de longo alcance a partir da área afetada também sofrem duas penalidades <:PS:1423452839820136639>.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Esquentar/Esfriar Região: <:BA:1423110545657298995> __Assimilação 7+__
O controle e conversão de temperatura atingem seu ápice. Gastando todos os pontos de Assimilação <:PA:1423143615068115206>, pode-se alterar a temperatura de toda uma região. Cada ponto de Assimilação <:PA:1423143615068115206> investido dessa maneira altera a temperatura em 3 graus Celsius (3°C) para mais ou para menos.`);
            break;
        case '9':
            embed.setDescription(`<:AA:1423017100192256073> – Pulso Mental
A resposta cognitiva do Infectado se aprimora. Ao gastar um ponto de Assimilação <:PA:1423143615068115206> pode repetir
um teste que inclua Conhecimentos, mantendo o segundo resultado. Contudo, a sobrecarga sensorial causa insônia — sua recuperação não restaura pontos de Determinação <:PD:1423112067464040510> se não estiver em ambiente isolado, silencioso e escuro por um descanso de ao menos 6 horas.

<:AA:1423017100192256073><:AA:1423017100192256073> – Prever Dano
Reflexos involuntários que o fazem prever padrões repetitivos. Ao ser alvejado por um segundo efeito danoso, reduz o dano sofrido em um ponto. Perde um ponto de Determinação <:PD:1423112067464040510> se estímulos visuais ou sonoros simultâneos estão em cena.

<:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598> – Prever Ameaça
O cérebro está tão acelerado que antecipa e atrapalha uma Ameaça durante o Conflito. Em seu turno, gaste um ponto de Assimilação <:PA:1423143615068115206> e escolha *__Reação__* ou *__Sagacidade__* como o Instinto da rolagem. Role seu teste e reserve os resultados, cada <:AS:1422741535048470598> pode anular <:AP:1423017120073125990> e cada <:AA:1423017100192256073> pode anular outra no resultado da Ameaça. Sua Ação se resolve antes da Ameaça com os pontos restantes, se houver.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Sintonia Mental: <:BA:1423110545657298995> __Assimilação 3+__
Prevê possíveis falhas em Ações de outros Infectados. Gastar um ponto de Assimilação <:PA:1423143615068115206> adiciona <:AA:1423017100192256073> ao resultado do teste de um aliado fora de Conflito dando-lhe conselhos. As previsões tornam a convivência difícil, gerando penalidade de <:AP:1423017120073125990> nos testes que incluam *__Influência__* ou *__Expressão__*.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598> – Visão Mental: <:BA:1423110545657298995> __Assimilação 5+__
Ao obter <:AS:1422741535048470598><:AS:1422741535048470598> ou mais em um teste de Conhecimento, permite adquirir uma informação vital sobre o tema em questão. Essa informação é confiável e válida por toda a campanha. A lógica reduz a plasticidade dos pensamentos — recebe <:AP:1423017120073125990> adicional em rolagens criativas ou improvisadas.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598><:AS:1422741535048470598> – Visão Verdadeira: <:BA:1423110545657298995> __Assimilação 7+__
O cérebro alcança hiperconectividade dando acesso a informações do ambiente e dos próprios instintos. Permite pedir uma informação oculta ao Assimilador por cena gastando toda a Assimilação <:PA:1423143615068115206> e não precisa de testes. Profundidade, precisão e relevância da informação da Aventura aumentam a cada ponto gasto.`);
            break;
        case '10':
            embed.setDescription(`<:AA:1423017100192256073> – Sangue Frio
A circulação se adapta a situações de risco extremo. Não sofre penalidades em situações de tensão, medo ou risco. Sofre penalidade de <:AA:1423017100192256073> em testes que incluam *__Manufaturas__* pela sensibilidade reduzida.

<:AA:1423017100192256073><:AA:1423017100192256073> – Transe
A circulação controlada permite restaurar o dobro da quantidade normal de pontos de Determinação <:PD:1423112067464040510> em toda recuperação em que o Infectado tiver sua Saúde <:SM:1423452861236379770> completa.

<:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598> – Sangue Furioso
O sangue retece os músculos com força explosiva. Gaste um ponto de Assimilação <:PA:1423143615068115206> para manter dois dados adicionais em testes que incluam *__Potência__* ou *__Atletismo__*. Perde um ponto de Saúde <:SM:1423452861236379770> no fim da rodada.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Fingir Morte: <:BA:1423110545657298995> __Assimilação 3+__
Reduz o fluxo sanguíneo quase parando o coração por até 5 minutos. Uma dieta pobre em ferro considera as penalidades de <:SA:1423452896141512866>Níveis de Saúde como um Nível inferior.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AP:1423017120073125990> – Sangue Regenerativo: <:BA:1423110545657298995> __Assimilação 5+__
O fluxo sanguíneo direcionado permite regeneração localizada. Ao gastar um ponto de Determinação <:PD:1423112067464040510> mantém um dado adicional e regenera um ponto de Saúde <:SM:1423452861236379770>. Quando o fizer, o Infectado não pode anular <:AP:1423017120073125990> em seus resultados de nenhuma forma.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598><:AS:1422741535048470598> – Sangue Potente: <:BA:1423110545657298995> __Assimilação 7+__
O sistema cardiovascular entra em estado de hiperfluxo. Gaste todos os pontos de Assimilação <:PA:1423143615068115206> para manter um dado adicional por ponto gasto em Ações físicas pelo restante da cena.`);
            break;
        case 'J':
            embed.setDescription(`<:AA:1423017100192256073> – Sintonia Verde
O Infectado sente a vida vegetal ao seu redor. Ao gastar um ponto de Assimilação <:PA:1423143615068115206> sente a presença, tipo e condição de plantas num raio de 30 metros, desde que esteja descalço ou com os pés nus no solo.

<:AA:1423017100192256073><:AA:1423017100192256073> – Casca Grossa
Casca vegetal se forma sobre a epiderme, aumentando em um a *__Resolução__* (pode ultrapassar o limite máximo). Sofre dano dobrado de queimadura (incluindo fogo, calor extremo, frio extremo ou ácido).

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Fotorreceptores
Pelos corporais se tornam folhas e passa a realizar fotossíntese. Não precisa consumir alimentos. Basta o consumo habitual de água, contato direto com o solo e exposição à luz solar por duas horas diárias. Perde um ponto de Determinação <:PD:1423112067464040510> ao final do dia se não fizer.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Raízes: <:BA:1423110545657298995> __Assimilação 3+__
Ao repousar, de seu corpo nascem finas raízes por onde se extrai água e nutrientes do solo mantendo estabilidade mesmo em terrenos difíceis. Dormir sem contato direto com o solo impede de recuperar Determinação <:PD:1423112067464040510>.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073>– Curar o Solo: <:BA:1423110545657298995> __Assimilação 5+__
Reduza um <:SA:1423452896141512866>Nível de Saúde completo para nutrir um bioma local, regenerando parte da flora: remove contaminações e restaura o solo criando conexão permanente e um vínculo emocional com o local. Testemunhar a degradação de um bioma conectado causa perda de um ponto de Determinação <:PD:1423112067464040510>.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Cura Comunal: <:BA:1423110545657298995> __Assimilação 7+__
O corpo assume propriedades vegetais. Gaste dois pontos de Assimilação <:PA:1423143615068115206> para converter o terreno num raio de 20 metros em um ambiente regenerativo. Aliados que tocarem o solo recuperam um ponto de Saúde <:SM:1423452861236379770> por rodada durante a cena. Mortos nesse ambiente fazem suas raízes se espalharem criando nova vegetação local com o dobro da biodiversidade original — uma marca permanente de sua existência.`);
            break;
        case 'Q':
            embed.setDescription(`<:AA:1423017100192256073><:AA:1423017100192256073> – Faro Apurado
O olfato sofre mutações e se expandem por receptores epidérmicos. Identifica substâncias químicas simples e percebe odores em níveis residuais, incluindo feromônios, álcool ou putrefação. Essa sensibilidade causa desconforto e perda de um ponto de Determinação <:PD:1423112067464040510> se passar mais de 5 minutos exposto a odores intensos.

<:AA:1423017100192256073><:AA:1423017100192256073> – Farejar Toxinas
O organismo distingue compostos orgânicos detectando agentes tóxicos ou contaminantes antes de ingeri-los, tocá-los ou inalá-los. Essa sensibilidade impede o consumo de comidas com cheiro acentuado, inclusive preparos bem temperados. Ingerir esses alimentos nas últimas 12 horas impede a restauração de Determinação <:PD:1423112067464040510>.

<:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598> – Farejar Rastros
Analisa rastros e identifica marcadores químicos residuais. Ao testar *__Furtividade__*, *__Sobrevivência__* ou *__Engenharia__*, adicione <:AS:1422741535048470598><:AS:1422741535048470598> ao analisar um local onde algo foi movido. Testes que incluam *__Percepção__* sofrem penalidade de <:AA:1423017100192256073> em novos ambientes, pois essas informações novas reduzem a atenção em outras coisas.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AP:1423017120073125990> – Farejar Sentimentos: <:BA:1423110545657298995> __Assimilação 3+__
Detecta alterações hormonais, percebendo medo, desejo, repulsa, hesitação ou mentira baseado em alterações químicas. Gasta um ponto de Assimilação <:PA:1423143615068115206> para detectar nuances ou intenções emocionais do alvo. Adicione seus dados de *__Percepção__* a testes que incluam *__Expressão__* ou *__Influência__* com este alvo. Sofre penalidade de <:AP:1423017120073125990> em testes do mesmo tipo se realizados com mais de 5 pessoas no ambiente pela mistura de odores.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Secreções: <:BA:1423110545657298995> __Assimilação 5+__
Desenvolve secreções cutâneas. Pode “marcar” uma trilha, objeto ou personagem para seguir o odor
pelas próximas 24h, mesmo sem linha de visão e a longas distâncias que pode ser notado por criaturas com faro apurado, penalizando em <:AS:1422741535048470598><:AS:1422741535048470598> testes que incluam *__Furtividade__* contra essas criaturas.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AP:1423017120073125990><:AP:1423017120073125990> – Farejar Psicometria: <:BA:1423110545657298995> __Assimilação 7+__
O sistema quimiorreceptor se integra completamente com sua função cognitiva. Gaste três pontos de Assimilação <:PA:1423143615068115206> para “ler” o estado químico de qualquer área, estrutura, objeto ou cadáver, recebe uma revelação precisa do Assimilador sobre o passado do alvo — inclusive fatores biológicos ocultos, não revelados em testes convencionais. Essa conexão e a percepção que tudo se degrada gera penalidade de <:AA:1423017100192256073><:AA:1423017100192256073> em testes que incluam *__Resolução__*.`);
            break;
        case 'K':
            embed.setDescription(`<:AA:1423017100192256073> – Metabolismo Acelerado
O metabolismo opera de forma acelerada. Ao recuperar Saúde <:SM:1423452861236379770>, recupera um ponto adicional. Precisa consumir o triplo de calorias diárias ou perde um ponto de Saúde <:SM:1423452861236379770> por dia.

<:AA:1423017100192256073><:AP:1423017120073125990> – Metabolismo Afiado
Converte gordura e músculos em energia. Mantém um dado adicional em Ações de de *__Reação__*, *__Potência__* ou *__Resolução__* física. Penalidade de <:AP:1423017120073125990> adicional em testes que envolvam Conhecimentos.

<:AA:1423017100192256073><:AA:1423017100192256073><:AS:1422741535048470598> – Metabolismo Regenerativo
Gaste dois pontos de Determinação <:PD:1423112067464040510> para acelerar a recuperação. Restaura quatro pontos de Saúde <:SM:1423452861236379770> e sofre penalidade de <:AS:1422741535048470598> em testes físicos até o final da cena. Pode ser ativada uma vez por cena e não funciona em Conflito.

<:AA:1423017100192256073><:AA:1423017100192256073><:AP:1423017120073125990><:AP:1423017120073125990> – Imunidade Metabólica: <:BA:1423110545657298995> __Assimilação 3+__
Resiste a condições extremas (hipóxia, envenenamento leve, temperaturas), tornando-o imune a elas. Necessidade permanente de ingestão de sais e eletrólitos, não consumi-los diariamente gera uma penalidade cumulativa de <:AA:1423017100192256073> por dia em todos os testes.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Metabolismo Eficiente: <:BA:1423110545657298995> __Assimilação 5+__
Induz breves surtos hormonais que o tornam mais eficiente. Gaste dois pontos de Assimilação <:PA:1423143615068115206> para manter dois dados adicionais em teste físico. Após a Ação, perde um ponto de Saúde <:SM:1423452861236379770> para cada <:AP:1423017120073125990> mantida no resultado.

<:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073><:AA:1423017100192256073> – Metabolizar Instintos: <:BA:1423110545657298995> __Assimilação 7+__
Atinge domínio total sobre sua fisiologia. Gaste todos os pontos de Assimilação <:PA:1423143615068115206> e distribua da maneira que preferir entre *__Potência__*, *__Reação__* e/ou *__Resolução__*. O nível desses Instintos não pode ultrapassar seu <:BA:1423110545657298995> Nível de Assimilação. Sofre dano de um ponto de Saúde <:SM:1423452861236379770> por rodada até que desative o efeito`);
            break;
    }

    return embed;
}

async function handleCards(message) {
    // 1. VERIFICAR SE É UMA DM
    // Se a mensagem for uma DM, saia da função imediatamente se nãao tu quebra, seu comedia.
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
    if (message.content.toLowerCase().startsWith('a.oreset')) {
        await colecao.updateOne(
            { guildId, userId },
            { $set: { guildName, userName, cartasOurosDisponiveis: [...cartasOuros] } },
            { upsert: true }
        );

        const logChannel = message.guild.channels.cache.get(LOG_CHANNEL_ID);
        if (logChannel) logChannel.send(`${message.author.tag} resetou suas cartas de Ouros em ${guildName}`);
        message.reply('Suas cartas de Ouros foram restauradas! Você tem 13 cartas novamente.');
        return true;
    }

    if (!message.content.toLowerCase().startsWith('a.o')) return false;

    try {
        let registro = await colecao.findOne({ guildId, userId });

        // Inicializa se não existir
        if (!registro) {
            registro = {
                guildId,
                guildName,
                userId,
                userName,
                cartasOurosDisponiveis: [...cartasOuros]
            };
            await colecao.insertOne(registro);
        }

        if (registro.cartasOurosDisponiveis.length === 0) {
            const embed = new EmbedBuilder()
                .setTitle('ASSIMILAÇÃO DE OUROS - Sem Cartas')
                .setDescription('Você não tem mais cartas disponíveis!\nUse a.oreset para restaurar suas cartas.')
                .setImage('attachment://azul.png')
                .setColor(0xFFD700);
            message.channel.send({ embeds: [embed], files: ['src/Versos/azul.png'] });
            return true;
        }

        // Sorteia uma carta
        const indexAleatorio = Math.floor(Math.random() * registro.cartasOurosDisponiveis.length);
        const cartaSorteada = registro.cartasOurosDisponiveis.splice(indexAleatorio, 1)[0];

        // Atualiza banco
        await colecao.updateOne(
            { guildId, userId },
            { $set: { cartasOurosDisponiveis: registro.cartasOurosDisponiveis } }
        );

        const embed = criarEmbed(cartaSorteada, registro.cartasOurosDisponiveis.length);

        message.channel.send({ embeds: [embed], files: [cartaSorteada.imagem] });

    } catch (error) {
        console.error('Erro no comando Ouros:', error);
    }

    return true;
}

module.exports = { handleCards, conectarDB, criarEmbed };