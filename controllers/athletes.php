<?php
// require_once '../models/categories_model.php';
if (isset($_POST['action'])) {
    require_once 'parser.php';
    $xlsx = getExcelFiles();
    for ($i = 0; $i < count($xlsx); $i++) {
        foreach ($xlsx[$i]->rows() as $elt) {
            $athlete = new athlete();
            $athlete->club  = htmlspecialchars($elt[1]);
            $athlete->last_name = ucfirst(strtolower(htmlspecialchars($elt[2])));
            $athlete->first_name = ucfirst(strtolower(htmlspecialchars($elt[3])));
            $athlete->cat_id =  formatCat(strtolower(htmlspecialchars($elt[4])));
            $athlete->swimTime = strtolower(htmlspecialchars($elt[5]));
            $athlete->gender = formatGender(strtolower(htmlspecialchars($elt[6])));
            $athlete->type_id  = formatType(strtolower(htmlspecialchars($elt[7])));
            $athlete->LR_handicap = '';
            if ($athlete->createAthlete()) {
                $insertSucess = true;
                if ($insertSucess) {
                    $athlete->club  = '';
                    $athlete->first_name = '';
                    $athlete->last_name = '';
                    $athlete->cat_id =  0;
                    $athlete->gender = 0;
                    $athlete->type_id  = 0;
                    $athlete->swimTime = '';
                    $athlete->LR_handicap = '';
                }
            }
        }
    }
}

function getAllAthletes()
{
    $ath = new athlete();
    $sorted = array();
    $board = $ath->getAllAthletes();
    for ($i = 0; $i < sizeof($board); $i++) {
        $sorted[$i] = $board[$i];
        $sorted[$i]['gender'] = transformGender($board[$i]['gender']);
        $sorted[$i]['type_id'] = transformType($board[$i]['type_id']);
    }
    return $sorted;
}

function transformType($int)
{
    if ($int == 1) {
        return 'Triathle';
    } else if ($int == 2) {
        return 'Laser Run';
    }
}
function transformGender($int)
{
    if ($int == 0) {
        return 'Femme';
    } else if ($int == 1) {
        return 'Homme';
    }
}
function getAllBoys()
{
    $boys = new athlete();
    $heats = array();
    $heats[0] = $boys->getBoysCat(50);
    $heats[1] = $boys->getBoysCat(100);
    $heats[2] = $boys->getBoysCat(200);
    return $heats;
}

function getAthCatDetails($id)
{
    $ath = new athlete();
    return $ath->getAthCatDetailsById($id);
}
function getBoysCountByCat()
{
    $boys = new athlete();
    $counts = array();
    $total = array();
    for ($i = 1; $i <= 8; $i++) {
        $counts[$i] = $boys->countBoysByCat($i);
    }
    for ($i = 1; $i <= count($counts); $i++) {
        $total[$i] = $counts[$i][0]['COUNT(*)'];
    }
    return array_filter($total);
}

function getAllGirls()
{
    $girls = new athlete();
    $heats = array();
    $heats[0] = $girls->getGirlsCat(50);
    $heats[1] = $girls->getGirlsCat(100);
    $heats[2] = $girls->getGirlsCat(200);
    return $heats;
}

function formatGender($str)
{
    if ($str == 'h' || $str == 'homme' || $str == '1' || $str == 'garçon' || $str == 'garcon' || $str == 'garçon') {
        return 1;
    } else if ($str == 'f' || $str == 'femme' || $str == '0' || $str == '2' || $str == 'fille') {
        return 0;
    }
}

function formatType($str)
{

    if ($str == 'triathle') {
        return 1;
    }
    if ($str == 'laserrun' || $str == 'laser run') {
        return 2;
    }
}

function formatCat($str)
{
    switch ($str) {
        case 'u11':
            return 1;
            break;
        case 'u13':
            return 2;
            break;
        case 'u15':
            return 3;
            break;
        case 'u17':
            return 4;
            break;
        case 'u19':
            return 5;
            break;
        case 'u22':
            return 6;
            break;
        case 'm40':
            return 8;
            break;
        case 'm50':
            return 9;
            break;
        case 'm60':
            return 10;
            break;
        default:
            return 7;
            break;
    }
}


function sortAthByCat()
{
    $ath = new athlete();
    $sorted = array();
    $board = array();
    for ($i = 1; $i <= 10; $i++) {
        $ath->cat_id = $i;
        $board[$i] = $ath->selectAthInCat();
    }
    for ($i = 1; $i < count($board); $i++) {
        for ($j = 0; $j < count($board[$i]); $j++) {
            $sorted[$i][$j] = $board[$i][$j];
            $sorted[$i][$j]['gender'] = transformGender($board[$i][$j]['gender']);
            $sorted[$i][$j]['type_id'] = transformType($board[$i][$j]['type_id']);
        }
    }
    return array_filter($sorted);
}

function sortAthBySex()
{
    $ath = new athlete();
    $sorted = array();
    $board = array();
    for ($i = 0; $i < 2; $i++) {
        $ath->gender = $i;
        $board[$i] = $ath->selectAthBySex();
    }
    for ($i = 0; $i < count($board); $i++) {
        for ($j = 0; $j < count($board[$i]); $j++) {
            $sorted[$i][$j] = $board[$i][$j];
            $sorted[$i][$j]['gender'] = transformGender($board[$i][$j]['gender']);
            $sorted[$i][$j]['type_id'] = transformType($board[$i][$j]['type_id']);
        }
    }
    return array_filter($sorted);
}
function sortAthByType()
{
    $ath = new athlete();
    $sorted = array();
    $board = array();
    for ($i = 1; $i < 3; $i++) {
        $ath->type_id = $i;
        $board[$i] = $ath->selectAthByType();
    }
    for ($i = 1; $i <= count($board); $i++) {
        for ($j = 0; $j < count($board[$i]); $j++) {
            $sorted[$i][$j] = $board[$i][$j];
            $sorted[$i][$j]['gender'] = transformGender($board[$i][$j]['gender']);
            $sorted[$i][$j]['type_id'] = transformType($board[$i][$j]['type_id']);
        }
    }
    return array_filter($sorted);
}

function searchAth($str)
{
    $ath = new athlete();
    $ath->first_name = ucfirst(htmlspecialchars($str));
    $ath->last_name = ucfirst(htmlspecialchars($str));
    $ath->club = htmlspecialchars($str);
    $result = $ath->searchForAth();
    $sorted = array();
    for ($i = 0; $i < count($result); $i++) {
        $sorted[$i] = $result[$i];
        $sorted[$i]['gender'] = transformGender($result[$i]['gender']);
        $sorted[$i]['type_id'] = transformType($result[$i]['type_id']);
    }
    return array_filter($sorted);
}
