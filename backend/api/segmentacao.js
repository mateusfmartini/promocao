module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req,res) => {
        const segmentacaoProduto = { 
            descricao: req.body.descricao,
            sglsegmentacao: req.body.sglsegmentacao,
            idnativo: req.body.idnativo,
            codigoexterno: req.body.codigoexterno
        }

        if (req.params.id) segmentacaoProduto.id = req.params.id

        try {
            existsOrError(segmentacaoProduto.descricao, 'Nome da segmentação não informado!')
            existsOrError(segmentacaoProduto.sglsegmentacao, 'Código da segmentação não informado!')

            const codigoExistente = await app.db('segmentacao')
            .where({ sglsegmentacao: segmentacaoProduto.sglsegmentacao }).first()

            notExistsOrError(codigoExistente, `Código da segmentação ${segmentacaoProduto.sglsegmentacao} já cadastrado!`)
        } catch(msg) {
            return res.status(400).send(msg)
        }
        
        if(segmentacaoProduto.id) {
            app.db('segmentacao')
                .update(segmentacaoProduto)
                .where({ id: segmentacaoProduto.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            await app.db('segmentacao')
                .insert(segmentacaoProduto)
                .catch(err => res.status(500).send(err))

            getBySgl({sglsegmentacao: segmentacaoProduto.sglsegmentacao})
            .then(result => res.status(200).send(result))
        }
    }

    const get = (req, res) => {
        app.db('segmentacao')
            .select('*')
            .then(segmentacoes => res.json(segmentacoes))
            .catch(err => res.status(500).send(err))
    }

    const getBySgl = (req, res) => {
        return app.db('segmentacao')
            .select('*')
            .where({ sglsegmentacao: req.sglsegmentacao}).first()
            .then(segmentacaoProduto => segmentacaoProduto)
            .catch(err => err)
    }

    const getById = (req, res) => {
        app.db('segmentacao')
            .select('*')
            .where({ id: req.params.id}).first()
            .then(segmentacaoProduto => res.json(segmentacaoProduto))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da segmentação não informado.')

            const rowDeleted = await app.db('segmentacao')
                .where({ id: req.params.id }).del()
            existsOrError(rowDeleted, 'Segmentação não encontrada')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}