<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Libraries\Commonlib;
use App\Libraries\Sendemail;

class User extends ResourceController
{
    public $db;
    function __construct()
    {
        $this->db = db_connect();
        $this->commonlib = new Commonlib();
        $this->sendemail = new Sendemail();
        header("Control-Type: application/json");
        header('Access-Control-Allow-Origin: http://localhost:3000');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method == "OPTIONS") {
            die();
        }
    }

    public function create()
    {
        $builder = $this->db->table("user");

        $form_array = array();
        $form_array['name'] = $this->request->getVar('name');
        $form_array['phone'] = $this->request->getVar('phone');
        $form_array['email'] = $this->request->getVar('email');
        $form_array['password'] = md5($this->request->getVar('password'));
        $form_array['status'] = 'INACTIVE';

        $existingUser = $builder->getWhere(array('email' => $form_array['email']))->getResult();
        if (isset($existingUser[0])) {
            return $this->failResourceExists('Duplicate E-mail');
        }

        $builder->insert($form_array);
        $userId = $this->db->insertID();
        $form_array['encryption'] = $this->commonlib->encrypt_decrypt('encrypt', $userId);

        $message = 'Hi there!<br><br>Thanks for signing up!<br><br>
        Please activate your account by clicking on the URL below:<br>' .
            'http://matrimony.tribandtech.com/server/user/activateUser/' .  $form_array['encryption'] . '
        <br><br>Please note that this link will be valid only for 24 hours.<br><br>Thanks,<br>Admin Team,<br>SBAT Matrimony';

        $this->sendemail->sendemail($form_array['email'], 'SBAT Matrimony : Signup | Verification', $message); // Send our email
        return $this->respondCreated($form_array);
    }

    function index()
    {
        echo "test2";
    }

    function activateUser($encodedId)
    {
        $userId =   $this->commonlib->encrypt_decrypt('decrypt', $encodedId);
        $builder = $this->db->table("user");
        $builder->where("id", $userId);
        $builder->update(array('status' => 'ACTIVE'));
        return redirect()->to(FRONTEND_BASE_URL . 'loginVerified');
    }
}
