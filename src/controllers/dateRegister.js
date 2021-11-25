const db = require("../database/database");

exports.recordDate = function (req, res) {
    db.ref("inscription-dates").once("value", (snapshot) =>{
        res.render("dateRegister", {role: req.session.role, dates: snapshot.val()});
    });
};

exports.postDate = function (req, res) {
    if (req.body.begin > req.body.end) {
        res.redirect("/registrar-fechas");
        return;
    }

    db.ref("inscription-dates").set({
        begin: req.body.begin,
        end: req.body.end,
    });

    res.redirect("/registrar-fechas");
};
