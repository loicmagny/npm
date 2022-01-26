<?php

require_once 'models/database.php';
require_once 'models/athletes_model.php';
require_once 'models/categories_model.php';
require_once 'models/swimming_model.php';
require_once 'models/laserRun_model.php';
require_once 'models/results_model.php';
require_once 'models/fouls_model.php';
require_once 'models/athFouls_model.php';
require_once "assets/libs/simplexlsx-master/src/SimpleXLSX.php";
require_once 'controllers/parser.php';
require_once 'controllers/athletes_controller.php';

if (isset($_POST['autoCall'])) {

    if (isset($_POST['file'])) {
        if ($_POST['file'] == 0) {
        }
        if ($_POST['file'] == 1) {
            require 'controllers/swimming_controller.php';
        } else if ($_POST['file'] == 2) {
            require 'controllers/laserRun_controller.php';
        } else if ($_POST['file'] == 3) {
            require 'controllers/categories_controller.php';
        } else if ($_POST['file'] == 4) {
            require 'controllers/results_controller.php';
        } else if ($_POST['file'] == 5) {
            require 'controllers/fouls_controller.php';
        }
    }
    if (isset($_POST['arg'])) {
        echo json_encode($_POST['function']($_POST['arg']));
    } else {
        echo json_encode($_POST['function']());
    }
    unset($_POST);
    die();
}
