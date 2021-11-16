<?php
if(!function_exists('getCommentsList'))
{
    function getCommentsList($jsonObj){
        $jsonObj = json_decode($jsonObj);        
        if(!is_array($jsonObj)) {
            return "";
        }
        $html = '<ul class="list-arrow">';
        foreach($jsonObj as $obj){
            foreach($obj as $row){
                $html .= "<li><strong>".$row->type."</strong> :".$row->comment."</li>";
            }
        }
        return $html;
    }
}