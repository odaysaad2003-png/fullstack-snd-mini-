import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../users/user.model';
import { env } from '../../config/env';
import { AppError } from '../../utils/app-error';
import type { AuthTokenPayload } from './auth.types';
import type { RegisterInput, LoginInput } from './auth.validation';

import {toSafeUser} from "../users/user.presenter";


const SALT_ROUNDS = 12;

function generateAccessToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
}

export async function registerUser(input: RegisterInput): Promise<{
  user: object;
  accessToken: string;
}> {
  const { name, email, password, phone } = input;

  const existing = await User.findOne({ email });

  if (existing) {
    throw new AppError('Email is already in use', 409);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
  });

  const accessToken = generateAccessToken({
    sub: user._id.toString(),
    role: user.role,
  });

  return {
    user: toSafeUser(user),
    accessToken,
  };
}

export async function loginUser(input: LoginInput): Promise<{
  user: object;
  accessToken: string;
}> {
  const { email, password } = input;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  if (user.status === 'suspended') {
    throw new AppError('Your account has been suspended', 403);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError('Invalid email or password', 401);
  }

  const accessToken = generateAccessToken({
    sub: user._id.toString(),
    role: user.role,
  });

  return {
    user: toSafeUser(user),
    accessToken,
  };
}

export async function getMe(userId: string): Promise<{ user: object }> {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError('User no longer exists', 401);
  }

  return {
    user: toSafeUser(user),
  };
}