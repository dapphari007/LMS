import bcrypt from "bcrypt";
import { User, UserRole, UserLevel } from "../models";
import config from "../config/config";
import { AppDataSource } from "../config/database";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export interface TokenUser {
  id: string;
  email: string;
  role: UserRole;
  level: UserLevel;
  managerId?: string;
  hrId?: string;
  teamLeadId?: string;
  department?: string;
  position?: string;
}

export const generateToken = (user: TokenUser): string => {
  const { id, email, role, level, managerId, hrId, teamLeadId, department, position } = user;

  const token = require("@hapi/jwt").token.generate(
    {
      aud: "leave-management-app",
      iss: "leave-management-api",
      id,
      email,
      role,
      level,
      managerId,
      hrId,
      teamLeadId,
      department,
      position,
    },
    {
      key: config.jwt.secret,
      algorithm: "HS256",
    },
    {
      ttlSec: 14 * 24 * 60 * 60, // 14 days
    }
  );

  return token;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User);
  return userRepository.findOne({ where: { email } });
};

export const findUserById = async (id: string): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User);
  return userRepository.findOne({ where: { id } });
};
