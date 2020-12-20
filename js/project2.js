class Helper {
  constructor() {
    this.studentsArray = [];
    this.lessons = [];
  }

  async getData(url) {
    const response = await fetch(url);
    const students = await response.json();

    if (response) {
      this.hideloader();
    }
    for (let i in students)
      this.studentsArray.push(students[i]);
    this.getStudentList(this.studentsArray);
    return this.studentsArray;
  }

  getStudentList(students) {
    return this._sortByName(students);
  }

  getStudentListForCourse(students, year, course) {
    let returnedArray = [];
    for (let i = 0; i < students.length; i++) {
      if (students[i]['courses'][year] !== undefined) {
        let courses = students[i]['courses'][year];
        if (courses !== undefined) {
          for (let Course in courses) {
            if (Course === course) {
              returnedArray.push(students[i]);
            }
          }
        }
      }
    }
    return returnedArray;
  }

  getAverageForStudentAllYears(student) {
    let years = student['courses'];
    let yearsTab = []

    for (let year in years) {
      yearsTab.push(year);
    }
    let grades = [];
    for (let i = 0; i < yearsTab.length; i++) {
      grades.push(this.getAverageForOneYear(student, yearsTab[i]));
    }
    return this._getAverage(grades);
  }
  getAverageForOneYear(student, year){
    let grades = [];
    if (student.courses[year] !== undefined) {
      Object.values(student.courses[year]).forEach(v => this._pushGrades(grades, v));
    } else {
      showAverageAlert();
    }
    return this._getAverage(grades);
  }
  getAverageForStudentInYear(student, year) {
    let grades = [];
    if (student[0].courses[year] !== undefined) {
      Object.values(student[0].courses[year]).forEach(v => this._pushGrades(grades, v));
    } else {
      showAverageAlert();
    }
    return this._getAverage(grades);
  }
  getAverageForCourse(students, year, course) {
    let grades = [];
    for (let i = 0; i < students.length; i++) {
      let coursesInYear = students[i]['courses'][year];
      let courses = [];
      for (let course in coursesInYear) {
        courses.push(course);
      }
      for (let j = 0; j < courses.length; j++) {
        if (courses[j] === course) {
          grades.push(this._getAverage(coursesInYear[course].exercices))
          grades.push(this._getAverage(coursesInYear[course].lecture))
        }
      }
    }
    if (grades.length === 0) {
      showCourseAverageError();
    }
    return this._getAverage(grades);
  }

  _pushGrades(grades, course) {
    grades.push(...course.exercices);
    grades.push(...course.lecture);
    return grades;
  }

  _getAverage(grades) {
    if (grades.length === 0) return 0;
    let result = 0;
    for (let i = 0; i < grades.length; ++i) {
      result += grades[i];
    }
    let average = result / grades.length;
    return Number(Math.round(average + 'e2') + 'e-2');
  }

  _sortByName(students) {
    return students.sort((a, b) => a.last_name.localeCompare(b.last_name));

  };

  hideloader() {
    document.getElementById('loading').style.display = 'none';
  }

  show() {
    let tab =
     `<thead class="table-dark"><tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Birth_date</th>
          <th scope="col">Year of study</th>
          <th scope="col">Index</th>
          <th scope="col">Average in all years</th>
         </tr></thead>`;
    for (let i = 0; i < this.studentsArray.length; i++) {
      $('#studentAverageInYear_name').append(`<option value="${i + 1}">${this.studentsArray[i].first_name} ${this.studentsArray[i].last_name} index: ${this.studentsArray[i].index}</option>`);
      tab += `<tbody><tr>
    <td scope="row">${this.studentsArray[i].first_name} </td>
    <td scope="row">${this.studentsArray[i].last_name}</td>
    <td scope="row">${this.studentsArray[i].birth_date}</td>
    <td scope="row">${this.studentsArray[i].year_of_study}</td>
    <td scope="row">${this.studentsArray[i].index}</td>
    <td scope="row">${this.getAverageForStudentAllYears(this.studentsArray[i])}</td>
    </tr></tbody>`;
    }
    tab += `<thead class="table-dark"><tr>
    <th scope="col">First Name</th>
    <th scope="col">Last Name</th>
    <th scope="col">Birth_date</th>
    <th scope="col">Year of study</th>
    <th scope="col">Index</th>
    <th scope="col">Average in all years</th>
  </tr></thead>`
    document.getElementById("table").innerHTML = tab;
  }

  getStudent(first_name, last_name, index) {
    let student = this.studentsArray.filter(student => student.first_name === first_name && student.last_name === last_name && student.index === index);
    console.log('finder: ', student);
    return student;
  }
}

