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
            prod.id = pp.idproduto) select
            p.id,
            p.vigencia_ini,
            p.vigencia_fim,
            p.idfornecedor,
            p.codigo,
            p.descricao,
            p.descricaodetalhada,
            p.percentual,
            p.quantidademaxima,
            encode(p.imagem, 'escape') as imagembase64,
            p.idnativo,
            p.codigoexterno,
            (
                select descricao
            from
                fornecedor
            where
                id = p.idfornecedor) as nomefornecedor,
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
            select
                sum(teste.quantidade * teste.preco) * (1 - p.percentual / 100)
            from
                teste
            where
                teste.idpromocao = p.id ) as precocomdesconto,
            (
                select p.quantidademaxima - count(*)
            from
                promocaocliente pc
            where
                pc.idpromocao = p.id) as qtdfaltante
        from
            promocao p
    `,
    clientesPorPromocao: `
    select c.*,pc.id as idvinculo from cliente c
    inner join promocaocliente pc on c.id = pc.idcliente
    where pc.idpromocao = ?
    `,
    fornecedoresPromocoesClientes:`
    select 
	pc.*, 
	(select descricao from cliente where id = pc.idcliente) as nomecliente,
	(select codigo from promocao where id = pc.idpromocao) as codigocupom,
	to_char(dataresgate, 'DD/MM/YYYY hh:mi') as datahoraresgate
    from promocaocliente pc
    inner join promocao p on p.id = pc.idpromocao
    where p.idfornecedor = ?
    `,
    imagemFornecedor:`
    select 
	encode(imagem,'escape') as imagem
    from fornecedor
    where id = ?
    `,
    dashboard:`
    select
	row_to_json(t) as retiradassemana
from
	(with dados as (
	select
		to_char(ds.datasemana, 'DD/MM') as datasemana,
		(
		select
			count(*) as qtdresgates
		from
			promocaocliente pc
		inner join promocao p on
			p.id = pc.idpromocao
		where
			p.idfornecedor = ?
			and cast(pc.dataresgate as date) = ds.datasemana )
	from
		(
		select
			current_date - dias.n as datasemana
		from
			(
			select
				generate_series(6, 0,-1) as n) dias) ds)
	select
		array_agg(dados.datasemana) as datasemana,
		array_agg(dados.qtdresgates) as qtdresgates
	from
		dados)t
    `
}