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
  getAverageForStudentAllYears(student){

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
      tab += `<tbody><tr>
    <td scope="row">${this.studentsArray[i].first_name} </td>
    <td scope="row">${this.studentsArray[i].last_name}</td>
    <td scope="row">${this.studentsArray[i].birth_date}</td>
    <td scope="row">${this.studentsArray[i].year_of_study}</td>
    <td scope="row">${this.studentsArray[i].index}</td>
    <td scope="row">${})</td>
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

  //
  // showGrades(student) {
  //   let returnedCourses = `<thead class="table-dark"><tr>
  //         <th scope="col">First Name</th>
  //         <th scope="col">Last Name</th>
  //         <th scope="col">Index</th>`;
  //   this.yearsOfStudying = student['courses'];
  //   let currentStudentYears = [];
  //   for (let year in this.yearsOfStudying) {
  //     currentStudentYears.push(year);
  //     returnedCourses +=`<td scope="col">${year}</td>`;
  //   }
  //   returnedCourses += `</tr></thead>`;
  //   console.log("currentStudentYears", currentStudentYears);
  //   for (let j = 0; j < currentStudentYears.length; j++) {
  //     let courses = student['courses'][currentStudentYears[j]];
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
  //   for (let i = 0; i < this.studentsArray.length; i++) {
  //     returnedCourses += `<tbody><tr>
  //   <td scope="row">${this.studentsArray[i].first_name} </td>
  //   <td scope="row">${this.studentsArray[i].last_name}</td>
  //   <td scope="row">${this.studentsArray[i].birth_date}</td>
  //   <td scope="row">${this.studentsArray[i].year_of_study}</td>
  //   <td scope="row">${this.studentsArray[i].index}</td>
  //   </tr></tbody>`;
  //   }
  //   returnedCourses += `<thead class="table-dark"><tr>
  //   <th scope="col">First Name</th>
  //   <th scope="col">Last Name</th>
  //   <th scope="col">Birth_date</th>
  //   <th scope="col">Year of study</th>
  //   <th scope="col">Index</th>
  // </tr></thead>`
  //
  //   document.getElementById('tableWithGrades').innerHTML = returnedCourses;
  // }
}

let helper = new Helper();
let sortedList = [];
let yearOption = '----';
let courseOption = '----';

async function gets() {
  sortedList = await helper.getData('data.json');
  helper.show();
}

gets();

function showError(){
  document.getElementById('noStudentsAlert').style.display = "block";
  document.getElementById('ListOfStudentsInChosenYearAndCourse').innerHTML = '';
}
function printTable(yearOption, courseOption) {
  let array = [];
  if (yearOption !== '----' && courseOption !== '----') {
    array = helper.getStudentListForCourse(sortedList, yearOption, courseOption);
  }
  if (array.length === 0) {
      showError();
  }else{
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

$('#studentGradeInChosenYear_year').on('click', function (e) {
  yearOption = document.getElementById('studentGradeInChosenYear_year').options[this.value].text;
  printTable(yearOption, courseOption);
});
$('#studentGradeInChosenYear_course').on('click', function (e) {
  courseOption = document.getElementById('studentGradeInChosenYear_course').options[this.value].text;
  printTable(yearOption, courseOption);
});


//console.log(helper.getAverageForStudentInYear(helper.studentsArray[0]));