let helper = new Helper();
let sortedList = [];
let yearOption = '----';
let courseOption = '----';
let yearOptionForStudentAverage = '----';
let studentNameForAverage = '----';
let searchingStudent = '';
let yearOptionForCourseAverage = '----';
let courseOptionForCourseAverage = '----';

async function gets() {
  sortedList = await helper.getData('data.json');
  helper.show();
}

gets();

function showError() {
  document.getElementById('noStudentsAlert').style.display = "block";
  document.getElementById('ListOfStudentsInChosenYearAndCourse').innerHTML = '';
}

function findStudent(first_name, last_name, index) {
  return helper.getStudent(first_name, last_name, index);
}

function showAverageAlert() {
  document.getElementById('notStudyAlert').style.display = "block";
  document.getElementById('printAverage').innerHTML = '0.0';
}

function showCourseAverageError() {
  document.getElementById('courseNotExistInThisYear').style.display = "block";
  document.getElementById('printAverageCourse').innerHTML = '0.0';
}

function printAverageForCourse(year, course) {
  let averageForCourse = 0;
  if (courseOptionForCourseAverage !== '----' && yearOptionForCourseAverage !== '----') {
    averageForCourse = helper.getAverageForCourse(sortedList, year, course);
  }
  if (averageForCourse === 0) {
    showCourseAverageError();
  } else {
    document.getElementById('printAverageCourse').innerHTML = averageForCourse;
    document.getElementById('courseNotExistInThisYear').style.display = "none";
  }
}

function printAverageForStudentInYear(student) {
  let average = 0;
  if (studentNameForAverage !== '----' && yearOptionForStudentAverage !== '----') {
    average = helper.getAverageForStudentInYear(student, yearOptionForStudentAverage);
  }
  if (average === 0) {
    showAverageAlert();
  } else {
    document.getElementById('printAverage').innerHTML = average;
    document.getElementById('notStudyAlert').style.display = "none";
  }
}

function printTable(yearOption, courseOption) {
  let array = [];
  if (yearOption !== '----' && courseOption !== '----') {
    array = helper.getStudentListForCourse(sortedList, yearOption, courseOption);
  }
  if (array.length === 0) {
    showError();
  } else {
    let tab =
     `<thead class="table-dark"><tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Index</th>
         </tr></thead>`;
    for (let i = 0; i < array.length; i++) {
      tab += `<tbody><tr>
    <td scope="row">${array[i].first_name} </td>
    <td scope="row">${array[i].last_name}</td>
    <td scope="row">${array[i].index}</td>
    </tr></tbody>`;
    }
    tab += `<thead class="table-dark"><tr>
    <th scope="col">First Name</th>
    <th scope="col">Last Name</th>
    <th scope="col">Index</th>
  </tr></thead>`
    document.getElementById("ListOfStudentsInChosenYearAndCourse").innerHTML = tab;
    document.getElementById('noStudentsAlert').style.display = "none";
  }
}

$('#listOfStudentsInCourseInYear_year').on('click', function (e) {
  yearOption = document.getElementById('listOfStudentsInCourseInYear_year').options[this.value].text;
  printTable(yearOption, courseOption);
});
$('#listOfStudentsInCourseInYear_course').on('click', function (e) {
  courseOption = document.getElementById('listOfStudentsInCourseInYear_course').options[this.value].text;
  printTable(yearOption, courseOption);
});
$('#studentAverageInYear_name').on('click', function (e) {
  studentNameForAverage = document.getElementById('studentAverageInYear_name').options[this.value].text;
  if (studentNameForAverage !== '----') {
    let stringSplit = studentNameForAverage.split(" ");
    searchingStudent = findStudent(stringSplit[0], stringSplit[1], stringSplit[3]);
    printAverageForStudentInYear(searchingStudent, yearOptionForStudentAverage);
  }
});
$('#studentAverageInYear_year').on('click', function (e) {
  yearOptionForStudentAverage = document.getElementById('studentAverageInYear_year').options[this.value].text;
  printAverageForStudentInYear(searchingStudent, yearOptionForStudentAverage);
});
$('#averageForCourseInYear_year').on('click', function (e) {
  yearOptionForCourseAverage = document.getElementById('averageForCourseInYear_year').options[this.value].text;
  printAverageForCourse(yearOptionForCourseAverage, courseOptionForCourseAverage);
});
$('#averageForCourseInYear_course').on('click', function (e) {
  courseOptionForCourseAverage = document.getElementById('averageForCourseInYear_course').options[this.value].text;
  printAverageForCourse(yearOptionForCourseAverage, courseOptionForCourseAverage);
});

