<?php
namespace App\Libraries; 

class Imagefile  {
    public $CI;

    public function uploadfile($folder,$data,$preFix = "logo_",$previousImage="",$resize="off") {
        $location = (pathinfo($_SERVER['SCRIPT_FILENAME']));
        $uploads_dir = $location['dirname'] . "/assets/uploads/" . $folder . "/";
        $fileNames = "";
        $tmp_name = $data["tmp_name"];
        $name = $data["name"];
        $fileExtension = pathinfo($name, PATHINFO_EXTENSION);
        $newfilename = $preFix . date("ymdhms") . '.' . $fileExtension;
        $fulldest = $uploads_dir . $newfilename;        
        if (move_uploaded_file($tmp_name, $fulldest)) {
            if($resize != "off") {
                $this->resizeIamge($fulldest);
            }
            if($previousImage != "")
                $this->removePreviousImage($folder, $previousImage);     //deleting existing image
            return $newfilename;
        } else {
            log_message("error", "Error File uploading");
            exit("Error File Uploading");
        }
    }
    public function getImages($image) {
        $fileInfo = pathinfo($image);
        $extension = $fileInfo['extension'];
        $filename = $fileInfo['filename'];
        $thumbImg = $filename."_thumb.".$extension; 
        return array($image,$thumbImg);
    }
    public function resizeIamge($fulldest,$width=450,$height=45) {
        $this->CI =& get_instance();         
        $this->CI->load->library('image_lib');        
        $img_array = array();
        $img_array['image_library'] = 'gd2';
        $img_array['maintain_ratio'] = TRUE;
        $img_array['create_thumb'] = TRUE;
        //you need this setting to tell the image lib which image to process
        $img_array['source_image'] = $fulldest;
        $img_array['width'] = $width;
        //$img_array['height'] = $height;
        $this->CI->image_lib->clear(); // added this line
        $this->CI->image_lib->initialize($img_array); // added this line
        if (!$this->CI->image_lib->resize()) {
            echo $this->CI->image_lib->display_errors();
            exit;
        }
    }
    public function removePreviousImage($folder,$images) {
        $location = (pathinfo($_SERVER['SCRIPT_FILENAME']));
        $uploads_dir = $location['dirname'] . "/assets/upload/" . $folder . "/";
        $fileExtension = pathinfo($images);
        $imageThubmnail = $fileExtension['filename']."_thumb.".$fileExtension['extension'];
        if (file_exists($uploads_dir . $images)) {
            unlink($uploads_dir . $images);
        }
        if (file_exists($uploads_dir . $imageThubmnail)) {
            unlink($uploads_dir . $imageThubmnail);
        }
        
        
    }
    public function getFileLocation($src,$pathType,$foldername) {
        $src = strtok($src,'?');
        $fileInfo = pathinfo($src);
        $fileName = $fileInfo['filename'].".".$fileInfo['extension']; 
        if($pathType == 'relativePath') {
            $location = (pathinfo($_SERVER['SCRIPT_FILENAME']));
            $uploads_dir = $location['dirname'] . "/assets/uploads/".$foldername."/".$fileName;              
        } else {
            $uploads_dir = site_url(). "/assets/uploads/".$foldername."/".$fileName;
        }
       
        return $uploads_dir;        
    }
    function cropImage($thumb_image_name, $image, $width, $height, $start_width, $start_height,$foldername){
            $thumb_image_name = $this->getFileLocation($image,"relativePath",$foldername);            
            list($imagewidth, $imageheight, $imageType) = getimagesize($image);
            $imageType = image_type_to_mime_type($imageType);

            $newImageWidth = $width;
            $newImageHeight = $height;
            $newImage = imagecreatetruecolor($width,$height);
            switch($imageType) {
                    case "image/gif":
                            $source=imagecreatefromgif($image); 
                            break;
                case "image/pjpeg":
                    case "image/jpeg":
                    case "image/jpg":
                            $source=imagecreatefromjpeg($image); 
                            break;
                case "image/png":
                    case "image/x-png":
                            $source=imagecreatefrompng($image); 
                            break;
            }
            imagecopyresampled($newImage,$source,0,0,$start_width, $start_height,$newImageWidth,$newImageHeight,$width, $height);
            switch($imageType) {
                    case "image/gif":
                            imagegif($newImage,$thumb_image_name); 
                            break;
            case "image/pjpeg":
                    case "image/jpeg":
                    case "image/jpg":
                            imagejpeg($newImage,$thumb_image_name,90); 
                            break;
                    case "image/png":
                    case "image/x-png":
                            imagepng($newImage,$thumb_image_name);  
                            break;
        }
            chmod($thumb_image_name, 0777);
            return $this->getFileLocation($image,"absolutePath",$foldername);
    }
    function getFileName($src) {
        $src = strtok($src,'?');
        $fileInfo = pathinfo($src);
        return $fileInfo['filename'].".".$fileInfo['extension'];         
    }

    
}
