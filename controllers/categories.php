<?php

function getAllCatIds()
{
    $cat = new category();
    return $cat->getAllCatIds();
}

function getCategoryDetails($id)
{
    $cat = new category();
    $cat->cat_id = $id;
    return $cat->getCatDetails();
}

function getAllCatDetails()
{
    $cat = new category();
    return $cat->getAllCatDetails();
}

function updateCatName($cat_name, $id)
{
    $category = new category();
    $category->cat_id = (int)$id;
    $category->cat_name = htmlspecialchars($cat_name);
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
function updateSwimDistance($distance, $id)
{
    $category = new category();
    $category->cat_id = (int)$id;
    $category->distance = htmlspecialchars($distance);
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
function updateSwimTime($time, $id)
{
    $category = new category();
    $category->cat_id = (int)$id;
    $category->time = htmlspecialchars($time);
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
function updateSwimPoints($points, $id)
{
    $category = new category();
    $category->cat_id = (int)$id;
    $category->points = htmlspecialchars($points);
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
function updateSwimPtsPerSec($ptsPerSec, $id)
{
    $category = new category();
    $category->cat_id = (int)$id;
    $category->ptsPerSec = htmlspecialchars($ptsPerSec);
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
function updateLRDistance($lr_distance, $id)
{
    $category = new category();
    $category->cat_id = (int)$id;
    $category->lr_distance = htmlspecialchars($lr_distance);
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
function updateLRTurns($lr_turns, $id)
{
    $category = new category();
    $category->cat_id = (int)$id;
    $category->lr_turns = htmlspecialchars($lr_turns);
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
function updateLRTime($lr_time, $id)
{
    $category = new category();
    $category->cat_id = (int)$id;
    $category->lr_time = htmlspecialchars($lr_time);
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
function updateLRPtsPerSec($lr_ptsPerSec, $id)
{
    $category = new category();
    $category->cat_id = (int)$id;
    $category->lr_ptsPerSec = htmlspecialchars($lr_ptsPerSec);
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
function updateLRPoints($lr_points, $id)
{
    $category = new category();
    $category->cat_id = (int)$id;
    $category->lr_points = htmlspecialchars($lr_points);
    $category->updateCategoryName();
    return $category->getCatDetails($id);
}
