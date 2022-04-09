import users from "../models/users.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

const env = dotenv.config().parsed

// Register
const register = async (req, res) => {
  try {
    const { name, email, password, passwordConf } = req.body;

    // Validasi Input
    if(!name || !email || !password || !passwordConf) {
      throw{
        code: 428,
        message: "Data wajib diisi"
      }
    }

    // Jika password tidak sama
    if(password !== passwordConf) {
      throw{
        code: 428,
        message: "Password tidak sama"
      }
    }

    // Jika email sudah terdaftar
    const userExists = await users.findOne({ email: email });
    if(userExists){
      throw{
        code: 428,
        message: "Email sudah terdaftar"
      }
    }

    // Encrypt Password
    const hashPassword = bcryptjs.hashSync(password, 10);

    // Simpan Data
    const newUser = new users({
      name: name,
      email: email,
      password: hashPassword,
      image: null
    });

    const user = await newUser.save();

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
      message: "Berhasil menyimpan data user",
      user,
    });
  } catch (err) {
    // Catch error
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi Input
    if (!email || !password) {
      throw {
        code: 428,
        message: "Data wajib diisi",
      };
    }

    // Cek email
    const user = await users.findOne({ email: email });

    // Jika email tidak ditemukan
    if (!user) {
      throw {
        code: 401,
        message: "Email tidak ditemukan",
      };
    }

    // Cek password
    const isMatch = bcryptjs.compareSync(password, user.password);

    // Jika password tidak cocok
    if (!isMatch) {
      throw {
        code: 401,
        message: "Password salah",
      };
    }

    // Jika berhasil login
    const token = jsonwebtoken.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      env.APP_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      status: true,
      message: "Berhasil login",
      token,
    });
  } catch (err) {
    // Catch error
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
}

export { register, login };
