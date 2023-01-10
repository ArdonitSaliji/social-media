import User from "../models/User.js";
/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);

    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
//  Find
export const findUsers = async (req, res) => {
  // * Perform a search based on the search input

  try {
    if (req.body.search) {
      let nameParts = req.body.search.split(" ");
      let firstName = nameParts[0];
      let lastName = nameParts[1];

      let query = {};
      if (nameParts.length == 1) {
        query = { firstName: { $regex: "^" + firstName, $options: "i" } };
      } else if (nameParts.length == 2) {
        query = {
          $and: [
            { firstName: { $regex: "^" + firstName, $options: "i" } },
            { lastName: { $regex: "^" + lastName, $options: "i" } },
          ],
        };
      }

      let cursor = await User.find(query);
      let users = Array.from(cursor);
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
};
