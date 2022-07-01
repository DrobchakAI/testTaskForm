<?php
namespace Logic;
//**Класс обработки формы обратной связи. */
class Form{
    
    public $Result;
    private const formName = "callbackForm";
    private const formDataField = "formData";


    function __construct()
    {        
        $this->Result = new Result();
        $this->Result->Status = true;

        $data = $_POST[self::formDataField];
        $data = json_decode($data);
        if($data)
        {
            $result = $this->trySaveForm($data);
            if(count($result) > 0)
            {
               $this->saveResult($result,$_SERVER["REMOTE_ADDR"]);
            }else{
                $this->Result->Status = false;
                $this->Result->ErorrText = "FormError";
            }

        }else{
            $this->Result->Status = true;
            $this->Result->ErrorText = "Data is corrupted";
        }
    }
    /**
     * Сохранение результата в текстовый файл.
     */
    private function saveResult($data,$ip){
        $filePath = $_SERVER['DOCUMENT_ROOT']."/logform.txt";
        $string = date("Y.m.d H:i:s")." - IP: $ip \nДанные формы\n";        
        foreach($data as $key=>$item)
        {
            $string .=$key . " : ". $item."\n";
            
        }
        $string.="\n";

        file_put_contents($filePath,$string,FILE_APPEND);
    }
    /**
     * Попытка сохранить переданную форму.
     */
    private function trySaveForm($data)
    {
       
        $preparedData = [];
        foreach($data as $key=>$item)
        {        
        
            if($item->maxlength)
            {
            
               
                if(!$this->checkMaxSize($item->value,$item->maxlength)){                                
                    
                    $preparedData = [];                   
                    break;
                }
            }
        
            if($item->required)
            {
                if($item->value == null || $item->value == "")
                {
                    $preparedData = [];                   
                    break;
                }
            }
            if($item->phoneMask)
            {
                if(!$this->checkPhoneMask($item->value))
                {
                    $preparedData = [];
                    break;
                }
            }
            
            
            $preparedValue = trim($item->value);
            $preparedValue = htmlspecialchars($preparedValue);
            $preparedValue = addslashes($preparedValue);
        
            $preparedData[$item->name] = $preparedValue;
        }
        
        return $preparedData;
    }
    /**
     * Валидация телефона по маске.
     */
    private function checkPhoneMask($value)
    {
        $regx = "/^[\+]?([0-9])?[\s\-]?\(?[0-9][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/";   
        return preg_match($regx,$value);
    }
    /**
     * Проверка максимального размера строки.
     */
    private function checkMaxSize($value,$maxlength)
    {
        $count = mb_strlen($value);
      
        if($count !== false)
        {        
            return $count <= (int)$maxlength ? true : false;    
        }else{
            return false;
        }    
    }
}