import { Service } from "$app/models/index.js";
import { ray } from "$app/functions/index.js";

export const CREATE = async (req, res) => {
  const data = req.body;

  try {
    data.accessToken = ray.gen(25);

    const service = await Service.create(data);

    res.status(200).send(service);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const ALL = async (req, res) => {
  const { id } = req.params;

  try {
    const services = await Service.find({ owner: id });

    res.status(200).send(services);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const SINGLE = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByIdAndUpdate(id);

    if (service === null) {
      return res.status(404).send({ message: "Service not found" });
    }

    res.status(200).send(service);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const DELETE = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByIdAndDelete(id);

    if (service === null) {
      return res.status(404).send({ message: "Service not found" });
    }

    res.status(200).send({ message: "Service deleted" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const UPDATE = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const service = await Service.findByIdAndUpdate(id, { $set: data });

    if (service === null) {
      return res.status(404).send({ message: "Service not found" });
    }

    res.status(200).send({ message: "Service updated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const RE_GENERATE = async (req, res) => {
  const { id } = req.params;

  const data = {
    accessToken: ray.gen(25),
  };

  try {
    const service = await Service.findByIdAndUpdate(id, { $set: data });

    if (service === null) {
      return res.status(404).send({ message: "Service not found" });
    }

    res.status(200).send({ message: "New access token generated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
