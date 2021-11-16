<?php

namespace App\Database;

namespace App\Controllers;

use App\Libraries\Sendemail;
use App\Libraries\Commonlib;

class payment extends RestApiBaseController
{
    public $db;
    function __construct()
    {
        $this->db = db_connect();
        $this->commonlib = new Commonlib();
        $this->sendemail = new Sendemail();
        $this->builder = $this->db->table("payment");
        $router = service('router');
        if (!in_array($router->methodName(), ['failed', 'success'], true)) {
            parent::__construct();
        }
    }

    function getById()
    {
        try {
            $query = $this->builder->getWhere(array("userId" => $this->request->getVar('id')));
            $paymentObj = $query->getResult();
            if ($paymentObj == NULL) {
                return $this->failNotFound();
            } else {
                $response = array('payment' => $paymentObj[0]);
                return $this->respond($response);
            }
        } catch (\Exception $ex) {
            log_message('info', 'Could not fetch payment data: ' . $ex);
            return $this->failValidationError();
        }
    }

    function success($uniqueId)
    {
        $paymentId = $this->commonlib->encrypt_decrypt('decrypt', $uniqueId);
        $this->builder->update(array('status' => 'SUCCESS'), array('paymentId' => $paymentId));
        $paymentObj = $this->builder->getWhere(array("paymentId" => $paymentId))->getResult();

        $userBuilder = $this->db->table('user');
        $userObj = $userBuilder->getWhere(array('id' => $paymentObj[0]->userId))->getResult();

        $profileBuilder = $this->db->table('profile');
        $profileBuilder->where('userId', $paymentObj[0]->userId);
        $profileBuilder->update(array('status' => 'ACTIVE'));
        $message = 'Hi there!<br><br>Your payment of $100 was received successfully!<br><br>
        You can now continue to enjoy the subscription for the next one year.<br><br>Thanks,<br>Admin Team,<br>SBAT Matrimony';

        $this->sendemail->sendemail($userObj[0]->email, 'SBAT Matrimony : Payment | Success', $message); // Send our email
        return redirect()->to(FRONTEND_BASE_URL . 'paymentSuccess');
    }

    function failed($uniqueId)
    {

        $paymentId = $this->commonlib->encrypt_decrypt('decrypt', $uniqueId);
        $this->builder->update(array('status' => 'FAILED'), array('paymentId' => $paymentId));

        return redirect()->to(FRONTEND_BASE_URL . 'paymentFail');
    }

    function payment()
    {
        try {
            $form_array = array();

            $form_array['userId'] = $this->request->getVar('userId');
            $form_array['cardNumber'] = $this->request->getVar('cardNumber');
            $form_array['expireMonth'] = $this->request->getVar('expireMonth');
            $form_array['expireYear'] = $this->request->getVar('expireYear');
            $form_array['paymentDate'] = date("Y-m-d H:i:s");            
            $form_array['address'] = $this->request->getVar('address');
            $form_array['city'] = $this->request->getVar('city');
            $form_array['state'] = $this->request->getVar('state');            
            $form_array['zipCode'] = $this->request->getVar('zipCode');
            $form_array['amount'] = $this->request->getVar('amount');
            $echo = "line 87";
            $form_array['validThru'] = (date('Y') + 1) . date('-m-') . (date('d') - 1) . date(" H:i:s");
            $form_array['status'] = 'INITIATED';
            $this->builder->insert($form_array);
            //$echo = $this->db->getLastQuery();
            $paymentId = $this->db->insertID();

            return $this->respondCreated(array('payment' =>
            array(
                "uniqueId" => $this->commonlib->encrypt_decrypt('encrypt', $paymentId),
                "status" => $form_array['status']
            )));
        } catch (\Exception $ex) {
            log_message('info', 'Could not save payment data: ' . $ex);
            return $this->failValidationError('Data is either incorrect or incomplete.');
        }
    }

    function index()
    {
        echo "test2";
    }
}
