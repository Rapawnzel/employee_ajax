
function lookFor() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("lookfor");
    filter = input.value.toUpperCase();
    table = document.getElementById("employeeTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

function paginate(){
    
}

function printEmployee(employee){
    $('#users').prepend(
        `<tr id='row_${employee["id"]}'>
            <td id="" ><img src = "https://js-tutorials.com/demos/angular_smarttable_add_edit_demo/user.jpg" class = "img-fluid img-thumbnail" style = "max-width:50px"></td>
            <td id="" >${employee["employee_name"]}</td>
            <td id="" >${employee["employee_salary"]}</td>
            <td id="" >${employee["employee_age"]}</td>
            <td id="" ><div class="btn-group btn-group-toggle" data-toggle="buttons">
                <button class="btn btn-info" type="button" name="options" data-id="${employee["id"]}" data-toggle="modal" data-target="#viewDataModal" onclick="viewEmployee(${employee["id"]})"> <i class="fas fa-search"></i> </button>
                <button class="btn btn-light" type="button" name="options" data-id="${employee["id"]}" data-toggle="modal" data-target="#modifyDataModal"onclick="modifyEmployee(${employee["id"]})"> <i class="fas fa-pencil-alt"></i></button>
                <button class="btn btn-danger" type="button" name="options" data-id="${employee["id"]}}" onclick="deleteEmployee(${employee["id"]})"> <i class="fas fa-trash-alt"></i> </button>
            </td>
            <td id="" ><input type="hidden" value="${employee["id"]}"</td>
        </tr>
    `);
}

function deleteEmployee(employeeId){
    let option = confirm("Are you sure you want to delete this?");
    if (option == true) {
        $.ajax({
            "type" : "DELETE", 
            "url" : `http://dummy.restapiexample.com/api/v1/delete/${employeeId}`,
            "dataType" : "json",
            "headers" : {"Content-Type": "application/json"},
            "success" : (data) => {
                let tr =  $(`#row_${employeeId}`); tr.remove()},
            "error" : (error) => {console.log("delete KO")}
        })
    }
}

function showInModal (employeeObject){
    $("#modEmployeeName").val(employeeObject[`employee_name`]);
    $("#modEmployeeSalary").val(employeeObject[`employee_salary`]);
    $("#modEmployeeAge").val(employeeObject[`employee_age`]);
}


function modifyEmployee(employeeId){

    $.get({
        "url" : `http://dummy.restapiexample.com/api/v1/employee/${employeeId}`,
        "success" : (data) => {showInModal(data)},
        "dataType" : "json"
        });

    $("#modifyButton").click(function() {
        let modifiedEmployee = {
            "name":$("#modEmployeeName").val(), 
            "salary":$("#modEmployeeSalary").val(), 
            "age":$("#modEmployeeAge").val(),
        };
    
        let stringModifiedEmployee = JSON.stringify(modifiedEmployee);
        $.ajax({
            "type" : "PUT", 
            "url" : `http://dummy.restapiexample.com/api/v1/update/${employeeId}`,
            "data" : stringModifiedEmployee,
            "dataType" : "json",
            "headers" : {
            "Content-Type": "application/json",
            "X-Requested-With" : "XMLHttpRequest"
            },
            "success" : (data)  => {$('#users').empty(); main();},
            "error" : (error)  => {console.log("put KO")}
        });
    });
    return true;
}

function printViewEmployee (employeeObject){
    $(`#viewModalName`).html(employeeObject["employee_name"]);
    $(`#viewModalAge`).html(employeeObject["employee_age"]);
    $(`#viewModalSalary`).html(employeeObject["employee_salary"]);
}


function viewEmployee(idEmployee){
    $.get({
        "url" : `http://dummy.restapiexample.com/api/v1/employee/${idEmployee}`,
        "success" : (data) => {printViewEmployee(data)},
        "dataType" : "json"
        });
};


function printAllEmployees(employeeDatabase){
    for (employeeObject of employeeDatabase){
       printEmployee(employeeObject);
    }
    paginate();
}


function addEmployee(){
    let newEmployee = {
        "name":$("#newEmployeeName").val(), 
        "salary":$("#newEmployeeSalary").val(), 
        "age":$("#newEmployeeAge").val(), 
    };

    let newEmployeeTable = {
        "id":"",
        "employee_name":$("#newEmployeeName").val(),
        "employee_salary":$("#newEmployeeSalary").val(),
        "employee_age":$("#newEmployeeAge").val(),
        "profile_image":""
    } 
        $.ajax({
            "type" : "POST", 
            "url" : "http://dummy.restapiexample.com/api/v1/create",
            "data" : JSON.stringify(newEmployee),
            "dataType" : "json",
            "headers" : {
            "Content-Type": "application/json",
            "X-Requested-With" : "XMLHttpRequest"
            },
            "success" : (data)  => {printEmployee(newEmployeeTable)},
            "error" : (error)  => {console.log("post KO")}
        });
    return true;
}

function main(){
    $.ajax({
        "type" : "GET", 
        "url" : "http://dummy.restapiexample.com/api/v1/employees",
        "dataType" : "json",
        "headers" : {"Content-Type": "application/json"},
        "success" : (database) => {printAllEmployees(database)},
        "error" : (error) => {console.log("first get KO")}
    });

}


main();