class MakeEmailUnique1682506219067 {
  name = 'MakeEmailUnique1682506219067';

  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`baker\` ADD UNIQUE INDEX \`IDX_27b6eac484395d5348bccfef8e\` (\`email\`)`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE \`baker\` DROP INDEX \`IDX_27b6eac484395d5348bccfef8e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\``,
    );
  }
}

module.exports = { MakeEmailUnique1682506219067 };
