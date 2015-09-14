<?php

    require_once("./src/config.php");

    //comment
    class DBEnvTest {

        private $db = NULL;
        private $mysqli = NULL;
        public function __construct(){
            $this->test();					// Initiate Database connection
        }


        private function test(){
      
            echo 'host: ' . DB_HOST . '<br>';
            echo 'port: ' . DB_PORT . '<br>';
            echo 'user: ' . DB_USER . '<br>';
            echo 'password: ' . DB_PASS . '<br>';
            echo 'db: ' . DB_BASE . '<br>';
            
        }   

    } 
    
    $test = new DBEnvTest();

?>