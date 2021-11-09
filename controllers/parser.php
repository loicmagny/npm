<?php

$xlsx = 0;
if (isset($_POST['send']) || isset($_POST['start'])) {

    $xlsx = getExcelFiles();
    $directory = findAllFiles();
    $files = [];
    $j = 0;
    for ($i = 2; $i < count($directory); $i++) {
        $j = $i - 2;
        $files[$j] = $directory[$i];
    }
    $sent = true;
}
function findAllFiles()
{
    return scandir('assets/uploads');
}


function getExcelFiles()
{
    $files = [];
    $data = [];
    $directory = findAllFiles();
    $j = 0;
    for ($i = 2; $i < count($directory); $i++) {
        $j = $i - 2;
        $files[$j] = $directory[$i];
    }
    for ($i = 0; $i < count($files); $i++) {
        if ($xlsx = SimpleXLSX::parse('assets/uploads/' . $files[$i] . '')) {
            $data[$i] = $xlsx;
        } else {
            echo SimpleXLSX::parseError();
        }
    }
    return $data;
}
function prepare($datas)
{
    foreach ($datas->rows() as $data) {
        $club = $data[1];
        $fName = $data[2];
        $lName = $data[3];
        $cat = $data[4];
        $swimTime = $data[5];
        $gender = $data[6];
        $type = $data[7];

        $posts = array('Club' => $club, 'Prénom' => $fName, 'Nom' => $lName, 'Catégorie' => $cat, $swimTime => 'Temps', 'Sexe' => $gender, 'Epreuve' => $type);
    }
    return $posts;
}
