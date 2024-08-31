import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { prismaClient } from "../aplication/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  getUserValidation,
  loginValidation,
  registerUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
const register = async (request) => {
  const user = validate(registerUserValidation, request);

  //mengambil jumlah user dari database
  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  //melakukan pengecekan dari database jika user sudah ada maka kembalikan error
  if (countUser === 1) {
    throw new ResponseError(400, "Username already exits");
  }

  console.log(request);

  //melakukan bcrypt password user
  user.password = await bcrypt.hash(user.password, 10);
  //membuat user di dalam database
  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginValidation, request);

  console.log(`${loginRequest.username}`);

  //megambil username dari database
  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });
  //jika user tidak ada
  if (!user) {
    throw new ResponseError(401, "Username Or Password Wrong");
  }
  //jika password tidak valid
  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, "Username Or Password Wrong");
  }
  //membuat token baru
  const token = uuid().toString();
  //kembalika ke user tokennya apa
  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
    },
  });
};

const getUser = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not fond");
  }
  return user;
};

const updateUser = async (request) => {
  const user = validate(updateUserValidation, request);

  const totalUserInDataBase = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (totalUserInDataBase !== 1) {
    throw new ResponseError(404, "user is not found");
  }

  const data = {};

  if (user.name) {
    data.name = user.name;
  }

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: data,
    select: {
      username: true,
      name: true,
    },
  });
};

const logout = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw ResponseError(404, "User Not Found");
  }

  return prismaClient.user.update({
    where: {
      username: username,
    },
    data: {
      token: null,
    },
    select: {
      username: true,
    },
  });
};

export default { register, login, getUser, updateUser, logout };
