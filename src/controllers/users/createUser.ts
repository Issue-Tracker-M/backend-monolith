import { Request, Response } from "express";
import Users from "../../models/User";

const createUser = (req: Request, res: Response): void => {
  const { email, password, first_name, last_name, username } = req.body;
  Users.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ message: "User exists" });
    const newUser = new Users({
      email,
      password,
      first_name,
      last_name,
      username,
    });

    newUser
      .save()
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  });
};

export default createUser;
