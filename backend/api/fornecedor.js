const bcrypt = require('bcrypt-nodejs')
const queries = require('./queries')


module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
    
    const save = async (req,res) => {
        const fornecedor = { 
            descricao: req.body.descricao,
            email: req.body.email,
            telefone: req.body.telefone,
            imagem: req.body.imagem,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            idnativo: req.body.idnativo,
            codigoexterno: req.body.codigoexterno
        }

        if (req.params.id) fornecedor.id = req.params.id
        else {
        try {
            existsOrError(fornecedor.descricao, 'Nome do fornecedor não informado!')
            existsOrError(fornecedor.email, 'E-mail não informado!')
            existsOrError(fornecedor.password, 'Senha não informada!')
            existsOrError(fornecedor.passwordConfirm, 'Confirmação de senha não informada!')
            equalsOrError(fornecedor.password, fornecedor.passwordConfirm, 'Senhas não conferem!')

           
            const fornecedorExistente = await app.db('fornecedor')
                .where({ email: fornecedor.email }).first()

            notExistsOrError(fornecedorExistente, 'Fornecedor já cadastrado')
            
        } catch(msg) {
            return res.status(400).send(msg)
        } }
    
        if (fornecedor.password) {
            fornecedor.password = encryptPassword(fornecedor.password)
            delete fornecedor.passwordConfirm
        }
        
        if(fornecedor.id) {
            app.db('fornecedor')
                .update(fornecedor)
                .where({ id: fornecedor.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('fornecedor')
                .insert(fornecedor)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('fornecedor')
            .select('id', 'descricao', 'email', 'telefone', 'idnativo', 'codigoexterno')
            .then(fornecedores => res.json(fornecedores))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('fornecedor')
            .select('id', 'descricao', 'email', 'telefone', 'idnativo', 'codigoexterno')
            .where({ id: req.params.id}).first()
            .then(fornecedores => res.json(fornecedores))
            .catch(err => res.status(500).send(err))
    }

    const getImagem = (req, res) => {
        app.db.raw(queries.imagemFornecedor, req.params.id)
            .then(imagem => res.json(imagem.rows[0]))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do fornecedor não informado.')

            const rowDeleted = await app.db('fornecedor')
                .where({ id: req.params.id }).del()
            existsOrError(rowDeleted, 'Fornecedor não encontrado')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, getImagem, remove }
}