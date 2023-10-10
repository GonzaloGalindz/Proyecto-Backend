import { findUser, create, deleteUser } from "../services/users.service.js";

export const existsUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = findUser(username);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  const user = req.body;
  try {
    const result = create(user);
    res.status(200).json({ message: "User cretad sucessfully", user: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletedUser = (req, res) => {
  const { username } = req.params;
  try {
    const user = deleteUser(username);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
