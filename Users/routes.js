import userDao from "./dao.js";

export default function UserRoutes(app) {

  // Create a new user
  const createUser = async (req, res) => {
    try {
      const user = await userDao.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({error: err.message});
    }
  };

  // Get a user by ID
  const getUserById = async (req, res) => {
    try {
      const user = await userDao.findUserById(req.params.id);
      if (!user) {
        return res.status(404).json({error: 'User not found'});
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  };

  // Get a user by username
  const getUserByUsername = async (req, res) => {
    try {
      const user = await userDao.findUserByUsername(req.params.username);
      if (!user) {
        return res.status(404).json({error: 'User not found'});
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  };

  // Update a user
  const updateUser = async (req, res) => {
    try {
      const updatedUser = await userDao.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({error: 'User not found'});
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({error: err.message});
    }
  };

  // Save a concert for a user
  const saveConcert = async (req, res) => {
    try {
      const updatedUser = await userDao.saveConcert(req.params.id,
          req.params.concertId);
      if (!updatedUser) {
        return res.status(404).json({error: 'User not found'});
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  };

  // Unsave a concert for a user
  const unsaveConcert = async (req, res) => {
    try {
      const updatedUser = await userDao.unsaveConcert(req.params.id,
          req.params.concertId);
      if (!updatedUser) {
        return res.status(404).json({error: 'User not found'});
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  };

  // Follow a user
  const followUser = async (req, res) => {
    try {
      await userDao.followUser(req.params.id, req.params.targetUserId);
      res.status(204).send(); // No content
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  };

  // Unfollow a user
  const unfollowUser = async (req, res) => {
    try {
      await userDao.unfollowUser(req.params.id, req.params.targetUserId);
      res.status(204).send(); // No content
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  };

  // Register a new user
  const register = async (req, res) => {
    try {
      const newUser = await userDao.registerUser(req.body);
      req.session.currentUser = newUser;
      res.send(req.session.currentUser);
    } catch (err) {
      res.status(400).json({error: err.message});
    }
  };

  // Login a user
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
