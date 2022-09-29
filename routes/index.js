const express = require('express');
const router = express.Router();
const template = require('../lib/template.js');


function authIsOwner(req, res) {
    if (req.session.is_logined) return true;
    else return false;
}

function authStatusUI(req, res) {
    let authStatusUI = '<a href="/auth/login">login</a>';
    if (authIsOwner(req, res)) {
        authStatusUI = `${req.session.nickname} <a href="/auth/logout">logout</a>`;
    }
    return authStatusUI;
}

router.get('/', (req, res) => {
    let title = 'Welcome';
    const description = 'Hello, Node.js';
    const list = template.list(req.list);
    const html = template.HTML(title, list,
        `<h2>${title}</h2>${description}   
     <img src="/images/hello.jpg" style="width:300px; display:block; margin-top:10px" >
    `,
        `<a href="/topic/create">create</a>`,
        authStatusUI(req, res)
    );
    res.send(html);
});


module.exports = router;