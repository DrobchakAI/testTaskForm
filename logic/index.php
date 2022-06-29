<?php

if(!isset($_POST["sessid"]) || !isset($_POST["action"]))
{
    die();
}

if($_POST["sessid"] !== session_id())
{
    die();
}


