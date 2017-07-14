var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', name: 'Avinash' });
  });
*/

/*router.get('/:id', function(req, res){
   res.send('The id you specified is ' + req.params.id);
});*/


router.use(function(req, res, next){
   console.log("A new request received at " + Date.now());
   next();
});

router.use('/', function(req, res){
   console.log('End');
});


router.get('/:id([0-9]{5})', function(req, res){
   res.send('id: ' + req.params.id);
   next();
});



module.exports = router;
