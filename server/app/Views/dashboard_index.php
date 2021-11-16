<?php include 'common/header.php' ?>
<!-- partial -->
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-md-12 grid-margin">
              <div class="row">
                <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                  <h3 class="font-weight-bold">Welcome <?php echo $fullName;?></h3>
                  <h6 class="font-weight-normal mb-0">All systems are running smoothly!</h6>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 grid-margin stretch-card">
              <div class="card tale-bg">
                <div class="card-people mt-auto">
                  <img src="<?php echo site_url('public/assets/images/')?>dashboard/people.svg" alt="people">
                  <div class="weather-info">
                    
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 grid-margin transparent">
              <div class="row">
                <div class="col-md-6 mb-4 stretch-card transparent">
                  <div class="card card-tale">
                    <div class="card-body">
                      <p class="mb-4"><a href="<?php echo site_url('Branches') ?>">Total Branches</a></p>
                      <p class="fs-30 mb-2"><?php echo $bcount?></p>                      
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mb-4 stretch-card transparent">
                  <div class="card card-dark-blue">
                    <div class="card-body">
                        <p class="mb-4"><a href="<?php echo site_url('Dashboard/auditors') ?>">Team Members</a></p>
                      <p class="fs-30 mb-2"><?php echo $acount?></p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>          
        </div>
        <!-- content-wrapper ends -->
        <!-- partial:partials/_footer.html -->
<footer class="footer">
          <div class="d-sm-flex justify-content-center">
            <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright &copy; <?php echo date('Y')?>. <a href="<?php echo site_url()?>" target="_blank">Audit Nirvaaha</a>. All rights reserved.</span>
            <div class="justify-content-right">
            <span class="text-muted text-center text-sm-left d-block d-sm-inline-block"><a href="<?php echo site_url('Terms')?>">Terms & Conditions And Privacy Policy</a></span>
            </div>
          </div>
        </footer>
        <!-- partial -->
      </div>
      <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
  <!-- container-scroller -->

  <!-- plugins:js -->
  <script src="<?php echo site_url('public/assets/vendors/')?>js/vendor.bundle.base.js"></script>
  <!-- endinject -->
  <!-- Plugin js for this page -->
  <script src="<?php echo site_url('public/assets/vendors/')?>chart.js/Chart.min.js"></script>
  <script src="<?php echo site_url('public/assets/vendors/')?>datatables.net/jquery.dataTables.js"></script>
  <script src="<?php echo site_url('public/assets/vendors/')?>datatables.net-bs4/dataTables.bootstrap4.js"></script>
  <script src="<?php echo site_url('public/assets/js/')?>dataTables.select.min.js"></script>
  <!-- End plugin js for this page -->
  <!-- inject:js -->
  <script src="<?php echo site_url('public/assets/js/')?>off-canvas.js"></script>
  <script src="<?php echo site_url('public/assets/js/')?>hoverable-collapse.js"></script>
  <script src="<?php echo site_url('public/assets/js/')?>template.js"></script>
  <script src="<?php echo site_url('public/assets/js/')?>settings.js"></script>
  <script src="<?php echo site_url('public/assets/js/')?>todolist.js"></script>
  <!-- endinject -->
  <!-- Custom js for this page-->
  <script src="<?php echo site_url('public/assets/js/')?>dashboard.js"></script>
  <script src="<?php echo site_url('public/assets/js/')?>todolist.js"></script>
  <script src="<?php echo site_url('public/assets/js/')?>Chart.roundedBarCharts.js"></script>
  <!-- End custom js for this page-->
</body>

</html>