const db = require("../database/database");

exports.recordDate = function (req, res) {
    //res.send('NOT IMPLEMENTED: record date');
    db.ref("inscription-dates").once("value", (snapshot) =>{
        console.log("query");
        console.log(snapshot.val());
        res.render("dateRegister", {dates: snapshot.val()});
    });
    //res.render("dateRegister");
};

exports.postDate = function (req, res) {
    console.log(req.body.begin);
    console.log(req.body.end);

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
