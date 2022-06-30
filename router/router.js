// build-in modules
const express = require('express');
// custom modules
const { protected } = require('./../middleware/auth');
const viewsPublic = require('../controllers/views-public-controller');
const viewsAuth = require('./../controllers/views-auth-controller');
const viewsProfile = require('../controllers/views-profile-controller');
const viewsProject = require('./../controllers/views-project-controller');
const viewsParser = require('./../controllers/views-parser-controller');
const auth = require('./../controllers/auth-controller');
const settings = require('./../controllers/settings-controller');
const editor = require('./../controllers/editor-controller');
const parser = require('./../controllers/parser-controller');
const error = require('./../controllers/error-controller');


const router = express.Router();

// public views routes
router.get('/', viewsPublic.home);

// user authentication routes
router.route('/login').get(viewsAuth.loginForm).post(auth.login);

router.route('/registration').get(viewsAuth.registrationForm).post(auth.registration);
// router.route('/registration-get-user-name').get(auth.findUserName).post();
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

router.route('/project-list').get(protected, viewsProject.projectList).post();
router.route('/project-editor').get(protected, viewsProject.projectEditor).post();

router.route('/parser-list').get(protected, viewsParser.parserList).post(parser.parserList);
router.route('/parser-editor').get(protected, viewsParser.parserEditor).post(editor.saveBasic);
router.route('/parser-editor/:id').get(protected, viewsParser.parserEditor).post();
router.route('/parser-list-editor').get(protected, viewsParser.parserListEditor).post(editor.saveList);
router.route('/parser-list-editor/:id').get(protected, viewsParser.parserListEditor).post();
router.route('/parser-delete/:name').get().post(parser.parserDelete);

// error views
router.use(error.notFound);

module.exports = router;