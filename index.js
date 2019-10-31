
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

function printEmployee(employeeDatabase){
    for (employee of employeeDatabase){
        $('#users').append(
            `<tr id='row_${employee["id"]}'>
                <td id="" ><img src = "https://js-tutorials.com/demos/angular_smarttable_add_edit_demo/user.jpg" class = "img-fluid img-thumbnail" style = "max-width:50px"></td>
                <td id="" >${employee["employee_name"]}</td>
                <td id="" >${employee["employee_salary"]}</td>
                <td id="" >${employee["employee_age"]}</td>
                <td id="" ><div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <button class="btn btn-info" type="button" name="options" data-id="${employee["id"]}" data-toggle="modal" data-target="#viewDataModal" onclick="viewEmployee(${employee["id"]})"> <i class="fas fa-search"></i> </button>
                    <button class="btn btn-light" type="button" name="options" data-id="${employee["id"]}" data-toggle="modal" data-target="#modifyDataModal")"> <i class="fas fa-pencil-alt"></i></button>
                    <button class="btn btn-danger" type="button" name="options" data-id="${employee["id"]}}" onclick="deleteEmployee(${employee["id"]})"> <i class="fas fa-trash-alt"></i> </button>
                </td>
                <td id="" ><input type="hidden" value="${employee["id"]}"</td>
            </tr>
        `);
    }
    //Pagination:
    paginate();
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

function modifyEmployee(employeeId){
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
            "success" : (data)  => {/*let tr =  stringModifiedEmployee; tr.append()*/},
            "error" : (error)  => {console.log("put KO")}
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


function addEmployee(){
    let newEmployee = {
        "name":$("#newEmployeeName").val(), 
        "salary":$("#newEmployeeSalary").val(), 
        "age":$("#newEmployeeAge").val(),
        "id":"", 
    };
        $.ajax({
            "type" : "POST", 
            "url" : "http://dummy.restapiexample.com/api/v1/create",
            "data" : JSON.stringify(newEmployee),
            "dataType" : "json",
            "headers" : {
            "Content-Type": "application/json",
            "X-Requested-With" : "XMLHttpRequest"
            },
            "success" : (data)  => {console.log("post OK")},
            "error" : (error)  => {console.log("post KO")}
        });
        console.log(newEmployee);
    printEmployee(newEmployee);
    return true;
}

function main(){
    $.ajax({
        "type" : "GET", 
        "url" : "http://dummy.restapiexample.com/api/v1/employees",
        "dataType" : "json",
        "headers" : {"Content-Type": "application/json"},
        "success" : (database) => {printEmployee(database)},
        "error" : (error) => {console.log("first get KO")}
    });

}


main();