<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Office Drive - Registration</title>
  <!-- plugins:css -->
  <link rel="stylesheet" href="<?php echo site_url('public/assets/')?>vendors/feather/feather.css">
  <link rel="stylesheet" href="<?php echo site_url('public/assets/')?>vendors/ti-icons/css/themify-icons.css">
  <link rel="stylesheet" href="<?php echo site_url('public/assets/')?>vendors/css/vendor.bundle.base.css">
  <!-- endinject -->
  <!-- Plugin css for this page -->
  <!-- End plugin css for this page -->
  <!-- inject:css -->
  <link rel="stylesheet" href="<?php echo site_url('public/assets/')?>css/horizontal-layout-light/style.css">
  <!-- endinject -->
  <link rel="shortcut icon" href="<?php echo site_url('public/assets/')?>images/favicon.png" />
</head>

<body>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-stretch auth auth-img-bg">
        <div class="row flex-grow">
          <div class="col-lg-6 d-flex align-items-center justify-content-center">
            <div class="auth-form-transparent text-left p-3">
              <div class="brand-logo">
                  <a href="<?php echo site_url() ?>">
                      <img src="<?php echo site_url('public/assets/') ?>images/vang-logo.jpg" alt="logo">
                  </a>
              </div>
              <h4>New here?</h4>
              <h6 class="font-weight-light">Join us today! It takes only few steps</h6>
              <form class="pt-3" action="<?php echo base_url() . '/Login/registerUser'; ?>" method="post" id="createUserForm">
                <div class="form-group">
                  <label>Full Name</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class="ti-user text-primary"></i>
                      </span>
                    </div>
                    <input required type="text" class="form-control form-control-lg border-left-0" id="regFullName" name="fullName" placeholder="Full Name">
                  </div>
                </div> 
                <div class="form-group">
                  <label>Email</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class="ti-email text-primary"></i>
                      </span>
                    </div>
                    <input required type="email" id="regEmail" name="email" class="form-control form-control-lg border-left-0" placeholder="Email">
                  </div>
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class="ti-lock text-primary"></i>
                      </span>
                    </div>
                    <input required type="password" class="form-control form-control-lg border-left-0" id="regPassword"  name="password" placeholder="Password" autocomplete="off">                        
                  </div>
                </div>
                <div class="form-group">
                  <label>Mobile Number</label>
                  <div class="input-group">
                    <div class="input-group-prepend bg-transparent">
                      <span class="input-group-text bg-transparent border-right-0">
                        <i class="ti-mobile text-primary"></i>
                      </span>
                    </div>
                    <input required type="text" pattern="^[0-9]{10}$" class="form-control form-control-lg border-left-0" id="regMobileNumber" name="mobileNumber" placeholder="Mobile Number">
                  </div>
                </div>
                <div class="mb-4">
                  <div class="form-check">
                      <input required type="checkbox" class="form-check-input">
                      <a target="_blank" href="<?php echo site_url('Terms')?>">I agree to all Terms & Conditions</a>
                  </div>
                </div>
                <div class="mt-3">
                  <button type="submit" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
                </div>
                <div class="text-center mt-4 font-weight-light">
                  Already have an account? <a href="<?php echo site_url('Login')?>" class="text-primary">Login</a>
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-6 register-half-bg d-flex flex-row">
            <p class="text-white font-weight-medium text-center flex-grow align-self-end">Copyright &copy; 2021  All rights reserved.</p>
          </div>
        </div>
      </div>
      <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <!-- container-scroller -->
  <!-- plugins:js -->
  <script src="<?php echo site_url('public/assets/')?>vendors/js/vendor.bundle.base.js"></script>
  <!-- endinject -->
  <!-- Plugin js for this page -->
  <!-- End plugin js for this page -->
  <!-- inject:js -->
  <script src="<?php echo site_url('public/assets/')?>js/off-canvas.js"></script>
  <script src="<?php echo site_url('public/assets/')?>js/hoverable-collapse.js"></script>
  <script src="<?php echo site_url('public/assets/')?>js/template.js"></script>
  <script src="<?php echo site_url('public/assets/')?>js/settings.js"></script>
  <script src="<?php echo site_url('public/assets/')?>js/todolist.js"></script>
  <!-- endinject -->
  <!-- Custom js for this page-->
  <!-- End custom js for this page-->
</body>

</html>

