# Guia de Migração do Banco de Dados

## Visão Geral

Este bot foi refatorado para usar uma estrutura de banco de dados unificada. Todos os dados de usuários (skins, baralhos e fichas) agora são armazenados em uma única coleção `DadosAssimilados.Usuarios` com isolamento por servidor.

## Schema Novo vs Antigo

### Schema Antigo (Múltiplas Coleções)
- `skins` - Preferências de skin dos usuários
- `Copas` - Baralho de Copas
- `Cartas` - Baralhos de Ouros e Espadas (compartilhado)
- `Fast` - Baralho FastPlay
- `Completo` - Baralho Completo
- `Fichas_{guildId}` - Fichas de personagem por servidor

### Schema Novo (Coleção Unificada)
- `Usuarios` - Todos os dados organizados por usuário e servidor

```javascript
{
  userId: "123456789",
  userName: "Nome do Usuário",
  guilds: {
    "guildId1": {
      guildName: "Nome do Servidor",
      skin: { skinId: "default", skinName: "Default", updatedAt: Date },
      decks: {
        copas: ["A", "2", "3", ...],
        ouros: ["A", "2", "3", ...],
        espadas: ["A", "2", "3", ...],
        fast: ["10", "J", "Q", "K"],
        completo: ["A♠", "2♠", ...]
      },
      fichas: [
        { nome: "Personagem 1", ... },
        { nome: "Personagem 2", ... }
      ]
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Como Executar a Migração

### 1. Backup do Banco de Dados

**IMPORTANTE**: Sempre faça backup antes de migrar!

```bash
# Se usando MongoDB Atlas, use o backup automático ou export manual
# Se usando MongoDB local:
mongodump --uri="sua-connection-string" --out=./backup
```

### 2. Executar o Script de Migração

```bash
node migrate.js
```

O script irá:
- Conectar ao MongoDB
- Migrar skins da coleção `skins`
- Migrar baralhos de `Copas`, `Cartas`, `Fast`, `Completo`
- Migrar fichas de todas as coleções `Fichas_{guildId}`
- Preservar todos os dados de usuários
- Mostrar um resumo da migração

### 3. Verificar a Migração

Após a migração, o bot continuará funcionando normalmente. Teste:
- Comandos de dados (para verificar skins)
- Comandos de baralho (copas, ouros, espadas, fast, baralho)
- Comandos de fichas (criação e visualização)

### 4. Limpar Coleções Antigas (Opcional)

**Só faça isso após confirmar que tudo está funcionando!**

As seguintes coleções podem ser removidas após validação:
- `skins`
- `Copas`
- `Cartas`
- `Fast`
- `Completo`
- `Fichas_{guildId}` (todas)

## Status da Migração

- ✅ Estrutura unificada criada (`src/database.js`)
- ✅ Script de migração implementado (`migrate.js`)
- ✅ Bot atualizado para usar novo schema
- ✅ Workflow configurado e funcionando
- ⚠️ Funcionalidade de deletar fichas temporariamente desabilitada (será reimplementada)

## Rollback (Se Necessário)

Se algo der errado:

1. Pare o bot
2. Restaure o backup do banco:
   ```bash
   mongorestore --uri="sua-connection-string" ./backup
   ```
3. Reverta o código para a versão anterior

## Próximos Passos

1. Execute a migração em ambiente de teste
2. Valide todos os comandos
3. Execute em produção
4. Monitore logs por 24-48h
5. Remova coleções antigas após confirmação
