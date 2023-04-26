class MakeRateFloat1682510200837 {
  name = 'MakeRateFloat1682510200837';

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE \`baker\` DROP COLUMN \`rating\``);
    await queryRunner.query(
      `ALTER TABLE \`baker\` ADD \`rating\` float NULL DEFAULT '5'`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE \`baker\` DROP COLUMN \`rating\``);
    await queryRunner.query(
      `ALTER TABLE \`baker\` ADD \`rating\` int NULL DEFAULT '5'`,
    );
  }
}

module.exports = { MakeRateFloat1682510200837 };
