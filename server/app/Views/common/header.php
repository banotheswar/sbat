<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
   <title>Audit Nirvaaha </title>
  <!-- plugins:css -->
  <link rel="stylesheet" href="<?php echo site_url('public/assets/vendors/')?>feather/feather.css">
  <link rel="stylesheet" href="<?php echo site_url('public/assets/vendors/')?>ti-icons/css/themify-icons.css">
  <link rel="stylesheet" href="<?php echo site_url('public/assets/vendors/')?>css/vendor.bundle.base.css">
  <!-- endinject -->
  <!-- Plugin css for this page -->
  <link rel="stylesheet" href="<?php echo site_url('public/assets/vendors/')?>datatables.net-bs4/dataTables.bootstrap4.css">
  <link rel="stylesheet" href="<?php echo site_url('public/assets/vendors/')?>ti-icons/css/themify-icons.css">
  <link rel="stylesheet" type="text/css" href="<?php echo site_url('public/assets/js/')?>select.dataTables.min.css">
  <!-- End plugin css for this page -->
  <!-- inject:css -->
  <link rel="stylesheet" href="<?php echo site_url('public/assets/')?>css/horizontal-layout-light/style.css">
  <!-- endinject -->
  <link rel="shortcut icon" href="<?php echo site_url('public/assets/images/')?>favicon.png" />
  <script>
      homePage = '<?php echo site_url()?>';
  </script>
    <style>
        .breadcrumb {
            border: 0px;
        }
        .dropdown .dropdown-toggle:after{
            color: #053f60;
        }
        .tdwrappingclass {
            word-wrap: break-word;
            word-break: break-all;
            white-space: normal !important;
            text-align: justify;
        }
    </style>
</head>
<?php $session = \Config\Services::session();?> 
<body>
  <div class="container-scroller">
    <!-- partial:partials/_horizontal-navbar.html -->    
    <?php include 'menu.php' ?>
    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">