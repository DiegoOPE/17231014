// criarFicha.js
const { 
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

let sessions = {}; // sessões temporárias

module.exports = {
  data: new SlashCommandBuilder()
    .setName("criarficha")
    .setDescription("Cria uma ficha de personagem passo a passo"),

  async execute(interaction, db) {
    const userId = interaction.user.id;

    // cria sessão com expiração de 30 minutos
    sessions[userId] = { etapa: 1, dados: {}, expires: Date.now() + 30 * 60 * 1000 };

    await interaction.reply({
      content: "📜Crie sua Ficha Assimilada!",
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId(`etapa1_${userId}`)
            .setLabel("Criar Ficha")
            .setStyle(ButtonStyle.Success)
        )
      ],
      ephemeral: true
    });
  },

  // Handler de botões
  async button(interaction, db) {
    const [etapa, userId] = interaction.customId.split("_");
    if (interaction.user.id !== userId) {
      return interaction.reply({ content: "❌ Só quem criou a ficha pode continuar.", ephemeral: true });
    }

    if (!sessions[userId] || Date.now() > sessions[userId].expires) {
      delete sessions[userId];
      return interaction.reply({ content: "⏰ Você demorou mais de 30 minutos. Recomece o comando `/criarficha`.", ephemeral: true });
    }

    // --- ETAPA 1: Dados Básicos ---
    if (etapa === "etapa1") {
      const modal = new ModalBuilder()
        .setCustomId(`modal1_${userId}`)
        .setTitle("Criar Ficha - Informações");

      const nome = new TextInputBuilder().setCustomId("nome").setLabel("Nome").setStyle(TextInputStyle.Short).setRequired(true);
      const geracao = new TextInputBuilder().setCustomId("geracao").setLabel("Geração").setStyle(TextInputStyle.Short).setRequired(true);
      const evento = new TextInputBuilder().setCustomId("evento").setLabel("Evento Marcante").setStyle(TextInputStyle.Paragraph).setRequired(true);
      const posicao = new TextInputBuilder().setCustomId("posicao").setLabel("Posição Social").setStyle(TextInputStyle.Short).setRequired(false);
      const propositos = new TextInputBuilder().setCustomId("propositos").setLabel("Propósitos Individuais").setStyle(TextInputStyle.Paragraph).setRequired(false);
      const relacionais = new TextInputBuilder().setCustomId("relacionais").setLabel("Propósitos Relacionais").setStyle(TextInputStyle.Paragraph).setRequired(false);

      modal.addComponents(
        new ActionRowBuilder().addComponents(nome),
        new ActionRowBuilder().addComponents(geracao),
        new ActionRowBuilder().addComponents(evento),
        new ActionRowBuilder().addComponents(posicao),
        new ActionRowBuilder().addComponents(propositos),
        new ActionRowBuilder().addComponents(relacionais)
      );

      return interaction.showModal(modal);
    }

    // --- ETAPA 2: Determinação & Assimilação ---
    if (etapa === "etapa2") {
      const modal = new ModalBuilder()
        .setCustomId(`modal2_${userId}`)
        .setTitle("Ficha - Etapa 2 (Determinação & Assimilação)");

      const determinacao = new TextInputBuilder().setCustomId("determinacao").setLabel("Determinação (0-5)").setStyle(TextInputStyle.Short).setRequired(true);
      const assimilacao = new TextInputBuilder().setCustomId("assimilacao").setLabel("Assimilação (0-5)").setStyle(TextInputStyle.Short).setRequired(true);

      modal.addComponents(
        new ActionRowBuilder().addComponents(determinacao),
        new ActionRowBuilder().addComponents(assimilacao)
      );

      return interaction.showModal(modal);
    }

    // --- ETAPA 3: Instintos ---
    if (etapa === "etapa3") {
      const modal = new ModalBuilder()
        .setCustomId(`modal3_${userId}`)
        .setTitle("Ficha - Etapa 3 (Instintos)");

      const campos = ["Reação", "Percepção", "Sagacidade", "Potência", "Influência", "Resolução"];
      modal.addComponents(...campos.map(c => 
        new ActionRowBuilder().addComponents(
          new TextInputBuilder().setCustomId(c.toLowerCase()).setLabel(`${c} (0-5)`).setStyle(TextInputStyle.Short).setRequired(true)
        )
      ));

      return interaction.showModal(modal);
    }

    // --- ETAPA 4: Conhecimentos ---
    if (etapa === "etapa4") {
      const modal = new ModalBuilder()
        .setCustomId(`modal4_${userId}`)
        .setTitle("Ficha - Etapa 4 (Conhecimentos)");

      const campos = ["Agrário", "Biológico", "Exato", "Medicina", "Social", "Artístico"];
      modal.addComponents(...campos.map(c => 
        new ActionRowBuilder().addComponents(
          new TextInputBuilder().setCustomId(c.toLowerCase()).setLabel(`${c} (0-5)`).setStyle(TextInputStyle.Short).setRequired(true)
        )
      ));

      return interaction.showModal(modal);
    }

    // --- ETAPA 5: Práticas & Saúde ---
    if (etapa === "etapa5") {
      const modal = new ModalBuilder()
        .setCustomId(`modal5_${userId}`)
        .setTitle("Ficha - Etapa 5 (Práticas & Saúde)");

      const campos = ["Esportivas", "Ferramentas", "Ofícios", "Armas", "Veículos", "Infiltração"];
      modal.addComponents(...campos.map(c => 
        new ActionRowBuilder().addComponents(
          new TextInputBuilder().setCustomId(c.toLowerCase()).setLabel(`${c} (0-5)`).setStyle(TextInputStyle.Short).setRequired(true)
        )
      ));

      const saude = new TextInputBuilder().setCustomId("saude").setLabel("Saúde (0-5)").setStyle(TextInputStyle.Short).setRequired(true);
      modal.addComponents(new ActionRowBuilder().addComponents(saude));

      return interaction.showModal(modal);
    }

    // --- ETAPA 6: Equipamentos ---
    if (etapa === "etapa6") {
      const modal = new ModalBuilder()
        .setCustomId(`modal6_${userId}`)
        .setTitle("Ficha - Etapa Final (Equipamentos)");

      const equipamentos = new TextInputBuilder()
        .setCustomId("equipamentos")
        .setLabel("Características & Equipamentos")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

      modal.addComponents(new ActionRowBuilder().addComponents(equipamentos));
      return interaction.showModal(modal);
    }
  },

  // Handler de submissão dos modals
  async modal(interaction, db) {
    const [modalId, userId] = interaction.customId.split("_");
    if (interaction.user.id !== userId) {
      return interaction.reply({ content: "❌ Você não pode enviar esse formulário.", ephemeral: true });
    }

    if (!sessions[userId]) {
      return interaction.reply({ content: "⚠️ Sessão expirada. Use `/criarficha` novamente.", ephemeral: true });
    }

    const sessao = sessions[userId];
    const etapa = parseInt(modalId.replace("modal", ""));

    // salva os campos preenchidos
    interaction.fields.fields.forEach((field) => {
      sessao.dados[field.customId] = field.value;
    });

    sessao.etapa = etapa + 1;

    // se ainda não terminou, envia botão da próxima etapa
    if (etapa < 6) {
      await interaction.reply({
        content: `✅ Etapa ${etapa} concluída! Clique para continuar a Etapa ${etapa + 1}.`,
        components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`etapa${etapa + 1}_${userId}`)
              .setLabel(`Etapa ${etapa + 1}`)
              .setStyle(ButtonStyle.Primary)
          )
        ],
        ephemeral: true
      });
    } else {
      // ficha finalizada → salva no Mongo
      const guildId = interaction.guild.id;
      const colecao = db.collection(`Fichas_${guildId}`);

      await colecao.insertOne({
        userId,
        userName: interaction.user.username,
        ...sessao.dados,
        criadoEm: new Date()
      });

      delete sessions[userId];

      await interaction.reply({ content: "🎉 Ficha criada com sucesso!", ephemeral: true });
    }
  }
};
