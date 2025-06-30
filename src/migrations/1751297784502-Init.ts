import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class Init1751297784502 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create books table
    await queryRunner.createTable(
      new Table({
        name: 'book',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar' },
          { name: 'author', type: 'varchar' },
        ],
      }),
    );

    // Create reviews table
    await queryRunner.createTable(
      new Table({
        name: 'review',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'content', type: 'varchar' },
          { name: 'bookId', type: 'int' },
        ],
      }),
    );

    // Add foreign key: review.bookId → book.id
    await queryRunner.createForeignKey(
      'review',
      new TableForeignKey({
        columnNames: ['bookId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'book',
        onDelete: 'CASCADE',
      }),
    );

    // Add index to review.bookId
    await queryRunner.createIndex(
      'review',
      new TableIndex({
        name: 'IDX_BOOK_ID',
        columnNames: ['bookId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('review', 'IDX_BOOK_ID');
    const table = await queryRunner.getTable('review');
    if (table) {
      const foreignKey = table.foreignKeys.find((fk) =>
        fk.columnNames.includes('bookId'),
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('review', foreignKey);
      }
    }
    await queryRunner.dropTable('review');
    await queryRunner.dropTable('book');
  }
}
