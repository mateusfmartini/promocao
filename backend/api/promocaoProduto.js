const queries = require('./queries')

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req,res) => {
        const promocaoProduto = { 
            idpromocao: req.body.idpromocao,
            idproduto: req.body.idproduto,
            quantidade: req.body.quantidade,
            idnativo: req.body.idnativo,
            codigoexterno: req.body.codigoexterno
        }

        if (req.params.id) promocaoProduto.id = req.params.id
        
        if(promocaoProduto.id) {
            app.db('promocaoproduto')
                .update(promocaoProduto)
                .where({ id: promocaoProduto.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            await app.db('promocaoproduto')
                .insert(promocaoProduto)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('promocaoproduto')
            .select('*')
            .then(vinculos => res.json(vinculos))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('promocaoproduto')
            .select('*')
            .where({ id: req.params.id}).first()
            .then(promocaoProduto => res.json(promocaoProduto))
            .catch(err => res.status(500).send(err))
    }

    const getByPromocao = (req, res) => {
        app.db.raw(queries.produtosPorPromocao, req.params.id)
            .then(vinculos => res.json(vinculos.rows))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do vínculo entre promoção e produto não informado.')

            const rowDeleted = await app.db('promocaoproduto')
                .where({ id: req.params.id }).del()
            existsOrError(rowDeleted, 'Registro de vínculo entre promoção e produto não encontrado')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const removeByPromocao = async (req, res) => {
        try {
            await app.db('promocaoproduto')
                .where({ idpromocao: req.params.id }).del()

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, getByPromocao, remove, removeByPromocao }
}