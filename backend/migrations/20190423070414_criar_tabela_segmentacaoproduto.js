
exports.up = function(knex, Promise) {
    return knex.schema.createTable('segmentacaoproduto', table => {
        table.increments('id').primary()
        table.string('descricao').notNull()
        table.string('sglsegmentacao').notNull()
        table.boolean('idnativo').defaultTo(true)
        table.string('codigoerp')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('segmentacaoproduto')
};
