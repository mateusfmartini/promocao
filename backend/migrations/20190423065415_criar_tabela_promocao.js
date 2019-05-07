
exports.up = function(knex, Promise) {
    return knex.schema.createTable('promocao', table => {
        table.increments('id').primary()
        table.date('vigencia_ini').notNull()
        table.date('vigencia_fim').notNull()
        table.integer('idfornecedor').notNull().references('id').inTable('fornecedor')
        table.string('codigo').notNull()
        table.decimal('percentual').notNull()
        table.integer('quantidademaxima')
        table.boolean('idnativo').defaultTo(true)
        table.string('codigoexterno')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('promocao')
};
