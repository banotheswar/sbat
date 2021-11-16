import React from "react";

function Footer() {
  return (
    <footer>
      <div className="copy-right">
        <div className="container">
          <p>
            &emsp;|&emsp;
            <a href="/"> Home</a>&emsp;|&emsp;
            <a href="/terms"> Terms</a>&emsp;|&emsp;
            <a href="/privacyPolicy"> Privacy</a>&emsp;|&emsp;
            <a href="/contact"> Contact Us</a>&emsp;|&emsp;
          </p>
        </div>
        <div className="container">
          <p>
            © {new Date().getFullYear()} All rights reserved | Maintained by{" "}
            <a href="http://sbatsevas.org"> SBAT</a> | Powered By{" "}
            <a href="http://tribandtech.com"> Tribandtech</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
