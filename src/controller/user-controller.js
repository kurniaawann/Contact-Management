import userService from "../service/user-service.js";
const register = async (req, res, next) => {
  try {
    // Memanggil fungsi register dari userService dengan data dari req.body
    const result = await userService.register(req.body);

    res.status(200).json({
      data: result,
      // Jika berhasil, mengirimkan respons dengan status 200 dan mengirimkan data hasil pendaftaran dalam format JSON
    });
  } catch (error) {
    // Jika terjadi kesalahan, akan diteruskan ke middleware error handling dengan memanggil next(error)
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    console.log(`ini result ${res.statusCode}`);
    res.status(200).json({
      data: result,
    });
    console.log(res.status);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const username = req.user.username;
    const result = await userService.getUser(username);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const username = req.user.username;
    const request = req.body;
    request.username = username;
    const result = await userService.updateUser(request);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.logout(req.user.username);
    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    next(error);
  }
};
export default {
  register,
  login,
  getUser,
  updateUser,
  logout,
};
