var studentName = document.getElementById('studentName'),
    studentEmail = document.getElementById('studentEmail'),
    studentId = document.getElementById('studentId'),
    PhoneNumber = document.getElementById('phoneNumber'),
    paidValue = document.getElementById('paidValue'),
    residulvalue = document.getElementById('residulvalue'),
    reservedCourse = document.getElementById('reservedCourse');
var btnToAdd = document.getElementById('btn-add'),
    btnToReset = document.getElementById('btn-reset'),
    messageError = document.getElementsByClassName('message-error');

var total = 3500;
var selectedRow = null;

function readFormData() {
    var student = {
        name: studentName.value,
        email: studentEmail.value,
        id: studentId.value,
        PhoneNumber: PhoneNumber.value,
        paidValue: `${paidValue.value}$`,
        residulvalue: residulvalue.value,
        course: reservedCourse.value
    }

    return student;
}


///////////// Working on  Buttons (Events)/////////////

document.getElementById('btn-update').onclick = function(e) {
    e.preventDefault();
    var formData = readFormData();
    if (selectedRow != null && checkInputs()) {
        updateRecord(formData);
    } else {
        return false;
    }
}

btnToAdd.onclick = function(e) {
    onFormsubmit();
    e.preventDefault();;


}
btnToReset.onclick = function() {
    reset();
}



reservedCourse.onchange = function() {
    theTotal();
    residulvalue.value = `${total - paidValue.value}$`;
    paidValue.value = '';
}
paidValue.onkeyup = function() {
    residulvalue.value = `${total - paidValue.value}$`;

}


var testing = [];

function insertNewRecord(data) {

    var table = document.getElementById('tableData').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.id;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.PhoneNumber;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.paidValue;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.residulvalue;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.course;
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = `<i onclick = "deleting (this)"  class="fas fa-trash-alt "></i> <i onclick = "restoreData (this)"  class="fas fa-pen"></i>`;

    //////////// Working On Search Input ////////////

    testing.push(cell1);
    var search = document.getElementById('search');

    function searching() {
        var searchingValue = search.value.toUpperCase();
        for (i = 0; i < testing.length; i++) {
            if ((testing[i].innerHTML).toUpperCase().indexOf(searchingValue) > -1) {
                testing[i].parentElement.style.display = "";
            } else {
                testing[i].parentElement.style.display = "none";
            }
        }
    }
    search.onkeyup = function() {
        searching();
    }
}
////////////// editing   The Td /////////////////
function restoreData(td) {
    selectedRow = td.parentElement.parentElement;
    studentName.value = selectedRow.cells[0].innerHTML;
    studentEmail.value = selectedRow.cells[1].innerHTML;
    studentId.value = selectedRow.cells[2].innerHTML;
    PhoneNumber.value = selectedRow.cells[3].innerHTML;
    paidValue.value = selectedRow.cells[4].innerHTML;
    residulvalue.value = selectedRow.cells[5].innerHTML;
    reservedCourse.value = selectedRow.cells[6].innerHTML;
    theTotal();
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.id;
    selectedRow.cells[3].innerHTML = formData.PhoneNumber;
    selectedRow.cells[4].innerHTML = formData.paidValue;
    selectedRow.cells[5].innerHTML = formData.residulvalue;
    selectedRow.cells[6].innerHTML = formData.course;
}
///////////////////Delete tr /////////////////
function deleting(td) {
    var question = confirm("Are You Sure , You Want To Delete Row ? ");
    if (question) {
        td.parentElement.parentElement.remove();
    } else {
        return false;
    }
}
///////////Check Inputs /////////////////
function checkInputs() {
    if (studentName.value == '' || studentEmail.value == '' || studentId.value == '' || PhoneNumber.value == '' || paidValue.value == '' || residulvalue.value == '' || reservedCourse.value == '') {
        return false;
    } else {
        return true;
    }
}
//////////////////////////Empety the values To Add new One /////////////////
function reset() {
    studentName.value = '';
    studentEmail.value = '';
    studentId.value = '';
    PhoneNumber.value = '';
    paidValue.value = '';
    residulvalue.value = '';
    reservedCourse.value = '';
    selectedRow = null;
}
//////////////// Define The Total Value Of Cources /////////////
function theTotal() {
    if (reservedCourse.value == 'FrontEnd Course' || reservedCourse.value == 'BackEnd Course' || reservedCourse.value == 'IT Course') {
        total = 1750;
    } else {
        total = 3500;
    }
    paidValue.setAttribute('placeholder', `Paid Value (Total is ${total}$)`);
}

function onFormsubmit() {

    if (checkInputs()) {
        var formData = readFormData();
        insertNewRecord(formData);
    } else {
        return false
    }
}
console.log(document.getElementById('myVideoNow'));
setInterval(() => {
    changeVideo();
}, 3000);
//////////////////////Error Message ///////////////
$(document).ready(function() {
    /////////////////Calculating The Residual /////////////
    $('.paid').keyup(function() {
            if (isNaN($(this).val())) {
                $(this).val('');
                $('.residual').val('');
                $('.message-error').text('Enter Only Number , Please ...').slideDown(500).delay(700).slideUp(700);
            } else if ($(this).val() > total) {
                $(this).val('');
                $('.residual').val('');
                $('.message-error').text(`Please Enter Number less Than ${total}`).slideDown(500).delay(700).slideUp(700);
            }
        })
        //////////////Check on The Name ///////////////////////
    $('.studentName').on('keyup', function(e) {
        var studentNameValue = $(this).val();
        if ($(this).val().match(/^\d/)) {
            $('.message-error').text('Full Name should Starts With Character').slideDown(500).delay(700).slideUp(700);
            $('.studentName').val('');
        } else if (studentNameValue[0].charCodeAt(0) >= 95) {
            $('.message-error').text('Full Name should Starts With Capital Character').slideDown(500).delay(2000).slideUp(700);
            $('.studentName').val('');
        }
    });
    $('.studentEmail').on('blur', function() {
        if (!$(this).val().includes('@') || $(this).val().slice(-4) != '.com') {
            console.log($(this).slice(-4));
            $('.message-error').text(`Email Can't be Empty and  Should Contains '@' and Ends With '.com'`).slideDown(500).delay(2000).slideUp(700);
            $('.studentEmail').val('');
        }
    });
    $('.toggleTable').on("click", function() {
        $('.tableContents').toggle();;
        $(this).toggleClass('show hide')
        if ($(this).hasClass('show')) {
            $(this).text('show Table');
        } else {
            $(this).text('Hide Table');
        }
    });
});