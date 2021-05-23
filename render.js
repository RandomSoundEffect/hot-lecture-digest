NodeList.prototype.forEach = Array.prototype.forEach; // neat prototype hack to enable forEach

let courses = []; // stores COURSE_OBJECTs

/*
COURSE_OBJECT {
  subject: string,
  lectures: [
    LECTURE_OBJECTS
  ]
}
*/

/*
LECTURE_OBJECT {
  Name: string,
  Due:  string,
  Week: string,
  Full: string,
  Summary: string
}
*/

/////////////////////////////////////////////////////////
////////////////////// SAVE & LOAD //////////////////////
/////////////////////////////////////////////////////////

function loadCourses() {
  let lastCourses = localStorage.getItem("courses");
  if (!lastCourses) return;

  const data = JSON.parse(lastCourses);
  data.forEach((course) => addCourse(course.subject, course.professor));
  courses = data;
}

function saveCourses() {
  localStorage.setItem("courses", JSON.stringify(courses));
}

/////////////////////////////////////////////////////////
//////////////////////  RENDERING  //////////////////////
/////////////////////////////////////////////////////////

/** main screen stuff */
const MainScreen = {
  buttons: {
    import: document.getElementById("import"),
    summarize: document.getElementById("summarize"),
    add: document.getElementById("add"),
  },
  input: {
    course: document.getElementById("course-input"),
    professor: document.getElementById("professor-input"),
  },
  display: {
    courses: document.getElementById("course-list-body"),
    lectures: document.getElementById("lecture-list-body"),
    content_type: "full",
    lecture_content: document.getElementById("lecture-content"),
    lecture_main_title: document.getElementById("lecture-main-title"),
  },
};

/** popup screen stuff */
const Popup = {
  bg: document.getElementById("myForm"),
  input: {
    course: document.getElementById("course-name"),
    name: document.getElementById("lecture-name"),
    week: document.getElementById("week"),
    due: document.getElementById("date"),
  },
  button: {
    submit: document.getElementById("submit"),
    close: document.getElementById("close"),
  },
  file: {
    fulltrans: document.getElementById("full-trans-file"),
    summary: document.getElementById("summary-file"),
  },
};

/** init static main screen */
const runMain = () => {
  Popup.bg.style.display = "none";

  MainScreen.buttons.add.addEventListener("click", () => {
    addCourse(MainScreen.input.course.value, MainScreen.input.professor.value);
    MainScreen.input.course.value = "";
    MainScreen.input.professor.value = "";
    saveCourses();
  });

  MainScreen.buttons.import.addEventListener("click", () => {
    if (Popup.bg.style.display === "none") openPopup();
    else closePopup(false);
  });

  window.addEventListener("load", loadCourses);
};

/** init static popup screen */
const runPopup = () => {
  Popup.button.submit.addEventListener("click", submit);
  Popup.button.close.addEventListener("click", () => closePopup(true));
};

/////////////////////////////////////////////////////////
////////////////  MAIN SCREEN FUNCTIONS  ////////////////
/////////////////////////////////////////////////////////

function addCourse(subject, professor) {
  if (
    !subject.length ||
    !professor.length ||
    courses.find((c) => c.subject === subject)
  )
    return;

  courses.push({ subject, professor, lectures: [] });
  let last = courses.length - 1;

  let row = document.createElement("tr");
  row.onclick = () => {
    let childnodes = MainScreen.display.courses.childNodes;
    childnodes.forEach((r) => (r.className = ""));
    row.className = "table-active";
    MainScreen.display.lecture_main_title.innerHTML = `Lectures of ${name.innerHTML}`;
    displayLectures(courses[last]);
  };

  let name = document.createElement("td");
  name.className = "col-sm-1";
  name.innerHTML = subject;

  let prof = document.createElement("td");
  prof.className = "col-sm-2";
  prof.innerHTML = professor;

  let btn = document.createElement("td");
  let btn_remov = document.createElement("button");
  btn_remov.className = "btn btn-sm btn-danger";
  btn_remov.innerHTML = '<i class="bi bi-trash"></i>';
  btn_remov.onclick = () => {
    row.remove();
    courses = courses.filter((c) => c.subject !== subject);
    saveCourses();
  };
  btn.appendChild(btn_remov);

  row.appendChild(name);
  row.appendChild(prof);
  row.appendChild(btn);
  MainScreen.display.courses.appendChild(row);
}

