const Joi = require("joi"); // You need to install joi before you can require it :: Do "npm install joi" in your project terminal
const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const filePath = __dirname + "/courses.json";

app.get("/", (req, res) => {
  res.send("Hello world!!!");
});

app.get("/api/courses", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => { // changed file_path to filePath. that's what was declared on line 8.
    if (err) res.status(404).send(err);
    res.send(JSON.parse(data));
  });
});

app.get("/api/courses/:id", (req, res) => {
  /**
   * 1. changed COURSES_PATH to filePath as declared on line 8.
   * 
   * 2. remove "callBack" and add a call-back function that
   *     
   */
  fs.readFile(filePath, "utf-8", (err, data)=>{
  let courses = JSON.parse(data) // convert the data in the courses.json into javascript object
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given id is not found.");
  res.send(course);
  })
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    fs.readFile(filePath, "utf-8", (err, data) => { // changed file_path to filePath. that's what was declared on line 8.
      if (err) {
        res.status(404).send(err);
      } else {
        let parsedObject = JSON.parse(data);
        let course = {
          id: parsedObject.length + 1,
          name: req.body.name,
        };
        parsedObject.push(course);
        let objToString = JSON.stringify(parsedObject,null,2);// and "null" and 2 as the second and third arguments of the JSON.stringify function for good formatting

        fs.writeFile(filePath, objToString, (err) => { // changed file_path to filePath. that's what was declared on line 8.
          if (err) res.status(404).send(err);
          res.send(course); // replace objToString with "course" to display the new course created
        });
      }
    });
  }
});

app.put("/api/courses/:id", (req, res) => {
 let courses = () => {
   const data = fs.readFileSync(filePath, 'utf-8')
   let parsedData = JSON.parse(data)
   return parsedData;
  };

  const course = courses().find((c) => c.id === parseInt(req.params.id)); // executed the courses function : like courses()
  if (!course)
    return res.status(404).send("The course with the given id is not found.");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  let Allcourses = courses(); // assign the 
  Allcourses.forEach(element => {
    if(element.id === parseInt(req.params.id)){ // loop through All the courses and update the one with the matching id
      element.name = req.body.name;
    }
  });

  let objectToString = JSON.stringify(Allcourses,null,2)
  fs.writeFile(filePath, objectToString, (err) => {// change file_path and objToString to filePath and objectToString respectively
    if (err) return res.status(404).send(err); //added the return keyword
    res.send(course); // replaced courses to course
});
}) // added "})"

app.delete("/api/courses/:id", (req, res) => {
   let courses = () => {
   const data = fs.readFileSync(filePath, 'utf-8')
   let parsedData = JSON.parse(data)
   return parsedData;
  };
  const course = courses().find((c) => c.id === parseInt(req.params.id));  // executed the courses function : like courses()
  if (!course)
    return res.status(404).send("The course with the given id is not found.");

    let Allcourses = courses(); // assign the 
    Allcourses.forEach((element, index) => {
      if(element.id === parseInt(req.params.id)){ // loop through All the courses and delete the one with the matching id
        Allcourses.splice(index, 1);
      }
    });
  
    let objectToString = JSON.stringify(Allcourses,null,2)
    fs.writeFile(filePath, objectToString, (err) => {// change file_path and objToString to filePath and objectToString respectively
      if (err) return res.status(404).send(err); //added the return keyword
      res.send(course); 
  });
});

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
