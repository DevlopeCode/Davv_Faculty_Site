var obj_ofStudent = {};
var count;
var  Remark ;
var temp = [];
var DataHolder = [];
var Class_data = [];
Class_data = JSON.parse(localStorage.getItem('Class_data'));
function get_dropdown() {
  document.querySelector('#Class_DropDown').innerHTML = ` <option>Plese Select</option>`;
  Class_data.forEach((e, index) => {
    document.querySelector('#Class_DropDown').innerHTML += ` <option value="${e.Class_set}">${e.Class_set}</option>`;
  });
}
get_dropdown();
function Set_Marksheet() {
  var Name = document.getElementById('Student_Name').value.toUpperCase();
  var Roll_no = document.getElementById('Roll_Number').value;
  obj_ofStudent = {
    Name: Name,
    Roll_no: Roll_no,
    Marks: []
  }
  DataHolder.push(obj_ofStudent);
  localStorage.setItem('Student_data', JSON.stringify(DataHolder));
  get_marks();
}
function get_marks() {
  Class_data = JSON.parse(localStorage.getItem('Class_data'));
  Class_data.forEach((e) => {
    if (e.Class_set == (document.getElementById('Class_DropDown').value)) {
      for (let i = 0; i < e.Subject_list.length; i++) {
        count = e.Subject_list.length;
        document.querySelector('.Get_marks').innerHTML += ` <tr>
        <td>${i + 1}</td>
        <td>${e.Subject_list[i]}</td>
        <td><input type="number" id="${i}"> </td>
        <td>100</td>
    </tr>`
      }
    }
  });
}
function set_marks() {
  Class_data = [];
  Class_data = JSON.parse(localStorage.getItem('Student_data'));
  Class_data.forEach(e => {
    for (let i = 0; i < count; i++) {
      e.Marks.push(document.getElementById(i).value);
    }
  })

  localStorage.setItem('Student_data', JSON.stringify(Class_data));
  var tata = JSON.parse(localStorage.getItem('Student_data'))
  temp = JSON.parse(localStorage.getItem('Class_data'));
  console.log(document.getElementById('Class_DropDown').value)
  temp.forEach((e) => {
    if (e.Class_set == (document.getElementById('Class_DropDown').value)) {
      e.Student_data.push(tata);
    }
  });
  localStorage.setItem('Class_data', JSON.stringify(temp));
  location.reload();

}
const PrintedMarksheet = () =>{
  if ('Class_data' in localStorage) {
    let marksum = 0;
    const showMarksheets = JSON.parse(localStorage.getItem('Class_data'));
    showMarksheets.reverse().map((obj)=>{
      obj.Student_data.map((data)=>{
        data.map((x)=>{
          if(((x.Marks.map(Number).reduce((a, b) => a + b, 0))/x.Marks.length)>60){
            Remark = ' First Division'
          }else if(((x.Marks.map(Number).reduce((a, b) => a + b, 0))/x.Marks.length)>45){
            Remark = ' Second Division';
          }else if(((x.Marks.map(Number).reduce((a, b) => a + b, 0))/x.Marks.length)>33){
            Remark = ' Third Division';
          }else{
            Remark =' Fail';
          }
          document.querySelector('.showmarksheet').innerHTML += `<fieldset>
          <center><h1>Devi Ahilya Vishwavidyalaya Indore<h1></center>
          <p>Class Name : ${obj.Class_set}</p>
          <p> Student Name :${x.Name}</p>
          <p> Roll No. :${x.Roll_no}</p>
          <table class="marksData">
       <tr>
           <th>S.no</th>
           <th>Subject</th>
           <th>Obtained Marks</th>
           <th>Total Marks</th>
        
       </tr>
       <tr>
       <td>1.</td><td>${obj.Subject_list[0]}</td> <td>${x.Marks[0]}</td><td>100</td>
          </tr>
          <tr>
       <td>2.</td><td>${obj.Subject_list[1]}</td> <td>${x.Marks[1]}</td><td>100</td>
          </tr>
          <tr>
       <td>3.</td><td>${obj.Subject_list[2]}</td> <td>${x.Marks[2]}</td><td>100</td>
          </tr>
          <tr>
       <td>4.</td><td>${obj.Subject_list[3]}</td> <td>${x.Marks[3]}</td><td>100</td>
          </tr>
          <tr>
       <td>5.</td><td>${obj.Subject_list[4]}</td> <td>${x.Marks[4]}</td><td>100</td>
          </tr>
          <tr>
          <td> Total</td><td> </td> <td>${x.Marks.map(Number).reduce((a, b) => a + b, 0)}</td><td>500</td>
             </tr>
             </table>
          <center><p> Percentage : ${(x.Marks.map(Number).reduce((a, b) => a + b, 0))/x.Marks.length}</p><center>
          <center>Remark : ${Remark }</center>
          </fieldset>
        `;
       
        })

       
      })
       
    })
  }
}
PrintedMarksheet();
