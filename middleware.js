exports.requireLogin = (req, res, next) => {
    if (req.user) {
        return next()
    }
    return res.redirect('/login')
}

exports.requireLoginAdmin = (req, res, next) => {
    if (req.user) {
        if (req.user.role == 'admin') {
            return next()
        }
    }
    return res.redirect('/')
}

exports.requireLoginFaculty = (req, res, next) => {
    if (req.user) {
        // Xử lý role
        if (req.user.role == 'faculty') {
            return next()
        }
    }
    return res.redirect('/')
}