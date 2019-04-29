const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
    
    const save = async (req,res) => {
        const cliente = { 
            descricao: req.body.descricao,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            idnativo: req.body.idnativo,
            codigoerp: req.body.codigoerp
        }

        if (req.params.id) cliente.id = req.params.id

        try {
            existsOrError(cliente.descricao, 'Nome do cliente não informado!')
            existsOrError(cliente.email, 'E-mail não informado!')
            existsOrError(cliente.password, 'Senha não informada!')
            existsOrError(cliente.passwordConfirm, 'Confirmação de senha não informada!')
            equalsOrError(cliente.password, cliente.passwordConfirm, 'Senhas não conferem!')

            const fornecedorExistente = await app.db('cliente')
                .where({ email: cliente.email }).first()

            notExistsOrError(fornecedorExistente, 'Cliente já cadastrado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        cliente.password = encryptPassword(cliente.password)
        delete cliente.passwordConfirm
        
        if(cliente.id) {
            app.db('cliente')
                .update(cliente)
                .where({ id: cliente.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('cliente')
                .insert(cliente)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('cliente')
            .select('id', 'descricao', 'email', 'idnativo', 'codigoerp')
            .then(clientes => res.json(clientes))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('cliente')
            .select('id', 'descricao', 'email')
            .where({ id: req.params.id}).first()
            .then(cliente => res.json(cliente))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do cliente não informado.')

            const rowDeleted = await app.db('cliente')
                .where({ id: req.params.id }).del()
            existsOrError(rowDeleted, 'Cliente não encontrado')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}