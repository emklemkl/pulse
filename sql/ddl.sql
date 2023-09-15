DROP TABLE IF EXISTS `user_to_proj`;
DROP TABLE IF EXISTS `reports`;
DROP TABLE IF EXISTS `user_data`;
DROP TABLE IF EXISTS `projects`;

CREATE TABLE `user_data` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, # AUTO increments starts at 1000
	`name` VARCHAR(100),
    `mail` VARCHAR(100) DEFAULT "example@ex.se",
    `address` VARCHAR(100) DEFAULT "Street 1, Town, Country",
    `phone` INT NOT NULL DEFAULT 123456789,
    `role` CHAR(2)
);
ALTER TABLE `user_data` AUTO_INCREMENT = 1000; # Changes the start value for AUTO_INC

CREATE TABLE `projects` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(100),
    `description` VARCHAR(500)
);
ALTER TABLE `projects` AUTO_INCREMENT = 10; # Changes the start value for AUTO_INC

CREATE TABLE `user_to_proj` (
	`user_id` INT(4) NOT NULL,
    `proj_id` INT(2) NOT NULL,
    
    FOREIGN KEY (`user_id`) REFERENCES `user_data`(`id`),
    FOREIGN KEY (`proj_id`) REFERENCES `projects`(`id`)
);

CREATE TABLE `reports` (
	`id` INT(3) AUTO_INCREMENT PRIMARY KEY,
    `total_reports` INT DEFAULT 0,
    `proj_id_report` INT(2) NOT NULL,
    
    FOREIGN KEY (`proj_id_report`) REFERENCES `projects`(`id`)
);
ALTER TABLE `reports` AUTO_INCREMENT = 100; # Changes the start value for AUTO_INC

INSERT INTO user_data(`name`, `role`) VALUES ("Pelle1", "PM");
INSERT INTO user_data(`name`, `role`) VALUES ("Pelle2", "TM");
INSERT INTO user_data(`name`, `role`) VALUES ("Pelle3", "TM");
INSERT INTO projects(`name`, `description`) VALUES ("Project Test", "Testa testet med en text om test");
INSERT INTO projects(`name`, `description`) VALUES ("Project Test2", PASSWORD("Test"));
INSERT INTO user_to_proj VALUES (1001, 10);
INSERT INTO user_to_proj VALUES (1002, 10);
select * from user_data;
select * from user_to_proj;
select * from projects;
select password("test");