<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Home extends ResourceController
{
    //protected $UserModel = 'App\Models\UserModel';
    protected $format    = 'json';

    public function index()
    {
        // header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
        header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, PATCH, OPTIONS');
        header('Access-Control-Max-Age: 1000');
        $db      = \Config\Database::connect();
        /* $builder = $db->table('configs');
        $query   = $builder->get();
        $result = $query->getResult(); */
        return $this->respond('test');
    }
}
