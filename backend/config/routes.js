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
    
    app.route('/fornecedores/:id/imagem')
        .get(app.api.fornecedor.getImagem)
    
    app.route('/fornecedores/:id/produtos')
        .get(app.api.produto.getByFornecedor)

    app.route('/fornecedores/:id/promocoes')
        .get(app.api.promocao.getByFornecedor)

    app.route('/clientes')
        .post(app.api.cliente.save)
        .get(app.api.cliente.get)

    app.route('/clientes/signin')
        .post(app.api.auth.signinCliente)    

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
    
    app.route('/promocoes')
        .post(app.api.promocao.save)
        .get(app.api.promocao.getActive)
        
    app.route('/promocoes/produtos')
        .post(app.api.promocaoProduto.save)
        .get(app.api.promocaoProduto.get)

    app.route('/promocoes/produtos/:id')
        .put(app.api.promocaoProduto.save)
        .get(app.api.promocaoProduto.getById)
        .delete(app.api.promocaoProduto.remove) 

    app.route('/promocoes/clientes')
        .post(app.api.promocaoCliente.save)
        .get(app.api.promocaoCliente.get)

    app.route('/promocoes/clientes/:id')
        .put(app.api.promocaoCliente.save)
        .get(app.api.promocaoCliente.getById)
        .delete(app.api.promocaoCliente.remove) 

    app.route('/promocoes/:id')
        .put(app.api.promocao.save)
        .get(app.api.promocao.getById)
        .delete(app.api.promocao.remove)

    app.route('/promocoes/:id/produtos')
        .get(app.api.promocaoProduto.getByPromocao)
        .delete(app.api.promocaoProduto.removeByPromocao)

    app.route('/promocoes/:id/clientes')
        .get(app.api.promocaoCliente.getByPromocao)
        .delete(app.api.promocaoCliente.removeByPromocao)

    app.route('/dashboard/:id')
        .get(app.api.dashboard.dashboard)
        
    app.route('/frontend/promocoes')
        .get(app.api.promocao.getFrontendPromocoes)

    app.route('/frontend/promocoes/clientes')
        .get(app.api.promocaoCliente.getFrontendPromocoesClientes)
    
    
    

}