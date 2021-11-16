<div class="horizontal-menu">
    <nav class="navbar top-navbar col-lg-12 col-12 p-0" style="background-color: #fff;">
        <div class="container">
            <?php if ($session->has('userId') != null && $session->has('userId')) { ?>
                <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <a class="navbar-brand brand-logo" href="<?php echo site_url("Home") ?>"><img src="<?php echo site_url('public/assets/images/') ?>vang-logo.jpg" alt="logo" /></a>
                    <a class="navbar-brand brand-logo-mini" href="<?php echo site_url("Home") ?>"><img src="<?php echo site_url('public/assets/images/') ?>vang-logo.jpg" alt="logo"/></a>
                </div>
                <ul class="nav page-navigation" style="width:60%">
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo site_url("Dashboard") ?>">
                            <span class="menu-title">Dashboard</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="<?php echo site_url("Knowledge") ?>" class="nav-link">
                            <span class="menu-title">Knowledge Bank</span></a>
                    </li>
                    <li class="nav-item">
                        <a href="<?php echo site_url("Branches") ?>" class="nav-link">
                            <span class="menu-title">Branches</span></a>
                    </li>            
                    <li class="nav-item">
                        <a href="<?php echo site_url("Viewreport") ?>" class="nav-link">
                            <span class="menu-title">View Report</span></a>
                    </li>               
                </ul>
            <?php } else { ?>
                <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <a class="navbar-brand brand-logo" href="<?php echo site_url("Home") ?>"><img src="<?php echo site_url('public/assets/images/') ?>siteLogo.png" alt="logo" style="outline: #68ab51 1px solid;"/></a>
                    <a class="navbar-brand brand-logo-mini" href="<?php echo site_url("Home") ?>"><img src="<?php echo site_url('public/assets/images/') ?>siteLogo.png" alt="logo"/></a>
                </div>
                <ul class="nav page-navigation" style="width:60%">
                    <li class="nav-item">
                        <a class="nav-link" href="<?php echo site_url("Home") ?>">
                            <span class="menu-title">Home</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="<?php echo site_url("Products") ?>" class="nav-link">
                            <span class="menu-title">Products</span></a>
                    </li>
                    <li class="nav-item">
                        <a href="<?php echo site_url("Aboutus") ?>" class="nav-link">
                            <span class="menu-title">About Us</span></a>
                    </li>            
                    <li class="nav-item">
                        <a href="<?php echo site_url("Contactus") ?>" class="nav-link">
                            <span class="menu-title">Contact Us</span></a>
                    </li>            
                    <li class="nav-item" style="margin-left: 6rem;">
                        <a href="<?php echo site_url("Login") ?>" class="nav-link rounded btn-success">
                            <span class="menu-title">Login/Signup</span></a>
                    </li>            
                </ul>
            <?php } ?>
            <?php if ($session->has('userId') != null && $session->has('userId')) { ?>
                <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <ul class="navbar-nav navbar-nav-right">
                        <li class="nav-item nav-profile dropdown">
                            <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                                <img src="<?php echo site_url('public/assets/images/') ?>profile.png" alt="profile"/>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                                <a class="dropdown-item" href="<?php echo site_url('profile'); ?>">
                                    <i class="ti-settings text-primary"></i>
                                    Settings
                                </a>
                                <a class="dropdown-item" href="<?php echo site_url('Contactus'); ?>">
                                    <i class="icon-head menu-icon  text-primary"></i>
                                    Contact Us
                                </a>
                                <a class="dropdown-item" href="<?php echo site_url('Login/logout'); ?>">
                                    <i class="ti-power-off text-primary"></i>
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                    <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="horizontal-menu-toggle">
                        <span class="ti-menu"></span>
                    </button>
                </div>
            <?php } ?>
        </div>
    </nav>

</div>