
<?php include 'common/header.php' ?>
<!-- partial -->
<style>
    /*    ::marker {
            font-size: 2rem;
        }*/
    .blink-text{
        color: #000;
        font-weight: bold;
        font-size: 2rem;
        animation: blinkingText 2s infinite;
    }
    @keyframes blinkingText{
        0%		{ color: blue;}
        25%		{ color: green;}
        50%		{ color: gold;}
        75%		{ color: gold;}
        100%	{ color: gold;}
    }
    .workpaperslist li{
        margin:0 0 1.5rem 0; 
        font-size: 1rem;
        color: #fff;
    }
</style>
<div class="container-fluid page-body-wrapper">
    <div class="main-panel">
        <div class="content-wrapper" style="padding: 0;">
            <div class="row" style="background-color: #053f60;">
                <div class="col-lg-12">
                    <div class="card px-2" style="background-color: #053f60;">
                        <div class="card-body">
                            <div class="row">

                                <div class="col-md-8">
                                    <div class="container-fluid" style="font-family: 'Montserrat',sans-serif; font-size: 40px; font-weight: 800; color: #fff;">
                                        <h1 class="text-left my-3 font-weight-bold">&nbsp;&nbsp;Work papers Made Easy</h1>
                                    </div>
                                    <div class="container-fluid d-flex justify-content-between">
                                        <div class="col-lg-12">
                                            <ul class="font-weight-bold workpaperslist" style="list-style: none;">
                                                <li><i class="ti-check-box mr-2"></i> Easy to maintain Branch Wise Workpapers </li>
                                                <li><i class="ti-check-box mr-2"></i> Guided checklists for Bank Branch Audit</li>
                                                <li><i class="ti-check-box mr-2"></i> Easy to use your own checklist</li>
                                                <li><i class="ti-check-box mr-2"></i> Workpaper Documentation option for loans</li>
                                                <li><i class="ti-check-box mr-2"></i> Option to record your communication with bank and their reply at all levels.</li>
                                                <li><i class="ti-check-box mr-2"></i> Option to attach the supporting documents at all levels for future references </li>
                                                <li><i class="ti-check-box mr-2"></i> One Click Work Paper Report</li>                                                
                                            </ul>  
<!--                                            <p style="text-align: center;"><a href="<?php //echo site_url("Login/signup")     ?>" class="btn btn-success" style="font-weight: 700; font-size: 1.5rem;">Subscribe @ &#8377; 2999/-</a></p>
                                            -->
                                        </div>
                                    </div>
                                </div>   
<!--                                <div class="col-md-4">
                                    <div class="card">
                                        <p class="blink-text">New!!!</p>
                                        <img src="<?php //echo site_url('public/assets/images/') ?>vangi_bank_audit.jpg" alt="about us" style="width:auto;height: auto">
                                    </div>
                                </div>-->
                                <div class="col-md-4">
                                    <div class="card">
                                        <div class="card-body">
                                            <h4>REGISTER WITH US!!!</H4>
                                            <form class="pt-3" action="<?php echo base_url() . '/Login/registerUser'; ?>" method="post" id="createUserForm">
                                                <div class="form-group">
                                                    <input required type="text" class="form-control form-control-lg" id="regFullName" name="fullName" placeholder="Full Name">
                                                </div>
                                                <div class="form-group">
                                                    <input required type="email" id="regEmail" name="email" class="form-control form-control-lg" placeholder="Email">
                                                </div>
                                                <div class="form-group">
                                                    <input required type="password" class="form-control form-control-lg" id="regPassword"  name="password" placeholder="Password" autocomplete="off">
                                                </div>
                                                <div class="form-group">
                                                    <input required type="text" pattern="^[0-9]{10}$" class="form-control form-control-lg" id="regMobileNumber" name="mobileNumber" placeholder="Mobile Number">
                                                </div>
                                                <button type="submit" class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN UP</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card px-2">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="card">
                                        <img src="<?php echo site_url('public/assets/images/') ?>auditor.png" alt="about us" style="width:auto;height: auto">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="container-fluid">
                                        <h3 class="text-left my-3 font-weight-bold">&nbsp;&nbsp;Who We Are ?</h3>
                                    </div>
                                    <div class="container-fluid d-flex justify-content-between">
                                        <div class="col-lg-12">
                                            <p class="mt-2 mb-2">Audit Nirvaaha is a Start-up that is strategized and managed by Audit and Financial Experts. They are keen on making High-level Accuracy Audit Reports generating Software for different types of Business and its operation, Using which Businesses can make successful Strategical Decisions.</p>
                                            <p class="mt-2 mb-2">The Products of Audit Nirvaaha are easily customizable and incredibly easy to use online Auditing/Accounting software. It allows you to integrate different business operations, manage various operations like tracking Business financial Status, generating Reports, and monitor business performances at any time.</p>
                                        </div>
                                    </div>
                                </div>        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <div class="row portfolio-grid">
                                        <div class="container-fluid">
                                            <h3 class="text-left font-weight-bold" style="padding-bottom: .5rem;">&nbsp;&nbsp;Products</h3>
                                        </div>
                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                                            <figure class="effect-text-in" id="vangi">
                                                <img src="<?php echo site_url('public/assets/images/') ?>erp.jpg" alt="image">
                                                <figcaption>
                                                    <h4>Vangi</h4>
                                                    <p>Vangi is ERP developed for Bank Auditors to make Bank audit easy, accurate , and user Friendly</p>
                                                </figcaption>
                                            </figure>
                                        </div>
                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                                            <figure class="effect-text-in">
                                                <img src="<?php echo site_url('public/assets/images/') ?>SA-505.png" alt="image">
                                                <figcaption>
                                                    <h4>External Confirmation - SA 505</h4>
                                                    <p>Coming soon...</p>
                                                </figcaption>
                                            </figure>
                                        </div>
                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                                            <figure class="effect-text-in">
                                                <img src="<?php echo site_url('public/assets/images/') ?>telegram.jpg" alt="image">
                                                <figcaption>
                                                    <h4>AskYourBot</h4>
                                                    <p>Coming soon...</p>
                                                </figcaption>
                                            </figure>
                                        </div>
                                        <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                                            <figure class="effect-text-in">
                                                <img src="<?php echo site_url('public/assets/images/') ?>gst-audit.jpg" alt="image">
                                                <figcaption>
                                                    <h4>GST audit tool</h4>
                                                    <p>Coming soon...</p>
                                                </figcaption>
                                            </figure>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   





        </div>
        <!-- content-wrapper ends -->
        <!-- partial:partials/_footer.html -->
        <?php include 'common/footer.php' ?>
        <script src="<?php echo site_url('public/assets/vendors/') ?>jquery.avgrund/jquery.avgrund.min.js"></script>
        <script>
            (function ($) {
                'use strict';
                $(function () {
                    $('#vangi').avgrund({
                        height: 386,
                        holderClass: 'custom',
                        showClose: true,
                        showCloseText: 'x',
                        onBlurContainer: '.container-scroller',
                        template: '<p><img src="<?php echo site_url('public/assets/images/') ?>vang-logo.jpg" alt="image" style="width:286px"> Vangi is ERP developed for Bank Auditors to make Bank audit easy, accurate , and user Friendly. By which Banker can understand their Financial Growth, Risk, NPA,etc in a better picture for their Growth. Vangi Team have strived to make ERP that complies and Contains Most of All Important Audit Report Questionnaire.</p>' +
                                '<div class="text-center mt-4">' +
                                '<a href="#" target="_blank" class="btn btn-success mr-2">Know more..!</a>' +
                                '</div>'
                    });
                })
            })(jQuery);
        </script>