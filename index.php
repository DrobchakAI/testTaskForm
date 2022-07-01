<?
session_start();

?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <title></title>
  <link href="src/style.css" rel="stylesheet" />
  <script src="src/script.js"></script>
  <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"></script>

  
</head>
<body>
    <header>
        <div class="title">
            Тестовое задание
        </div>
    </header>
    <script>
        ymaps.ready(init);
    </script>
    <div class="content">
        
        <form method="post" action='/logic/' enctype='multipart/form-data' class='form_on_main' onsubmit="formSubmit(this,event)" novalidate>
        <div class="map" id="map">
            
        </div>
            <div class="status">
                <div class="text"></div>
                <div class="button" onclick="this.parentNode.classList.remove('active');">Закрыть</div>
            </div>            

            <input type="hidden" name='formName' value='callbackForm'>
            <input type="hidden" name='action' value='send'>
            <input type="hidden" name='sessid' value='<?=session_id()?>'>
            <input type="text" name="FIRST_NAME" data-check='y' style="opacity:0;z-index:-1;width:1px;position:absolute">
            <input type="text" name="LAST_NAME" data-check='y' style="opacity:0;z-index:-1;width:1px;position:absolute">
            <div class="title">
                Форма обратной связи
            </div>
            <div class="block">
                <div class="input-wrapper">
                    <input type="text" placeholder=' ' name='Name' data-only-words maxlength=25>
                    <div class="placeholder">
                        Имя
                    </div> 
                    <div class="error"></div>       
                </div>

                <div class="input-wrapper">
                    <input type="text" placeholder=' ' name='Phone' required data-phone-mask="+_(___)___-__-__">
                    <div class="placeholder">
                        Телефон
                    </div>        
                    <div class="error"></div>       
                </div>
            </div>
            <div class="block">
                <div class="input-wrapper">
                    <input type="text" placeholder=' ' name='Address' required id='address_suggest'>
                    <div class="placeholder">
                        Адрес
                    </div>    
                    <div class="error"></div>
                </div>
            </div>
            <div class="block">
                <div class="input-wrapper">
                    <input type="text" placeholder=' ' name='AddressMap' required id='address_suggest_map'>
                    <div class="placeholder">
                        Адрес 2
                    </div>     
                    <div class="smallbutton" onclick='openMap(this)'>Карта</div> 
                    <div class="error"></div>  
                </div>
            </div>
            <div class="block">
                <div class="input-wrapper">
                    <button data-loading-text='Идет отправка'>Отправить</button>
                </div>
            </div>

        </form>
    </div>
    <footer>
        <div class="info">
            Разработанно в 2022г. Дробчак Алексеем
        </div>
    </footer>
</body>
</html>