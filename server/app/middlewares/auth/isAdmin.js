const isAdmin = (req,res,next) => {
    if(req.user.role == 'admin'){
        next()
    }
    else{
        res.status(403).json({
            ok: false,
            msg: 'User does not have admin privilege'
        })
    }
}

module.exports = isAdmin