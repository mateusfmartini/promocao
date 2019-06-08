module.exports = app => {
    app.post('/validateToken', app.api.auth.validateToken)
    app.post('/fornecedores/signup', app.api.fornecedor.save)

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

    app.route('/produtos/ativos')
        .get(app.api.produto.getActive)

    app.route('/produtos/segmentacoes')
        .post(app.api.produtoSegmentacao.save)
        .get(app.api.produtoSegmentacao.get)

    app.route('/produtos/segmentacoes/:id')
        .put(app.api.produtoSegmentacao.save)
        .get(app.api.produtoSegmentacao.getById)
        .delete(app.api.produtoSegmentacao.remove)    

    app.route('/produtos/:id')
        .put(app.api.produto.save)
        .get(app.api.produto.getById)
        .delete(app.api.produto.softRemove)

    app.route('/produtos/:id/segmentacoes')
        .get(app.api.produtoSegmentacao.getByProduto)
        .delete(app.api.produtoSegmentacao.removeByProduto)

    app.route('/segmentacoes')
        .post(app.api.segmentacao.save)
        .get(app.api.segmentacao.get)

    app.route('/segmentacoes/:id')
        .put(app.api.segmentacao.save)
        .get(app.api.segmentacao.getById)
        .delete(app.api.segmentacao.remove)
    


}