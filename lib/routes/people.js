const People = require('../models/People');
const bodyParser = require('../bodyParser');
const { parse } = require('url');


module.exports = (req, res) => {
  const url = parse(req.url, true);

  if(req.method === 'POST' && url.pathname === '/people') { //route takes in data and create a new person
    
    bodyParser(req)
      .then(body => {
        People.create({ //.create is from simple database
          name: body.name,
          age: body.age,
          favoriteColor: body.favoriteColor 
        
        }, (err, createdPerson) => {
          res.end(JSON.stringify(createdPerson));
        });
      });
  } else if(req.method === 'GET' && url.pathname.includes('/people/')) {
    // console.log('GET FUNCTION');
    const id = url.pathname.slice(1).split('/')[1];
    People.findById(id, (error, foundPerson) => {
      res.end(JSON.stringify(foundPerson));
    });
  } else if(req.method === 'GET' && url.pathname === '/people') { //check we have a get method and the pathname is people
    People.find((err, listOfPeople) => {
      res.end(JSON.stringify(listOfPeople)); 
    });
  }

};