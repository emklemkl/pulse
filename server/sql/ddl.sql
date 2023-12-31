DROP TABLE IF EXISTS `user_to_proj`;
DROP TABLE IF EXISTS `reports`;
DROP TABLE IF EXISTS `user_data`;
DROP TABLE IF EXISTS `projects`;

CREATE TABLE `user_data` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, # AUTO increments starts at 1000
	`name` VARCHAR(100),
    `mail` VARCHAR(100) DEFAULT "example@ex.se",
    `address` VARCHAR(100) DEFAULT "Street 1, Town, Country",
    `phone` VARCHAR(20) NOT NULL DEFAULT 123456789,
    `password` VARCHAR(500) DEFAULT "test",
    `role` CHAR(2),
    `ssn` CHAR(10) NOT NULL UNIQUE
);
ALTER TABLE `user_data` AUTO_INCREMENT = 1000; # Changes the start value for AUTO_INC


DROP PROCEDURE IF EXISTS p_find_matching_user;
DELIMITER ;;
CREATE PROCEDURE p_find_matching_user(a_id INT)
	BEGIN
		SELECT id, `name`, `password`, `role` FROM user_data
			WHERE id = a_id;
    END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS p_add_comment;
DELIMITER ;;
CREATE PROCEDURE p_add_comment(
	a_report_id INT,
    a_is_read BOOL,
    a_comment VARCHAR(9999))
    BEGIN
		UPDATE reports r SET `comments`= a_comment, `read`=a_is_read
    WHERE
        r.id = a_report_id;
    END
;;
DELIMITER ;

CREATE TABLE `projects` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(100),
    `description` TEXT,
    `project_start` DATE,
    `project_end` DATE,
    `report_frequency` INT
);
ALTER TABLE `projects` AUTO_INCREMENT = 10; # Changes the start value for AUTO_INC

DROP PROCEDURE IF EXISTS p_add_new_team_members;
DELIMITER ;;
CREATE PROCEDURE p_add_new_team_members(
    a_name VARCHAR(200),
    a_mail VARCHAR(200),
    a_address VARCHAR(200),
    a_phone VARCHAR(20),
    a_role CHAR(2),
    a_ssn CHAR(10),
    a_password VARCHAR(500)
)
BEGIN
    INSERT INTO user_data(`name`, `mail`, `address`, `phone`, `role`, `ssn`, `password`)
    VALUES (a_name, a_mail, a_address, a_phone, a_role, a_ssn, a_password);
    SELECT `name`, id, `role` FROM user_data WHERE id = LAST_INSERT_ID();
END
;;
DELIMITER ;

CREATE TABLE `user_to_proj` (
	`user_id` INT(4) NOT NULL,
    `proj_id` INT(2) NOT NULL,
    
    FOREIGN KEY (`user_id`) REFERENCES `user_data`(`id`),
    FOREIGN KEY (`proj_id`) REFERENCES `projects`(`id`)
);

CREATE TABLE `reports` (
	`id` INT(3) AUTO_INCREMENT PRIMARY KEY,
    `proj_id_report` INT(2) NOT NULL,
    `submitted_by_user` INT,
    `submitted_report` VARCHAR(9999),
    `comments` VARCHAR(4000),
    `read` BOOL,
    `due_date` DATE,
    `sent` DATETIME,
    `reminded` DATETIME,
    FOREIGN KEY (`proj_id_report`) REFERENCES `projects`(`id`)
);
ALTER TABLE `reports` AUTO_INCREMENT = 100; # Changes the start value for AUTO_INC

DROP PROCEDURE IF EXISTS p_get_all_reports;
DELIMITER ;;
CREATE PROCEDURE p_get_all_reports()
BEGIN
    SELECT
        p.id,
        p.name,
        p.description,
        r.id AS "reportid",
        r.submitted_report,
        r.`read`,
        r.`sent`
    FROM
        projects p
    JOIN
        reports r ON r.proj_id_report = p.id
    ORDER BY
        p.id;
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS p_add_new_project;
DELIMITER ;;
CREATE PROCEDURE p_add_new_project(
	a_name VARCHAR(100),
	a_start_date DATE,
    a_end_date DATE,
    a_report_freq INT,
    a_description TEXT
    )
