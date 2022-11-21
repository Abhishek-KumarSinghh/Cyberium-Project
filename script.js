
window.onload = function(){
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const surname = document.getElementById('surname');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const chkbox = document.getElementById('chkbox');
    const feedback = document.getElementById('feedback');
   
    }
    
    var genderS = document.getElementsByName('gender');
    for (var i = 0, length = genderS.length; i < length; i++) {
        if (genderS[i].checked) {
          var gen = genderS[i].value;
          break;
        }
      }
    
    //more email validate
    const isEmail = (emailVal) => {
        var atSymbol = emailVal.indexOf('@');
        if(atSymbol < 1) return false;
        var dot = emailVal.lastIndexOf('.');
        if(dot <= atSymbol + 2) return false;
        if(dot === emailVal.length - 1) return false;
        return true;
    }
    
    
    // username
    const usernamev = () => {
        const usernameVal = username.value.trim();
        if(usernameVal === "") {
            setErrorMsg(username, 'username cannot be blank');
            
        } else if (!/^[a-zA-Z]*$/g.test(usernameVal) ) {
            setErrorMsg(username, 'only alphabets allow');
        } else if (usernameVal.length >= 15 ) {
            setErrorMsg(username, 'username max 15 char');
        } else if (!(/^\S{1,}$/.test(usernameVal))) {
            setErrorMsg(username, 'Name cannot contain whitespace');
    
        }else{
            setSuccessMsg(username);
        }
      
        const str = usernameVal;
        const str2 = str.charAt(0).toUpperCase() + str.slice(1);
        document.getElementById("username").value = str2
    }
    
    
    
    //lastname
    const surnamev = () => {
        const surnameVal = surname.value.trim();
        if(surnameVal === "") {
            setErrorMsg(surname, 'surname cannot be blank');
        } else if (!(/^\S{1,}$/.test(surnameVal))) {
            setErrorMsg(surname, 'Name cannot contain whitespace');
        } else if (!/^[a-zA-Z]*$/g.test(surnameVal) ) {
            setErrorMsg(surname, 'only alphabets allow');
        } else if (surnameVal.length >= 15) {
            setErrorMsg(surname, 'surname max 15 char');
        }else{
            setSuccessMsg(surname);
        } 
        const str = surnameVal;
        const str2 = str.charAt(0).toUpperCase() + str.slice(1);
        document.getElementById("surname").value = str2
    }
    
    //email
    const emailv = () => {
        const emailVal= email.value.trim();
        if(emailVal === "") {
            setErrorMsg(email, 'email cannot be blank');
        } else if (!isEmail(emailVal)) {
            setErrorMsg(email, 'Not a valid Email');
        } else if (emailVal.length >= 25) {
            setErrorMsg(email, 'email max 25 char');
        }
        else{
            setSuccessMsg(email);
        } 
    }
    
        //phone
    const phonev = () => {
        const phoneVal = phone.value.trim();   
        if(phoneVal === "") {
            setErrorMsg(phone, 'phone number cannot be blank');
        } else if (phoneVal.length != 10) {
            setErrorMsg(phone, 'Not a valid phone number');
        }else{
            setSuccessMsg(phone);
        }
    }
    
        // feedback
    const feedbackv = () => {
        const feedbackVal = feedback.value.trim(); 
        if(feedbackVal === "") {
            setErrorMsg(feedback, 'feedback cannot be blank');
        }else if (feedbackVal.length >= 30 ) {
            setErrorMsg(feedback, 'feedback max 30 char');
        }else{
            setSuccessMsg(feedback);
        }
    }
    
    //checkbox
    const chkboxv = () => {
        if(! chkbox.checked){
            setErrorMsg(chkbox, 'please click on box');
        }else{
            setSuccessMsg(chkbox);
        }
    }
    
       //validate gender
    const genderv = () => {
        if ( ( male.checked == false ) && ( female.checked == false ) ){
            setErrorMsg(female,'please select gender');
        }else{
            setSuccessMsg(male);
        }
    }
     
    
   
    
    var selectedRow = null
    
    function onFormSubmit() {
        if (validate()) {
            var formData = readFormData();
            if (selectedRow == null){
                insertNewRecord(formData);
            }
            else
                updateRecord(formData);
            resetForm();
        }
    }
    
    const sendData = (usernameVal, surnameVal,emailVal,phoneVal,feedbackVal,gen, sRate, count) => {
        if (sRate === count){
    
    
    
            Swal.fire({
                title: ''+usernameVal+ "   " + surnameVal,
                icon: 'info',
                html:
                  ' <b>Email - </b>   ' + emailVal +'  <br>  <b>Phone No. - </b>  ' +phoneVal +' <br>  <b> Gender - </b>  ' +gen ,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Submit it!',
                footer: '<b>Please check your all details.</b> '
                
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Submitted!',
                    'Your data has been submitted.'+
                    ' <br> <b> Thank you </b>',
                    'success'
                  )
                }
  
              });
        }
    }
    
    //for final data validation
    const successMsg = (usernameVal,surnameVal,emailVal,phoneVal,feedbackVal,gen) => {
        let formCon = document.getElementsByClassName('form-control');
        var count = formCon.length - 1;
        for(var i = 0; i < formCon.length; i++){
            if(formCon[i].className === "form-control success") {
                var sRate = 0 + i;
                console.log(sRate);
                sendData(usernameVal,surnameVal,emailVal,phoneVal,feedbackVal,gen, sRate, count);
            }else{
                return false;
            }
        }
    }
 
    
    function validate() {
    
        isValid = true;
        if ((document.getElementById("username").value == "") ||
        (document.getElementById("surname").value == "") ||
        (document.getElementById("email").value == "") ||
        (document.getElementById("phone").value == "") ||
        (document.getElementById("feedback").value == "") ||
        (! chkbox.checked) || 
        ( ( male.checked == false ) && ( female.checked == false ) )) {
            isValid = false;
            
        } else {
            isValid = true;
    
        }
        
    
        const usernameVal = username.value.trim();
        const surnameVal = surname.value.trim();
        const emailVal= email.value.trim();
        const phoneVal = phone.value.trim();    
        const feedbackVal = feedback.value.trim();
       
        var genderS = document.getElementsByName('gender');
        for (var i = 0, length = genderS.length; i < length; i++) {
            if (genderS[i].checked) {
              
              var gen = genderS[i].value;
              break;
           
            }
          }
      
       
        usernamev()
        surnamev();
        emailv();
        phonev();
        feedbackv();
        chkboxv();
        genderv();

        successMsg(usernameVal,surnameVal,emailVal,phoneVal,feedbackVal,gen);
        return isValid;
    }
    
    function setErrorMsg(input,errormsgs) {
        
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className= "form-control error";
        small.innerText = errormsgs;
    }
    function setSuccessMsg(input) {
        const formControl = input.parentElement;
        formControl.className= "form-control success";
    }
    
    function readFormData() {
        var genderS = document.getElementsByName('gender');
        for (var i = 0, length = genderS.length; i < length; i++) {
            if (genderS[i].checked) {
              var gen = genderS[i].value;
              break;
            }
          }
            var formData = {};
            formData["usernameVal"] = document.getElementById("username").value;
            formData["surnameVal"] = document.getElementById("surname").value;
            formData["emailVal"] = document.getElementById("email").value;
            formData["phoneVal"] = document.getElementById("phone").value;
            formData["feedbackVal"] = document.getElementById("feedback").value;
            formData["gen"] = gen;
            return formData;
    }
    
    function insertNewRecord(data) {
        var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.usernameVal;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.surnameVal;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.emailVal;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.phoneVal;
        cell5 = newRow.insertCell(4);
        cell5.innerHTML = data.feedbackVal;
        cell6 = newRow.insertCell(5);
        cell6.innerHTML = data.gen;
        cell7 = newRow.insertCell(6);
        cell7.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                           <a onClick="onDelete(this)">Delete</a>`;
    }
    
    function resetForm() {
       
        document.getElementById("form").reset();
      
    
        const boxes = document.querySelectorAll('.form-control');
      
    
        boxes.forEach(box => {
          // ✅ Remove class from each element
          box.classList.remove('success');
        });
       
        selectedRow = null;
    }
    
    function onEdit(td) {
        selectedRow = td.parentElement.parentElement;
        document.getElementById("username").value = selectedRow.cells[0].innerHTML;
        document.getElementById("surname").value = selectedRow.cells[1].innerHTML;
        document.getElementById("email").value = selectedRow.cells[2].innerHTML;
        document.getElementById("phone").value = selectedRow.cells[3].innerHTML;
        document.getElementById("feedback").value = selectedRow.cells[4].innerHTML;
        var genderS = document.getElementsByName('gender');
        for (var i = 0, length = genderS.length; i < length; i++) {
            if (genderS[i].value == selectedRow.cells[5].innerHTML) {
                genderS[i].checked = true;
                break;
            }
          }
        document.getElementsByName("gender").checked = selectedRow.cells[5].innerHTML;
    
        const boxes = document.querySelectorAll('.form-control');
        boxes.forEach(box => {
            // ✅ Remove class from each element
            box.classList.remove('error');
          
            // ✅ Add class to each element
            box.classList.add('success');
          });
          chkboxv();
        //   resetForm();
    }
    
    function updateRecord(formData) {
        selectedRow.cells[0].innerHTML = formData.usernameVal;
        selectedRow.cells[1].innerHTML = formData.surnameVal;
        selectedRow.cells[2].innerHTML = formData.emailVal;
        selectedRow.cells[3].innerHTML = formData.phoneVal;
        selectedRow.cells[4].innerHTML = formData.feedbackVal;
        selectedRow.cells[5].innerHTML = formData.gen;
    }
    
    function onDelete(td) {
        if (confirm('Are you sure to delete this record ?')) {
            row = td.parentElement.parentElement;
            document.getElementById("employeeList").deleteRow(row.rowIndex);
            resetForm();
        }
    }
    