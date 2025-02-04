import userDao from "./dao.js";

export default function UserRoutes(app) {

  const createUser = async (req, res) => {
    try {
      const user = await userDao.createUser(req.body);
      res.send(user);
    } catch (err) {
      res.send(err);
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
      res.send(err);
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
      res.send(err);
    }
  };

  const getSavedConcertsForUser = async (req, res) => {
    try {
      const user = await userDao.findUserByIdAndPopulateSavedConcerts(
          req.params.id);
      if (!user) {
        res.sendStatus(404);
      }
      res.send(user.savedConcerts);
    } catch (err) {
      res.send(err);
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
      res.send(err);
    }
  };

  const saveConcert = async (req, res) => {
    try {
      const updatedUser = await userDao.saveConcert(req.params.id,
          req.params.concertId);
      if (!updatedUser) {
        return res.sendStatus(404);
      }
      res.send(updatedUser);
    } catch (err) {
      res.send(err);
    }
  };

  const unsaveConcert = async (req, res) => {
    try {
      const updatedUser = await userDao.unsaveConcert(req.params.id,
          req.params.concertId);
      if (!updatedUser) {
        return res.sendStatus(404);
      }
      res.send(updatedUser);
    } catch (err) {
      res.send(err);
    }
  };

  const followUser = async (req, res) => {
    try {
      await userDao.followUser(req.params.id, req.params.targetUserId);
      res.sendStatus(204);
    } catch (err) {
      res.send(err);
    }
  };

  const unfollowUser = async (req, res) => {
    try {
      await userDao.unfollowUser(req.params.id, req.params.targetUserId);
      res.sendStatus(204);
    } catch (err) {
      res.send(err);
    }
  };

  const register = async (req, res) => {
    try {
      const newUser = await userDao.registerUser(req.body);
      req.session.currentUser = newUser;
      res.send(req.session.currentUser);
    } catch (err) {
      res.send(err);
    }
  };

  const login = async (req, res) => {
    try {
      const user = await userDao.loginUser(req.body);
      if (user) {
        req.session.currentUser = user;
        res.send(user);
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      res.send(err);
    }
  };

  const logout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  }

  const profile = async (req, res) => {
    const userId = req.params.userId;
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const user = await userDao.findUserById(userId);
    res.json(user);
  }

  app.post('/users', createUser);
  app.get('/users/:id', getUserById);
  app.get('/users/:id/concerts', getSavedConcertsForUser);
  app.get('/users/username/:username', getUserByUsername);
  app.put('/users/:id', updateUser);
  app.post('/users/:id/save-concert/:concertId', saveConcert);
  app.post('/users/:id/unsave-concert/:concertId', unsaveConcert);
  app.post('/users/:id/follow/:targetUserId', followUser);
  app.post('/users/:id/unfollow/:targetUserId', unfollowUser);
  app.post('/users/register', register);
  app.post('/users/login', login);
  app.post('/users/logout', logout);
  app.post('/users/profile/:userId', profile);
}
