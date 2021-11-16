<?php

namespace App\Libraries;

use Firebase\JWT\JWT;
use App\Libraries\Commonlib;
use DateTimeImmutable;

class Apiserver
{
    function getToken()
    {
        $payload = array(
            'iss' => FRONTEND_BASE_URL . 'server/',
            'aud' => FRONTEND_BASE_URL,
            'iat' => time(),
            'exp' => time() + 60 * 30
        );
        $jwt = JWT::encode($payload, $this->getSecret(), 'HS512');
        return $jwt;
    }

    private function getSecret()
    {
        $this->commonlib = new Commonlib();
        return $this->commonlib->encrypt_decrypt('encrypt', JWT_KEY);
    }

    function validateToken($jwt)
    {
        try {
            $token = JWT::decode($jwt, $this->getSecret(), ['HS512']);
            $now = new DateTimeImmutable();
            if ($token->exp < $now->getTimestamp()) {
                return 'Token Éxpired';
            } else {
                return 'Valid';
            }
        } catch (\Exception $ex) {
            log_message('info', 'Token error: ' . $ex);
            return 'Invalid Token';
        }
    }
}
