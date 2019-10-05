const queries = require('./queries')

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req,res) => {
        const promocaoCliente = { 
            idpromocao: req.body.idpromocao,
            idcliente: req.body.idcliente,
            idnativo: req.body.idnativo,
            codigoexterno: req.body.codigoexterno
        }

        if (req.params.id) promocaoCliente.id = req.params.id
        
        if(promocaoCliente.id) {
            app.db('promocaocliente')
                .update(promocaoCliente)
                .where({ id: promocaoCliente.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            await app.db('promocaocliente')
                .insert(promocaoCliente)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('promocaocliente')
            .select('*')
            .then(vinculos => res.json(vinculos))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('promocaocliente')
            .select('*')
            .where({ id: req.params.id}).first()
            .then(promocaoCliente => res.json(promocaoCliente))
            .catch(err => res.status(500).send(err))
    }

    const getByPromocao = (req, res) => {
        app.db.raw(queries.clientesPorPromocao, req.params.id)
            .then(vinculos => res.json(vinculos.rows))
            .catch(err => res.status(500).send(err))
    }

    const getFornecedoresPromocoesClientes = (req, res) => {
        app.db.raw(queries.fornecedoresPromocoesClientes,req.params.id)
            .then(registros => res.json(registros.rows))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do vínculo entre promoção e cliente não informado.')

            const rowDeleted = await app.db('promocaocliente')
                .where({ id: req.params.id }).del()
            existsOrError(rowDeleted, 'Registro de vínculo entre promoção e cliente não encontrado')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const removeByPromocao = async (req, res) => {
        try {
            await app.db('promocaocliente')
                .where({ idpromocao: req.params.id }).del()

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, getByPromocao, remove, removeByPromocao, getFornecedoresPromocoesClientes }
}