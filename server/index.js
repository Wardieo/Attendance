const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  password: "",
  host: "localhost",
  database: "db_attendance",
  multipleStatements: true,
});

//GET /student
app.get("/student", (req, res) => {
  const sql = "SELECT * FROM student_info ORDER BY student_info_id DESC";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

//GET /attendance
app.get("/attendance", (req, res) => {
  const sql =
    "SELECT student_info.student_info_id, student_info.name, student_info.course, student_info.year, timein.transaction, timein.date FROM student_info, timein WHERE timein.student_info_id = student_info.student_info_id ORDER BY timein_id DESC;";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

//GET /total_students
app.get("/total_students", (req, res) => {
  const sql = "SELECT COUNT(student_info_id) FROM student_info";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

//GET /total_attendance
app.get("/total_attendance", (req, res) => {
  const sql = "SELECT COUNT(timein_id) FROM timein";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

//GET /submit/:id
app.get("/submit/:id", (req, res) => {
  const sql = "SELECT * FROM student_info WHERE student_info_id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

//PUT /edit/:id
app.put("/edit/:id", (req, res) => {
  const sql =
    "UPDATE student_info SET name = ? , year = ? , course = ?, department = ? WHERE student_info_id = ?";
  const id = req.params.id;

  db.query(
    sql,
    [req.body.name, req.body.year, req.body.course, req.body.department, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

//DELETE /delete/:id
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  // First DELETE statement
  const sql1 = "DELETE FROM timein WHERE student_info_id = ?";
  db.query(sql1, [id], (err1, result1) => {
    if (err1) {
      console.log(err1);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Second DELETE statement
    const sql2 = "DELETE FROM student_info WHERE student_info_id = ?";
    db.query(sql2, [id], (err2, result2) => {
      if (err2) {
        console.log(err2);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      res.json({ result1, result2 });
    });
  });
});

//POST /add
app.post("/add", (req, res) => {
  const student_info_id = req.body.student_info_id;
  const name = req.body.name;
  const year = req.body.year;
  const course = req.body.course;
  const department = req.body.department;
  const attendance = req.body.attendance;
  const quizes = req.body.quizes;

  db.query(
    "INSERT INTO student_info (student_info_id, name, year, course, department, attendance, quizes) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [student_info_id, name, year, course, department, attendance, quizes],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );
});

//POST /create
app.post("/create", (req, res) => {
  const student_info_id = req.body.student_info_id;
  const transaction = req.body.transaction;
  const date = new Date(req.body.date)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const sql = `
    INSERT INTO timein (student_info_id, transaction, date)
    VALUES (?, ?, ?);
    
    UPDATE student_info
    SET attendance = COALESCE(attendance, 0) + 1
    WHERE student_info_id = ?;
  `;

  db.query(
    sql,
    [student_info_id, transaction, date, student_info_id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error executing queries");
      }

      res.send({ message: "Insert and update successful", result });
    }
  );
});

//GET Top 1 attendance
app.get("/top_attendance", (req, res) => {
  const sql = "SELECT * FROM student_info ORDER BY attendance DESC LIMIT 1;";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

//GET Top 3 attendance
app.get("/top3_attendance", (req, res) => {
  const sql = "SELECT * FROM student_info ORDER BY attendance DESC LIMIT 3;";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

//POST /login
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  const email = req.body.email;
  const password = req.body.password;

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.json({ Message: "Server side Error" });
    if (result.length > 0) {
      const name = result[0].name;
      const token = jwt.sign({ name }, "my-webtoken-key-secret", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Message: "No Record Existed" });
    }
  });
});

//verifyUser
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Message: "we need token" });
  } else {
    jwt.verify(token, "my-webtoken-key-secret", (err, decoded) => {
      if (err) {
        return res.json({ Message: "Authentication Error" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", name: req.name });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.listen("3001", () => {
  console.log("Lezgo");
});
