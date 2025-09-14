exports.pageNotFound = (req, res, next) => {
  res.status(404)
  .render('Error/404', {
    pageTitle: 'Page Not Found', 
    currentPage: '404', 
    isloggedIn: req.session.isloggedIn || false, 
    user: req.session.user || null, 
    userType: req.session.user ? req.session.user.userType : null
  });
}
