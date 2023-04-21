import { Admin, User, Log, Service } from "$app/models/index.js";

import md5 from "md5";

export const SINGLE = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Admin.findById(id);

    if (user === null) {
      return res.status(404).send({ message: "Admin not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const DELETE = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Admin.findByIdAndDelete(id);

    if (user === null) {
      return res.status(404).send({ message: "Admin not found" });
    }

    res.status(200).send({ message: "Admin deleted" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const UPDATE = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const user = await Admin.findByIdAndUpdate(id, { $set: data });

    if (user === null) {
      return res.status(404).send({ message: "Admin not found" });
    }

    res.status(200).send({ message: "Admin updated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const PASSWORD = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await Admin.findById(id);

    if (user === null) {
      return res.status(404).send({ message: "Admin not found" });
    }

    if (user.password === md5(currentPassword)) {
      if (newPassword === confirmPassword) {
        await Admin.findByIdAndUpdate(id, {
          $set: {
            password: md5(newPassword),
          },
        });

        res.status(200).send({ message: "Admin password updated" });
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

export const MY_LOGS = async (req, res) => {
  const { id } = req.params;

  try {
    const logs = await Log.find({ company: id })
      .populate({
        path: "service",
        model: Service,
        select: "name",
      })
      .populate({
        path: "company",
        model: Admin,
        select: "companyName",
      })
      .populate({
        path: "user",
        model: User,
        select: "tid",
      });

    res.status(200).send(logs);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const MY_ANALYTICS = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Log.find({ company: id })
      .populate({
        path: "service",
        model: Service,
        select: "name",
      })
      .populate({
        path: "company",
        model: Admin,
        select: "companyName",
      })
      .populate({
        path: "user",
        model: User,
        select: "tid",
      });

    const result = data.reduce((acc, obj) => {
      const td = new Date(obj.createdAt);

      const createdAt = `${td.getFullYear()}/${td.getMonth()}/${td.getDay()}`;

      if (!acc[createdAt]) {
        acc[createdAt] = [];
      }

      acc[createdAt].push(obj);

      return acc;
    }, {});

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
