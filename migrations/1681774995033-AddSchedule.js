class AddSchedule1681774995033 {
  name = 'AddSchedule1681774995033';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE \`schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`collectingTime\` datetime NULL, \`status\` enum ('pending', 'accepted', 'rejected', 'fulfilled') NOT NULL DEFAULT 'pending', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE \`schedule\``);
  }
}
module.exports = { AddSchedule1681774995033 };
