class AddRelationsFK1681775306818 {
  name = 'AddRelationsFK1681775306818';

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE \`schedule\` ADD \`bakerId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` ADD \`userId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` ADD \`productId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`bakerId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_17e2f292caf53ed2b1ee8472997\` FOREIGN KEY (\`bakerId\`) REFERENCES \`baker\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_d796103491cf0bae197dda59477\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_4b756e5516394815ae1c76aeed1\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD CONSTRAINT \`FK_3aef097bc7ae73298be1748f652\` FOREIGN KEY (\`bakerId\`) REFERENCES \`baker\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_3aef097bc7ae73298be1748f652\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_4b756e5516394815ae1c76aeed1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_d796103491cf0bae197dda59477\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_17e2f292caf53ed2b1ee8472997\``,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`bakerId\``);
    await queryRunner.query(
      `ALTER TABLE \`schedule\` DROP COLUMN \`productId\``,
    );
    await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`bakerId\``);
  }
}

module.exports = { AddRelationsFK1681775306818 };
