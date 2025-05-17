import { AppDataSource } from "../config/database";
import { Holiday } from "../models";
import logger from "../utils/logger";
import {
  MoreThanOrEqual as TypeORMMoreThanOrEqual,
  Between as TypeORMBetween,
} from "typeorm";

/**
 * Create a new holiday
 */
export const createHoliday = async (
  holidayData: Partial<Holiday>
): Promise<Holiday> => {
  try {
    const holidayRepository = AppDataSource.getRepository(Holiday);

    // Check if holiday already exists on this date
    const existingHoliday = await holidayRepository.findOne({
      where: { date: holidayData.date },
    });

    if (existingHoliday) {
      throw new Error("A holiday already exists on this date");
    }

    // Create new holiday
    const holiday = holidayRepository.create(holidayData);
    return await holidayRepository.save(holiday);
  } catch (error) {
    logger.error(`Error in createHoliday service: ${error}`);
    throw error;
  }
};

/**
 * Get all holidays with optional filters
 */
export const getAllHolidays = async (
  filters: { year?: number; isActive?: boolean } = {}
): Promise<Holiday[]> => {
  try {
    const holidayRepository = AppDataSource.getRepository(Holiday);

    // Build query
    const query: any = {};

    if (filters.year) {
      const startOfYear = new Date(filters.year, 0, 1);
      const endOfYear = new Date(filters.year, 11, 31);
      query.date = TypeORMBetween(startOfYear, endOfYear);
    }

    if (filters.isActive !== undefined) {
      query.isActive = filters.isActive;
    }

    // Get holidays
    return await holidayRepository.find({
      where: query,
      order: {
        date: "ASC",
      },
    });
  } catch (error) {
    logger.error(`Error in getAllHolidays service: ${error}`);
    throw error;
  }
};

/**
 * Get holiday by ID
 */
export const getHolidayById = async (holidayId: string): Promise<Holiday> => {
  try {
    const holidayRepository = AppDataSource.getRepository(Holiday);

    // Find holiday by ID
    const holiday = await holidayRepository.findOne({
      where: { id: holidayId },
    });

    if (!holiday) {
      throw new Error("Holiday not found");
    }

    return holiday;
  } catch (error) {
    logger.error(`Error in getHolidayById service: ${error}`);
    throw error;
  }
};

/**
 * Update holiday
 */
export const updateHoliday = async (
  holidayId: string,
  holidayData: Partial<Holiday>
): Promise<Holiday> => {
  try {
    const holidayRepository = AppDataSource.getRepository(Holiday);

    // Find holiday by ID
    const holiday = await holidayRepository.findOne({
      where: { id: holidayId },
    });

    if (!holiday) {
      throw new Error("Holiday not found");
    }

    // If date is being updated, check if it's already in use
    if (
      holidayData.date &&
      holiday.date.getTime() !== new Date(holidayData.date).getTime()
    ) {
      const existingHoliday = await holidayRepository.findOne({
        where: { date: holidayData.date },
      });

      if (existingHoliday) {
        throw new Error("A holiday already exists on this date");
      }
    }

    // Update holiday data
    holidayRepository.merge(holiday, holidayData);

    // Save updated holiday
    return await holidayRepository.save(holiday);
  } catch (error) {
    logger.error(`Error in updateHoliday service: ${error}`);
    throw error;
  }
};

/**
 * Delete holiday
 */
export const deleteHoliday = async (holidayId: string): Promise<void> => {
  try {
    const holidayRepository = AppDataSource.getRepository(Holiday);

    // Find holiday by ID
    const holiday = await holidayRepository.findOne({
      where: { id: holidayId },
    });

    if (!holiday) {
      throw new Error("Holiday not found");
    }

    // Delete holiday
    await holidayRepository.remove(holiday);
  } catch (error) {
    logger.error(`Error in deleteHoliday service: ${error}`);
    throw error;
  }
};

/**
 * Bulk create holidays
 */
export const bulkCreateHolidays = async (
  holidays: Partial<Holiday>[]
): Promise<Holiday[]> => {
  try {
    const holidayRepository = AppDataSource.getRepository(Holiday);

    // Check for duplicate dates
    const dates = holidays.map(
      (h) => new Date(h.date).toISOString().split("T")[0]
    );
    const uniqueDates = new Set(dates);

    if (dates.length !== uniqueDates.size) {
      throw new Error("Duplicate dates found in the holiday list");
    }

    // Check if any of the dates already have holidays
    for (const holiday of holidays) {
      const existingHoliday = await holidayRepository.findOne({
        where: { date: holiday.date },
      });

      if (existingHoliday) {
        throw new Error(
          `A holiday already exists on ${new Date(holiday.date).toDateString()}`
        );
      }
    }

    // Create holidays
    const createdHolidays: Holiday[] = [];

    for (const holidayData of holidays) {
      const holiday = holidayRepository.create({
        ...holidayData,
        isActive:
          holidayData.isActive !== undefined ? holidayData.isActive : true,
      });

      createdHolidays.push(await holidayRepository.save(holiday));
    }

    return createdHolidays;
  } catch (error) {
    logger.error(`Error in bulkCreateHolidays service: ${error}`);
    throw error;
  }
};

/**
 * Get upcoming holidays
 */
export const getUpcomingHolidays = async (
  limit: number = 5
): Promise<Holiday[]> => {
  try {
    const holidayRepository = AppDataSource.getRepository(Holiday);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get upcoming holidays
    return await holidayRepository.find({
      where: {
        date: TypeORMMoreThanOrEqual(today),
        isActive: true,
      },
      order: {
        date: "ASC",
      },
      take: limit,
    });
  } catch (error) {
    logger.error(`Error in getUpcomingHolidays service: ${error}`);
    throw error;
  }
};

// TypeORM operators are imported at the top of the file
