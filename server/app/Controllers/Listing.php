<?php

namespace App\Database;

namespace App\Controllers;

use App\Libraries\Sendemail;
use App\Libraries\Commonlib;
use Exception;

class Listing extends RestApiBaseController
{
    public $db;
    function __construct()
    {
        $this->db = db_connect();   
        $this->commonlib = new Commonlib();
        $this->sendemail = new Sendemail();
        parent::__construct();
    }

    public function getById()
    {
        try {
            $id = $this->request->getVar('id');
            $table = $this->db->table("default_listing");
            $this->db->query('select @intforview:=' . $id);
            $profilesList = $table->get()->getResult();
            $this->db->query('select @intforview:=-1');

            if ($profilesList != NULL) {
                return $this->respond($profilesList);
            } else {
                return $this->failNotFound();
            }
        } catch (\Exception $ex) {
            log_message('info', 'Could not fetch profile data: ' . $ex);
            return $this->failValidationError();
        }
    }

    public function checkDesirable()
    {
        try {
            $id = $this->request->getVar('id');
            $viewer = $this->request->getVar('viewer');
            $table = $this->db->table("get_profiles_for_user");
            $this->db->query('select @intforview:=' . $id);
            $profilesList = $table->getWhere(array('userId' => $viewer))->getResult();
            $this->db->query('select @intforview:=-1');

            if ($profilesList != NULL) {
                return $this->respond($profilesList);
            } else {
                return $this->failNotFound();
            }
        } catch (\Exception $ex) {
            log_message('info', 'Could not fetch profile data: ' . $ex);
            return $this->failValidationError();
        }
    }

    public function getByIdAndProfileName()
    {
        try {
            $id = $this->request->getVar('id');
            $name = $this->request->getVar('name');
            $table = $this->db->table("profile");
            // $this->db->query('select @intforview:=' . $id);
            $table->select("desiredCaste,desiredGotra,highestEducation,avatarFileName,AGE_FROM_DOB(dob) as age, profile.profileId,profileNumber,profile.userId,profileFor,firstName,lastName,gender,height");
            $table->join("artifact","profile.userId = artifact.userId","LEFT");
            $profilesList = $table->getWhere(array('firstName' => explode(" ", $name)[0], 'lastName' => explode(" ", $name)[1]))->getResult();

            //$this->db->query('select @intforview:=-1');

            if ($profilesList != NULL) {
                return $this->respond($profilesList);
            } else {
                return $this->failForbidden();
            }
        } catch (\Exception $ex) {
            log_message('info', 'Could not fetch profile data: ' . $ex);
            return $this->failValidationError();
        }
    }

    public function getListByTags()
    {
        $tagArray = array();
        try {
            $id = $this->request->getVar('id');
            $gender = $this->request->getVar('gender');
            $tagArray['ageGroup'] = $this->request->getVar('desiredAgeGroup');
            $tagArray['height'] = $this->request->getVar('desiredHeight');
            $tagArray['maritalStatus'] = $this->request->getVar('desiredMaritalStatus');
            $tagArray['gotra'] = $this->request->getVar('desiredGotra');
            $tagArray['caste'] = $this->request->getVar('desiredCaste');
            $tagArray['showHeight'] = $this->request->getVar('showHeight');
            $tagArray['showMaritalStatus'] = $this->request->getVar('showMaritalStatus');
            $tagArray['showGotra'] = $this->request->getVar('showGotra');
            $tagArray['showCaste'] = $this->request->getVar('showCaste');

            $query = $this->tagQueryGenerator($tagArray, $id, $gender);
            $profilesList = $this->db->query($query)->getResult();

            if ($profilesList != NULL) {
                return $this->respond($profilesList);
            } else {
                return $this->failNotFound();
            }
        } catch (\Exception $ex) {
            log_message('info', 'Could not fetch profile data: ' . $ex);
            return $this->failValidationError();
        }
    }

    private function tagQueryGenerator($tagArray, $id, $gender)
    {
        $selectClause = "SELECT
                            profile.profileId,
                            profile.profileNumber,
                            profile.userId,
                            profile.firstName,
                            profile.lastName,
                            CONCAT(
                                profile.firstName,
                                ' ',
                                profile.lastName
                            ) AS `fullName`,
                            profile.gender,
                            profile.dob,
                            profile.height,
                            profile.maritalStatus,
                            profile.city,
                            profile.state,
                            profile.highestEducation,
                            profile.occupation,
                            profile.income,
                            profile.desiredAgeGroup,
                            profile.desiredHeight,
                            profile.desiredMaritalStatus,
                            profile.status,
                            AGE_FROM_DOB(profile.dob) AS `age`,
                            artifact.artifactId,
                            artifact.avatarFileName
                        FROM
                            profile
                        LEFT JOIN artifact ON profile.userId = artifact.userId
                        WHERE ";

        $whereAgeGroup = "AGE_FROM_DOB( profile.dob) >= SPLIT_STR('" . $tagArray['ageGroup'] . "','-',1) AND 
                         AGE_FROM_DOB( profile.dob) <= SPLIT_STR('" . $tagArray['ageGroup'] . "','-',2) AND ";

        $whereHeight = $tagArray['showHeight'] == false ? '' : " profile.height >= SPLIT_STR('" . $tagArray['height'] . "','-',1) AND 
                        profile.height <= SPLIT_STR('" . $tagArray['height'] . "','-',2) AND ";

        $whereMaritalStatus = $tagArray['showMaritalStatus'] == false ? '' : "'" . $tagArray['maritalStatus'] . "' 
                        LIKE CONCAT('%',profile.maritalStatus,'%') AND ";

        $whereCaste = $tagArray['showCaste'] == false ? '' : "'" . $tagArray['caste'] . "' 
                        LIKE CONCAT('%',profile.caste,'%') AND ";

        $whereGotra = $tagArray['showGotra'] == false ? '' : "'" . $tagArray['gotra'] . "' 
                        LIKE CONCAT('%',profile.gotra,'%') AND ";

        $mandatoryClause = "profile.gender != '" . $gender . "' AND profile.userId != " . $id .
            " AND profile.status = 'ACTIVE'";

        $finalQuery =  $selectClause . $whereAgeGroup . $whereHeight . $whereMaritalStatus . $whereCaste . $whereGotra . $mandatoryClause;
        log_message('info', "Curated Query = " . $finalQuery);

        return $finalQuery;
    }
}
