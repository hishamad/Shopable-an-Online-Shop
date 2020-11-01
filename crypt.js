const bcrypt = require("bcryptjs");

bcrypt.genSalt(10, async (err, salt) => {
  const newPassword = await bcrypt.hash("zxc", salt);
  console.log(newPassword);
});
