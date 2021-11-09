CREATE DATABASE penta;
USE penta;
CREATE TABLE IF NOT EXISTS `fouls` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `label` INT(11) NOT NULL,
    `type` INT(11) NOT NULL,
    `points` INT(11) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;
CREATE TABLE IF NOT EXISTS `categories` (
    `cat_id` INT(11) NOT NULL AUTO_INCREMENT,
    `cat_name` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`cat_id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;
CREATE TABLE IF NOT EXISTS `athletes` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `club` VARCHAR(255) NOT NULL,
    `gender` BOOLEAN NOT NULL,
    `cat_id` INT(11) NOT NULL,
    `type_id` INT(11) NOT NULL,
    `swimTime` VARCHAR(100) NOT NULL DEFAULT '0',
    `LR_handicap` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`cat_id`) REFERENCES `categories`(`cat_id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;
CREATE TABLE IF NOT EXISTS `swimming` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `time` VARCHAR(100) NOT NULL,
    `points` INT(11) NOT NULL,
    `ath_id` INT(11) NOT NULL,
    `heat` INT(11) NOT NULL,
    `fouls_id` INT(11) NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`ath_id`) REFERENCES `athletes`(`id`),
    FOREIGN KEY(`fouls_id`) REFERENCES `fouls`(`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;
CREATE TABLE IF NOT EXISTS `laserRun` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `time` VARCHAR(100) NOT NULL,
    `points` INT(11) NOT NULL,
    `ath_id` INT(11) NOT NULL,
    `heat` INT(11) NOT NULL,
    `fouls_id` INT(11) NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`ath_id`) REFERENCES `athletes`(`id`),
    FOREIGN KEY(`fouls_id`) REFERENCES `fouls`(`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;
CREATE TABLE IF NOT EXISTS `results` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `place` INT(11) NOT NULL,
    `points` INT(11) NOT NULL,
    `ath_id` INT(11) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`ath_id`) REFERENCES `athletes`(`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;