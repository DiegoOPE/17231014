const http = require('http');
const fs = require('fs');
const path = require('path');

let discordClient = null;

function setClient(client) {
    discordClient = client;
}

function getBotStatus() {
    if (!discordClient) return { online: false, tag: null, guilds: 0, ping: null };
    const ready = discordClient.isReady();
    return {
        online: ready,
        tag: ready ? discordClient.user.tag : null,
        guilds: ready ? discordClient.guilds.cache.size : 0,
        ping: ready ? discordClient.ws.ping : null
    };
}

const HTML = (status) => `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="refresh" content="30"/>
  <title>Dados Assimilados — Status</title>
  <link rel="icon" type="image/png" href="/favicon.png"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: #0d0d1a;
      color: #e0e0f0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .card {
      background: #16162a;
      border: 1px solid #2a2a50;
      border-radius: 16px;
      padding: 2.5rem 3rem;
      max-width: 480px;
      width: 100%;
      text-align: center;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
    }

    .icon img {
      width: 90px;
      height: 90px;
      object-fit: contain;
      margin-bottom: 1rem;
      border-radius: 12px;
    }

    h1 {
      font-size: 1.6rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
      color: #ffffff;
    }

    .subtitle {
      font-size: 0.9rem;
      color: #7070a0;
      margin-bottom: 2rem;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.2rem;
      border-radius: 999px;
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 2rem;
    }

    .badge.online {
      background: #0d2e1a;
      border: 1.5px solid #22c55e;
      color: #22c55e;
    }

    .badge.offline {
      background: #2e0d0d;
      border: 1.5px solid #ef4444;
      color: #ef4444;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: currentColor;
      animation: ${status.online ? 'pulse 2s infinite' : 'none'};
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    .stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      text-align: left;
    }

    .stat {
      background: #0d0d1a;
      border: 1px solid #2a2a50;
      border-radius: 10px;
      padding: 0.75rem 1rem;
    }

    .stat-label {
      font-size: 0.72rem;
      color: #7070a0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.2rem;
    }

    .stat-value {
      font-size: 1rem;
      font-weight: 600;
      color: #c0c0e0;
    }

    footer {
      margin-top: 2.5rem;
      font-size: 0.75rem;
      color: #3a3a60;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">
      <img src="/favicon.png" alt="Dados Assimilados"/>
    </div>
    <h1>Dados Assimilados</h1>
    <p class="subtitle">Discord Bot — Sistema de RPG</p>

    <div class="badge ${status.online ? 'online' : 'offline'}">
      <span class="dot"></span>
      ${status.online ? 'Online' : 'Offline'}
    </div>

    <div class="stats">
      <div class="stat">
        <div class="stat-label">Bot</div>
        <div class="stat-value">${status.tag || '—'}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Servidores</div>
        <div class="stat-value">${status.guilds || '—'}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Ping (WebSocket)</div>
        <div class="stat-value">${status.ping != null ? status.ping + ' ms' : '—'}</div>
      </div>
      <div class="stat">
        <div class="stat-label">Atualização</div>
        <div class="stat-value">a cada 30s</div>
      </div>
    </div>
  </div>

  <footer>Esta página atualiza automaticamente • ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</footer>
</body>
</html>`;

const ICON_PATH = path.join(__dirname, 'public', 'favicon.png');

function startServer() {
    const PORT = process.env.PORT || 3000;

    const server = http.createServer((req, res) => {
        if (req.url === '/favicon.png' || req.url === '/favicon.ico') {
            try {
                const img = fs.readFileSync(ICON_PATH);
                res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' });
                return res.end(img);
            } catch {
                res.writeHead(404);
                return res.end();
            }
        }

        if (req.url === '/health') {
            const status = getBotStatus();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ ok: true, ...status }));
        }

        const status = getBotStatus();
        const html = HTML(status);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
    });

    server.listen(PORT, () => {
        console.log(`[Web] Servidor de status rodando na porta ${PORT}`);
    });
}

module.exports = { startServer, setClient };
