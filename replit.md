# Overview

This is a Discord bot for the "Dados Assimilados" RPG system. The bot provides dice rolling mechanics with custom faceted dice (d6, d10, d12) that display special emoji outcomes, and manages multiple card deck systems for different game mechanics. Players can draw cards from various themed decks (Copas/Hearts, Ouros/Diamonds, Espadas/Spades, and special FastPlay/Complete decks), with each deck tracking per-user, per-guild state.

The bot supports both legacy prefix commands (`a.`) and modern slash commands, with all user activity logged to a dedicated Discord channel. The system uses MongoDB to persist user preferences (dice skins), deck states, and character sheets across multiple Discord servers.

**Recent Update (October 2025)**: The database schema has been completely refactored to use a unified collection structure (`DadosAssimilados.Usuarios`) that consolidates all user data with per-guild isolation. A migration script (`migrate.js`) is available to transfer data from legacy collections to the new structure.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Bot Framework
- **Discord.js v14**: Core Discord bot framework using Gateway Intents for message and interaction handling
- **Dual Command System**: Supports both legacy prefix commands (`a.command`) and modern slash commands, with logging distinguishing between command types
- **Activity Tracking**: All dice rolls and card draws are logged to a centralized Discord channel with user, server, and channel metadata

## Database Design
- **MongoDB**: Primary data store using the `DadosAssimilados` database
- **Unified Schema Pattern**: Single `Usuarios` collection stores all user data with nested guild-specific information
- **Schema Structure**:
  ```javascript
  {
    userId: string,
    userName: string,
    guilds: {
      [guildId]: {
        guildName: string,
        skin: { skinId, skinName, updatedAt },
        decks: {
          copas: [...cards],
          ouros: [...cards],
          espadas: [...cards],
          fast: [...cards],
          completo: [...cards]
        },
        fichas: [...character_sheets]
      }
    },
    createdAt: Date,
    updatedAt: Date
  }
  ```
- **Guild Isolation**: All user data (skins, decks, character sheets) is scoped per-guild to support multi-server deployments
- **Migration System**: 
  - `migrate.js` migrates data from legacy collections to unified schema
  - Legacy collections: `skins`, `Copas`, `Cartas` (Ouros/Espadas), `Fast`, `Completo`, `Fichas_{guildId}`
  - Preserves all user data including card states, character sheets, and skin preferences
  - Run with `node migrate.js` after backing up database

## Dice Rolling System
- **Custom Emoji Mapping**: Each die type (d6/d10/d12) maps numeric results to custom Discord emojis representing game outcomes (Nada/Nothing, Pressão/Pressure, Sucesso/Success, etc.)
- **Skin System**: Users can select from multiple emoji skins (default, bw/black-white) stored per-guild in the database
- **Composite Rolls**: Supports complex roll expressions like `2da6+1da10` combining multiple die types
- **Result Aggregation**: Calculates success counters and displays detailed roll breakdowns with custom emojis

## Card Deck System
- **Multiple Deck Types**: 
  - Copas (Hearts): Evolutionary Assimilations
  - Ouros (Diamonds): Adaptive Assimilations
  - Espadas (Spades): Inopportune Assimilations
  - FastPlay: Subset of high-value cards (10, J, Q, K)
  - Completo (Complete): Full 52-card deck with all suits
- **Draw Mechanics**: Each card draw removes the card from the user's deck for that guild
- **Reset Commands**: Users can reset specific decks to restore all cards
- **Rich Embeds**: Each card displays with custom titles, descriptions, and images specific to the RPG system

## Character Sheet System
- **Multi-Step Creation**: Modal-based character creation flow with session management
- **Session Expiration**: 30-minute timeout for incomplete character creation processes
- **Storage**: Character sheets (fichas) stored in guild-specific arrays within user documents

## Modular Architecture
- **Core Modules**:
  - `index.js`: Main bot entry point, Discord client setup, slash command registration
  - `src/database.js`: Unified database operations and schema management
  - `Dados.js`: Dice rolling logic and logging utilities
  - `config.js`: Emoji skin definitions and user preference getters
  - `help.js`: Command help documentation
- **Deck Modules**: Separate handlers for each card type (copas, ouros, espadas, fastplay, baralho)
- **Migration Tools**: `migrate.js` for schema upgrades from legacy collections

## Configuration Management
- **Environment Variables**: Bot token and MongoDB URI stored in `.env` file
- **Dotenv Integration**: All modules load configuration via `dotenv` package
- **Channel IDs**: Hardcoded log channel IDs for activity tracking

# External Dependencies

## Discord Platform
- **Discord.js Library**: v14.22.1 - Handles all Discord API interactions including messages, slash commands, embeds, buttons, modals, and select menus
- **Bot Permissions**: Requires send messages, read message history, and use slash commands permissions
- **Gateway Intents**: Uses `GatewayIntentBits.Guilds`, `GatewayIntentBits.GuildMessages`, and `GatewayIntentBits.MessageContent`

## Database
- **MongoDB Atlas/Server**: Connection via `mongodb` driver v6.20.0
- **Connection String**: Stored in `MONGODB_URI` environment variable
- **Database Name**: `DadosAssimilados`
- **Collections**: 
  - `Usuarios` (primary unified collection)
  - Legacy collections (skins, Copas, Cartas, Fast, Completo, Fichas_{guildId}) - deprecated but may exist in older deployments

## Third-Party Packages
- **dotenv** v16.6.1: Environment variable management for secure configuration
- **mongodb** v6.20.0: Official MongoDB Node.js driver for database operations

## Asset Dependencies
- **Card Images**: Local image files stored in `src/` directory structure:
  - `src/copas/`: Hearts suit card images (A.png, 2.png, ... K.png)
  - `src/Ouros/`: Diamonds suit card images
  - `src/Espadas/`: Spades suit card images
  - `src/Cartas/`: Complete deck card images with suit suffixes
- **Custom Emojis**: Discord custom emoji IDs hardcoded in skin definitions (must be uploaded to accessible Discord servers)