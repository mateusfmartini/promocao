const queries = require('./queries')

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req,res) => {
        const produtoSegmentacao = { 
            idproduto: req.body.idproduto,
            idsegmentacao: req.body.idsegmentacao,
            idnativo: req.body.idnativo,
            codigoexterno: req.body.codigoexterno
        }

        if (req.params.id) produtoSegmentacao.id = req.params.id
        
        if(produtoSegmentacao.id) {
            app.db('produtosegmentacao')
                .update(produtoSegmentacao)
                .where({ id: produtoSegmentacao.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('produtosegmentacao')
                .insert(produtoSegmentacao)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('produtosegmentacao')
            .select('*')
            .then(vinculos => res.json(vinculos))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('produtosegmentacao')
            .select('*')
            .where({ id: req.params.id}).first()
            .then(produtoSegmentacao => res.json(produtoSegmentacao))
            .catch(err => res.status(500).send(err))
    }

    const getByProduto = (req, res) => {
        app.db.raw(queries.segmentacoesPorProduto, req.params.id)
            .then(vinculos => res.json(vinculos.rows))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do vínculo entre produto e segmentação não informado.')

            const rowDeleted = await app.db('produtosegmentacao')
                .where({ id: req.params.id }).del()
            existsOrError(rowDeleted, 'Registro de vínculo entre produto e segmentação não encontrado')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const removeByProduto = async (req, res) => {
        try {
            await app.db('produtosegmentacao')
                .where({ idproduto: req.params.id }).del()

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, getByProduto, remove, removeByProduto }
}