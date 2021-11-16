<?php

namespace App\Database;

namespace App\Controllers;

use App\Libraries\Commonlib;
use App\Libraries\Sendemail;
use App\Libraries\Apiserver;
use CodeIgniter\RESTful\ResourceController;

class Login extends ResourceController
{
    public $db;
    protected $commonlib;
    function __construct()
    {
        $this->db = db_connect();
        $this->commonlib = new Commonlib();
        $this->sendemail = new Sendemail();
        $this->api = new Apiserver();
        $this->db = db_connect();
        $this->builder = $this->db->table("user");
        header("Control-Type: application/json");
        header('Access-Control-Allow-Origin: http://localhost:3001');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method == "OPTIONS") {
            die();
        }
    }

    var $totalItemQuantity = 0;

    public function index()
    {
        return $this->respondNoContent();
    }
    public function signin()
    {
        $email =  $this->request->getVar('email');
        $password =  $this->request->getVar('password');
        if ($email != "" && $password != "") {
            $query = $this->builder->getWhere(array("email" => $email, "password" => md5($password)));
            $userObj = $query->getResult();
            if ($userObj == NULL) {
                return $this->failNotFound();
            } else {
                $profileBuilder = $this->db->table('profile');
                $profileQuery = $profileBuilder->getWhere(array("userId" => $userObj[0]->id));
                $profileObj = $profileQuery->getResult();
                $userObj[0]->desiredHeight = $profileObj == NULL ? '' : $profileObj[0]->desiredHeight;
                $userObj[0]->desiredAgeGroup = $profileObj == NULL ? '' : $profileObj[0]->desiredAgeGroup;
                $userObj[0]->desiredMaritalStatus = $profileObj == NULL ? '' : $profileObj[0]->desiredMaritalStatus;
                $userObj[0]->desiredCaste = $profileObj == NULL ? '' : $profileObj[0]->desiredCaste;
                $userObj[0]->desiredGotra = $profileObj == NULL ? '' : $profileObj[0]->desiredGotra;
                $userObj[0]->profileGender = $profileObj == NULL ? '' : $profileObj[0]->gender;
                $userObj[0]->profileStatus = $profileObj == NULL ? 'INACTIVE' : $profileObj[0]->status;


                $response = array('user' => $userObj[0], 'token' => $this->api->getToken());
                return $this->respond($response);
            }
        } else {
            return $this->failValidationError();
        }
    }

    public function forgotPassword()
    {
        $email =  $this->request->getVar("email");
        $responseArray = $this->builder->getWhere(array("email" => $email))->getResult();
        if ($responseArray == NULL || $responseArray[0]->status != 'ACTIVE') {
            return $this->failNotFound();
        }
        $encodedId = $this->commonlib->encrypt_decrypt('encrypt', $responseArray[0]->id);
        $message = ' Hi there! <br> <br>
            Please reset your password by clicking on the URL below: <br>' . FRONTEND_BASE_URL . 'resetPassword/' . $encodedId .
            '<br><br>Thanks,<br>Admin Team,<br>SBAT Matrimony';

        $this->sendemail->sendemail($email, 'SBAT Matrimony : Password Reset Link ', $message); // Send our email
        return $this->respondNoContent('Mail Sent');
    }

    public function resetPassword($encodedId)
    {
        $userId =   $this->commonlib->encrypt_decrypt('decrypt', $encodedId);
        $builder = $this->db->table("user");
        $builder->where("id", $userId);
        $builder->update(array('password' => $this->request->getVar("password")));
        return redirect()->to(FRONTEND_BASE_URL . 'pwSuccess');
    }
}
