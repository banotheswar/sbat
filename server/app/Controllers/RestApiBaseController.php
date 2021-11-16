<?php

namespace App\Database;

namespace App\Controllers;

use App\Libraries\Apiserver;
use CodeIgniter\Config\Services;
use CodeIgniter\RESTful\ResourceController;

class RestApiBaseController extends ResourceController
{
    function __construct()
    {
        $this->api = new Apiserver();
        header("Control-Type: application/json");
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method == "OPTIONS") {
            die();
        }
        $token = substr($_SERVER['HTTP_AUTHORIZATION'], 7);
        if (!isset($token) || $this->api->validateToken($token) != 'Valid') {
            header('HTTP/1.1 401 Unauthorized');
            exit;
        }
    }
}
