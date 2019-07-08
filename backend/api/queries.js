module.exports = {
    segmentacoesPorProduto: `
    select s.*,ps.id as idvinculo from segmentacao s
    inner join produtosegmentacao ps on s.id = ps.idsegmentacao
    where ps.idproduto = ?
    `,
    produtosPorPromocao: `
    select p.*,pp.id as idvinculo from produto p
    inner join promocaoproduto pp on p.id = pp.idsegmentacao
    where pp.idpromocao = ?
    `
}