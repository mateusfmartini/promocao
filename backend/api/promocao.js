const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req,res) => {
        const promocao = { 
            vigencia_ini: req.body.vigencia_ini,
            vigencia_fim: req.body.vigencia_fim,
            idfornecedor: req.body.idfornecedor,
            codigo: req.body.codigo,
            descricao: req.body.descricao,
            descricaodetalhada: req.body.descricaodetalhada,
            percentual: req.body.percentual,
            quantidademaxima: req.body.quantidademaxima,
            idnativo: req.body.idnativo,
            codigoexterno: req.body.codigoexterno
        }

        if (req.params.id) promocao.id = req.params.id

        try {
            existsOrError(promocao.idfornecedor, 'Fornecedor não informado!')
            existsOrError(promocao.codigo, 'Código da promoção não informado!')
            existsOrError(promocao.descricao, 'Nome da promoção não informado!')

            if (!req.params.id) {
            const codigoExistente = await app.db('promocao')
            .where({ codigo: promocao.codigo, idfornecedor: promocao.idfornecedor }).first()
            
            notExistsOrError(codigoExistente, 'Código da promoção já cadastrado!')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }
        
        if(promocao.id) {
            await app.db('promocao')
                .update(promocao)
                .where({ id: promocao.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            await app.db('promocao')
                .insert(promocao)
                .catch(err => res.status(500).send(err))

            getByCodigoFornecedor({ codigo: promocao.codigo, idfornecedor: promocao.idfornecedor })
            .then(result => res.status(200).send(result))
        }
    }

    const get = (req, res) => {
        app.db('promocao')
            .select('*')
            .then(promocoes => res.json(promocoes))
            .catch(err => res.status(500).send(err))
    }

    const getActive = (req, res) => {
        app.db('promocao')
            .select('*')
            .where({idnativo: true})
            .then(promocoes => res.json(promocoes))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('promocao')
            .select('*')
            .where({ id: req.params.id}).first()
            .then(promocao => res.json(promocao))
            .catch(err => res.status(500).send(err))
    }

    const getByCodigoFornecedor = (req, res) => {
        return app.db('promocao')
            .select('*')
            .where({ codigo: req.codigo, idfornecedor: req.idfornecedor }).first()
            .then(promocao => promocao)
            .catch(err => err)
    }

    const getByFornecedor = (req, res) => {
        app.db('promocao')
            .select('*')
            .where({ idfornecedor: req.params.id, idnativo: true })
            .then(promocao => res.json(promocao))
            .catch(err => res.status(500).send(err))
    }
    
    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da promoção não informado.')

            const rowDeleted = await app.db('promocao')
                .where({ id: req.params.id }).del()
            existsOrError(rowDeleted, 'Promoção não encontrada')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const softRemove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da promoção não informado.')

            const rowInactivated = await app.db('promocao')
                .update({idnativo: false})
                .where({ id: req.params.id })

            existsOrError(rowInactivated, 'Promoção não encontrada')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getActive, getById, getByFornecedor, remove, softRemove }
}