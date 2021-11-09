<?php

require_once 'models/database.php';
require_once 'models/athletes_model.php';
require_once 'models/categories_model.php';
require_once 'models/swimming_model.php';
require_once "assets/libs/simplexlsx-master/src/SimpleXLSX.php";
require_once 'controllers/parser.php';
require 'controllers/athletes.php';

if (isset($_POST['getBoys'])) {
    // require 'controllers/athletes.php';
    echo json_encode(getAllBoys());
    die();
}

if (isset($_POST['getTimes'])) {
    require 'controllers/swimming.php';
    echo json_encode(getSavedTimes($_POST['gender']));
    die();
}
if (isset($_POST['catList'])) {
    require 'controllers/categories.php';
    echo json_encode(getCategoryDetails($_POST['cat_id']));
    die();
}
if (isset($_POST['getAthletes'])) {
    echo json_encode(getAllAthletes());
    die();
}
if (isset($_POST['getAthTimes'])) {
    require 'controllers/swimming.php';
    echo json_encode(getSavedTimes((int)($_POST['gender'])));
    die();
}
if (isset($_POST['insertAthResult'])) {
    require 'controllers/swimming.php';
    insertAthleteResult($_POST['time'], $_POST['athlete'], $_POST['heat'], $_POST['points'], $_POST['fouls']);
    echo json_encode(getSavedTimes((int)$_POST['gender']));
    die();
}
if (isset($_POST['editAthResult'])) {
    require 'controllers/swimming.php';
    editAthleteResult($_POST['time'], $_POST['athlete'], $_POST['heat'], $_POST['points']);
    echo json_encode(getSavedTimes((int)$_POST['gender']));
    die();
}
if (isset($_POST['AllCatIds'])) {
    require 'controllers/categories.php';
    echo json_encode(getAllCatIds());
    die();
}
if (isset($_POST['AllCatDetails'])) {
    require 'controllers/categories.php';
    echo json_encode(getAllCatDetails());
    die();
}
if (isset($_POST['athCatDetails'])) {
    require 'controllers/categories.php';
    echo json_encode(getAthCatDetails($_POST['x']));
    die();
}
if (isset($_POST['catDetails'])) {
    require 'controllers/categories.php';
    echo json_encode(getCategoryDetails($_POST['cat_id']));
    die();
}
if (isset($_POST['editCatName'])) {
    require 'controllers/categories.php';
    echo json_encode(updateCatName($_POST['cat_name'], $_POST['cat_id']));
    die();
}
if (isset($_POST['editSwimDistance'])) {
    require 'controllers/categories.php';
    echo json_encode(updateSwimDistance($_POST['distance'], $_POST['cat_id']));
    die();
}
if (isset($_POST['editSwimTime'])) {
    require 'controllers/categories.php';
    echo json_encode(updateSwimTime($_POST['time'], $_POST['cat_id']));
    die();
}
if (isset($_POST['editSwimPoints'])) {
    require 'controllers/categories.php';
    echo json_encode(updateSwimPoints($_POST['points'], $_POST['cat_id']));
    die();
}
if (isset($_POST['editSwimPtsPerSec'])) {
    require 'controllers/categories.php';
    echo json_encode(updateSwimPtsPerSec($_POST['ptsPerSec'], $_POST['cat_id']));
    die();
}
if (isset($_POST['editLRDistance'])) {
    require 'controllers/categories.php';
    echo json_encode(updateLRDistance($_POST['lr_distance'], $_POST['cat_id']));
    die();
}
if (isset($_POST['editLRTurns'])) {
    require 'controllers/categories.php';
    echo json_encode(updateLRTurns($_POST['lr_turns'], $_POST['cat_id']));
    die();
}
if (isset($_POST['editLRTime'])) {
    require 'controllers/categories.php';
    echo json_encode(updateLRTime($_POST['lr_time'], $_POST['cat_id']));
    die();
}
if (isset($_POST['editLRPtsPerSec'])) {
    require 'controllers/categories.php';
    echo json_encode(updateLRPtsPerSec($_POST['lr_ptsPerSec'], $_POST['cat_id']));
    die();
}
if (isset($_POST['editLRPoints'])) {
    require 'controllers/categories.php';
    echo json_encode(updateLRPoints($_POST['lr_points'], $_POST['cat_id']));
    die();
}
if (isset($_POST['getGirls'])) {
    // require 'controllers/athletes.php';
    echo json_encode(getAllGirls());
    die();
}
if (isset($_POST['sortByCat'])) {
    require 'controllers/categories.php';
    echo json_encode(sortAthByCat());
    die();
}

if (isset($_POST['sortBySex'])) {
    require 'controllers/categories.php';
    echo json_encode(sortAthBySex());
    die();
}
if (isset($_POST['sortByType'])) {
    require 'controllers/categories.php';
    echo json_encode(sortAthByType());
    die();
}
if (isset($_POST['searchAth'])) {
    echo json_encode(searchAth($_POST['str']));
    die();
}
