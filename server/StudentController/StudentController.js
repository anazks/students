const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

const getLoginPage = (req,res)=>{
    try {
        res.render('Student/Login')
    } catch (error) {
        
    }
}
const Home = (req, res) => {
  try {
    const { student } = req.session;

    // Check if the student is available in the session
    if (!student) {
      return res.status(400).send("Student not found in session");
    }

    const { id } = student;

    // Fetch lab data and subject data
    const labQuery = "SELECT * FROM lab WHERE studentID = ?";
    const subjectQuery = "SELECT * FROM subject";

    // Execute both queries
    connection.query(labQuery, [id], (labErr, labs) => {
      if (labErr) {
        console.error("Database error while fetching lab data:", labErr);
        return res.status(500).send("Internal server error while fetching lab data");
      }

      connection.query(subjectQuery, (subjectErr, subjects) => {
        if (subjectErr) {
          console.error("Database error while fetching subject data:", subjectErr);
          return res.status(500).send("Internal server error while fetching subject data");
        }

        // Render the home page with student, lab, and subject data
        res.render('Student/Home', { student, labs, subjects });
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).send("An unexpected error occurred while loading the home page");
  }
};



const DoLogin = (req, res) => {
    try {
        let { id, phone } = req.body;

        // Validate input
        if (!id || !phone) {
            return res.status(400).send({ error: 'ID and phone are required.' });
        }

        // Query the database
        const query = 'SELECT * FROM student WHERE id = ? AND addno = ?';
        connection.query(query, [id, phone], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).send({ error: 'Internal server error.' });
            }

            // Check if the student exists
            if (results.length > 0) {
                // Student found
                req.session.student = results[0];
                console.log(req.session.student,"session")
                // res.status(200).send({ message: 'Login successful.', student: results[0] });
                res.redirect('/student/Home')
            } else {
                // No matching student
                res.status(401).send({ error: 'Invalid ID or phone.' });
            }
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).send({ error: 'An unexpected error occurred.' });
    }
};
const addLab = (req, res) => {
  try {
      console.log(req.body, "---------------------------00000");
      const { attendance, lab, sem, experiment, co, date } = req.body;
      
      // Validate the received data
      if (!attendance || !lab || !experiment || !co || !date || !sem) {
          return res.status(400).json({ message: 'All fields are required' });
      }
      
      // Ensure student session exists
      if (!req.session.student || !req.session.student.id) {
          return res.status(401).json({ message: 'Unauthorized: Student session not found' });
      }

      let { id } = req.session.student;
      
      // Prepare the query to insert data into the lab table
      const query = `
          INSERT INTO lab (attendance, lab, sem, experiment, co, date, studentID)
          VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      // Execute the query
      connection.query(query, [attendance, lab, sem, experiment, co, date, id], (error, results) => {
          if (error) {
              console.error('Error inserting lab log:', error);
              return res.status(500).json({ message: 'Error inserting lab log' });
          }
          
          // Respond with success
          res.redirect('/student/home');
      });
  } catch (error) {
      console.error('Error in /add-lab route:', error);
      res.status(500).json({ message: 'Server error' });
  }
};


  const getMyLab = async (req, res) => {
    try {
      const studentID = req.session.student.id;
  
      if (!studentID) {
        return res.status(400).json({ message: "Student ID not found in session" });
      }
  
      // Assuming you're using a raw SQL query
      const [labs] = await db.query(
        "SELECT * FROM lab WHERE studentID = ?",
        { replacements: [studentID], type: db.QueryTypes.SELECT }
      );
  
      return res.status(200).json(labs);
    } catch (error) {
      console.error("Error fetching lab data:", error);
      res.status(500).json({ message: "An error occurred while fetching lab data", error });
    }
  };
  const addAttendance= (req,res)=>{
    console.log("----------------")
    try {
      const { status } = req.body; // Get the toggle status from the request
      const { student } = req.session; // Retrieve the student details from the session
  
      if (!student) {
        return res.status(400).send({ success: false, message: "Student not found in session." });
      }
  
      const { id: userId, name } = student; // Extract userId and username from the session
      const date = new Date(); // Current date and time
  
      // Format the date and time as "YYYY-MM-DD HH:mm:ss"
      const formattedDate = date.toISOString().replace("T", " ").split(".")[0];
  
      // Database query to mark attendance
      const query = "INSERT INTO attendance (userId, username, status, date) VALUES (?, ?, ?, ?)";
      connection.query(query, [userId, name, status, formattedDate], (err) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).send({ success: false, message: "Failed to mark attendance." });
        }
  
        res.send({ success: true, message: "Attendance marked successfully!" });
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).send({ success: false, message: "An unexpected error occurred." });
    }
  }
  const logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).send("Unable to log out. Please try again.");
      }
  
      // Redirect to the home or login page after successful logout
      console.log("session ")
      res.redirect("/");
    });
  };
  
module.exports = {getLoginPage,Home,DoLogin,addLab,getMyLab,addAttendance,logout}