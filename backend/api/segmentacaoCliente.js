module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req,res) => {
        const segmentacaoCliente = { 
            descricao: req.body.descricao,
            sglsegmentacao: req.body.sglsegmentacao,
            idnativo: req.body.idnativo,
            codigoerp: req.body.codigoerp
        }

        if (req.params.id) segmentacaoCliente.id = req.params.id

        try {
            existsOrError(segmentacaoCliente.descricao, 'Nome da segmentação não informado!')
            existsOrError(segmentacaoCliente.sglsegmentacao, 'Código da segmentação não informado!')

            const codigoExistente = await app.db('segmentacaocliente')
            .where({ sglsegmentacao: segmentacaoCliente.sglsegmentacao }).first()

            notExistsOrError(codigoExistente, 'Código da segmentação já cadastrado!')
        } catch(msg) {
            return res.status(400).send(msg)
        }
        
        if(segmentacaoCliente.id) {
            app.db('segmentacaocliente')
                .update(segmentacaoCliente)
                .where({ id: segmentacaoCliente.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('segmentacaocliente')
                .insert(segmentacaoCliente)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('segmentacaocliente')
            .select('*')
            .then(segmentacoes => res.json(segmentacoes))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('segmentacaocliente')
            .select('*')
            .where({ id: req.params.id}).first()
            .then(segmentacaoCliente => res.json(segmentacaoCliente))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da segmentação não informado.')

            const rowDeleted = await app.db('segmentacaocliente')
                .where({ id: req.params.id }).del()
            existsOrError(rowDeleted, 'Segmentação não encontrada')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}