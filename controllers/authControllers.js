const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utils/response");
const { createToken } = require("../utils/tokenCreate");
const bcrypt = require("bcrypt");

class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      console.log(admin);
      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        // console.log(match);
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: "Login success!" });
        } else {
          responseReturn(res, 404, { error: "Password wrong!" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found!" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new authControllers();
