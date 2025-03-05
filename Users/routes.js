import userDao from "./dao.js";
import jwt from "jsonwebtoken";
import {authenticateToken} from "../Auth/auth.js";

export default function UserRoutes(app) {

  const createUser = async (req, res) => {
    try {
      const user = await userDao.createUser(req.body);
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const getUserById = async (req, res) => {
    try {
      const user = await userDao.findUserById(req.params.id);
      if (!user) {
        return res.sendStatus(404);
      }
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const getUserByUsername = async (req, res) => {
    try {
      const user = await userDao.findUserByUsername(req.params.username);
      if (!user) {
        return res.sendStatus(404);
      }
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const getSavedConcertsForUser = async (req, res) => {
    try {
      const user = await userDao.findUserByIdAndPopulateSavedConcerts(
          req.params.id);
      if (!user) {
        res.sendStatus(404);
      }
      // Sort concerts chronologically
      res.send(
          [...user.savedConcerts].sort((a, b) => a.startDate - b.startDate));
    } catch (err) {
      res.status(500).send(err);
    }
  }

  const updateUser = async (req, res) => {
    try {
      const updatedUser = await userDao.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res.sendStatus(404);
      }
      res.send(updatedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const saveConcert = async (req, res) => {
    if (req.user._id !== req.params.id) {
      res.sendStatus(401);
      return;
    }
    try {
      const updatedUser = await userDao.saveConcert(req.params.id,
          req.params.concertId);
      if (!updatedUser) {
        return res.sendStatus(500);
      }
      res.send(updatedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const unsaveConcert = async (req, res) => {
    if (req.user._id !== req.params.id) {
      res.sendStatus(401);
      return;
    }
    try {
      const updatedUser = await userDao.unsaveConcert(req.params.id,
          req.params.concertId);
      if (!updatedUser) {
        return res.sendStatus(500);
      }
      res.send(updatedUser);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const followUser = async (req, res) => {
    if (req.user._id !== req.params.id) {
      res.sendStatus(401);
      return;
    }
    try {
      await userDao.followUser(req.params.id, req.params.targetUserId);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const unfollowUser = async (req, res) => {
    if (req.user._id !== req.params.id) {
      res.sendStatus(401);
      return;
    }
    try {
      await userDao.unfollowUser(req.params.id, req.params.targetUserId);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const register = async (req, res) => {
    try {
      const user = await userDao.registerUser(req.body);
      if (user) {
        const token = jwt.sign({user}, process.env.JWT_SECRET,
            {expiresIn: '1d'});
        res.json({user, token});
      } else {
        res.sendStatus(500);
      }
    } catch (err) {
      res.status(400).send(err);
    }
  };

  const login = async (req, res) => {
    try {
      const user = await userDao.loginUser(req.body);
      if (user) {
        const token = jwt.sign({user}, process.env.JWT_SECRET,
            {expiresIn: '1d'});
        res.json({user, token});
      } else {
        res.sendStatus(500);
      }
    } catch (err) {
      res.status(400).send(err);
    }
  };

  const profile = async (req, res) => {
    const userId = req.params.userId;
    const user = await userDao.findUserById(userId);
    res.json(user);
  }

  const searchUsers = async (req, res) => {
    try {
      const users = await userDao.findUsersByQuery(req.query);
      res.json(users);
    } catch (err) {
      res.status(500).send(err);
    }

  }

  app.post('/users', createUser);
  app.get('/users/:id', getUserById);
  app.get('/users/:id/concerts', getSavedConcertsForUser);
  app.get('/users/username/:username', getUserByUsername);
  app.put('/users/:id', updateUser);
  app.post('/users/:id/save-concert/:concertId', authenticateToken,
      saveConcert);
  app.post('/users/:id/unsave-concert/:concertId', authenticateToken,
      unsaveConcert);
  app.post('/users/:id/follow/:targetUserId', authenticateToken, followUser);
  app.post('/users/:id/unfollow/:targetUserId', authenticateToken,
      unfollowUser);
  app.post('/users/register', register);
  app.post('/users/login', login);
  app.post('/users/profile/:userId', authenticateToken, profile);
  app.get('/users', searchUsers);
}
