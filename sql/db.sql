
CREATE TABLE IF NOT EXISTS `customers` (
`customerNumber` int(11) NOT NULL AUTO_INCREMENT,
`customerName` varchar(50) NOT NULL,
`email` varchar(50) NOT NULL,
`address` varchar(50) NOT NULL,
`city` varchar(50) NOT NULL,
`state` varchar(50) DEFAULT NULL,
`postalCode` varchar(15) DEFAULT NULL,
`country` varchar(50) NOT NULL,
PRIMARY KEY (`customerNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=172 ;

CREATE TABLE IF NOT EXISTS `users` (
`uid` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(50) NOT NULL,
`email` varchar(50) NOT NULL,
`password` varchar(50) NOT NULL,
PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=172 ;

insert into users (name, email, password) values('user1','user1@customers.com','482c811da5d5b4bc6d497ffa98491e38');

insert into customers (customerName, email, address, city, state, postalCode, country) values ('ACME Stuff inc', 'acme@acem.com', 'address one', 'Austin', 'Texas', '12345', 'USA');
