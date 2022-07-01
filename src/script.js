document.addEventListener("DOMContentLoaded", function(event) { 
    let inputsOnlyWords = document.querySelectorAll("[data-only-words]");
    inputsOnlyWords.forEach(element => {        
        element.addEventListener("input",function(event){
            allowOnlyWords(event.target);            
        });                      
    });

    let inputsOnlyPhones = document.querySelectorAll("[data-phone-mask]");
    inputsOnlyPhones.forEach(element => {
        element.addEventListener("input",function(event){
            allowOnlyPhoneNumber(event);
        });        
        element.addEventListener("blur",function(event){
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
    let regex = /[^a-zA-ZА-Яа-яЁё-]/gi;
    element.value = element.value.replace(regex, '');    
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
}

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

/**
 * Установка текста ошибки.
 * 
 * @param {*} input 
 * @param {*} errorText 
 */
function setInputError(input,errorText)
{
    let parent = input.parentNode;
    let errorElement =  parent.querySelector(".error");
    if(errorElement)
    {      
        errorElement.innerHTML = errorText;
    }    
}
/**
 * Очистка текста ошибки.
 * 
 * @param {*} input 
 */
function clearError(input)
{
    let parent = input.parentNode;
    let errorElement =  parent.querySelector(".error");
    if(errorElement)
    { 
        errorElement.innerHTML = "";
    }
}
/**
 * Проверка поля на пустоту.
 * 
 * @param {*} input 
 * @returns 
 */
function validateRequired(input)
{
    let errorText =  "Поле не может быть пустым";
    error = input.value != "" ? "" : errorText;                    
    setInputError(input,error);
    return error;
}
/**
 * Валидация поля по телефонной маске.
 * 
 * @param {*} input 
 * @returns 
 */
function validatePhone(input) {
    
    let errorText =  "Формат телефона неверен";
    let regex = /^[\+]?([0-9])?[\s\-]?\(?[0-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    error = regex.test(input.value) ? "" : errorText;                
    setInputError(input,error);   
    return error;
}
/**
 * Отправка формы.
 * 
 * @param {*} form 
 * @param {*} event 
 * @returns 
 */
function formSubmit(form,event)
{   
    let formData = new FormData();

    let status = form.querySelector(".status");
    status.classList.remove("active");
    status.classList.remove("success");
    status.classList.remove("error");
    status.querySelector(".text").innerHTML = "";

    event.preventDefault();

    let inputs = form.querySelectorAll('input:not([type="hidden"])');
    let hasError = false;
    let preparedInputs = [];
    inputs.forEach(input => {

        clearError(input);

        if(input.dataset.check == 'y')
        {
            return;
        }
        let inputInfo = {};

        if(input.required)
        {
            if(validateRequired(input) != "") hasError = true;            
        }
        if(input.dataset.phoneMask)
        {
            if(validatePhone(input) != "") hasError = true;

            inputInfo.phoneMask = true;
        }
        if(input.dataset.onlyWords)
        {
            if(validateWords(input) != "") hasError = true;

            inputInfo.onlyWords = true;
        }    
    
        inputInfo.name = input.name;
        inputInfo.maxlength = input.getAttribute("maxlength");
        inputInfo.value = input.value;
        inputInfo.required = input.required;
        preparedInputs.push(inputInfo);
    });

    if(hasError)
    {
        return false;
    }

    let systemInputs = form.querySelectorAll('input[type="hidden"]');7
    systemInputs.forEach(input=>{
        formData.append(input.name,input.value);
    });

    formData.append("formData",JSON.stringify(preparedInputs));
    
    form.classList.add("loading");
    let xhr = new XMLHttpRequest();


    setTimeout(()=>{
        xhr.open('POST', form.getAttribute('action'));
        xhr.send(formData);
        xhr.onload = function () {
    
            if (xhr.status === 200) {
                let result = JSON.parse(xhr.responseText);
                form.classList.remove("loading");
                if(result.Status)
                {
                    inputs.forEach(input => {
                        input.value = "";
                    })
    
                    status.classList.add("active");
                    status.classList.add("success");
                    status.querySelector(".text").innerHTML = "Успешно отправлено!";
                }else{
                    status.classList.add("active");
                    status.classList.add("error");
                    status.querySelector(".text").innerHTML = "Произошла ошибка!";    
                }            
            }else{
                status.classList.add("active");
                status.classList.add("error");
                status.querySelector(".text").innerHTML = "Произошла ошибка!";
            }
    
        };
    },1000)
    
}

/**
 * Открытия модалки с картой.
 * 
 * @param {*} element 
 */
function openMap(element)
{
    let mapContainer = element.closest("form").querySelector("#map");
    if(mapContainer)
    {
        mapContainer.classList.add("active");
    }
}
/**
 * Закрытие модалки с картой.
 * 
 */
function closeMap()
{
    let mapContainer = document.querySelector("form").querySelector("#map");
    if(mapContainer)
    {
        mapContainer.classList.remove("active");
    }
}
/**
 * Инициализация yandex карты.
 * 
 */
function init() {
    new ymaps.SuggestView('address_suggest');

    myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
        
    });

    let exitButton = new ymaps.control.Button(
        {
            data: {                      
                content: "Выйти",                      
            },
        }
    );
    exitButton.events.add("click",function(){closeMap()});
    myMap.controls.add(exitButton, {float: 'right'});


    myPlacemark = null;
    chooseButton = null;
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
            myPlacemark.events.add('click', function () {
                getAddress(myPlacemark.geometry.getCoordinates(),true);
            });
        }
        if(!chooseButton)
        {
            chooseButton = new ymaps.control.Button(
                {
                    data: {                      
                        content: "Выбрать",                      
                    },
                }
            );

            chooseButton.events.add('click',function(){
                getAddress(coords,true);
            })
        }        
        myMap.controls.add(chooseButton);
        
        
    });

    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'г. Москва Шереметьевская ул 179'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    function getAddress(coords,withSelect) {
        myPlacemark.properties.set('iconCaption', 'г. Москва Шереметьевская ул 179 ');
        
        if(withSelect)
        {
            let input = document.querySelector("form").querySelector("#address_suggest_map");
            input.value =  "г. Москва Шереметьевская ул 179";
            clearError(input);
            closeMap();
        }
        
        /**
         * Ниже закомментирован код поиска адреса по координатам. 
         * Так как сайт разрабатывался на локальном сервере без доступного домена, работа данного блока невозможна без ключа API от yandex.
         * А ключ невозможно получить без домена.
         *                 
         */

        // ymaps.geocode(coords).then(function (res) {
        //     var firstGeoObject = res.geoObjects.get(0);

        //     myPlacemark.properties
        //         .set({
                    
        //             iconCaption: [
                        
        //                 firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),                        
        //                 firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
        //             ].filter(Boolean).join(', '),

        //             balloonContent: firstGeoObject.getAddressLine()
        //         });

        //         input.value = firstGeoObject.getAddressLine()
        // });
    }
}