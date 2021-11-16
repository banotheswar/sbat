<?php

namespace App\Libraries;

class Sendemail
{
    protected $email;
    function __construct()
    {
        $this->email = \Config\Services::email();
    }

    public function sendemail($to, $subject, $message)
    {
        //        $this->email->setFrom('info@auditnirvaaha.com', 'Audit Nirvaaha');
        //        $this->email->setTo($to);
        //        $this->email->setSubject($subject);
        //        $this->email->setMessage($message);
        //        if (!$this->email->send()) {
        //            log_message('error', 'Error sending emails to '.$this->email->printDebugger());
        //            ///show_error($this->email->print_debugger());
        //        }   
        $data = array('email' => $to, 'subject' => $subject, "message" => $message);
        $url = "http://165.232.177.77/audittool/Emailapi";
        $handle = curl_init($url);
        curl_setopt($handle, CURLOPT_POST, true);
        curl_setopt($handle, CURLOPT_POSTFIELDS, $data);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
        $content  = curl_exec($handle);
        curl_close($handle);
        log_message("error", "email sending status" . $content);
        return;
    }
}
