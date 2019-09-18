
exports.up = function(knex, Promise) {
    return knex.schema.createTable('fornecedor', table => {
        table.increments('id').primary()
        table.string('descricao').notNull()
        table.string('email').notNull().unique()
        table.bigInteger('telefone')
        table.string('password').notNull()
        table.boolean('idnativo').defaultTo(true)
        table.string('codigoexterno')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('fornecedor')
};