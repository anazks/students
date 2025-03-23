const mysql = require('mysql');
const nodemailer = require('nodemailer');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Users
exports.view = (req, res) => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Query the students table
  connection.query('SELECT * FROM student WHERE status = "active"', (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error retrieving student data');
    }

    // Query the subjects table
    connection.query('SELECT * FROM subject', (err, subjects) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error retrieving subject data');
      }

      // Query the attendance table for unique rows per userId for today's date
      const attendanceQuery = `
        SELECT a.*
        FROM attendance a
        INNER JOIN (
          SELECT userId, MAX(id) as maxId
          FROM attendance
          WHERE DATE(date) = ?
          GROUP BY userId
        ) groupedAttendance
        ON a.id = groupedAttendance.maxId
        ORDER BY a.date DESC
      `;
      connection.query(attendanceQuery, [today], (err, attendance) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error retrieving attendance data');
        }

        let removedUser = req.query.removed;

        // Render the data to the template
        res.render('home', { rows, removedUser, subjects, attendance });

        console.log('The data from student table: \n', rows);
        console.log('The data from subject table: \n', subjects);
        console.log('The data from attendance table (today): \n', attendance);
      });
    });
  });
};



// View result
exports.views = (req, res) => {
  
  connection.query('SELECT DISTINCT id  FROM result ORDER BY id LIMIT 5', (err, rows) => {
    
    if (!err) {
      let removedUser = req.query.removed;
      res.render('result', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from result table: \n', rows);
  });
}


// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  
  connection.query('SELECT * FROM student WHERE id LIKE ? OR name LIKE ? OR gender LIKE ? OR department LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%',  '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if(rows ==0 ){
      res.render('home', { alert: 'Student Not found.' });

    }
   else  if (!err) {
          res.redirect('/home');

    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}

exports.finds = (req, res) => {
  let searchTerm = req.body.sr;
  
  connection.query('SELECT DISTINCT id FROM result WHERE id LIKE ?', ['%' + searchTerm + '%'  ], (err, rows) => {
    if(rows ==0 ){
      res.render('result', { alert: 'Result Not found.' });
    }
    else if (!err) {
      res.render('result', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from result table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new user
exports.create = (req, res) => {
  const { id, name, batch, gender, department, phone, email,addno } = req.body;
  let searchTerm = req.body.search;


  connection.query('INSERT INTO student SET id = ?, name = ?, batch = ?, gender = ?, department = ?, phone = ?, email = ?,addno = ?', [id, name, batch, gender, department, phone, email,addno], (err, rows) => {
    if (!err) {
      res.redirect('/home');
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}





exports.forms = (req, res) => {
  res.render('add-result');
}

exports.Login = (req,res)=>{
  res.render('login');
}
exports.logout = (req,res)=>{
  res.redirect('/');
}
exports.login = (req,res)=>{
  console.log(req.body)
  if(req.body.username == 'admin' && req.body.password == 'admin'){
    res.redirect('/home');
  }else{
    res.render('login', { alert: 'Invalid Username or Password' });
  }
}
// Add new result
exports.creates = (req, res) => {
  const { id, semester, cgpa,lab} = req.body;
  console.log(req.body)
  let searchTerm = req.body.search;


  connection.query('INSERT INTO result SET id = ?, semester = ?, cgpa = ?, lab = ?', [id, semester, cgpa,lab], (err, rows) => {
    if (!err) {
      res.render('add-result', { alert: 'Result added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from result table: \n', rows);
  });
}




// Edit user
exports.edit = (req, res) => {

  connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}


// Update User
exports.update = (req, res) => {
  const { id, name, batch, gender, department, phone, email } = req.body;

  connection.query('UPDATE student SET id = ?, name = ?, batch = ?, gender = ?, department = ?, phone = ?, email = ? WHERE id = ?', [ id, name, batch, gender, department, phone, email, req.params.id], (err, rows) => {
    if (!err) {
      connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => { 
        if (!err) {
          res.render('edit-user', { rows, alert: `${name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from student table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}

// Delete User
exports.delete = (req, res) => {

  connection.query('DELETE FROM student WHERE id = ?', [req.params.id], (err, rows) => {
    if(!err) {
      res.redirect('/home');
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });

  // Hide a record

  // connection.query('UPDATE student SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
  //   if (!err) {
  //     let removedUser = encodeURIComponent('Student successeflly removed.');
  //     res.redirect('/?removed=' + removedUser);
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from student table are: \n', rows);
  // });
}

exports.deleteSub = (req, res) => {
  console.log(req.params.id,"--id")
  connection.query('DELETE FROM subject WHERE id = ?', [req.params.id], (err, rows) => {
    if(!err) {
      res.redirect('/home');
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}

// View Users
exports.viewall = (req, res) => {
  connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from student table: \n', rows);
  });
}


// View Results by id
exports.viewalls = (req, res) => {
  // connection.query('SELECT * FROM student INNER JOIN result ON student.id = result.id WHERE student.id = ?', [req.params.id], (err, rows) => {
     connection.query('SELECT * FROM student NATURAL JOIN result WHERE id = ? ORDER BY semester', [req.params.id], (err, rows) => {

    if (!err) {
      res.render('view-result', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from result table: \n', rows);
  });
}

// Add Subject
exports.addsubject = (req, res) => {
  console.log(req.body)
  const { id, subject } = req.body;
  const sem = req.body.sem;
  connection.query('INSERT INTO subject SET Subject_id = ?, subject = ?,sem = ?', [ subject,id,sem], (err, subjects) => {
    if (!err) {
      console.log(subjects)
      res.redirect('/home');
      // res.render('home', { alert: 'Subject added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from subject table: \n', subjects);
  });
}

exports.viewLog = (req, res) => {
  // Query all data from the lab database
  let id = req.params.id
  connection.query('SELECT * FROM lab where studentID = ?',[id], (err, logs) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error retrieving log data from the lab database');
    }
    console.log(logs,"logs...")
    // Render the data to the logs page
    res.render('viewLogs', { logs });

    console.log('The data from lab database: \n', logs);
  });
};
exports.updateMark = (req, res) => {
  console.log("Update mark", req.body);

  const { id, marks, roughMark, fairMark } = req.body;

  // Update the database with the new marks
  const query = 'UPDATE lab SET mark = ?, roughMark = ?, fairMark = ? WHERE id = ?';
  
  connection.query(query, [marks, roughMark, fairMark, id], (err, result) => {
    if (err) {
      console.error('Error updating log marks:', err);
      return res.status(500).send('Error updating marks');
    }

    console.log(`Marks updated for Log ID ${id}: Marks: ${marks}, Rough Mark: ${roughMark}, Fair Mark: ${fairMark}`);
    res.redirect('/home'); // Redirect back to the home page or logs page
  });
};

exports.getAttendnace = (req, res) => {
  // Extract the `id` from request parameters
  let { id } = req.params;
  console.log('------here')

  // Query to select all attendance data for the given userId
  const query = 'SELECT * FROM attendance WHERE userId = ?';

  // Execute the query
  connection.query(query, [id], (err, attendance) => {
    if (err) {
      console.error('Error retrieving attendance data:', err);
      return res.status(500).send('Error retrieving attendance data');
    }

    // Log the results to the console
    console.log(`Attendance data for userId ${id}:-------------------`, attendance);
    res.render('viewAttendnace',{attendance})
    // Optionally, send the data as a response
    // res.status(200).json(attendance);
  });
};


// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anazksunil2@gmail.com',  // Replace with your email
        pass: 'gefd cyst feti eztk'
    }
});



exports.emailAlerts = (req, res) => {
    // Query to get all students data from the database
    connection.query('SELECT name, email FROM student', (err, results) => {
        if (err) {
            console.error('Error fetching student data:', err);
            return res.status(500).send({ message: 'Error fetching student data' });
        }
        let {textData} = req.body;
          console.log(textData,req.body.textData,"text--")
        // Loop through the students and send an email to each
        results.forEach(student => {
            const mailOptions = {
                from: 'N.S.S PTC Lab System',  // Sender address
                to: student.email,             // Recipient address
                subject: `${textData},Exam Notification`,  // Subject of the email
                text: `Hello ${student.name},${textData}\n\nThis is a reminder that your exam is coming up soon.\n\nBest regards,\nYour College`  // Email body
            };

            // Send email for each student
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email to', student.email, error);
                } else {
                    console.log('Email sent to', student.email, info.response);
                }
            });
        });

        // Send response after processing all students
        res.status(200).send({ message: 'Emails sent successfully to all students' });
    });
};
