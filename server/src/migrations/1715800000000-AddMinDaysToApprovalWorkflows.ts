//file can be removed

import { MigrationInterface, QueryRunner } from "typeorm";
import logger from "../utils/logger";

export class AddMinDaysToApprovalWorkflows1715800000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Migration removed as redundant - minDays column is already handled in AddDepartmentSpecificApprovalWorkflows
    logger.info('Migration removed as redundant');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Migration removed as redundant
  }
}