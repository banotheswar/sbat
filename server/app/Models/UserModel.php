<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $db;
    protected $builder;
    function __construct()
    {
        $this->db = db_connect();
        $this->builder = $this->db->table("user");
    }

    public function getUser($email, $password)
    {
        try {
            $query = $this->builder->getWhere(array("email" => $email, "password" => md5($password)));
            //echo $this->last_query();
            return $query->getResult();
        } catch (\Exception $ex) {
            return NULL;
            log_message('info', 'Not able to fetch user details.');
        }
    }

    public function getUserById($id)
    {
        try {
            $query = $this->builder->getWhere(array("userId" => $id));
            //echo $this->last_query();
            return $query->getResult();
        } catch (\Exception $ex) {
            return NULL;
            log_message('info', 'Not able to fetch user details.');
        }
    }

    public function getByEmail($email)
    {
        try {
            $query = $this->builder->getWhere(array("email" => $email));
            //echo $this->last_query(); 
            return $query->getResult();
        } catch (\Exception $ex) {
            return NULL;
            log_message('info', 'Not able to fetch user details.');
        }
    }

    public function getByUniqueId($uniqueId)
    {
        try {
            $query = $this->builder->getWhere(array("uniqueId" => $uniqueId));
            //echo $this->last_query(); 
            return $query->getResult();
        } catch (\Exception $ex) {
            return NULL;
            log_message('info', 'Not able to fetch user details.');
        }
    }

    function create($form_array, $id = "")
    {
        if ($id > 0) {
            $this->builder->where("userId", $id);
            $this->builder->update($form_array);
            return $id;
        } else {
            $this->builder->set('addedDate', 'now()', FALSE);
            $this->builder->insert($form_array);
            return $this->db->insertID();
        }
    }

    function getPassword($id)
    {
        try {
            $this->builder->select("password");
            $query = $this->builder->getWhere(array("userId" => $id));
            return $query->getResult();
        } catch (\Exception $ex) {
            return NULL;
            log_message('info', 'Not able to fetch password.');
        }
    }
    function passwordUpdate($password, $id)
    {
        $this->builder->set("password", $password);
        $this->builder->where("userId", $id);
        $this->builder->update();
    }

    public function checkTime($userId)
    {
        try {
            $this->builder->select("now() as currentTime,addedDate,TIMESTAMPDIFF(HOUR,addedDate,now()) as time");
            $result = $this->builder->getWhere(array('userId' => $userId))->getResult();
            return $result[0]->time;
        } catch (\Exception $ex) {
            log_message('info', 'Not able to fetch Verification details.' . $ex);
            return NULL;
        }
    }
}
