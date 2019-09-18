
exports.up = function(knex, Promise) {
    return knex.schema.createTable('promocaocliente', table => {
        table.increments('id').primary()
        table.integer('idpromocao').notNull().references('id').inTable('promocao')
        table.integer('idcliente').notNull().references('id').inTable('cliente')
        table.timestamp('dataresgate').defaultTo(knex.fn.now());
        table.boolean('idnativo').defaultTo(true)
        table.string('codigoexterno')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('promocaocliente')
};
