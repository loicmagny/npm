<?php

class swimming extends dataBase
{
    private $id = 0;
    private $time = '';
    private $ath_id = 0;
    private $heats = 0;
    private $points = 0;
    private $foul_id = 0;
    private $tablename = 'swimming';

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
     * Get the value of time
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * Set the value of time
     *
     * @return  self
     */
    public function setTime($time)
    {
        $this->time = $time;

        return $this;
    }

    /**
     * Get the value of ath_id
     */
    public function getAth_id()
    {
        return $this->ath_id;
    }

    /**
     * Set the value of ath_id
     *
     * @return  self
     */
    public function setAth_id($ath_id)
    {
        $this->ath_id = $ath_id;

        return $this;
    }

    /**
     * Get the value of heats
     */
    public function getHeats()
    {
        return $this->heats;
    }

    /**
     * Set the value of heats
     *
     * @return  self
     */
    public function setHeats($heats)
    {
        $this->heats = $heats;

        return $this;
    }

    /**
     * Get the value of points
     */
    public function getPoints()
    {
        return $this->points;
    }

    /**
     * Set the value of points
     *
     * @return  self
     */
    public function setPoints($points)
    {
        $this->points = $points;

        return $this;
    }

    /**
     * Get the value of foul_id
     */
    public function getFoul_id()
    {
        return $this->foul_id;
    }

    /**
     * Set the value of foul_id
     *
     * @return  self
     */
    public function setFoul_id($foul_id)
    {
        $this->foul_id = $foul_id;

        return $this;
    }



    public function createAthleteResult()
    {
        $query = 'INSERT INTO ' . $this->tablename . ' (`time`, `ath_id`, `heat`, `points`) VALUES (:time, :ath_id, :heat, :points)';
        $createAthleteResult = $this->db->prepare($query);
        $createAthleteResult->bindValue(':time', $this->time, PDO::PARAM_STR);
        $createAthleteResult->bindValue(':ath_id', $this->ath_id, PDO::PARAM_INT);
        $createAthleteResult->bindValue(':heat', $this->heats, PDO::PARAM_INT);
        $createAthleteResult->bindValue(':points', $this->points, PDO::PARAM_INT);
        return $createAthleteResult->execute();
    }

    public function getSavedResults($gender)
    {
        $query = 'SELECT
        swi.`id`,
        swi.`time`,
        swi.`ath_id`,
        swi.`heat`,
        swi.`fouls_id`,
        swi.`points`,
        ath.`id` AS ath_id,
        ath.`first_name`,
        ath.`last_name`,
        ath.`club`,
        ath.`cat_id`,
        ath.`type_id`,
        ath.`gender`,
        ath.`lr_handicap`,
        cat.`cat_id`,
        cat.`lr_distance`,
        cat.`lr_turns`,
        cat.`cat_name`
        FROM
        ' . $this->tablename . ' AS swi
        INNER JOIN `athletes` AS ath
        ON
            swi.`ath_id` = ath.`id`
        INNER JOIN `categories` AS cat
        ON
            ath.`cat_id` = cat.`cat_id`
        WHERE
            ath.`gender` = ' . $gender . '';
        $getAthletesTime = $this->db->query($query);
        if (is_object($getAthletesTime)) {
            $timeList = $getAthletesTime->fetchAll(PDO::FETCH_ASSOC);
        }
        return $timeList;
    }

    public function updateAthResult($id)
    {
        $query = 'UPDATE ' . $this->tablename . ' SET `time`= :time, `ath_id`= :ath_id,`heat`=:heat, `points`=:points WHERE `ath_id` = ' . $id . '';
        $updateAthResult = $this->db->prepare($query);
        $updateAthResult->bindValue(':time', $this->time, PDO::PARAM_STR);
        $updateAthResult->bindValue(':ath_id', $this->ath_id, PDO::PARAM_INT);
        $updateAthResult->bindValue(':heat', $this->heats, PDO::PARAM_INT);
        $updateAthResult->bindValue(':points', $this->points, PDO::PARAM_INT);
        return $updateAthResult->execute();
    }
    function __destruct()
    {
    }
}
