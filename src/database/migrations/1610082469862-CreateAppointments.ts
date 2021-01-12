import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateAppointments1610082469862 implements MigrationInterface {
    // Cria a tabela
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    // Deleta a tabela
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }
}
