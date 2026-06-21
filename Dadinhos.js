const rollDice = (sides, explode = false) => {
  let result = Math.ceil(Math.random() * sides);
  const rolls = [result];

  while (explode && result === sides) {
    result = Math.ceil(Math.random() * sides);
    rolls.push(result);
  }

  return rolls;
};

const handleComparison = (rolls, operator, value) => {
  switch (operator) {
    case '>=': return rolls.filter(r => r >= value).length;
    case '<=': return rolls.filter(r => r <= value).length;
    case '=': return rolls.filter(r => r === value).length;
    default: return null;
  }
};

module.exports = {
  async handleRawDice(message) {
    if (!message || !message.content || message.author.bot) return false;

    const content = message.content.trim();

    // 🎲 Expressões completas com dados (ex: 2d6 + 1d4 + 5)
    const complexExprMatch = content.match(/^(?=.*\d+d\d+)[0-9dD\+\-\*\/\s\(\)]+$/);

    if (complexExprMatch) {
      let expr = content;
      const diceRegex = /(\d*)d(\d+)/gi;
      let match;
      const displayParts = [];

      while ((match = diceRegex.exec(content)) !== null) {
        const full = match[0];
        const qtd = parseInt(match[1]) || 1;
        const faces = parseInt(match[2]);
        const rolls = Array.from({ length: qtd }, () => Math.ceil(Math.random() * faces));
        const total = rolls.reduce((a, b) => a + b, 0);

        expr = expr.replace(full, total);
        displayParts.push(`[${rolls.join(', ')}]`);
      }

      try {
        const resultado = eval(expr);
        const exibicaoFinal = displayParts.join(' + ');
        await message.reply(`\` ${resultado} \` ⟵ ${exibicaoFinal} ${content}`);
        return true;
      } catch (err) {
        await message.reply(`Erro ao processar a expressão.`);
        return true;
      }
    }


    // 🎲 Operações simples com dados: 3d6+, 4d8*
    const mathOpMatch = content.match(/^(\d+)d(\d+)([\+\-\*\/])$/);
    if (mathOpMatch) {
      const qtd = parseInt(mathOpMatch[1]);
      const faces = parseInt(mathOpMatch[2]);
      const operador = mathOpMatch[3];

      const rolls = Array.from({ length: qtd }, () => Math.ceil(Math.random() * faces));
      let resultado;
      switch (operador) {
        case '+': resultado = rolls.reduce((a, b) => a + b, 0); break;
        case '-': resultado = rolls.reduce((a, b) => a - b); break;
        case '*': resultado = rolls.reduce((a, b) => a * b, 1); break;
        case '/': resultado = rolls.reduce((a, b) => a / b); resultado = parseFloat(resultado.toFixed(2)); break;
      }

      await message.reply(`\` ${resultado} \` ⟵ [${rolls.join(', ')}] ${content}`);
      return true;
    }

    // 🎲 Modificador por dado: XdY++N ou XdY--N
    const modMatch = content.match(/^(\d+)d(\d+)(\+\+|\-\-)(\d+)$/);
    if (modMatch) {
      const quantidade = parseInt(modMatch[1]);
      const faces = parseInt(modMatch[2]);
      const modTipo = modMatch[3];
      const modValor = parseInt(modMatch[4]);

      const resultados = [];
      for (let i = 0; i < quantidade; i++) {
        const base = Math.floor(Math.random() * faces) + 1;
        let mod = base;

        if (modTipo === '++') mod += modValor;
        else if (modTipo === '--') mod -= modValor;

        resultados.push({ base, final: mod });
      }

      const soma = resultados.reduce((acc, r) => acc + r.final, 0);
      const rolagemFormatada = resultados.map(r => `${r.base}${modTipo}${modValor}→${r.final}`);

      await message.reply(`\` ${soma} \` ⟵ [${rolagemFormatada.join(', ')}]`);
      return true;
    }

    // 🎲 Burning Wheel Notation (BX, GX, WX)
    const bwMatch = content.match(/^([BGW])X!?$/i);
    if (bwMatch) {
      const rank = bwMatch[1].toUpperCase();
      const explode = content.includes('!');
      const bwTarget = { B: 4, G: 3, W: 2 }[rank];
      const rolls = [];
      for (let i = 0; i < 6; i++) {
        rolls.push(...rollDice(6, explode));
      }
      const result = handleComparison(rolls, '>=', bwTarget);
      await message.reply(`\` ${result} \` ⟵ [${rolls.join(', ')}] (BW ≥ ${bwTarget})`);
      return true;
    }

    // 🎲 Repetição: X#(expressão) ou X#expressão
    const repeatMatch = content.match(/^(\d+)#\(?([^\)]+)\)?$/);
    if (repeatMatch) {
      const reps = parseInt(repeatMatch[1]);
      const expr = repeatMatch[2];
      const respostas = [];

      for (let i = 0; i < reps; i++) {
        const fakeMessage = {
          content: expr,
          author: message.author,
          reply: async (resposta) => respostas.push(`${resposta}`)
        };
        await module.exports.handleRawDice(fakeMessage);
      }

      if (respostas.length > 0) {
        await message.reply(respostas.join('\n'));
      }
      return true;
    }

    // 🎲 ARO (Todos iguais)
    const aroMatch = content.match(/^(\d+)d(\d+)aro$/i);
    if (aroMatch) {
      const qtd = parseInt(aroMatch[1]);
      const faces = parseInt(aroMatch[2]);
      const rolls = Array.from({ length: qtd }, () => Math.ceil(Math.random() * faces));
      const todosIguais = rolls.every(n => n === rolls[0]);
      const total = rolls.reduce((a, b) => a + b, 0);
      await message.reply(`\` ${total} \` ⟵ [${rolls.join(', ')}]${todosIguais ? ' 🎉 Todos iguais! Explodiria!' : ''}`);
      return true;
    }

    // 🎲 No Sort (ns)
    const nsMatch = content.match(/^(\d+)d(\d+):ns$/i);
    if (nsMatch) {
      const qtd = parseInt(nsMatch[1]);
      const faces = parseInt(nsMatch[2]);
      const rolls = Array.from({ length: qtd }, () => Math.ceil(Math.random() * faces));
      const total = rolls.reduce((a, b) => a + b, 0);
      await message.reply(`\` ${total} \` ⟵ [${rolls.join(', ')}] (sem ordenação)`);
      return true;
    }

    // 🎲 Drop/Keep (dl, dh, kl, kh)
    const advMatch = content.match(/^(\d+)d(\d+)(d[lh]|k[lh])(\d+)$/i);
    if (advMatch) {
      const qtd = parseInt(advMatch[1]);
      const faces = parseInt(advMatch[2]);
      const tipo = advMatch[3];
      const alvo = parseInt(advMatch[4]);

      let rolls = Array.from({ length: qtd }, () => Math.ceil(Math.random() * faces));
      let usados = [];

      switch (tipo) {
        case 'dl': usados = rolls.sort((a, b) => a - b).slice(alvo); break;
        case 'dh': usados = rolls.sort((a, b) => b - a).slice(alvo); break;
        case 'kl': usados = rolls.sort((a, b) => a - b).slice(0, alvo); break;
        case 'kh': usados = rolls.sort((a, b) => b - a).slice(0, alvo); break;
      }

      const total = usados.reduce((a, b) => a + b, 0);
      await message.reply(`\` ${total} \` ⟵ [${rolls.join(', ')}] ⇒ usados: [${usados.join(', ')}]`);
      return true;
    }

    // 🎲 Fate Dice
    const fateRegex = /^(\d*)dF$/i;
    const matchFate = content.match(fateRegex);
    if (matchFate) {
      const qtd = parseInt(matchFate[1]) || 1;
      const rolls = Array.from({ length: qtd }, () => [-1, 0, 1][Math.floor(Math.random() * 3)]);
      const total = rolls.reduce((a, b) => a + b, 0);
      const formatado = rolls.map(n => (n === -1 ? '−' : n === 0 ? '0' : '+')).join(', ');
      await message.reply(`\` ${total} \` ⟵ [${formatado}]`);
      return true;
    }

    // 🎲 Comparações (>=, <=, =)
    const compRegex = /^(\d*)d(\d+)(>=|<=|=)(\d+)$/i;
    const matchComp = content.match(compRegex);
    if (matchComp) {
      const qtd = parseInt(matchComp[1]) || 1;
      const faces = parseInt(matchComp[2]);
      const op = matchComp[3];
      const comp = parseInt(matchComp[4]);

      let allRolls = [];
      for (let i = 0; i < qtd; i++) {
        allRolls.push(...rollDice(faces));
      }

      const result = handleComparison(allRolls, op, comp);
      await message.reply(`\` ${result} \` ⟵ [${allRolls.join(', ')}]`);
      return true;
    }

    // 🎲 Rolagem padrão (com ou sem !)
    const normalRegex = /^(\d*)d(\d+)(!?$)/i;
    const match = content.match(normalRegex);
    if (match) {
      const qtd = parseInt(match[1]) || 1;
      const faces = parseInt(match[2]);
      const expl = match[3] === '!';

      let allRolls = [];
      for (let i = 0; i < qtd; i++) {
        allRolls.push(...rollDice(faces, expl));
      }

      const total = allRolls.reduce((a, b) => a + b, 0);
      await message.reply(`\` ${total} \` ⟵ [${allRolls.join(', ')}] ${content}`);

      return true;
    }

    return false;
  }
};
