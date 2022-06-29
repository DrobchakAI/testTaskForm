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
</head>
<body>
    <header>
        <div class="title">
            Тестовое задание
        </div>
    </header>
    <div class="content">
        <form method="post" action='/logic/' enctype='multipart/form-data' class='form_on_main' onsubmit="formSubmit(this,event)">
            <input type="hidden" name='action' value='send'>
            <input type="hidden" name='sessid' value='<?=session_id()?>'>
            <div class="title">
                Форма обратной связи
            </div>
            <div class="block">
                <div class="input-wrapper">
                    <input type="text" placeholder=' ' data-only-words maxlength=25>
                    <div class="placeholder">
                        Имя
                    </div> 
                    <div class="error"></div>       
                </div>

                <div class="input-wrapper">
                    <input type="text" placeholder=' ' required data-phone-mask="+_(___)___ __ __">
                    <div class="placeholder">
                        Телефон
                    </div>        
                    <div class="error"></div>       
                </div>
            </div>
            <div class="block">
                <div class="input-wrapper">
                    <input type="text" placeholder=' ' required>
                    <div class="placeholder">
                        Адрес
                    </div>    
                    <div class="error"></div>
                </div>
            </div>
            <div class="block">
                <div class="input-wrapper">
                    <input type="text" placeholder=' ' required>
                    <div class="placeholder">
                        Адрес 2
                    </div>      
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