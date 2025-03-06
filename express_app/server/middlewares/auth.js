
/**
 * @next Continue le processus
 * @redirect Redirige vers la page indiquée
 */

exports.isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');  
    }
    next();
}