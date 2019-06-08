module.exports = {
    segmentacoesPorProduto: `
    select * from segmentacao where ID in (select idsegmentacao from produtosegmentacao where idproduto = ?)
    `
}