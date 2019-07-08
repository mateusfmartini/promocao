
exports.up = function(knex, Promise) {
    return knex.schema.createTable('promocaoproduto', table => {
        table.increments('id').primary()
        table.integer('idpromocao').notNull().references('id').inTable('promocao')
        table.integer('idproduto').notNull().references('id').inTable('produto')
        table.integer('quantidade')
        table.boolean('idnativo').defaultTo(true)
        table.string('codigoexterno')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('promocaoproduto')
};
