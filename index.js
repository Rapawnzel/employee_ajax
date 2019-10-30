
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


function printEmployee(employeeDatabase){
    for (employee of employeeDatabase){
        $('#users').append(
            `<tr id=${employee["id"]}>
                <td id="" ><img src = "https://js-tutorials.com/demos/angular_smarttable_add_edit_demo/user.jpg" class = "img-fluid img-thumbnail" style = "max-width:50px"></div>
                <td id="" >${employee["employee_name"]}</div>
                <td id="" >${employee["employee_salary"]}</div>
                <td id="" >${employee["employee_age"]}</div>
                <td id="" ><div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-info">
                    <input type="radio" name="options" id="view" autocomplete="off"> <i class="fas fa-search"></i>
                    </label>
                    <label class="btn btn-light">
                    <input type="radio" name="options" id="modify" autocomplete="off"> <i class="fas fa-pencil-alt"></i>
                    </label>
                    <label class="btn btn-danger">
                    <input type="radio" name="options" id="delete" autocomplete="off"> <i class="fas fa-trash-alt"></i>
                    </label>
                </td>
            </tr>  
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