const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('db_atividade_pontuada_2', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});

const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING
    },
    formaPagamento: {
        type: DataTypes.STRING
    },
    endereco: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lote: {
        type: DataTypes.STRING
    },
    validade: {
        type: DataTypes.STRING
    },
    categoria: {
        type: DataTypes.STRING
    },
    quantidade: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false
});

const app = express();
app.use(express.json());

const PORTA = 3000;

app.post('/clientes', async (req, res) => {
    try {
        const novoCliente = await Cliente.create(req.body);
        res.status(201).json(novoCliente);
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao salvar cliente", erro: error.message });
    }
});

app.get('/clientes', async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao consultar clientes", erro: error.message });
    }
});

app.post('/produtos', async (req, res) => {
    try {
        const novoProduto = await Produto.create(req.body);
        res.status(201).json(novoProduto);
    } catch (error) {
        res.status(400).json({ mensagem: "Erro ao salvar produto", erro: error.message });
    }
});

app.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao consultar produtos", erro: error.message });
    }
});

async function iniciar() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com o MySQL estabelecida com sucesso.');

        await sequelize.sync();
        console.log('🔄 Tabelas sincronizadas com o banco.');

        app.listen(PORTA, () => {
            console.log(`🚀 Servidor rodando na porta ${PORTA}`);
        });

    } catch (error) {
        console.error('❌ Erro ao conectar ou sincronizar com o banco:', error);
    }
}

iniciar();