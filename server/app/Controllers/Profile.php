<?php

namespace App\Database;

namespace App\Controllers;

use App\Libraries\Sendemail;
use App\Libraries\Commonlib;

class Profile extends RestApiBaseController
{
    public $db;
    function __construct()
    {
        $this->db = db_connect();
        $this->commonlib = new Commonlib();
        $this->sendemail = new Sendemail();
        $this->builder = $this->db->table("profile");
        parent::__construct();
    }

    public function save()
    {
        try {
            $form_array = array();

            $form_array['userId'] = $this->request->getVar('userId');
            $form_array['profileFor'] = $this->request->getVar('profileFor');
            $form_array['firstName'] = $this->request->getVar('firstName');
            $form_array['lastName'] = $this->request->getVar('lastName');
            $form_array['gender'] = $this->request->getVar('gender');
            $form_array['dob'] = $this->request->getVar('dob');
            $form_array['height'] = $this->request->getVar('height');
            $form_array['maritalStatus'] = $this->request->getVar('maritalStatus');
            $form_array['motherName'] = $this->request->getVar('motherName');
            $form_array['motherAge'] =  $this->request->getVar('motherAge');
            $form_array['motherOccupation'] = $this->request->getVar('motherOccupation');
            $form_array['fatherName'] = $this->request->getVar('fatherName');
            $form_array['fatherAge'] = $this->request->getVar('fatherAge');
            $form_array['fatherOccupation'] = $this->request->getVar('fatherOccupation');
            $form_array['familyIncome'] =  $this->request->getVar('familyIncome');
            $form_array['city'] = $this->request->getVar('city');
            $form_array['state'] = $this->request->getVar('state');
            $form_array['familyValues'] = $this->request->getVar('familyValues');
            $form_array['highestEducation'] = $this->request->getVar('highestEducation');
            $form_array['ugDegree'] = $this->request->getVar('ugDegree');
            $form_array['ugCollege'] = $this->request->getVar('ugCollege');
            $form_array['pgDegree'] = $this->request->getVar('pgDegree');
            $form_array['pgCollege'] =  $this->request->getVar('pgCollege');
            $form_array['occupation'] = $this->request->getVar('occupation');
            $form_array['income'] = $this->request->getVar('income');
            $form_array['desiredAgeGroup'] = $this->request->getVar('desiredAgeGroup');
            $form_array['desiredHeight'] = $this->request->getVar('desiredHeight');
            $form_array['desiredGender'] = $this->request->getVar('desiredGender');
            $form_array['desiredMaritalStatus'] = $this->request->getVar('desiredMaritalStatus');
            $form_array['caste'] = $this->request->getVar('caste');
            $form_array['gotra'] =  $this->request->getVar('gotra');
            $form_array['rasi'] = $this->request->getVar('rasi');
            $form_array['nakshatra'] = $this->request->getVar('nakshatra');
            $form_array['desiredCaste'] = $this->request->getVar('desiredCaste');
            $form_array['desiredGotra'] = $this->request->getVar('desiredGotra');


            $profileId = $this->request->getVar('profileId');
            if (!empty($profileId)) {
                $form_array['profileId'] = $this->commonlib->encrypt_decrypt('decrypt', $this->request->getVar('profileId'));;
                $this->builder->where('profileId', $form_array['profileId']);
                $this->builder->update($form_array);
            } else {
                $form_array['status'] = 'INACTIVE';
                $form_array['profileNumber'] = 'SBAT' . substr($form_array['gender'], 0, 1) . $form_array['userId'];
                $this->builder->insert($form_array);
            }
            $profileId = $this->db->insertID();
            $form_array['profileId'] = $this->commonlib->encrypt_decrypt('encrypt', $profileId);
            return $this->respondCreated(array('profile' => $form_array));
        } catch (\Exception $ex) {
            log_message('info', 'Could not save profile data: ' . $ex);
            return $this->failValidationError('Data is either incorrect or incomplete.');
        }
    }

