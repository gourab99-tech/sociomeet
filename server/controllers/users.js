import user from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usr = await user.findById(id);
    res.status(200).json(usr);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const usr = await user.findById(id);

    const friends = await Promise.all(
      usr.friends.map((id) => user.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstname, lastname, occupation, location, picturePath }) => {
        return { _id, firstname, lastname, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const usr = await user.findById(id);
    const friend = await user.findById(friendId);

    if (usr.friends.includes(friendId)) {
      usr.friends = usr.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      usr.friends.push(friendId);
      friend.friends.push(id);
    }

    await usr.save();
    await friend.save();

    const friends = await Promise.all(
      usr.friends.map((id) => user.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstname, lastname, occupation, location, picturePath }) => {
        return { _id, firstname, lastname, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
