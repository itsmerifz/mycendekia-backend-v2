import users from "../models/users.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

const env = dotenv.config().parsed;

const changePassword = async (req, res) => {
  try {
    const { password, passwordConf } = req.body;
    const { id } = req.params;

    // Validasi Input
    if (!password || !passwordConf) {
      throw {
        code: 428,
        message: "Data wajib diisi",
      };
    }
    // Jika password tidak sama
    if (password !== passwordConf) {
      throw {
        code: 428,
        message: "Password tidak sama",
      };
    }

    // Encrypt Password
    const hashPassword = bcryptjs.hashSync(password, 10);

    // Simpan Data
    const user = await users.findOneAndUpdate(
      { id: id },
      {
        password: hashPassword,
      }
    );

    // Jika gagal menyimpan data
    if (!user) {
      throw {
        code: 500,
        message: "Gagal menyimpan data user",
      };
    }

    // Jika berhasil menyimpan data
    res.status(200).json({
      status: true,
      message: "Ganti Password Berhasil",
      data: user,
    });
  } catch (err) {
    // Catch error
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (
      !authorization ||
      !authorization.startsWith("Bearer") ||
      !authorization.split(" ")[1]
    ) {
      throw {
        code: 401,
        message: "Token tidak valid",
      };
    }

    const allUser = await users.find();

    // Jika berhasil mengambil data
    res.status(200).json({
      status: true,
      message: "Berhasil mengambil data user",
      total: allUser.length,
      data: allUser,
    });
  } catch (err) {
    // Catch error
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (
      !authorization ||
      !authorization.startsWith("Bearer") ||
      !authorization.split(" ")[1]
    ) {
      throw {
        code: 401,
        message: "Token tidak valid",
      };
    }

    const token = authorization.split(" ")[1];
    const decoded = jsonwebtoken.verify(token, env.APP_SECRET);

    const getUser = await users.findOne({ id: decoded.id });

    // Jika berhasil mengambil data
    res.status(200).json({
      status: true,
      message: "Berhasil mengambil data user",
      data: getUser,
    });
  } catch (err) {
    // Catch error
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { name, email } = req.body;
    const { filename } = req.file;

    if (
      !authorization ||
      !authorization.startsWith("Bearer") ||
      !authorization.split(" ")[1]
    ) {
      throw {
        code: 401,
        message: "Token tidak valid",
      };
    }

    const token = authorization.split(" ")[1];
    const decoded = jsonwebtoken.verify(token, env.APP_SECRET);

    const getUser = await users.findOne({ id: decoded.id });

    if (getUser) {
      const user = await users.findOneAndUpdate(
        { id: decoded.id },
        {
          name: name,
          email: email,
          image: req.file === undefined ? '' : filename,
        }
      );

      // Jika berhasil mengambil data
      res.status(200).json({
        status: true,
        message: "Berhasil mengubah data user",
        data: user,
      });
    }
  } catch (err) {
    // Catch error
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

export { changePassword, getAllUsers, getUserById, updateUser };
