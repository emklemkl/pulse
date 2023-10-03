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
		SELECT id, `password`, `role` FROM user_data
			WHERE id = a_id;
    END
;;
DELIMITER ;


CREATE TABLE `projects` (
	`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(100),
    `description` VARCHAR(500)
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
    a_ssn CHAR(10)
)
BEGIN
    INSERT INTO user_data(`name`, `mail`, `address`, `phone`, `role`, `ssn`)
    VALUES (a_name, a_mail, a_address, a_phone, a_role, a_ssn);
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
        r.submitted_report
    FROM
        projects p
    JOIN
        reports r ON r.proj_id_report = p.id
    ORDER BY
        p.id;
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
        COUNT(r.id) AS total_reports,
        p.name,
        p.description,
        r.id AS "reportid"
    FROM
        projects p
    JOIN
        reports r ON r.proj_id_report = p.id
    GROUP BY
        p.id
    ORDER BY
        p.id;
END
;;
DELIMITER ;

INSERT INTO user_data(`name`, `role`, `ssn`) VALUES ("Pelle1", "PM", "1234567899");
INSERT INTO user_data(`name`, `role`, `ssn`) VALUES ("Pelle2", "TM", "1234567898");
INSERT INTO user_data(`name`, `role`, `ssn`) VALUES ("Pelle3", "TM","1234567897");
INSERT INTO projects(`name`, `description`) VALUES ("Project Test", "Testa testet med en text om test");
INSERT INTO projects(`name`, `description`) VALUES ("Project Test2", PASSWORD("Test"));
INSERT INTO user_to_proj VALUES (1001, 10);
INSERT INTO user_to_proj VALUES (1002, 10);
INSERT INTO reports(`proj_id_report`, `submitted_by_user`, `submitted_report`) VALUES (10, 1002, "Lorem ipsum dolor sit amet,
 consectetur adipiscing elit. Pellentesque orci neque, imperdiet a nisi nec, mollis tincidunt purus. Nunc porta tellus
 vitae enim vehicula aliquet. Quisque sed orci ut augue molestie sollicitudin. Suspendisse quis nisi ullamcorper, 
 porta velit eu, semper tortor. Nam bibendum ligula ac tortor blandit, eget maximus odio congue. Integer purus urna,
 fringilla laoreet augue eu, tincidunt tempor lectus. Nam in purus mi. Morbi eu egestas erat. 
 Mauris faucibus risus vitae tortor imperdiet, id hendrerit libero hendrerit. Maecenas euismod id eros id scelerisque. 
 Morbi accumsan cursus sem non pretium. Nulla laoreet ante sit amet lectus ultrices, ut dapibus risus ornare.");
select * from user_data;
select * from user_to_proj;
select * from projects;
select * from reports;
select password("test");