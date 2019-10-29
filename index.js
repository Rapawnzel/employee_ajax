
function printEmployee(employeeDatabase){
    for (employee of employeeDatabase){
        $('#users').append(
            `<div class="row" id=${employee["id"]}>
            <div id="" class="col-2"><img src = "https://js-tutorials.com/demos/angular_smarttable_add_edit_demo/user.jpg" class = "img-fluid img-thumbnail" style = "max-width:50px"></div>
            <div id="" class="col-2">${employee["employee_name"]}</div>
            <div id="" class="col-2">${employee["employee_salary"]}</div>
            <div id="" class="col-2">${employee["employee_age"]}</div>
            <div id="" class="col-2"><div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label class="btn btn-primary active">
            <input type="radio" name="options" id="view" autocomplete="off"> <i class="fas fa-search"></i>
            </label>
            <label class="btn btn-light">
            <input type="radio" name="options" id="modify" autocomplete="off"> <i class="fas fa-pencil-alt"></i>
            </label>
            <label class="btn btn-danger">
            <input type="radio" name="options" id="delete" autocomplete="off"> <i class="fas fa-trash-alt"></i>
            </label>
        </div></div>
            </div>
            <hr>  
        `);
    }
    return true;
}

function eraseEmployee(){

}

function addEmployee(){
    let newEmployee = `[{"id":"","employee_name":${$("#newEmployeeName")},"employee_salary":${$("#newEmployeeSalary")},"employee_age":${$("#newEmployeeAge")},"profile_image":""}]`;
        $.ajax({
            "type" : "POST", 
            "url" : "https://cors-anywhere.herokuapp.com/https://employees3.free.beeceptor.com",
            "data" : JSON.stringify(newEmployee),
            "dataType" : "json",
            "headers" : {
            "Content-Type": "application/json",
            "X-Requested-With" : "XMLHttpRequest"
            },
            "success" : (data)  => {console.log(data)},
            "error" : (error)  => {console.log(error)}
        });
    printEmployee(newEmployee);
    return true;
}

function main(){
    $.ajax({
        "type" : "GET", 
        "url" : "https://cors-anywhere.herokuapp.com/https://employees3.free.beeceptor.com",
        "dataType" : "json",
        "headers" : {"Content-Type": "application/json"},
        "success" : (database) => {printEmployee(database)},
        "error" : (error) => {console.log(error)}
    });

}

$(document).ready(main());