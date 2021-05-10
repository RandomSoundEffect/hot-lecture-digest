const Type = {
  Todo: 1,
  Done: 2,
};

//
let courses = [];

function addCourse(course) {
  courses.push(course);
}
//

function loadCourses() {
  let lastCourses = localStorage.getItem("courses");
  if (!lastCourses) return;

  courses = JSON.parse(lastCourses);
  Courses.forEach(addCourse);
}

function saveCourses() {
  localStorage.setItem("courses", JSON.stringify(courses));
}

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

  // let buttonDone = document.createElement("button");
  // buttonDone.className = "btn btn-sm btn-success me-1";
  // buttonDone.innerHTML = '<i class="bi bi-check"></i>';
  // div.appendChild(buttonDone);

  // buttonDone.addEventListener("click", () => {
  //   /* TODO */
  // });

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
  let list = document.querySelector("#lecture-list");
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

  /*
    lectures store the information for each lecture.
    recommended to save the summary. 
    
    lecture example:
    name: Gradient Descent
    week: 7
    summary: "sth"
    due date: [DATE]
*/

  let course = {
    text: text,
    lectures: [1, 2, 3, 4],
  };

  // 3. Append the new course object to courses
  courses.push(course);
  saveCourses();

  // 4. Create a new task item and attach it to #todo-list.
  addCourse(course);

  // 5. Clear #task-input.
  input.value = "";
});

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function validateForm() {}
