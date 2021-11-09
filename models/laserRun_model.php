<?php

class laserRun extends dataBase
{
    public $id = 0;
    public $time = '';
    public $athlete = 0;
    public $heats = 0;
    public $handicap = '';

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
     * Get the value of athlete
     */
    public function getAthlete()
    {
        return $this->athlete;
    }

    /**
     * Set the value of athlete
     *
     * @return  self
     */
    public function setAthlete($athlete)
    {
        $this->athlete = $athlete;

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
     * Get the value of handicap
     */
    public function getHandicap()
    {
        return $this->handicap;
    }

    /**
     * Set the value of handicap
     *
     * @return  self
     */
    public function setHandicap($handicap)
    {
        $this->handicap = $handicap;

        return $this;
    }
}
