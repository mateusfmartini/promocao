
exports.up = function(knex, Promise) {
    return knex.schema.createTable('produtosegmentacao', table => {
        table.increments('id').primary()
        table.integer('idproduto').notNull().references('id').inTable('produto')
        table.integer('idsegmentacao').notNull().references('id').inTable('segmentacao')
        table.boolean('idnativo').defaultTo(true)
        table.string('codigoexterno')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('produtosegmentacao')
};
