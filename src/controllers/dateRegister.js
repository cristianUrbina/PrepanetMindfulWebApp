const db = require("../database/database");

exports.recordDate = function (req, res) {
    db.collection("fechas-de-inscripcion").get().then((snapshot) => {
        var data = null;
        if (!snapshot.empty) {
            data = {};
            snapshot.forEach((doc) => {
                data[doc.id] = doc.data();
            });
        }
        res.render("dateRegister", {role: req.session.role, dates: data});
    });
};

exports.postDate = async function (req, res) {
    if (req.body.begin > req.body.end) {
        res.redirect("/registrar-fechas");
        return;
    }

    await db.collection("fechas-de-inscripcion").doc("begin").set( { date: req.body.begin } );

    await db.collection("fechas-de-inscripcion").doc("end").set( { date: req.body.end } );

    res.redirect("/registrar-fechas");
};
