<?php
	define('DB_HOST', getenv(strtoupper(getenv("DATABASE_SERVICE_NAME"))."_SERVICE_HOST"));
	define('DB_USER',getenv('DATABASE_USER'));
	define('DB_PASS',getenv('DATABASE_PASSWORD'));
	define('DB_BASE', getenv("DATABASE_NAME"));
	define('DB_PORT',getenv(strtoupper(getenv("DATABASE_SERVICE_NAME"))."_SERVICE_PORT")); 
?>