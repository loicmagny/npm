<?php

function insertAthleteResult($time, $id, $heat, $points, $fouls)
{
    $result = new swimming();
    $result->setTime(htmlspecialchars($time));
    $result->setAth_id((int)htmlspecialchars($id));
    $result->setHeats((int)htmlspecialchars($heat));
    $result->setPoints((int)htmlspecialchars($points));
    echo '<pre>';
    var_dump($result);
    echo '</pre>';
    if ($result->createAthleteResult()) {
        $insertSucess = true;
        if ($insertSucess) {
            $result->setTime('');
            $result->setAth_id(0);
            $result->setHeats(0);
            $result->setPoints(0);
        }
    }
}

function editAthleteResult($time, $id, $heat, $points)
{
    $swimming = new swimming();
    $swimming->time  = htmlspecialchars($time);
    $swimming->ath_id = (int)htmlspecialchars($id);
    $swimming->points = (int)htmlspecialchars($points);
    $swimming->heats = (int)htmlspecialchars($heat);
    var_dump($swimming);
    if ($swimming->updateAthResult($id)) {
        $editSuccess = true;
        if ($editSuccess) {
            $swimming->time  = '';
            $swimming->athlete = 0;
            $swimming->heats = 0;
            $swimming->points = 0;
        }
    }
}
function getSavedTimes($gender)
{
    $swimming = new swimming();
    if ($gender == 0 || $gender == 1) {
        return $swimming->getSavedResults($gender);
    } else {
        return false;
    }
}
// function getBoysSavedResults()
// {
//     $swimming = new swimming();
// }
// function getGirlsSavedResults()
// {
//     $swimming = new swimming();
//     var_dump($swimming->getGirlsResults());
//     return $swimming->getGirlsResults();
// }
