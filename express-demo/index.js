const Joi = require("joi");
const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const filePath = __dirname + "/courses.json";

app.get("/", (req, res) => {
  res.send("Hello world!!!");
});

app.get("/api/courses", (req, res) => {
  fs.readFile(file_path, "utf-8", (err, data) => {
    if (err) res.status(404).send(err);
    res.send(JSON.parse(data));
  });
});

app.get("/api/courses/:id", (req, res) => {
  fs.readFile(COURSES_PATH, "utf-8", callBack);
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given id is not found.");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    fs.readFile(file_path, "utf-8", (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        let parsedObject = JSON.parse(data);
        let course = {
          id: parsedObject.length + 1,
          name: req.body.name,
        };
        parsedObject.push(course);
        let objToString = JSON.stringify(parsedObject);

        fs.writeFile(file_path, objToString, (err) => {
          if (err) res.status(404).send(err);
          res.send(objToString);
        });
      }
    });
  }
});

// app.put("/api/courses/:id", (req, res) => {
//  let courses = () => {
//    const data = fs.readFileSync(filePath, 'utf-8')
//    let parsedData = JSON.parse(data)
//    return parsedData;
//   };

//   const course = courses.find((c) => c.id === parseInt(req.params.id));
//   if (!course)
//     return res.status(404).send("The course with the given id is not found.");

//   const { error } = validateCourse(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   course.name = req.body.name;
//   let objectToString = JSON.stringify(courses)
//   fs.writeFile(file_path, objToString, (err) => {
//     if (err) res.status(404).send(err);
//     res.send(courses);
// });

// app.delete("/api/courses/:id", (req, res) => {
//    let courses = () => {
//    const data = fs.readFileSync(filePath, 'utf-8')
//    let parsedData = JSON.parse(data)
//    return parsedData;
//   };
//   const course = courses.find((c) => c.id === parseInt(req.params.id));
//   if (!course)
//     return res.status(404).send("The course with the given id is not found.");

//   const index = courses.indexOf(course);
//   courses.splice(index, 1);

//   res.send(course);
// });

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port} ...`));

//app.get("/api/posts/:year/:month", (req, res) => {
//  res.send(req.params);
//});

//query
// app.get("/api/posts/:year/:month", (req, res) => {
//   res.send(req.query);
// });