BEGIN
    INSERT INTO 
		projects(`name`, `project_start`,`project_end`,`report_frequency`, `description`)
			VALUES (a_name, a_start_date, a_end_date,a_report_freq, a_description);
SELECT LAST_INSERT_ID() as "inserted_id" FROM projects;
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS p_assign_tm_to_proj;
DELIMITER ;;
CREATE PROCEDURE p_assign_tm_to_proj(
	a_proj_id INT,
    a_team_member_id INT
    )
BEGIN
    INSERT INTO 
		`user_to_proj`(`proj_id`,`user_id`)
			VALUES (a_proj_id, a_team_member_id);
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS p_add_user_password;
DELIMITER ;;
CREATE PROCEDURE p_add_user_password(
	a_id INT, 
	a_pw_hash VARCHAR(400))
BEGIN
UPDATE user_data ud SET `password`= a_pw_hash
    WHERE
        ud.id = a_id;
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS p_get_a_report;
DELIMITER ;;
CREATE PROCEDURE p_get_a_report(
	a_id INT)
BEGIN
	SELECT r.id, r.proj_id_report, r.submitted_by_user, r.submitted_report, r.comments, r.read, u.name FROM reports r
    RIGHT JOIN user_data u ON u.id = r.submitted_by_user
    WHERE
        r.id = a_id;
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS p_get_all_team_members;
DELIMITER ;;
CREATE PROCEDURE p_get_all_team_members()
BEGIN
    SELECT
        ud.id,
        ud.name,
        ud.mail,
        ud.phone,
        ud.role
    FROM
        user_data ud
    WHERE
        ud.role = "TM";
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS p_get_all_projects;
DELIMITER ;;
CREATE PROCEDURE p_get_all_projects()
BEGIN
    SELECT
        p.id,
        p.name,
        p.description,
        p.project_start,
        p.project_end
    FROM
        projects p;
END
;;
DELIMITER ;

    SELECT
        p.id,
        p.name,
        p.description,
        p.project_start,
        p.project_end
    FROM
        projects p;

DROP PROCEDURE IF EXISTS p_get_project_details;
DELIMITER ;;
CREATE PROCEDURE p_get_project_details(a_id INT)
BEGIN
    SELECT
        p.id as "pid",
        p.`name` as "pname",
        p.`description`,
        p.project_start,
        p.project_end,
        p.report_frequency,
        ud.name,
        ud.id,
        ud.mail,
        ud.phone
    FROM
        projects p
        JOIN user_to_proj utp ON utp.proj_id = a_id
        JOIN user_data ud on ud.id = utp.user_id
        WHERE p.id = a_id;
END
;;
DELIMITER ;

# INSERT INTO projects(`name`, `description`, project_start, project_end, report_frequency) VALUES ("Project Test", "Testa testet med en text om test", '2023-10-18','2023-10-26',7);