function displayLectures(course) {
  if (!course.lectures.length) {
    MainScreen.display.lectures.innerHTML =
      "<tr><td>-</td><td>No lectures yet.</td><td>-</td></tr>";
    return;
  }

  MainScreen.display.lectures.innerHTML = "";
  course.lectures.forEach((lecture) => {
    let row = document.createElement("tr");
    row.innerHTML = `
    <td>${lecture.Week}</td>
    <td>${lecture.Name}</td>
    <td>${lecture.Due}</td>
    `;
    row.onclick = () => {
      let childnodes = MainScreen.display.lectures.childNodes;
      childnodes.forEach((r) => (r.className = ""));
      row.className = "table-active";
      displayLectureContent(lecture);
      MainScreen.buttons.summarize.onclick = () => switchContent(lecture);
    };
    MainScreen.display.lectures.appendChild(row);
  });
}

/** switch between full transcription and summary */
function switchContent(lecture) {
  if (MainScreen.display.content_type === "full") {
    MainScreen.display.content_type = "summary";
    //MainScreen.buttons.summarize.className = "btn btn-primary";
    MainScreen.buttons.summarize.innerHTML = "Summary";
  } else {
    MainScreen.display.content_type = "full";
    //MainScreen.buttons.summarize.className = "btn btn-outline-primary";
    MainScreen.buttons.summarize.innerHTML = "Full-Text";
  }
  displayLectureContent(lecture);
}

/** display lecture content */
function displayLectureContent(lecture) {
  if (MainScreen.display.content_type === "full") {
    MainScreen.display.lecture_content.innerHTML = lecture.Full;
  } else {
    MainScreen.display.lecture_content.innerHTML = lecture.Summary;
  }
}

/////////////////////////////////////////////////////////
/////////////////////  FILE HANDLE  /////////////////////
/////////////////////////////////////////////////////////

/** read file as text and returns its content */
async function readText(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

/////////////////////////////////////////////////////////
///////////////////  POPUP FUNCTIONS  ///////////////////
/////////////////////////////////////////////////////////

async function submit() {
  const file1 = Popup.file.fulltrans.files[0];
  const file2 = Popup.file.summary.files[0];
  if (emptyInputs(Popup.input) || !(file1 && file2)) return;

  try {
    const res1 = await readText(file1);
    const res2 = await readText(file2);

    const subject = Popup.input.course.value;
    let target = courses.find((c) => c.subject === subject);
    if (!target) {
      addCourse(subject);
      target = courses.find((c) => c.subject === subject);
    }

    orderedInsert(target.lectures, {
      Name: Popup.input.name.value,
      Due: Popup.input.due.value,
      Week: Popup.input.week.value,
      Full: res1,
      Summary: res2,
    });

    displayLectures(target);
    saveCourses();
  } finally {
    closePopup(true);
  }
}

function openPopup() {
  Popup.bg.style.display = "block";
}

function closePopup(do_flush) {
  if (do_flush) {
    clearInputs(Popup.input);
    Popup.file.fulltrans.value = "";
    Popup.file.summary.value = "";
  }
  Popup.bg.style.display = "none";
}

function emptyInputs(input) {
  return Object.keys(input).some((k) => !input[k].value.length);
}

function clearInputs(inputs) {
  Object.keys(inputs).forEach((k) => (inputs[k].value = ""));
}

function orderedInsert(lectures, lecture) {
  let i = lectures.length;
  const week = Number.parseInt(lecture.Week);
  while (i > 0 && week < Number.parseInt(lectures[i - 1].Week)) {
    --i;
  }
  lectures.splice(i, 0, lecture);
}

runMain();
runPopup();
