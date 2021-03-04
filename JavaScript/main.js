
document.getElementById("inputName").onblur = function(){
    if (!required(this)) {
        this.classList.add("is-invalid");
        this.focus();
    }
    else {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    }
}
//name emtpy validation//
function required (obj) {
    return obj.value ? true : false;
}

document.getElementById("inputDni").onblur = function (){
    if (!validateDni(this)) {
        this.classList.add("is-invalid");
        this.focus();
    }
    else {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid"); 
    }
}
//dni only numbers validation//
function validateDni(dni) {
    var numbers = /^[0-9]+$/;
    if (dni.value.match(numbers)){
        return true;
    }
    else {
        return false;
    }
}

document.getElementById("inputPhone").onblur = function (){
    if (!validatePhone(this, 14)){
        this.classList.add("is-invalid");
        this.focus();  
    }
    else {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    }
}

//phone lenght validation//
function validatePhone(tel, numlen){
    if (tel.value.length == numlen){
        return true;
    }
    else {
        return false;
    }
}

//email regex function//
function validateEmail(email){
    var mailcito = email.value 
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(mailcito)
}
document.getElementById("inputEmail").onblur = function (){
    if (!validateEmail(this)){
        this.classList.add("is-invalid");
        this.focus();
    }
    else {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    }
}
//phone mask/
document.getElementById("inputPhone").addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  });
//emable submit button after checking tos checkbox//
document.getElementById("toscheck").onclick = function(){
    document.getElementById("sendbtn").removeAttribute("disabled");
}
//Enable tos checkbox after reading tos modal//
document.getElementById("tosread").onclick = function(){
    document.getElementById("toscheck").removeAttribute("disabled");
} 

function validateForm(){
    var inputs = document.getElementsByTagName("input")
    var cont = 0
    for(i=0; i<inputs.length; i++){
        if (required(inputs.item(i))){
        cont++;
        } 
    }
   if (cont == 5) {
       return true;
   }
   else {
       return false;
   }
}


document.getElementById("sendbtn").onclick = function(){
    if (!validateForm()){
       toastr.error('Porfavor complete todos los campos requeridos', 'Error');
    }
    else {
        toastr.success('El formulario se ha enviado con exito', 'Success');
    }
}

    //1. Send button onclick validation


    $(function() {
        $.getJSON( "https://apis.datos.gob.ar/georef/api/provincias", function( data ) {
            $.each( data.provincias, function( key, obj) {
              $("#provincias").append("<option value='" + obj.id + "'>" + obj.nombre + "</option>" );
            });
          });
      
        $("#provincias").on("change", function(){
          $.getJSON( "https://apis.datos.gob.ar/georef/api/municipios?provincia=" + $(this).val(), function( data ) {
          $("#municipios").find('option').remove();
          $.each( data.municipios, function( key, obj) {
                $("#municipios").append("<option value='" + obj.id + "'>" + obj.nombre + "</option>" );
              });
           }); 
        });
    });