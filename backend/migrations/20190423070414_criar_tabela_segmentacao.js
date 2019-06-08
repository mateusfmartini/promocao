
exports.up = function(knex, Promise) {
    return knex.schema.createTable('segmentacao', table => {
        table.increments('id').primary()
        table.string('descricao').notNull()
        table.string('sglsegmentacao').notNull()
        table.boolean('idnativo').defaultTo(true)
        table.string('codigoexterno')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('segmentacao')
};
