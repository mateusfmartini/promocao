
exports.up = function(knex, Promise) {
    return knex.schema.createTable('produto', table => {
        table.increments('id').primary()
        table.integer('idfornecedor').notNull().references('id').inTable('fornecedor')
        table.string('codigo').notNull()
        table.string('descricao').notNull()
        table.decimal('preco').notNull()
        table.boolean('idnativo').defaultTo(true)
        table.string('codigoerp')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('produto')
};
