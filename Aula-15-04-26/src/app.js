const express = require("express");
const clienteRoutes = require("./routes/clienteRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

//rota raiz

app.get("/", (req, res) => {
    res.json({
        mensagem: "API de clientes",
        versao: "1.0.0",
        endpoints: {
            listarTodos: "GET /clientes",
            buscarPorId: "GET /clientes"
        }
    })
})

app.use("/clientes", clienteRoutes);

app.use((req, res) => {
    res.status(404).json({
        sucesso: false,
        mensagem: "Ih rapaz, a rota não foi encontrada. Abre um chamado ai"
    })
})
app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
})
module.exports = app;