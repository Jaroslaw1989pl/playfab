// build-in modules
const express = require('express');
// custom modules
const { protected } = require('./../middleware/auth');
const viewsPublic = require('../controllers/views-public-controller');
const viewsAuth = require('./../controllers/views-auth-controller');
const viewsProfile = require('../controllers/views-profile-controller');
const auth = require('./../controllers/auth-controller');
const settings = require('./../controllers/settings-controller');
const error = require('./../controllers/error-controller');


const router = express.Router();

// public views routes
router.get('/', viewsPublic.home);
router.get('/games', viewsPublic.games);
router.route('/games/checkers').get(viewsPublic.gamesCheckers);

// user authentication routes
router.route('/login').get(viewsAuth.loginForm).post(auth.login);

router.route('/registration').get(viewsAuth.registrationForm).post(auth.registration);
router.route('/registration-get-user-name').get(auth.findUserName).post();
router.route('/registration-get-user-email').get(auth.findUserEmail).post();

router.route('/reset-password').get(viewsAuth.resetPassword).post(auth.resetPassword);
router.route('/reset-password/:token').get(viewsAuth.newPassword).post();
router.route('/new-password').get().post(auth.newPassword);

// user profile routes - protected routes
router.route('/profile-settings').get(protected, viewsProfile.profileSettings).post();
router.route('/profile-avatar').get().post(settings.profileAvatar);
router.route('/profile-name').get(protected, viewsProfile.profileName).post(settings.profileName);
router.route('/profile-birthday').get(protected, viewsProfile.profileBirthday).post(settings.profileBirthday);
router.route('/profile-email').get(protected, viewsProfile.profileEmail).post(settings.profileEmail);
router.route('/profile-password').get(protected, viewsProfile.profilePassword).post(settings.profilePassword);

router.route('/profile-delete').get(protected, viewsProfile.profileDelete).post(auth.delete);

router.route('/logout').get().post(auth.logout);

// error views
router.use(error.notFound);

module.exports = router;