    function getById()
    {
        $responseArray = array();
        try {
            $artifactBuilder = $this->db->table('artifact');
            $artifactQuery = $artifactBuilder->getWhere(array("userId" => $this->request->getVar('id')));
            $artifactObj = $artifactQuery->getResult();
            // echo $this->db->getLastQuery();
            // print_r(artifactObj);exit();

            $profileQuery = $this->builder->getWhere(array("userId" => $this->request->getVar('id')));
            $profileObj = $profileQuery->getResult();

            if ($profileObj != NULL) {
                $profileObj[0]->profileId = $this->commonlib->encrypt_decrypt('encrypt', $profileObj[0]->profileId);
                $profileObj[0]->state = $profileObj[0]->state == "" ? null : $profileObj[0]->state;
                $profileObj[0]->gender = $profileObj[0]->gender == "" ? null : $profileObj[0]->gender;
                $profileObj[0]->profileFor = $profileObj[0]->profileFor == "" ? null : $profileObj[0]->profileFor;
                $profileObj[0]->maritalStatus = $profileObj[0]->maritalStatus == "" ? null : $profileObj[0]->maritalStatus;
                $profileObj[0]->familyValues = $profileObj[0]->familyValues == "" ? null : $profileObj[0]->familyValues;
                $profileObj[0]->desiredAgeGroup = $profileObj[0]->desiredAgeGroup == "" ? null : $profileObj[0]->desiredAgeGroup;
                $profileObj[0]->desiredHeight = $profileObj[0]->desiredHeight == "" ? null : $profileObj[0]->desiredHeight;
                // $profileObj[0]->desiredGender = $profileObj[0]->desiredGender == "" ? null : $profileObj[0]->desiredGender;
                $profileObj[0]->nakshatra = $profileObj[0]->nakshatra == "" ? null : $profileObj[0]->nakshatra;
                $profileObj[0]->rasi = $profileObj[0]->rasi == "" ? null : $profileObj[0]->rasi;
                $profileObj[0]->caste = $profileObj[0]->caste == "" ? null : $profileObj[0]->caste;
                $responseArray['profile'] = $profileObj[0];
            }

            if ($artifactObj != NULL) {
                $artifactObj[0]->artifactId = $this->commonlib->encrypt_decrypt('encrypt', $artifactObj[0]->artifactId);
                $responseArray['artifact'] = $artifactObj[0];
            }

            return ($artifactObj == NULL && $profileObj == NULL) ? $this->failNotFound() : $this->respond($responseArray);
        } catch (\Exception $ex) {
            log_message('info', 'Could not fetch profile data: ' . $ex);
            return $this->failValidationError();
        }
    }

    function getByProfileNumber()
    {
        $responseArray = array();
        try {
            $profileQuery = $this->builder->getWhere(array("profileNumber" => strtoupper($this->request->getVar('profileNumber'))));
            $profileObj = $profileQuery->getResult();

            if ($profileObj == NULL) {
                return $this->failNotFound();
            }

            $profileObj[0]->profileId = $this->commonlib->encrypt_decrypt('encrypt', $profileObj[0]->profileId);
            $responseArray['profile'] = $profileObj[0];

            $artifactBuilder = $this->db->table('artifact');
            $artifactQuery = $artifactBuilder->getWhere(array("userId" => $profileObj[0]->userId));
            $artifactObj = $artifactQuery->getResult();

            if ($artifactObj != NULL) {
                $artifactObj[0]->artifactId = $this->commonlib->encrypt_decrypt('encrypt', $artifactObj[0]->artifactId);
                $responseArray['artifact'] = $artifactObj[0];
            }

            return $this->respond($responseArray);
        } catch (\Exception $ex) {
            log_message('info', 'Could not fetch profile data: ' . $ex);
            return $this->failValidationError();
        }
    }

    function index()
    {
        echo "test2";
    }

    function avatar()
    {

        $result =  $this->fileUpload(
            'avatar',
            $_FILES['avatar'],
            $this->request->getVar('userName'),
            $this->request->getVar('id')
        );

        if ($result == 'fail') {
            return $this->failValidationError();
        } else if ($result == 'error') {
            return $this->failValidationError('Error while processing the file.');
        } else {
            return $this->respondUpdated(array('name' => $result, 'status' => 'done'));
        }
    }

