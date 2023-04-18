class AddProduct1681774936920 {
  name = 'AddProduct1681774936920';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`type\` varchar(255) NOT NULL, \`bakingTime\` time NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE \`product\``);
  }
}
module.exports = { AddProduct1681774936920 };