INSERT INTO user_data(`name`,mail,address,phone,`role`, ssn,`password`) VALUES ("Admin PM","emil_ffs1994@hotmail.com","Ronneby Road 1 12345","0709111111","PM","9999991111",'$2b$10$fka0mhXh71fyG3PaS72w6e3Izy8tqUjVCKWumLfsKx9gkI6TkYmAa');
INSERT INTO user_data(`name`,mail,address,phone,`role`,ssn,`password`) VALUES ("Emil Karlsson","emkl21@student.bth.se","Ronneby väg 1 14345","0709111112","TM","9999991212","$2b$10$nW8mWFzONZf3R9dD85Ccl.CfPg0mQjNoYRiTW41BiY908KvqTEIae");
INSERT INTO user_data(`name`, mail, address, phone, `role`, ssn)
VALUES ("John Smith", "john.smith@example.com", "123 Main St, Anytown, USA", "555-123-4567", "TM", "123456789");
# INSERT INTO user_data(`name`, mail, address, phone, `role`, ssn)
# VALUES ("Mary Johnson", "mary.johnson@gmail.com", "456 Elm St, Another Town, USA", "555-987-6543", "TM", "987654321");
# INSERT INTO user_data(`name`, mail, address, phone, `role`, ssn)
# VALUES ("Robert Davis", "robert.davis@yahoo.com", "789 Oak St, Yet Another Town, USA", "555-555-5555", "TM", "555555555");
# INSERT INTO user_data(`name`, mail, address, phone, `role`, ssn)
# VALUES ("Sarah Brown", "sarah.brown@hotmail.com", "101 Pine St, Last Town, USA", "555-111-2222", "TM", "111223333");
# INSERT INTO reports(`proj_id_report`, `submitted_by_user`, `submitted_report`) VALUES (10, 1003, "
#  fringilla laoreet augue eu, tincidunt tempor lectus. Nam in purus mi. Morbi eu egestas erat. 
#  Mauris faucibus risus vitae tortor imperdiet, id hendrerit libero hendrerit. Maecenas euismod id eros id scelerisque. 
#  Morbi accumsan cursus sem non pretium. Nulla laoreet ante sit amet lectus ultrices, ut dapibus risus ornare.");
#  INSERT INTO reports(`proj_id_report`, `submitted_by_user`, `submitted_report`) VALUES (10, 1001, "
# Morbi eu egestas erat. 
#  Mauris faucibus risus vitae tortor imperdiet, id hendrerit libero hendrerit. Maecenas euismod id eros id scelerisque. 
#  Morbi accumsan cursus sem non pretium. Nulla laoreet ante sit amet lectus ultrices, ut dapibus risus ornare.");
update projects set `description`= "fringilla laoreet augue eu, tincidunt tempor lectus. Nam in purus mi. Morbi eu egestas erat. 
#  Mauris faucibus risus vitae tortor imperdiet, id hendrerit libero hendrerit. Maecenas euismod id eros id scelerisque. 
#  Morbi accumsan cursus sem non pretium. Nulla laoreet ante sit amet lectus ultrices, ut dapibus risus ornare." where projects.id = 11;


DROP PROCEDURE IF EXISTS p_create_reports;
DELIMITER ;;
CREATE PROCEDURE p_create_reports(
	a_proj_id INT,
    a_user_id INT,
    a_date DATE)
BEGIN
	INSERT INTO reports(`proj_id_report`, `submitted_by_user`, `due_date`)
    VALUES (a_proj_id, a_user_id, a_date);
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS p_set_new_pw;
DELIMITER ;;
CREATE PROCEDURE p_set_new_pw(
	a_id INT,
	a_pw VARCHAR(700))
BEGIN
	UPDATE `user_data`
		SET `password` =  a_pw
			WHERE user_data.id = a_id;	
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS p_mark_as_reminded;
DELIMITER ;;
CREATE PROCEDURE p_mark_as_reminded(
	a_report_id INT)
BEGIN
	UPDATE `reports`
		SET `reminded` =  NOW()
			WHERE reports.id = a_report_id;	
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS p_submit_report;
DELIMITER ;;
CREATE PROCEDURE p_submit_report(
	a_report TEXT,
    a_proj_id INT)
BEGIN
	UPDATE reports
    SET `submitted_report` = a_report, `sent` = NOW() 
    WHERE reports.id = a_proj_id AND reports.sent IS NULL;
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS p_get_all_tm_projects;
DELIMITER ;;
CREATE PROCEDURE p_get_all_tm_projects(
    a_user_id INT)
BEGIN
	SELECT * FROM projects p
		JOIN user_to_proj utp ON utp.proj_id = p.id
		WHERE utp.user_id = a_user_id;
END
;;
DELIMITER ;

DROP PROCEDURE IF EXISTS p_get_all_tm_reports;
DELIMITER ;;
CREATE PROCEDURE p_get_all_tm_reports(
    a_user_id INT)
BEGIN
	SELECT * FROM reports WHERE reports.submitted_by_user = a_user_id;
END
;;
DELIMITER ;
UPDATE user_data SET `password`='$2b$10$nW8mWFzONZf3R9dD85Ccl.CfPg0mQjNoYRiTW41BiY908KvqTEIae' WHERE user_data.id = 1002;
select * from projects;
select * from user_to_proj;
select * from reports;
select * from user_data;
use pulse;