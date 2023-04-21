import { Admin, Payment } from "$app/models/index.js";

import { zarinpal } from "$app/functions/index.js";

export const REQUEST = async (req, res) => {
  const { credits, user } = req.body;

  try {
    const userData = await Admin.findById(user);

    zarinpal
      .PaymentRequest({
        Amount: credits,
        CallbackURL: "https://dashboard.tfasoft.com/api/payment/verify",
        Description: "Buy credits for authentication",
        Email: userData.email,
        Mobile: userData.phoneNumber,
      })
      .then(async (response) => {
        if (response.status === 100) {
          try {
            await Payment.create({
              authority: response.authority,
              user,
              amount: credits,
            });

            res.status(200).send({ url: response.url });
          } catch (error) {
            res.status(500).send({ message: error.message });
          }
        }
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const VERIFY = async (req, res) => {
  const data = req.query;

  if (data.Status === "OK") {
    try {
      const payment = await Payment.findOne({ authority: data.Authority });

      zarinpal
        .PaymentVerification({
          Amount: payment.amount,
          Authority: data.Authority,
        })
        .then(async (response) => {
          if (response.status === -21) {
            try {
              res.status(500).send({
                message: `Payment failed with error ${response.status}`,
              });
            } catch (error) {
              res.status(500).send({ message: error.message });
            }
          } else {
            await Payment.findByIdAndUpdate(String(payment._id), {
              $set: { verified: true, refid: response.RefID },
            });

            await Admin.findByIdAndUpdate(String(payment.user), {
              $inc: { credits: payment.amount },
            });

            res.redirect("https://dashboard.tfasoft.com/panel");
          }
        })
        .catch((err) => {
          res.status(500).send({ message: error.message });
        });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(500).send({ message: "Payment failed" });
  }
};
