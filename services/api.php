<?php
 	require_once("Rest.inc.php");
    require_once("../src/config.php");
	
	class API extends REST {
	
		public $data = "";

		private $db = NULL;
		private $mysqli = NULL;
		public function __construct(){
			parent::__construct();				// Init parent contructor
			$this->dbConnect();					// Initiate Database connection
		}
		
		/*
		 *  Connect to Database
		*/
		private function dbConnect(){
            $this->mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_BASE);  
            
            if($this->mysqli->connect_errno > 0){
                die('Unable to connect to database [' . $this->mysqli->connect_error . ']');
            }
            
		}
		
		/*
		 * Dynmically call the method based on the query string
		 */
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
            error_log("CALLING FUNCTION: " . $func);
            
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404); // If the method not exist with in this class "Page not found".
		}
				
		private function login(){
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
               
            #$headers = getallheaders();
           
            $email = "user1@customers.com"; #$headers['Auth-User'];		
            $password = "password123"; #$headers['Auth-Password'];
            $query="SELECT uid, name, email FROM users WHERE email = '$email' AND password = '".md5($password)."' LIMIT 1";    
            $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
            
            if($r->num_rows > 0) {
						#$result = $r->fetch_assoc();	
                        #header("Auth-token : token1234");
						#$this->response($this->json($result), 200);
                $this->response($this->"OK", 200)
					} 
                    else { 
					   $this->response($this->json($error), 401);
                    }  
            
            
            
            /*
			if(!empty($email) and !empty($password)){
				if(filter_var($email, FILTER_VALIDATE_EMAIL)){
					$query="SELECT uid, name, email FROM users WHERE email = '$email' AND password = '".md5($password)."' LIMIT 1";    
                    $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

					if($r->num_rows > 0) {
						$result = $r->fetch_assoc();	
                        header("Auth-token : token1234");
						$this->response($this->json($result), 200);
					} 
                    else { 
					   $this->response($this->json($error), 401);
                    }
				}
                else {
                    $error = array('status' => "Failed", "msg" => "Invalid Email address or Password");
                    $this->response($this->json($error), 400);    
                }
			}
            else {
			     $error = array('status' => "Failed", "msg" => "Invalid Email address or Password");
			     $this->response($this->json($error), 400); 
            }
            
            */
		}
		
		private function customers(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
            } 
            else {
			     $query="SELECT distinct c.customerNumber, c.customerName, c.email, c.address, c.city, c.state, c.postalCode, c.country FROM customers c order by c.customerNumber desc";
			    $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			    if($r->num_rows > 0){
				    $result = array();
				    while($row = $r->fetch_assoc()){
					   $result[] = $row;
				    }
				    $this->response($this->json($result), 200); // send user details
                } 
                else {
			         $this->response('',204);	// If no records "No Content" status
                }
            }
		}
        
        private function user(){
            if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
            else {
                $user = json_decode(file_get_contents("php://input"),true);
                $query = "UPDATE users SET password ='".md5(trim($user['password']))."' WHERE uid=".$user['id'];
                error_log($query);
                $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

                    $this->response($this->json('success'),200);
            }
        }
          
        private function longTask(){
            $duration = (int)$this->_request['duration'];
            sleep($duration);
            $units = ' seconds!!!!';
           if ($duration == 1){
                $units = ' second!!!!';
            }
            $this->response('Task completed.  It took ' . $duration . $units,200);
        }
        
        /*private function password(){
            $value = $this->_request['text'];
            $this->response( 'Password '. md5($value),200);
        }*/
        
        
		private function customer(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
            else {
                $id = (int)$this->_request['id'];
                error_log("CUSTOMER ID: " . $id);
                if($id > 0){	
                    $query="SELECT distinct c.customerNumber, c.customerName, c.email, c.address, c.city, c.state, c.postalCode, c.country FROM customers c where c.customerNumber=$id";
                    $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
                    if($r->num_rows > 0) {
                        $result = $r->fetch_assoc();	
                        $this->response($this->json($result), 200); // send user details
                    }
                    else {
                        $this->response('',204);	// If no records "No Content" status  
                    }
                }
                $this->response('',204);	// If no records "No Content" status
            }
		}
		
		private function insertCustomer(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
            else {
                $customer = json_decode(file_get_contents("php://input"),true);
                $column_names = array('customerName', 'email', 'address', 'city', 'state', 'postalCode', 'country');
                $keys = array_keys($customer);
                $columns = '';
                $values = '';
                foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
                   if(!in_array($desired_key, $keys)) {
                        $$desired_key = '';
                    }else{
                        $$desired_key = $customer[$desired_key];
                    }
                    $columns = $columns.$desired_key.',';
                    $values = $values."'".$$desired_key."',";
                }
                $query = "INSERT INTO customers(".trim($columns,',').") VALUES(".trim($values,',').")";
                if(!empty($customer)){
                    $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
                    $success = array('status' => "Success", "msg" => "Customer Created Successfully.", "data" => $customer);
                    $this->response($this->json($success),200);
                }else {
                    $this->response('',204);	//"No Content" status
                }
            }
		}
        
		private function updateCustomer(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
            else {
                $customer = json_decode(file_get_contents("php://input"),true);
                $id = (int)$customer['customerNumber'];
                $column_names = array('customerName', 'email', 'address', 'city', 'state', 'postalCode', 'country');
                $keys = array_keys($customer);
                $columns = '';
                $values = '';
                foreach($column_names as $desired_key){ // Check the customer received. If key does not exist, insert blank into the array.
                    if(!in_array($desired_key, $keys)) {
                        $key_value = '';
                    }else{
                        //$$desired_key = $customer['customer'][$desired_key];
                       $key_value = $customer[$desired_key];
                       error_log("key value " .$desired_key);
                    }
                    $columns = $columns.$desired_key."='".$key_value."',";
                }
                $query = "UPDATE customers SET ".trim($columns,',')." WHERE customerNumber=$id";
                if(!empty($customer)){
                    $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
                    $success = array('status' => "Success", "msg" => "Customer ".$id." Updated Successfully.", "data" => $customer);
                    $this->response($this->json($success),200);
                }else {
                    $this->response('',204);	// "No Content" status
                }
            }
		}
		
		private function deleteCustomer(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
            else {
                $id = (int)$this->_request['id'];
                if($id > 0){				
                    $query="DELETE FROM customers WHERE customerNumber = $id";
                    $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
                    $success = array('status' => "Success", "msg" => "Successfully deleted one record.");
                    $this->response($this->json($success),200);
                }else {
                    $this->response('',204);	// If no records "No Content" status
                }
            }
		}
		
		/*
		 *	Encode array into JSON
		*/
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}
	}
	
	// Initiate Library
	
	$api = new API;
	$api->processApi();
?>