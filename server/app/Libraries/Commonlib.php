<?php
namespace App\Libraries; 

class Commonlib {    
    function encrypt_decrypt($action, $string) {
        $output = false;
        $encrypt_method = "AES-256-CBC";
        $secret_key = 'This is my secret key';
        $secret_iv = 'This is my secret iv';
        // hash
        $key = hash('sha256', $secret_key);
        // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
        $iv = substr(hash('sha256', $secret_iv), 0, 16);
        if ( $action == 'encrypt' ) {
            $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
            $output = base64_encode($output);
        } else if( $action == 'decrypt' ) {
            $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
        }
        return $output;
    }
    public function randomString($length =8, $type = '') {
        //substr(hash('sha256', mt_rand() . microtime()), 0, 20);
        $chars = ($type == "otp") ? "0123456789012345678901234567890123456789" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        srand((double) microtime() * 1000000);
        $i = 1;
        $pass = '';
        while ($i <= $length) {
            $num = rand() % 33;
            $tmp = substr($chars, $num, 1);
            $pass = $pass . $tmp;
            $i++;
        }
        return $pass;
    }

    public function formatDate($date,$expectedFormat = 'j-M-Y', $currentFormat = 'Y-m-d'){
        $date = \DateTime::createFromFormat($currentFormat, $date);
        return $date->format($expectedFormat);
    }
    
}
