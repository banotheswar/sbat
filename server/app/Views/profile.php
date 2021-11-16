<?php include 'common/header.php' ?>
<div class="content-wrapper">
    <div class="row">
        <div class="col-md-12 grid-margin">
            <div class="row">
                <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                    <h3 class="font-weight-bold">User Profile</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                <?php include 'common/message.php'?>
                    <h4 class="card-title">User Profile</h4>
                    <p class="card-description">
                        User Details
                    </p>
                    <form class="forms-sample" id="profileform" action="<?php echo base_url() . '/Profile/create'; ?>" method="post" name="userform" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="exampleInputName">Full Name</label>
                            <input required type="text" class="form-control" name="fullName" id="fullName" placeholder="Full Name" value="<?php echo $data[0]->fullName;?>">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail">Email address</label>
                            <input required type="email" class="form-control" name="email" id="email" placeholder="Email" value="<?php echo $data[0]->email;?>">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword">Mobile Number</label>
                            <input required pattern="^[0-9]{10}$" type="text" class="form-control" name="mobileNumber" id="mobileNumber" placeholder="Mobile Number" value="<?php echo $data[0]->mobileNumber;?>">
                        </div>                        
                        <input type="hidden" class="form-control" name="userId" id="userId" value="<?php echo $data[0]->userId;?>">
                        <button type="submit" id="submitBtn" class="btn btn-primary mr-2">Submit</button>
                        <button class="btn btn-light">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
     <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Update Password</h4>
                    <form class="forms-sample"id="passwordform" action="<?php echo base_url() . '/Profile/passwordUpdate'; ?>" method="post" name="passwordform" enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="oldpassword">Old Password</label>
                            <input required type="password" class="form-control" name="oldPassword" id="oldpassword" placeholder="Old Password" >
                        </div>
                        <div class="form-group">
                            <label for="newpassword">New Password</label>
                            <input required type="password" class="form-control" name="newPassword" id="newpassword" placeholder="New Password">
                        </div>
                        <input type="hidden" class="form-control" name="userId" id="userId" value="<?php echo $data[0]->userId;?>">
                        <button type="submit" id="submitBtn" class="btn btn-primary mr-2">Submit</button>
                        <button class="btn btn-light">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include 'common/footer.php' ?>
<script>
</script>