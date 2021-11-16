<?php include_once 'externalheader.php'; ?>
  <!-- /#page-wrapper -->
  <div class="modal fade" id="commonLauncherModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="commonLauncher"><?php echo $heading?></h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" style="margin-top: -3%">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="login-box">
            <div>
              <div class="card-body login-card-body">
                <div class="input-group mb-3">
                <?php echo $content?>
                </div>
              </div>
              <!-- /.card-body -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="<?php echo site_url('public/assets/')?>vendors/js/vendor.bundle.base.js"></script>
  <script src="<?php echo site_url('public/assets/')?>js/off-canvas.js"></script>
  <script src="<?php echo site_url('public/assets/')?>js/hoverable-collapse.js"></script>
  <script src="<?php echo site_url('public/assets/')?>js/template.js"></script>
  <script src="<?php echo site_url('public/assets/')?>js/settings.js"></script>
  <script src="<?php echo site_url('public/assets/')?>js/todolist.js"></script>
  <script>
    $(document).ready(function() {
      $("#commonLauncherModal").modal("show");
    });
 
    $('#commonLauncherModal').on('hidden.bs.modal', function () {
      window.location.href= "<?php echo base_url()."/Login"; ?>";
    });
  </script>
<?php include_once 'externalfooter.php'; ?>
 