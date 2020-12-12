async function getData(url) {
  const response = await fetch(url);
  const students = await response.json();
  console.log(students);
  if (response) {
    hideloader();
  }
  show(students);
}
getData('data.json');
function hideloader() {
  document.getElementById('loading').style.display = 'none';
}
function show(data) {
  let tab =
   `<tr> 
          <th>First Name</th> 
          <th>Last Name</th> 
          <th>Birth_date</th> 
          <th>Year of study</th>
          <th>Index</th>
          <th>Courses</th>
         </tr>`;
  for (let r of data) {
    tab += `<tr>
    <td>${r.first_name} </td>
    <td>${r.last_name}</td>
    <td>${r.birth_date}</td>
    <td>${r.year_of_study}</td>
    <td>${r.index}</td>`
     const obj = Object.keys(r.courses);
    console.log(obj);
    console.log(obj.length);
    for (let i = 0; i < obj.length; i++){
      console.log(i);
      const lessons = Object.keys(obj[i]);
      console.log(lessons);
    }


tab +=`</tr>`;
 }
  document.getElementById("table").innerHTML = tab;
}
