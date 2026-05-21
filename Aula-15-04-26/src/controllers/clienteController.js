const clientes = require("../../data/clientes");
const Clientes = require("../../data/clientes");
// Get listarClientes
const listarClientes = async (req, res) => {
    try{
        return res.status(200).json({
            sucesso: true,
            total: Clientes.length,
            dados: Clientes,
        });
    }catch(error){
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao listar clientes",
            erro: error.message,
        });
    }
};
// Get BuscarClientePorId
const BuscarClientePorId = async (req, res) =>{
    try{
        const id = parseInt(req.params.id);
        if(isNaN(id)){
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID invalido. Deve ser um número inteiro",

            });
        }
        const Cliente = Clientes.find((c) => c.id === id);

        if(!cliente){
            return res.status(404).json({
            sucesso: false,
            mensagem: `Cliente com id ${id} não encontrado`
        });   
    }
    return res.status(200).json({
        sucesso: true,
        dados: Cliente,

    });
    } catch(error){
        res.status(500).json({
            sucesso: false,
            mensagem: "erro ao buscar cliente por id",
            erro: error.message,

        })
    }  
}
// POST adicionarCliente
const adicionarCliente = async(req, res) => {
    try{
        const {nome, telefone, endereco} = req.body;
        const novo_cliente = new Cliente(
            clientes.length + 1,
            nome,
            telefone,
            endereco
        );
        Cliente.push(novo_cliente.cliente);
        return res.status(201).json({
            sucesso: true,
            mensagem: "Usuario adicionado com sucesso!"
        });
    }catch(error){
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao adicionar cliente",
            erro: error.message
        })
    };
}

// PUT /clientes/:id - Atualiza um cliente pelo Id:

const atualizarCliente = async (req, res) => {
    try{
        const{ id} = req.params;
        const{ nome, telefone, endereco} = req.body

        const cliente = clientes.find((c) => c.id == id);

        if(!cliente){
            return res.status(404).json({
                sucesso: false,
                mensagem: `Cliente de id ${id} não encontrado` 
            });
        }else{
            cliente.nome = nome;
            cliente.telefone = telefone;
            cliente.endereco = endereco;
            
            return res.status(200).json({
                sucesso: true,
                mensagem : "Cliente atualizado com sucesso"
            })
        }

    }catch(error){
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao atualizar cliente",
            erro: error.mensage
        })
    }
}
// DELETE /cliente/:id - remove um cliente por id

const deletarCliente = async(req, res) => {
    try{
        const {id} = req.params;
        const index = clientes.findIndex((c) => c.id == id);

        if(index === -1){
            return res.status(404).json({
                sucesso: façse,
                mensagem: `Cliente de id ${id} não encontrado`
            })
        }else{
            clientes.splice(index, 1);
            return res.status(200).json({
                sucesso: true,
                mensagem: `Cliente com id ${id} removido com sucesso`
            });
        }

    }catch(error){
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao remover cliente",
            erro: error.mensage
        })
    }
}

module.exports = {
    listarClientes,
    BuscarClientePorId,
    adicionarCliente,
    atualizarCliente,
    deletarCliente,
};