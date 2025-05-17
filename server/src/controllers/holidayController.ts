import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppDataSource } from "../config/database";
import { Holiday } from "../models";
import logger from "../utils/logger";

export const createHoliday = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in createHoliday");
    }

    const { name, date, description, isActive } = request.payload as any;

    // Validate input
    if (!name || !date) {
      return h.response({ message: "Name and date are required" }).code(400);
    }

    // Check if holiday already exists on the same date
    const holidayRepository = AppDataSource.getRepository(Holiday);
    const existingHoliday = await holidayRepository.findOne({
      where: { date: new Date(date) },
    });

    if (existingHoliday) {
      return h
        .response({ message: "A holiday already exists on this date" })
        .code(409);
    }

    // Create new holiday
    const holiday = new Holiday();
    holiday.name = name;
    holiday.date = new Date(date);
    holiday.description = description || null;
    holiday.isActive = isActive !== undefined ? isActive : true;

    // Save holiday to database
    const savedHoliday = await holidayRepository.save(holiday);

    return h
      .response({
        message: "Holiday created successfully",
        holiday: savedHoliday,
      })
      .code(201);
  } catch (error) {
    logger.error(`Error in createHoliday: ${error}`);
    return h
      .response({ message: "An error occurred while creating the holiday" })
      .code(500);
  }
};

export const getAllHolidays = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in getAllHolidays");
    }

    const { year, isActive } = request.query as any;

    // Build query
    const holidayRepository = AppDataSource.getRepository(Holiday);
    let query: any = {};

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    // Get holidays
    let holidays = await holidayRepository.find({
      where: query,
      order: {
        date: "ASC",
      },
    });

    // Ensure dates are properly converted to Date objects
    holidays = holidays.map((holiday) => ({
      ...holiday,
      date:
        holiday.date instanceof Date ? holiday.date : new Date(holiday.date),
    }));

    // Filter by year if provided
    if (year) {
      const targetYear = parseInt(year);
      holidays = holidays.filter((holiday) => {
        const holidayDate = holiday.date;
        return holidayDate.getFullYear() === targetYear;
      });
    }

    return h
      .response({
        holidays,
        count: holidays.length,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getAllHolidays: ${error}`);
    return h
      .response({ message: "An error occurred while fetching holidays" })
      .code(500);
  }
};

export const getHolidayById = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in getHolidayById");
    }

    const { id } = request.params;

    // Get holiday
    const holidayRepository = AppDataSource.getRepository(Holiday);
    const holiday = await holidayRepository.findOne({ where: { id } });

    if (!holiday) {
      return h.response({ message: "Holiday not found" }).code(404);
    }

    // Ensure date is a Date object
    const processedHoliday = {
      ...holiday,
      date:
        holiday.date instanceof Date ? holiday.date : new Date(holiday.date),
    };

    return h
      .response({
        holiday: processedHoliday,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in getHolidayById: ${error}`);
    return h
      .response({ message: "An error occurred while fetching the holiday" })
      .code(500);
  }
};

export const updateHoliday = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in updateHoliday");
    }

    const { id } = request.params;
    const { name, date, description, isActive } = request.payload as any;

    // Get holiday
    const holidayRepository = AppDataSource.getRepository(Holiday);
    const holiday = await holidayRepository.findOne({ where: { id } });

    if (!holiday) {
      return h.response({ message: "Holiday not found" }).code(404);
    }

    // Ensure holiday.date is a Date object
    const holidayDate =
      holiday.date instanceof Date ? holiday.date : new Date(holiday.date);

    // Check if date is being changed and if it conflicts with another holiday
    if (date && new Date(date).getTime() !== holidayDate.getTime()) {
      const existingHoliday = await holidayRepository.findOne({
        where: { date: new Date(date) },
      });

      if (existingHoliday && existingHoliday.id !== id) {
        return h
          .response({ message: "A holiday already exists on this date" })
          .code(409);
      }
    }

    // Update holiday fields
    if (name) holiday.name = name;
    if (date) holiday.date = new Date(date);
    if (description !== undefined) holiday.description = description;
    if (isActive !== undefined) holiday.isActive = isActive;

    // Save updated holiday
    const updatedHoliday = await holidayRepository.save(holiday);

    return h
      .response({
        message: "Holiday updated successfully",
        holiday: updatedHoliday,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in updateHoliday: ${error}`);
    return h
      .response({ message: "An error occurred while updating the holiday" })
      .code(500);
  }
};

export const deleteHoliday = async (request: Request, h: ResponseToolkit) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in deleteHoliday");
    }

    const { id } = request.params;

    // Get holiday
    const holidayRepository = AppDataSource.getRepository(Holiday);
    const holiday = await holidayRepository.findOne({ where: { id } });

    if (!holiday) {
      return h.response({ message: "Holiday not found" }).code(404);
    }

    // Delete holiday
    await holidayRepository.remove(holiday);

    return h
      .response({
        message: "Holiday deleted successfully",
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in deleteHoliday: ${error}`);
    return h
      .response({ message: "An error occurred while deleting the holiday" })
      .code(500);
  }
};

export const bulkCreateHolidays = async (
  request: Request,
  h: ResponseToolkit
) => {
  try {
    // Ensure database connection is initialized
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      logger.info("Database connection initialized in bulkCreateHolidays");
    }

    const { holidays } = request.payload as {
      holidays: { name: string; date: string; description?: string }[];
    };

    // Validate input
    if (!holidays || !Array.isArray(holidays) || holidays.length === 0) {
      return h.response({ message: "Holidays array is required" }).code(400);
    }

    const holidayRepository = AppDataSource.getRepository(Holiday);
    const results = {
      created: 0,
      skipped: 0,
    };

    for (const holidayData of holidays) {
      const { name, date, description } = holidayData;

      if (!name || !date) {
        results.skipped++;
        continue;
      }

      // Check if holiday already exists on the same date
      const existingHoliday = await holidayRepository.findOne({
        where: { date: new Date(date) },
      });

      if (existingHoliday) {
        results.skipped++;
        continue;
      }

      // Create new holiday
      const holiday = new Holiday();
      holiday.name = name;
      holiday.date = new Date(date);
      holiday.description = description || null;
      holiday.isActive = true;

      // Save holiday to database
      await holidayRepository.save(holiday);
      results.created++;
    }

    return h
      .response({
        message: "Bulk holiday creation completed",
        results,
      })
      .code(200);
  } catch (error) {
    logger.error(`Error in bulkCreateHolidays: ${error}`);
    return h
      .response({ message: "An error occurred while creating holidays" })
      .code(500);
  }
};
