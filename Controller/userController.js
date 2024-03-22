const User = require("../Model/userSchema");
const bcrypt = require("bcrypt");

//--User-Register---
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400).json({ error: "Missing required fields" });
  }

  const user = await User.findOne({
    $or: [{ email: email }, { password: password }],
  })
  .then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "User with this email or username already exist" });
    }
    bcrypt.hash(password, 10)
      .then((hashedPassword) => {
        const user = new User({ userName, email, password: hashedPassword });
        user
          .save()
          .then((user) => {
            res.status(200).json({ message: "Saved successfully", data: user });
          })
          .catch((error) => {
            console.log(error);
          });
      })
    // )
  });

//   const userData = await user.save();
};

module.exports = { registerUser };
