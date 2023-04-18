class AddBaker1681774885646 {
  name = 'AddBaker1681774885646';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE \`baker\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NULL, \`email\` varchar(255) NULL, \`password\` varchar(255) NULL, \`longitude\` decimal(11,8) NOT NULL, \`latitude\` decimal(10,8) NOT NULL, \`startAt\` time NOT NULL, \`endAt\` time NOT NULL, \`rating\` int NULL DEFAULT '5', \`rateCount\` int NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE \`baker\``);
  }
}

module.exports = { AddBaker1681774885646 };
