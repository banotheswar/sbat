<?php

namespace App\Database;

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class ContactUs extends ResourceController
{
    public $db;
    function __construct()
    {
        $this->db = db_connect();
        $this->builder = $this->db->table("contact_us");
        header("Control-Type: application/json");
        header('Access-Control-Allow-Origin: http://localhost:3000');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method == "OPTIONS") {
            die();
        }
    }

    public function save()
    {
        try {
            $form_array = array();
            $form_array['name'] = $this->request->getVar('name');
            $form_array['email'] = $this->request->getVar('email');
            $form_array['subject'] = $this->request->getVar('subject');
            $form_array['message'] = $this->request->getVar('message');
            $form_array['addedDate'] = date("Y-m-d H:i:s");
            $this->builder->insert($form_array);
            return $this->respondCreated(array('contactUs' => $form_array));
        } catch (\Exception $ex) {
            log_message('info', 'Could not save contact-us data: ' . $ex);
            return $this->failValidationError('Data is either incorrect or incomplete.');
        }
    }
}
