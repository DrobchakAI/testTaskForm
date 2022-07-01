<?php
session_start();
require_once ("lib/Result.php");
require_once ("lib/Form.php");


define("sessid","sessid");
define("action","action");
define("formName","formName");
define("thisFormName","callbackForm");

define("FIST_NAME","FIST_NAME");
define("LAST_NAME","LAST_NAME");

define("formData","formData");


if(!isset($_POST[sessid]) || !isset($_POST[action]) || !isset($_POST[formName]) || !isset($_POST[formData]))
{
    $result = new Result();
    $result->Status = false;
    $result->ErrorText = "Inner error 1";
    echo json_encode($result);
    die();
}

if($_POST[sessid] !== session_id())
{
    $result = new Result();
    $result->Status = false;
    $result->ErrorText = "Inner error 2";
    echo json_encode($result);
    die();
}

if($_POST[formName] !== thisFormName)
{
    $result = new Result();
    $result->Status = false;
    $result->ErrorText = "Inner error 3";
    echo json_encode($result);
    die();
}

if(isset($_POST[FIST_NAME]) || isset($_POST[LAST_NAME]))
{
    $result = new Result();
    $result->Status = false;
    $result->ErrorText = "Inner error 4";
    echo json_encode($result);
    die();
}

$form = new Logic\Form();
echo json_encode($form->Result);