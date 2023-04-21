import { User } from "$app/models/index.js";
import { mail } from "$app/functions/index.js";
import { mailConfig } from "$app/config/index.js";

export const ACTIVATE = async (req, res) => {
  const { activate_token } = req.params;

  try {
    const userData = await User.findOne({ activate_token });

    if (userData) {
      try {
        await User.findByIdAndUpdate(userData._id, { $set: { active: true } });

        res.redirect("https://dashboard.tfasoft.com/panel");
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const SEND_AGAIN = async (req, res) => {
  const data = req.body;

  try {
    const userData = await User.findById(data.user);

    let mailOptions = {
      from: mailConfig.address,
      to: userData.email,
      subject: "Activate your TFAsoft account",
      html: `<a target="_blank" href="https://dashboard.tfasoft.com/api/activation/${userData.activate_token}">Click to activate</a>`,
    };

    mail.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({ message: error.message });
      }

      res.status(200).send({ message: `Email sent to ${info.messageId}` });
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
