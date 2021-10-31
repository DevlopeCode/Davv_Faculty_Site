var Obj_Class = {};
var obj = {};
var test = [];
var Obj_Student = {};
var subject_name = [];
var data = [];
var subject = [];
var Class_Value;
function Get_ClassData() {
    Class_Value = (document.querySelector('#Class_Name').value).toUpperCase();
    subject_name.push((document.getElementById('Subject_List').value).toUpperCase());
    document.getElementById('Subject_List').value = " ";
    if (subject_name.length == 5) {
        obj = { Name: subject_name, class_name: Class_Value };
        test.push(obj);
        localStorage.setItem('CLASS_Value', JSON.stringify(test));
        subject_name = [];
        document.getElementById("jaiso").style.visibility = "hidden";
        document.getElementById('warn').innerHTML = " ";
    } else {
        document.getElementById('warn').innerHTML = '<br><br><br> Enter MINIMUM 5 Subject Then presss submit and to enter subjet always press + after Enter data'
    }
}
function Set_CLassData() {
    document.getElementById('warn').innerHTML = " ";
    document.querySelector('#Class_Name').value = " "
    document.getElementById("jaiso").style.visibility = " visible";
     subject = JSON.parse(localStorage.getItem('CLASS_Value'));
    data = []
    subject.forEach(element => {
        Obj_Class = {
            Subject_list: element.Name,
            Class_set: element.class_name,
            Student_data: [],
        }
        data.push(Obj_Class);
    });
    localStorage.setItem('Class_data', JSON.stringify(data));
    Show_ClassData();
}
const Show_ClassData =()=>{
    if('Class_data' in localStorage){
        const dataholder = JSON.parse(localStorage.getItem('Class_data'))
        dataholder.map((ele)=>{
            console.log(ele.Class_set);
            console.log(ele.Subject_list);
            document.querySelector('.showdata').innerHTML+=` <tr>
            <td>${ele.Class_set}</td>
            <td>${ele.Subject_list}</td>
            <td>${ele.Student_data.length}</td>
          </tr><br>`
        })
        
    }
};
Show_ClassData();