const UserModel = require("../models/user.model");
const ApiError = require("../utils/apiError");

let registerService = async (data) => {
  let { name, email, password } = data;

  if (!name || !email || !password)
    throw new ApiError(200, "all fields are required");

  let user = await UserModel.create({
    name,
    email,
    password,
  });

  return user;
};

module.exports = {
  registerService,
};
