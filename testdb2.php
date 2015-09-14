<?php

    require_once("./services/config.php");

    //comment
    class DBTest {

        private $db = NULL;
        private $mysqli = NULL;
        public function __construct(){
            $this->dbConnect();					// Initiate Database connection
        }


        private function dbConnect(){

           $this->mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_BASE);
            
            echo 'host: ' . DB_HOST . '<br>';
            echo 'user: ' . DB_USER . '<br>';
            echo 'password: ' . DB_PASS . '<br>';
            echo 'db: ' . DB_BASE . '<br>';

            if($this->mysqli->connect_errno > 0){
                die('Unable to connect to database [' . $this->mysqli->connect_error . ']');
            }
        }   

        //get customers
        public function getCustomers(){	
			
			$query="SELECT distinct c.customerNumber, c.customerName, c.email, c.address, c.city, c.state, c.postalCode, c.country FROM customers c order by c.customerNumber desc";
        
            if ($r = $this->mysqli->query($query)) {
                echo 'no of rows: ' . $r->num_rows . '<br>';
                if($r->num_rows > 0){

                    $result = array();
                    while($row = $r->fetch_assoc()){
                        echo $row['customerName'] . '<br>.';
                        $result[] = $row;
                    }
                    
                }
            }
            else {
                die('There was an error running the query [' . $this->mysqli->error . ']');
            }
		}
    } 
    
    $test = new DBTest();
    $test->getCustomers();

?>