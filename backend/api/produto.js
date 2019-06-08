const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req,res) => {
        const produto = { 
            idfornecedor: req.body.idfornecedor,
            codigo: req.body.codigo,
            descricao: req.body.descricao,
            preco: req.body.preco,
            idnativo: req.body.idnativo,
            codigoexterno: req.body.codigoexterno
        }

        if (req.params.id) produto.id = req.params.id

        try {
            existsOrError(produto.idfornecedor, 'Fornecedor não informado!')
            existsOrError(produto.codigo, 'Código do produto não informado!')
            existsOrError(produto.descricao, 'Nome do produto não informado!')
            existsOrError(produto.preco, 'Preço do produto não informado!')

            if (!req.params.id) {
            const codigoExistente = await app.db('produto')
            .where({ codigo: produto.codigo, idfornecedor: produto.idfornecedor }).first()
            
            notExistsOrError(codigoExistente, 'Código do produto já cadastrado!')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }
        
        if(produto.id) {
            app.db('produto')
                .update(produto)
                .where({ id: produto.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            await app.db('produto')
                .insert(produto)
                .catch(err => res.status(500).send(err))

            getByCodigoFornecedor({ codigo: produto.codigo, idfornecedor: produto.idfornecedor })
            .then(result => res.status(200).send(result))
        }
    }

    const get = (req, res) => {
        app.db('produto')
            .select('*')
            .then(produtos => res.json(produtos))
            .catch(err => res.status(500).send(err))
    }

    const getActive = (req, res) => {
        app.db('produto')
            .select('*')
            .where({idnativo: true})
            .then(produtos => res.json(produtos))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('produto')
            .select('*')
            .where({ id: req.params.id}).first()
            .then(produto => res.json(produto))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigoFornecedor = (req, res) => {
        return app.db('produto')
            .select('*')
            .where({ codigo: req.codigo, idfornecedor: req.idfornecedor }).first()
            .then(produto => produto)
            .catch(err => err)
    }

    const getByFornecedor = (req, res) => {
        app.db('produto')
            .select('*')
            .where({ idfornecedor: req.params.id, idnativo: true })
            .then(produto => res.json(produto))
            .catch(err => res.status(500).send(err))
    }
    
    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do produto não informado.')

            const rowDeleted = await app.db('produto')
                .where({ id: req.params.id }).del()
            existsOrError(rowDeleted, 'Produto não encontrado')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const softRemove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do produto não informado.')

            const rowInactivated = await app.db('produto')
                .update({idnativo: false})
                .where({ id: req.params.id })

            existsOrError(rowInactivated, 'Produto não encontrado')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getActive, getById, getByFornecedor, remove, softRemove }
}