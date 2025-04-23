const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Quando um cliente se conecta
io.on('connection', (socket) => {
  console.log('🟢 Usuário conectado:', socket.id);

  // Quando recebe mensagem do cliente
  socket.on('chat message', (msg) => {
    console.log('📩 Mensagem recebida:', msg);
    // Envia para todos os clientes
    io.emit('chat message', msg);
  });

  // Quando o cliente se desconecta
  socket.on('disconnect', () => {
    console.log('🔴 Usuário desconectado:', socket.id);
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});

app.get("/chat", (req, res)=>{
  res.sendFile(__dirname + "/public/index.html")
})
