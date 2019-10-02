// implement your API here
const express = require('express');
const server = express();
const cors = require('cors');
server.use(express.json());
server.use(cors());

const DB = require('./data/db');

server.get('/api/users', (req, res) => {
  DB.find()
    .then( db => {
      res.status(200).json(db);
    })
    .catch( err => {
      res.status(500).json({ error: 'The users information could not be retrieved.' });
    });
});

server.get('/api/users/:id', (req, res) => {
  const {id} = req.params;

  DB.findById(id)
    .then( db => {
      if(db) {
        res.status(200).json(db);
      } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist.' });
      }
      
    })
    .catch( err => {
      res.status(404).json({ error: 'The user information could not be retrieved.' });
    })
})

server.post('/api/users', (req, res) => {
  const dbInfo = req.body;

  if( !req.body.name || req.body.name.trim() === '') {
    return res.status(400).json({ message: 'Please provide a name for the user.' })
  }

  if( !req.body.bio || req.body.bio.trim() === '') {
    return res.status(400).json({ message: 'Please provide a bio for the user.' })
  }

  DB.insert(dbInfo)
    .then( db => {
      // res.status(201).json(db);
      DB.findById(db.id).then( userDoc => res.status(201).json(userDoc) );
    })
    .catch( err => {
      res.status(500).json({ error: 'There was an error while saving the user to the database' })
    })
})

server.put('/api/users/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  if( !req.body.name || req.body.name.trim() === '') {
    return res.status(400).json({ errorMessage: 'Please provide a name for the user.' })
  }

  if( !req.body.bio || req.body.bio.trim() === '') {
    return res.status(400).json({ errorMessage: 'Please provide a bio for the user.' })
  }

  DB.update(id, changes)
    .then( isUpdated => {
      if(isUpdated) {
         DB.findById(id).then( userDoc => res.status(200).json(userDoc) );
      } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist.' })
      }
    })
    .catch( err => {
      err.status(500).json({ error: 'The user information could not be modified.' });
    });
})

server.delete('/api/users/:id', (req, res) => {
  const {id} = req.params;

  DB.remove(id)
    .then( db => {
      if(db) {
        res.status(204).json({ message: 'THe user was deleted successfully' });
      } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist.' })
      }
    })
    .catch( err => {
      err.status(500).json({ message: 'he user could not be removed' })
    })
})

const port = 8000;
server.listen(port, () => console.log('api running'));