<?php

namespace App\Database;

namespace App\Controllers;

use App\Libraries\Sendemail;
use App\Libraries\Commonlib;

class Interest extends RestApiBaseController
{
    public $db;
    function __construct()
    {
        $this->db = db_connect();
        $this->commonlib = new Commonlib();
        $this->sendemail = new Sendemail();
        $this->builder = $this->db->table("interest");
        parent::__construct();
    }

    public function save()
    {
        try {
            $form_array = array();

            $form_array['fromUser'] = $this->request->getVar('fromUserId');
            $form_array['toUser'] = $this->request->getVar('toUserId');
            $form_array['sentDate'] = date("Y-m-d H:i:s");
            $fromProfileNumber = $this->request->getVar('fromProfileNumber');
            $toProfileNumber = $this->request->getVar('toProfileNumber');
            $fromEmail = $this->request->getVar('fromEmail');

            $interestId = $this->request->getVar('interestId');
            if (isset($interestId)) {
                $form_array['interestId'] = $this->commonlib->encrypt_decrypt('decrypt', $this->request->getVar('interestId'));;
                $this->builder->where('interestId', $form_array['interestId']);
                $this->builder->update($form_array);
            } else {
                $this->builder->insert($form_array);
            }
            $interestId = $this->db->insertID();
            $form_array['interestId'] = $this->commonlib->encrypt_decrypt('encrypt', $interestId);
            $toUserArray = $this->db->table("user")->getWhere(array("id" => $form_array['toUser']))->getResult();
            $this->sendInterestMail(
                $fromProfileNumber,
                $toProfileNumber,
                $fromEmail,
                $toUserArray[0]->email
            );
            return $this->respondCreated(array('interest' => $form_array));
        } catch (\Exception $ex) {
            log_message('info', 'Could not save interest data: ' . $ex);
            return $this->failValidationError('Data is either incorrect or incomplete.');
        }
    }

    private function sendInterestMail($fromProfileNumber, $toProfileNumber, $fromEmail, $toEmail)
    {
        $toUserMessage = 'Hi there!<br><br>A person has shown interest on your profile. Click on the link below to know who it is!
        <br><br>' . 'http://matrimony.tribandtech.com/profile/' . $fromProfileNumber . '
        <br><br>Thanks,<br>Admin Team,<br>SBAT Matrimony';
        $this->sendemail->sendemail($toEmail, 'SBAT Matrimony : Interest Received', $toUserMessage); // Send our email

        $fromUserMessage = 'Hi there!<br><br>You have recently shown interest on a profile. To view the profile again, click on the link below!
        <br><br>' . 'http://matrimony.tribandtech.com/profile/' . $toProfileNumber . '
        <br><br>Thanks,<br>Admin Team,<br>SBAT Matrimony';
        $this->sendemail->sendemail($fromEmail, 'SBAT Matrimony : Interest Sent', $fromUserMessage); // Send our email
    }

    public function getById()
    {
        try {
            $id = $this->request->getVar('id');
            $interests = $this->builder->select('toUser')
                ->getWhere(array("fromUser" => $id))->getResult();
            $interestArray = array();
            if (isset($interests)) {
                foreach ($interests as $interest) {
                    array_push($interestArray, $interest->toUser);
                }
            }
            return $this->respondCreated(array('interest' => implode(",", $interestArray)));
        } catch (\Exception $ex) {
            log_message('info', 'Could not fetch interest data: ' . $ex);
            return $this->failServerError();
        }
    }
}
