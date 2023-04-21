import { User } from "$app/models/index.js";

import md5 from "md5";

export const SINGLE = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const DELETE = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User deleted" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const UPDATE = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { $set: data });

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User updated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const PASSWORD = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findById(id);

    if (user === null) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.password === md5(currentPassword)) {
      if (newPassword === confirmPassword) {
        await User.findByIdAndUpdate(id, {
          $set: {
            password: md5(newPassword),
          },
        });

        res.status(200).send({ message: "User password updated" });
      } else {
        return res.status(401).send({ message: "New passwords are not match" });
      }
    } else {
      return res.status(401).send({ message: "Current password is wrong" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
