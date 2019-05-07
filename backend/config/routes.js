module.exports = app => {
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/fornecedores')
        .post(app.api.fornecedor.save)
        .get(app.api.fornecedor.get)

    app.route('/fornecedores/signin')
        .post(app.api.auth.signinFornecedor)

    app.route('/fornecedores/:id')
        .put(app.api.fornecedor.save)
        .get(app.api.fornecedor.getById)
        .delete(app.api.fornecedor.remove)
    
    app.route('/fornecedores/:id/produtos')
        .get(app.api.produto.getByFornecedor)

    app.route('/clientes')
        .post(app.api.cliente.save)
        .get(app.api.cliente.get)

    app.route('/clientes/:id')
        .put(app.api.cliente.save)
        .get(app.api.cliente.getById)
        .delete(app.api.cliente.remove)

    app.route('/produtos')
        .post(app.api.produto.save)
        .get(app.api.produto.get)

    app.route('/produtos/:id')
        .put(app.api.produto.save)
        .get(app.api.produto.getById)
        .delete(app.api.produto.remove)

        app.route('/segmentacao/produtos')
        .post(app.api.segmentacaoProduto.save)
        .get(app.api.segmentacaoProduto.get)

        app.route('/segmentacao/produtos/:id')
        .put(app.api.segmentacaoProduto.save)
        .get(app.api.segmentacaoProduto.getById)
        .delete(app.api.segmentacaoProduto.remove)

        app.route('/segmentacao/clientes')
        .post(app.api.segmentacaoCliente.save)
        .get(app.api.segmentacaoCliente.get)

        app.route('/segmentacao/clientes/:id')
        .put(app.api.segmentacaoCliente.save)
        .get(app.api.segmentacaoCliente.getById)
        .delete(app.api.segmentacaoCliente.remove)
}