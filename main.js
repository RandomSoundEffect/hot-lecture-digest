const lib = require("./lib.js");

//define datatypes
const Course = {
  Name: (lectureName = ""),
  Professor: (professorName = ""),
  LectureList: { Week: (lectureList = []) },
};
const Lecture = {
  Due: "",
  Week: 0,
  Summary: "sth",
};

let courses = [];

function lectureInit() {
  // 1. Read the text in #course-input.
  let input = document.querySelector("#course-input");
  let text = input.value;

  if (!text.length) return;

  let course = {
    text: text,
    lectures: [], // list of lectures
  };
  // 3. Append the new course object to courses
  courses.push(course);
  saveCourses();

  // 4. Create a new task item and attach it to #todo-list.
  addCourse(course);

  // 5. Clear #task-input.
  input.value = "";
} //get user input

function addCourse(course) {
  courses.push(course);
}
//

function loadCourses() {
  let lastCourses = localStorage.getItem("courses");
  if (!lastCourses) return;

  courses = JSON.parse(lastCourses);
  courses.forEach(addCourse);
}

function saveCourses() {
  localStorage.setItem("courses", JSON.stringify(courses));
}

// Class add/delete function
function addCourse(course) {
  let div = document.createElement("div");
  div.className = "row";

  let line = document.createElement("div");
  line.className = "col-sm-9";
  line.textContent = course.text;
  line.onclick = function () {
    updateLectures(course);
  };
  div.appendChild(line);

  let buttonRemove = document.createElement("button");
  buttonRemove.className = "btn btn-sm btn-danger";
  buttonRemove.innerHTML = '<i class="bi bi-file-minus"></i>';
  div.appendChild(buttonRemove);

  buttonRemove.addEventListener("click", () => {
    div.remove();
    courses = courses.filter((t) => t !== course);
    saveCourses();
  });

  let list = document.querySelector("#course-list");

  let hr = document.createElement("hr");
  let hrdiv = document.createElement("div");
  hrdiv.className = "col-sm-9";
  hrdiv.appendChild(hr);
  div.appendChild(hrdiv);

  list.appendChild(div);
}

// Called when course is clicked by user.
function updateLectures(course) {
  // empty inner html
  let list = document.querySelector("#lecture-list");
  list.innerHTML = "";

  // Set lecture name
  let name = document.querySelector("#lecture-name");
  name.innerHTML = course.text + " Lectures";

  // Show lectures
  div = document.createElement("div");
  div.className = "";
  course.lectures.forEach(() => {
    courseDiv = document.createElement("div");
    courseDiv.innerHTML = `
    <div class="row">
    <div class="col-sm-3">
        <h6 class="mb-0">4</h6>
    </div>
    <div class="col-sm-9 text-secondary">lecture 4</div>
    </div>
    <hr />
    `;
    div.appendChild(courseDiv);
  });
  list.appendChild(div);
}

window.addEventListener("load", () => {
  loadCourses();
});

// Add a class to the class list.
let button = document.querySelector("#add");
button.addEventListener("click", () => {
  // 1. Read the text in #course-input.
  let input = document.querySelector("#course-input");
  let text = input.value;

  if (!text.length) return;

  let course = {
    text: text,
    lectures: [], // list of lectures
  };
  // 3. Append the new course object to courses
  courses.push(course);
  saveCourses();

  // 4. Create a new task item and attach it to #todo-list.
  addCourse(course);

  // 5. Clear #task-input.
  input.value = "";
});

//open popup
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

//close popup
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

//video to audio converter--from user video input
const fileSelector = document.getElementById("file-selector");
fileSelector.addEventListener("change", (event) => {
  const fileList = event.target.files;
  // console.log(fileList);
  let fileName = fileList[0].name;
  lib.getAudio(fileName, function (err) {
    /*error call back function migrate to the function declaration */
  });
});

//3. Summary/ Full-text change button

//4. Display the text that matches the type of current state (Summary / Full-text)
