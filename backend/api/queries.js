module.exports = {
    segmentacoesPorProduto: `
    select s.*,ps.id as idvinculo from segmentacao s
    inner join produtosegmentacao ps on s.id = ps.idsegmentacao
    where ps.idproduto = ?
    `,
    produtosPorPromocao: `
    select p.*,pp.id as idvinculo, pp.quantidade from produto p
    inner join promocaoproduto pp on p.id = pp.idproduto
    where pp.idpromocao = ?
    `,
    frontendPromocoes: `
    with teste as (
        select
            pp.idpromocao,
            pp.quantidade,
            prod.*
        from
            promocaoproduto pp
        inner join produto prod on
            prod.id = pp.idproduto) 
            select
            p.*,
            (select descricao from fornecedor where id = p.idfornecedor) as nomefornecedor,
            (
            select
                array_to_json(array_agg(row_to_json(sub)))
            from
                (
                select
                    *
                from
                    teste
                where
                    teste.idpromocao = p.id ) sub ) as produtos,
            (
            select
                sum(teste.quantidade * teste.preco)
            from
                teste
            where
                teste.idpromocao = p.id ) as precototal,
            (
                select sum(teste.quantidade * teste.preco) * (1 - p.percentual / 100)
            from
                teste
            where
                teste.idpromocao = p.id ) as precocomdesconto
        from
            promocao p
              
    `,
    clientesPorPromocao: `
    select p.*,pc.id as idvinculo from produto p
    inner join promocaocliente pc on p.id = pc.idcliente
    where pc.idcliente = ?
    `,
    frontendPromocoesClientes:`
    select 
	pc.*, 
	(select descricao from cliente where id = pc.idcliente) as nomecliente,
	(select codigo from promocao where id = pc.idpromocao) as codigocupom
    from promocaocliente pc
    `
}