const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();


router.post('/', (request, response) => {
  if (request.isAuthenticated()) {
    const entry = request.body.entry;
    let sqlText = `INSERT INTO student_bio
      (id, disclaimer)
      VALUES ($1, $2)`;
    pool.query(sqlText, [entry.id, entry.disclaimer])
      .then((result) => {
        // console.log('Added entry:', result);
        response.sendStatus(201);
      }).catch((error) => {
        //  console.log('Error posting entry:', error);
        response.sendStatus(500);
      })
  } else {
      response.sendStatus(403);
  }
}); // end POST

router.put('/general/:id', (request, response) => {
  if (request.isAuthenticated()) {
    const id = request.params.id;
    const entry = request.body.entry;
    let queryText = `UPDATE student_bio 
      SET first_name=$2, last_name=$3, date_of_birth=$4, relationship_status=$5, skype_id=$6, email=$7, phone_number=$8, school_id=$9, sessions_used=$10 WHERE id=$1`;
    pool.query(queryText, [id, entry.first_name, entry.last_name, entry.date_of_birth, entry.relationship_status, entry.skype_id, entry.email, entry.phone_number, entry.school_id, entry.sessions_used])
      .then((result) => {
        response.sendStatus(200);
      })
      .catch((err) => {
        response.sendStatus(500);
      })
  } else {
      response.sendStatus(403);
  }
}); // end general info update

router.put('/goals/:id', (request, response) => {
  if (request.isAuthenticated()) {
    const id = request.params.id;
    const entry = request.body.entry;
    let queryText = `UPDATE student_bio 
      SET specialty_id=$2, other_goals=$3 WHERE id=$1`;
    pool.query(queryText, [id, entry.specialty_id, entry.other_goals])
      .then((result) => {
        response.sendStatus(200);
      })
      .catch((err) => {
        response.sendStatus(500);
      })
  } else {
      response.sendStatus(403);
  }
}); // end goals update

router.put('/barriers/:id', (request, response) => {
  if (request.isAuthenticated()) {
    const id = request.params.id;
    const entry = request.body.entry;
    let queryText = `UPDATE student_bio 
      SET other_barriers=$2 WHERE id=$1`;
    pool.query(queryText, [id, entry.other_barriers])
      .then((result) => {
        response.sendStatus(200);
      })
      .catch((err) => {
        response.sendStatus(500);
      })
  } else {
      response.sendStatus(403);
  }
}); // end barriers update

router.put('/sessions/:id', (request, response) => {
  if (request.isAuthenticated()) {
    const id = request.params.id;
    const entry = request.body.entry;
    let queryText = `UPDATE student_bio 
      SET total_sessions=$2 WHERE id=$1`;
    pool.query(queryText, [id, entry.total_sessions])
      .then((result) => {
        response.sendStatus(200);
      })
      .catch((err) => {
        response.sendStatus(500);
      })
  } else {
      response.sendStatus(403);
  }
}); // end sessions update

router.put('/extra/:id', (request, response) => {
  if (request.isAuthenticated()) {
    const id = request.params.id;
    const entry = request.body.entry;
    let queryText = `UPDATE student_bio 
      SET other_professionals=$2, other_professionals_explanation=$3, other_information=$4, other_information_explanation=$5 WHERE id=$1`;
    pool.query(queryText, [id, entry.other_professionals, entry.other_professionals_explain, entry.other_information, entry.other_information_explain])
      .then((result) => {
        response.sendStatus(200);
      })
      .catch((err) => {
        response.sendStatus(500);
      })
  } else {
      response.sendStatus(403);
  }
}); // end extra update

router.get('/:id', (request, response) => {
  if (request.isAuthenticated()) {
    const id = request.params.id;
    const sqlText = `SELECT * FROM student_bio WHERE id=$1`;
    pool.query(sqlText, [id])
      .then(function (result) {
        //  console.log('Get result:', result);
        response.send(result.rows);
      })
      .catch(function (error) {
        //  console.log('Error on Get:', error);
        response.sendStatus(500);
      })
  } else {
      response.sendStatus(403);
  }
});

