
var flag = true;

function checkNumeric(evt){
  var flag = true; 
  var charCode = (evt.which) ? evt.which : event.keyCode;
  var myel = document.activeElement;
  var cursor = getSelectionStart(myel);
  var indexPos = 0;
  if (myel.value.indexOf(".")> -1) {
    indexPos = myel.value.indexOf(".");
    flag = false;
  }  
  if (charCode == 46 && flag){ 
    return true
  }else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }else {
    if (flag){
    return true;
    }else if (cursor <= indexPos){
    return true;    
    }else if (myel.value.length - indexPos > 2){
    return false;
    }else{
    return true;
    }
  } 
}

function checkInteger(evt){
  var charCode = (evt.which) ? evt.which : event.keyCode;
  var myel = document.activeElement;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }else {
    return true;
  }
}

function checkAlphaNumeric(evt){
  var charCode = (evt.which) ? evt.which : event.keyCode       
  if (charCode == 46 || charCode == 32 || charCode == 40 || charCode ==41 ||charCode == 47 ||charCode == 45 || charCode == 44 || charCode == 95) {
    return true;
  }else if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 65 || charCode > 90)&& (charCode < 97 || charCode > 122)) {
    return false;
  }else {
    return true;
  }
}

function checkAlphaNumericSpace(evt){
  var charCode = (evt.which) ? evt.which : event.keyCode
  if (charCode == 46 || charCode == 40 || charCode ==41 ||charCode == 47 ||charCode == 45 || charCode == 44 || charCode == 95) {
    return true;
  } else if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 65 || charCode > 90)&& (charCode < 97 || charCode > 122)) {
    return false;
  }else {
    return true;
  }

}

function checkSpecialAlphaNumeric(evt){   
  var charCode = (evt.which) ? evt.which : event.keyCode         
  if (charCode == 32 || charCode == 95) { //charCode == 91 || charCode == 93
    return true;
  }else if (charCode ==40 || charCode==41) { //charCode >= 38 && charCode <= 41
    return true;
  }else if (charCode >= 44 && charCode <= 46) {  
    return true;        
  }else if (charCode == 164 || charCode == 165){
    return true;
  }else if (charCode > 31 && (charCode < 48 || charCode > 57)&& (charCode < 65 || charCode > 90)&& (charCode < 97 || charCode > 122)) {
    return false;
  }else {
    return true;
  }

}

function checkSpecialAlphaNumericDashUn(evt){ // Alphanumeric, slash, dash
  var charCode = (evt.which) ? evt.which : event.keyCode
  if (charCode == 95) {
    return true;
  }else if (charCode==45) { 
    return true;
  }
  else if (charCode > 31 && (charCode < 48 || charCode > 57)&& (charCode < 65 || charCode > 90)&& (charCode < 97 || charCode > 122)) {
    return false;
  }else {
    return true;
  }

}

function getSelectionStart(o) {
	if (o.createTextRange) {
		var r = document.selection.createRange().duplicate()
		r.moveEnd('character', o.value.length)
		if (r.text == '') return o.value.length
		return o.value.lastIndexOf(r.text)
	} else return o.selectionStart
}

function textarealength(data,length){
    if (data.value.length > length){
        data.value = data.value.substring(0,length);
    }
}

function checkSpecialChar(evt){ // Alphanumeric, slash, dash ,() 
  var charCode = (evt.which) ? evt.which : event.keyCode
  if (charCode == 95) {
    return true;
  }else if (charCode==45) {
    return true;
  }
  else if(charCode ==40 && charCode == 41){
      return true;
  }
  else if (charCode > 31 && (charCode < 48 || charCode > 57)&& (charCode < 65 || charCode > 90)&& (charCode < 97 || charCode > 122)) {
    return false;
  }else {
    return true;
  }

}
