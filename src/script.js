let regexWords = /[^a-zA-ZА-Яа-яЁё-]/gi;

document.addEventListener("DOMContentLoaded", function(event) { 
    let inputsOnlyWords = document.querySelectorAll("[data-only-words]");
    inputsOnlyWords.forEach(element => {        
        element.addEventListener("input",function(event){
            allowOnlyWords(event.target);            
        });        
        element.addEventListener("change",function(event){
            validateWords(event.target);            
        });        
    });

    let inputsOnlyPhones = document.querySelectorAll("[data-phone-mask]");
    inputsOnlyPhones.forEach(element => {
        element.addEventListener("input",function(event){
            allowOnlyPhoneNumber(event);
        });        
        element.addEventListener("change",function(event){
            validatePhone(event.target);            
        });        
    });

    let inputsRequeired = document.querySelectorAll("input[required]");
    inputsRequeired.forEach(element => {          
        element.addEventListener("change",function(event){
            validateRequired(event.target);            
        });        
    });
  });

/**
 * Только слова и тире.
 * 
 * @param {*} element 
 * @returns 
 */
function allowOnlyWords(element)
{   
    element.value = element.value.replace(regexWords, '');    
}
/**
 * Только номер телефона.
 * 
 * @param {*} event 
 */
function allowOnlyPhoneNumber(event)
{
    mask(event.target,event);
}

/**
 * Маска для телефона.
 * 
 * 
 * @param {*} current 
 * @param {*} event 
 */
function mask(current, event) {

    let matrix = event.target.dataset.phoneMask,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = current.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;

    current.value = matrix.replace(/./g, function (a) {

        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
    
    if (event.type == "blur") {
        if (current.value.length == 2) current.value = ""
    } else setCursorPosition(current.value.length, current)
};

function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select()
    }
}
function validateRequired(input)
{
    error = input.value != "" ? "" : "Поле не может быть пустым";                    
    let parent = input.parentNode;
    let errorElement =  parent.querySelector(".error");
    if(errorElement)
    {
        if(errorElement.innerHTML == "")
        {
            errorElement.innerHTML = error;    
        }
        
    }    

    return error;
}

function validatePhone(input) {
    
    let regex = /^(\[0-9])?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

    error = regex.test(input.value) ? "" : "Формат телефона неверен";                
   
    let parent = input.parentNode;
    let errorElement =  parent.querySelector(".error");
    console.log(errorElement);
    if(errorElement)
    {        
        if(errorElement.innerHTML == "")
        {
            errorElement.innerHTML = error;    
        }
    }    

    return error;
}

function validateWords(input)
{
    
    error = regexWords.test(input.value) ? "" : "Допустимы только буквы и тире";     
    
    let parent = input.parentNode;
    let errorElement =  parent.querySelector(".error");
    if(errorElement)
    {
        if(errorElement.innerHTML == "")
        {
            errorElement.innerHTML = error;    
        }
    }    

    return error;
}

function formSubmit(form,event)
{    
    event.preventDefault();
    
    let inputs = form.querySelectorAll('input:not([type="hidden"])');
    let hasError = false;
    inputs.forEach(input => {
        if(input.required)
        {
            if(validateRequired(input) != "") hasError = true;            
        }
        if(input.dataset.phoneMask)
        {
            if(validatePhone(input) != "") hasError = true;
        }
        if(input.dataset.onlyWords)
        {
            if(validateWords(input) != "") hasError = true;
        }    
    });

    if(hasError)
    {
        return false;
    }

    
    form.classList.add("loading");
    let xhr = new XMLHttpRequest();
    xhr.open('POST', form.getAttribute('action'));
    xhr.send(new FormData(form));
    xhr.onload = function () {

        if (xhr.status === 200) {

        }

    };
}