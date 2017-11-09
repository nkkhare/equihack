var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/userdetails', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    console.log(collection);
    console.log("The username and password coming from request body is");
    console.log(req.body.username + ' ' + req.body.password);

    var query = {"username" : req.body.username, "password" : req.body.password};
    console.log("The query coming from reqeust body is");
    console.log(query);

//    var query = {"username": {"$ne": null}};
//    var query = { $where: "this.ssn === '" + req.body.username + "'" }
//   var query = { $where: "this.ssn === '" + '\'; return \'\' == \'' + "'" };
    collection.find(query, function(err, result){
        res.send(
            (err === null) ? { msg: result } : { msg: err }
        );
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