    function photos()
    {
        $result1 = $result2 = '';
        $insertPos = 2;
        $file1 = $this->request->getVar('file1');
        if (isset($file1) && is_string(($file1))) {
            $insertPos = $this->request->getVar('fileNumber') == 1 ? 2 : 1;
            $result1 = $file1;
        } else {
            $result1 = $this->fileUpload(
                'photo1',
                $_FILES['file1'],
                $this->request->getVar('userName'),
                $this->request->getVar('id')
            );
        }
        $file2 = isset($_FILES['file2']) ? $_FILES['file2'] : '';
        $result2 = 'no';
        if (!empty($file2)) {
            $file2 = $this->fileUpload(
                'photo' . $insertPos,
                $_FILES['file2'],
                $this->request->getVar('userName'),
                $this->request->getVar('id')
            );

            if ($file2 != 'fail' && $file2 != 'error') {
                $result2 = 'yes';
            } else {
                $result2 = 'error';
            }
        }

        if ($result1 != 'fail' && $result1 != 'error') {
            if ($result2 == 'yes') {
                return $this->respondUpdated(array('file1' => $result1, 'file2' => $file2, 'status' => 'done'));
            } else if ($result2 == 'error') {
                return $this->failValidationError('Error while processing file2.');
            } else {
                return $this->respondUpdated(array('file1' => $result1, 'status' => 'done'));
            }
        } else {
            return $this->failValidationError('Error while processing file1.');
        }
    }

    function deletePhoto()
    {
        try {
            $builder = $this->db->table("artifact");
            $builder->where("userId", $this->request->getVar('id'));
            $builder->update(
                array("photo" . $this->request->getVar('fileNumber') . 'FileName' => ""),
                array("userId" => $this->request->getVar('id'))
            );
            return $this->respondUpdated(array('status' => 'deleted'));
        } catch (\Exception $ex) {
            log_message('info', 'Could not delete photo' . $this->request->getVar('fileNumber') . ' for userId : '
                . $this->request->getVar('id') . ' :     ' . $ex);
            return $this->failValidationError('Error while deleting the file.');
        }
    }

    function horoscope()
    {
        $result = $this->fileUpload(
            'horoscope',
            $_FILES['horoscope'],
            $this->request->getVar('userName'),
            $this->request->getVar('id')
        );

        if ($result == 'fail') {
            return $this->failValidationError();
        } else if ($result == 'error') {
            return $this->failValidationError('Error while processing the file.');
        } else {
            return $this->respondUpdated(array('name' => $result, 'status' => 'done'));
        }
    }

    private function fileUpload($type, $fileName, $userName, $id)
    {
        try {
            if ($fileName["error"] == '' && $fileName["name"] != '') {
                $allowed_extension = array('jpg', 'jpeg', 'png');
                $file_array = pathinfo($fileName["name"]);
                $file_name =  $userName . '_' . $id . '_' . time() . '.' . $file_array['extension'];
                $location = (pathinfo($_SERVER['SCRIPT_FILENAME']));
                $uploads_dir = $location['dirname'] . "/writable/uploads/" . $type . "/" . $file_name;
                if (in_array(strtolower($file_array['extension']), $allowed_extension)) {
                    if (move_uploaded_file($fileName["tmp_name"], $uploads_dir)) {
                        $form_array[$type . 'FileName'] =  $file_name;
                        $builder = $this->db->table("artifact");
                        $prevRecord = $builder->getWhere(array("userId" => $id))->getResult();
                        if ($prevRecord != NULL) {
                            $builder->where("userId", $id);
                            $builder->update($form_array);
                        } else {
                            $form_array['userId'] =  $id;
                            $builder->insert($form_array);
                        }
                        return $file_name;
                    }
                } else {
                    return 'fail';
                }
            } else {
                return 'fail';
            }
        } catch (\Exception $ex) {
            log_message('info', 'Could not save ' . $type . ':     ' . $ex);
            return 'error';
        }
    }
}
