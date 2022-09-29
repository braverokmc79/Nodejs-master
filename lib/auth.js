module.exports = {

    authIsOwner: function (req, res) {
        if (req.session.is_logined) return true;
        else return false;
    },

    authStatusUI: function (req, res) {
        let authStatusUI = '<a href="/auth/login">login</a>';
        if (this.authIsOwner(req, res)) {
            authStatusUI = `${req.session.nickname} <a href="/auth/logout">logout</a>`;
        }
        return authStatusUI;
    }
}


