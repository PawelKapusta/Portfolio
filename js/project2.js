'use strict';

class Helper {
  constructor() {
    this.studentsArray = [];
    this.yearsOfStudying = [];
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

  }

  __getAverage(grades = []) {
    let sum = 0;
    let numberOfGrades = grades.length;
    for (var i = 0; i < numberOfGrades; i++) {
      sum += grades[i];
    }
    let average = (sum / numberOfGrades)
    return Number(Math.round(average + 'e2') + 'e-2');

  }

  getAverageForStudentInYear(student, year) {
    // let grades = [];
    //
    // if (!student['courses'][year]) {
    //   showAverageAlert();
    // }
    // let courses = student['courses'][year];
    // console.log(courses);
    //
    // var kursy = [];
    // for (var kurs in courses) {
    //   kursy.push(kurs);
    //   // console.log(kurs);
    // }
    //
    // for (var j = 0; j < courses.length; j++) {
    //   console.log("cwiczenia " + student['courses'][year][kursy[j]]['exercices']);
    //   console.log("wyklady " + student['courses'][year][kursy[j]]['lecture']);
    //   // var ocenyZCwiczen = studentObj['courses'][year][kursy[j]]['exercices'];
    //   // var ocenyZwykladow= studentObj['courses'][year][kursy[j]]['lecture'];
    //
    //   let averageFromExercises = student['courses'][year][kursy[j]].exercices;
    //   let averageFromLectures = student['courses'][year][kursy[j]].lecture;
    //
    //   grades.push(this.__getAverage(averageFromExercises));
    //   grades.push(this.__getAverage(averageFromLectures));
    // }
    // console.log(grades);
    // console.log("srednia: " + this.__getAverage([grades]));
    //
    // return this.__getAverage(grades);

    let grades = [];
    Object.values(student.courses[year]).forEach(v => this._pushGrades(grades, v));
    return this._getAvarage(grades);
  }
   _getAvarage(grades) {
    if (grades.length === 0)
      return 0;
    let result = 0;
    for (let i = 0; i < grades.length; ++i) {
      result += grades[i];
    }
    return result / grades.length;
  }

  _pushGrades(grades, course) {
    grades.push(...course.exercices);
    grades.push(...course.lecture);
    return grades;
  }
  loadDataToArray() {

    // for (let i = 0; i < this.studentsArray.length; i++) {
    //   this.yearsOfStudying = this.studentsArray[i]['courses'];
    //   let currentStudentYears = [];
    //   for (let year in this.yearsOfStudying) {
    //     currentStudentYears.push(year);
    //   }
    //   console.log("currentStudentYears", currentStudentYears);
    //   for (let j = 0; j < currentStudentYears.length; j++) {
    //     let courses = this.studentsArray[i]['courses'][currentStudentYears[j]];
    //
    //     let coursesInYear = [];
    //     for (let course in courses) {
    //       coursesInYear.push(course);
    //     }
    //     console.log('coursesInYear', coursesInYear);
    //     for (let k = 0; k < coursesInYear.length; k++) {
    //       if (!this.lessons.includes(coursesInYear[k])) {
    //         this.lessons.push(coursesInYear[k]);
    //       }
    //     }
    //   }
    //
    //   console.log('lessons', this.lessons);
    //
    // }
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
    console.log('finder: ' , student);
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
  document.getElementById('notStudyAlert').style.display = "none";
}

function printAverageForStudentInYear(student){
  let average = 0;
  if (studentNameForAverage !== '----' && yearOptionForStudentAverage !== '----'){
    average = helper.getAverageForStudentInYear(student,yearOptionForStudentAverage);
  }
  if(average === 0){
    showAverageAlert();
  }else{
    document.getElementById('printAverage').innerHTML = average;
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
  //console.log(array);
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
  if(studentNameForAverage !== '----'){
    let stringSplit = studentNameForAverage.split(" ");
    console.log(stringSplit[0]);
    console.log(stringSplit[1]);
    console.log(stringSplit[3]);
    searchingStudent = findStudent(stringSplit[0],stringSplit[1],stringSplit[3]);
    printAverageForStudentInYear(searchingStudent,yearOptionForStudentAverage);
  }
});
$('#studentAverageInYear_year').on('click', function (e) {
  yearOptionForStudentAverage = document.getElementById('studentAverageInYear_year').options[this.value].text;
  console.log(yearOptionForStudentAverage);
  printAverageForStudentInYear(searchingStudent,yearOptionForStudentAverage);
});
$('#averageForCourseInYear_year').on('click', function (e) {
  yearOptionForCourseAverage = document.getElementById('averageForCourseInYear_year').options[this.value].text;
  console.log(yearOptionForCourseAverage);
});
$('#averageForCourseInYear_course').on('click', function (e) {
  courseOptionForCourseAverage = document.getElementById('averageForCourseInYear_course').options[this.value].text;
  console.log(courseOptionForCourseAverage);
});

//console.log(helper.getAverageForStudentInYear(helper.studentsArray[0]));