router.get('/numappt/:id', (request, response) => {
  if (request.isAuthenticated()) {
    const id = request.params.id;
    const sqlText = `SELECT COUNT(calendar_id) as appt_count FROM calendar WHERE student_id=$1`;
    pool.query(sqlText, [id])
      .then(function (result) {
        //  console.log('Get result:', result);
        response.send(result.rows);
      })
      .catch(function (error) {
        //  console.log('Error on Get:', error);
        response.sendStatus(500);
      })
  } else {
      response.sendStatus(403);
  }
});

router.get('/appointment/:id', (request, response) => {
  if (request.isAuthenticated()) {
    const id = request.params.id;
    const sqlText = `SELECT * FROM calendar 
    JOIN coach_bio ON coach_bio.id=calendar.coach_id
    WHERE calendar.student_id=$1`;
    pool.query(sqlText, [id])
      .then(function (result) {
        //  console.log('Get result:', result);
        response.send(result.rows);
      })
      .catch(function (error) {
        //  console.log('Error on Get:', error);
        response.sendStatus(500);
      })
  } else {
      response.sendStatus(403);
  }
});

router.get('/sessions/:id', (request, response) => {
  if (request.isAuthenticated()) {
    const id = request.params.id;
    const sqlText = `SELECT student_id, id, sessions_used, total_sessions FROM student_bio
    WHERE id=$1`;
    pool.query(sqlText, [id])
      .then(function (result) {
        //  console.log('Get result:', result);
        response.send(result.rows);
      })
      .catch(function (error) {
        //  console.log('Error on Get:', error);
        response.sendStatus(500);
      })
  } else {
      response.sendStatus(403);
  }
});

router.get('/mycoach/:id', (request, response) => {
  if (request.isAuthenticated()) {
    const id = request.params.id;
    const sqlText = `SELECT coach_id FROM student_bio WHERE id=$1`;
    pool.query(sqlText, [id])
      .then(function (result) {
        //  console.log('Get result:', result);
        response.send(result.rows);
      })
      .catch(function (error) {
        //  console.log('Error on Get:', error);
        response.sendStatus(500);
      })
  } else {
      response.sendStatus(403);
  }
});

router.put('/bio/:id', (request, response) => {
  if (request.isAuthenticated()) {
    const id = request.params.id;
    const entry = request.body.entry;
    let queryText = `UPDATE student_bio 
      SET student_bio=$2 WHERE student_id=$1`;
    pool.query(queryText, [id, entry.student_bio])
      .then((result) => {
        response.sendStatus(200);
      })
      .catch((err) => {
        response.sendStatus(500);
      })
  } else {
      response.sendStatus(403);
  }
}); // end extra update

router.put('/updatesessions/:id', (request, response) => {
  if (request.isAuthenticated()) {
    const id = request.params.id;
    const entry = request.body.entry;
    let queryText = `UPDATE student_bio 
      SET sessions_used=$2 WHERE id=$1`;
    pool.query(queryText, [id, entry.sessions_used])
      .then((result) => {
        response.sendStatus(200);
      })
      .catch((err) => {
        response.sendStatus(500);
      })
  } else {
      response.sendStatus(403);
  }
}); // end extra update

router.put('/coach/:id', (request, response) => {
  if (request.isAuthenticated()) {
    const id = request.params.id;
    const entry = request.body.entry;
    let queryText = `UPDATE student_bio 
      SET coach_id=$2 WHERE id=$1`;
    pool.query(queryText, [id, entry.coach_id])
      .then((result) => {
        response.sendStatus(200);
      })
      .catch((err) => {
        response.sendStatus(500);
      })
  } else {
      response.sendStatus(403);
  }
}); // end coach_id update




module.exports = router;