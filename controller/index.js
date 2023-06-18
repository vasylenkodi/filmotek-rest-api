const service = require("../service");

const get = async (req, res, next) => {
  const { email } = req.params;
  try {
    const result = await service.getUserByEmail(email);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { user: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  const { email, password } = req.params;
  try {
    const result = await service.createUser({ email, password });
    res.status(201).json({
      status: "success",
      code: 201,
      data: { user: result },
    });
  } catch (error) {
      console.error(error);
      next(error);
  }
};

module.exports = {
    get,
    create
}