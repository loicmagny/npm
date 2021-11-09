<?php


class athlete extends database
{
    private $id = 0;
    private $first_name = '';
    private $last_name = '';
    private $club  = '';
    private $gender = 0;
    private $cat_id = 0;
    private $type_id = 0;
    private $swimTime = '';
    private $LR_handicap = '';
    private $tablename = 'athletes';

    public function __construct()
    {
        parent::__construct();
    }
    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of first_name
     */
    public function getFirst_name()
    {
        return $this->first_name;
    }

    /**
     * Set the value of first_name
     *
     * @return  self
     */
    public function setFirst_name($first_name)
    {
        $this->first_name = $first_name;

        return $this;
    }

    /**
     * Get the value of club
     */
    public function getClub()
    {
        return $this->club;
    }

    /**
     * Set the value of club
     *
     * @return  self
     */
    public function setClub($club)
    {
        $this->club = $club;

        return $this;
    }

    /**
     * Get the value of last_name
     */
    public function getLast_name()
    {
        return $this->last_name;
    }

    /**
     * Set the value of last_name
     *
     * @return  self
     */
    public function setLast_name($last_name)
    {
        $this->last_name = $last_name;

        return $this;
    }

    /**
     * Get the value of gender
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * Set the value of gender
     *
     * @return  self
     */
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }

    /**
     * Get the value of cat_id
     */
    public function getCat_id()
    {
        return $this->cat_id;
    }

    /**
     * Set the value of cat_id
     *
     * @return  self
     */
    public function setCat_id($cat_id)
    {
        $this->cat_id = $cat_id;

        return $this;
    }

    /**
     * Get the value of type_id
     */
    public function getType_id()
    {
        return $this->type_id;
    }

    /**
     * Set the value of type_id
     *
     * @return  self
     */
    public function setType_id($type_id)
    {
        $this->type_id = $type_id;

        return $this;
    }

    /**
     * Get the value of swimTime
     */
    public function getSwimTime()
    {
        return $this->swimTime;
    }

    /**
     * Set the value of swimTime
     *
     * @return  self
     */
    public function setSwimTime($swimTime)
    {
        $this->swimTime = $swimTime;

        return $this;
    }

    /**
     * Get the value of LR_handicap
     */
    public function getLR_handicap()
    {
        return $this->LR_handicap;
    }

    /**
     * Set the value of LR_handicap
     *
     * @return  self
     */
    public function setLR_handicap($LR_handicap)
    {
        $this->LR_handicap = $LR_handicap;

        return $this;
    }

    public function createAthlete()
    {
        $query = 'INSERT INTO ' . $this->tablename . '(
            `first_name`,
            `last_name`,
            `club`,
            `gender`,
            `type_id`,
            `cat_id`,
            `swimTime`,
            `LR_handicap`
        )
        VALUES(
        :first_name, 
        :last_name, 
        :club, 
        :gender, 
        :type_id, 
        :cat_id, 
        :swimTime,
        :LR_handicap)';
        $createAthlete = $this->db->prepare($query);
        $createAthlete->bindValue(':first_name', $this->first_name, PDO::PARAM_STR);
        $createAthlete->bindValue(':last_name', $this->last_name, PDO::PARAM_STR);
        $createAthlete->bindValue(':club', $this->club, PDO::PARAM_STR);
        $createAthlete->bindValue(':gender', $this->gender, PDO::PARAM_INT);
        $createAthlete->bindValue(':type_id', $this->type_id, PDO::PARAM_INT);
        $createAthlete->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        $createAthlete->bindValue(':swimTime', $this->swimTime, PDO::PARAM_STR);
        $createAthlete->bindValue(':LR_handicap', $this->LR_handicap, PDO::PARAM_STR);
        return $createAthlete->execute();
    }

    public function getAllAthletes()
    {
        $query = 'SELECT 
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id` ORDER BY ath.`type_id` ASC, ath.`last_name` ASC';
        $getAllAthletes = $this->db->query($query);
        if (is_object($getAllAthletes)) {
            $athleteList = $getAllAthletes->fetchAll(PDO::FETCH_ASSOC);
        }
        return $athleteList;
    }

    public function selectAthInCat()
    {
        $query = 'SELECT 
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id`
        WHERE ath.`cat_id` = :cat_id';
        $athInCat = $this->db->prepare($query);
        $athInCat->bindValue(':cat_id', $this->cat_id, PDO::PARAM_INT);
        if ($athInCat->execute()) {
            $athInCatResult = $athInCat->fetchAll(PDO::FETCH_ASSOC);
        }
        return $athInCatResult;
    }
    public function selectAthBySex()
    {
        $query = 'SELECT 
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id`
        WHERE ath.`gender` = :gender';
        $athBySex = $this->db->prepare($query);
        $athBySex->bindValue(':gender', $this->gender, PDO::PARAM_INT);
        if ($athBySex->execute()) {
            $athBySexResult = $athBySex->fetchAll(PDO::FETCH_ASSOC);
        }
        return $athBySexResult;
    }
    public function selectAthByType()
    {
        $query = 'SELECT 
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id`
        WHERE ath.`type_id` = :type_id';
        $athByType = $this->db->prepare($query);
        $athByType->bindValue(':type_id', $this->type_id, PDO::PARAM_INT);
        if ($athByType->execute()) {
            $athByTypeResult = $athByType->fetchAll(PDO::FETCH_ASSOC);
        }
        return $athByTypeResult;
    }
    public function searchForAth()
    {
        $query = 'SELECT 
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id`
        WHERE ath.`last_name` = :last_name OR ath.`first_name` = :first_name OR ath.`club` = :club';
        $searchAth = $this->db->prepare($query);
        $searchAth->bindValue(':last_name', $this->last_name, PDO::PARAM_STR);
        $searchAth->bindValue(':first_name', $this->first_name, PDO::PARAM_STR);
        $searchAth->bindValue(':club', $this->club, PDO::PARAM_STR);
        if ($searchAth->execute()) {
            $searchAthResult = $searchAth->fetchAll(PDO::FETCH_ASSOC);
        }
        return $searchAthResult;
    }
    public function getAthCatDetailsById($id)
    {
        $query = 'SELECT
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`,
        `categories`.`time`,
        `categories`.`ptsPerSec`,
        `categories`.`points`,
        `categories`.`lr_points`,
        `categories`.`lr_time`,
        `categories`.`lr_distance`,
        `categories`.`lr_ptsPerSec`
        FROM
        ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id`
        WHERE
        id = ' . $id . '';
        $getCatDetails = $this->db->query($query);
        if (is_object($getCatDetails)) {
            $catDetails = $getCatDetails->fetchAll(PDO::FETCH_ASSOC);
        }
        return $catDetails;
    }

    public function countBoysByCat($cat)
    {
        $query = 'SELECT COUNT(*) FROM ' . $this->tablename . ' WHERE `gender` = 1 AND `cat_id` = ' . $cat . '';
        $getBoysCount = $this->db->query($query);
        if (is_object($getBoysCount)) {
            $boyCount = $getBoysCount->fetchAll(PDO::FETCH_ASSOC);
        }
        return $boyCount;
    }

    public function getGirlsCat($dist)
    {
        $query = 'SELECT 
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id`
        WHERE ath.`gender` = 0 AND `categories`.`distance` = ' . $dist . ' AND ath.`type_id` = 1';
        $getGirlsCat = $this->db->query($query);
        if (is_object($getGirlsCat)) {
            $girlList = $getGirlsCat->fetchAll(PDO::FETCH_ASSOC);
        }
        return $girlList;
    }

    public function getBoysCat($dist)
    {
        $query = 'SELECT 
        ath.`id`,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`gender`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`swimTime`,
        ath.`LR_handicap`,
        `categories`.`cat_id`,
        `categories`.`cat_name`,
        `categories`.`distance`
        FROM ' . $this->tablename . ' AS ath
        INNER JOIN `categories` ON ath.`cat_id` = `categories`.`cat_id`
        WHERE ath.`gender` = 1 AND `categories`.`distance` = ' . $dist . ' AND ath.`type_id` = 1';
        $getBoysCat = $this->db->query($query);
        if (is_object($getBoysCat)) {
            $boyList = $getBoysCat->fetchAll(PDO::FETCH_ASSOC);
        }
        return $boyList;
    }

    function __destruct()
    {
    }
}
