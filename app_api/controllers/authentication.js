const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User'); // user.js must be loaded via db.js -> models

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES = '1h';

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

exports.register = async function register(req, res) {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ message: 'name, email, password required' });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: 'email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), hash });
    const token = signToken(user);
    res.status(201).json({ token, user: { name: user.name, email: user.email } });
  } catch (e) {
    console.error('register error', e);
    res.status(500).json({ message: 'registration failed' });
  }
};

exports.login = async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'email and password required' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'invalid credentials' });

    const ok = await bcrypt.compare(password, user.hash);
    if (!ok) return res.status(401).json({ message: 'invalid credentials' });

    const token = signToken(user);
    res.status(200).json({ token, user: { name: user.name, email: user.email } });
  } catch (e) {
    console.error('login error', e);
    res.status(500).json({ message: 'login failed' });
  }
};

// middleware to protect routes
exports.verifyToken = function verifyToken(req, res, next) {
  const hdr = req.headers.authorization || '';
  const [, token] = hdr.split(' ');
  if (!token) return res.status(401).json({ message: 'missing bearer token' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'invalid or expired token' });
  }
};
