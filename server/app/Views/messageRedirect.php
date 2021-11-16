<!DOCTYPE html>
<html lang="en">

<head></head>

<body>
    <input type="hidden" id="msg" value=<?php echo $msg; ?> />
    <input type="hidden" id='baseUrl' value=<?php echo FRONTEND_BASE_URL; ?> />
    <script>
        window.postMessage(document.getElementById('msg').value, document.getElementById('baseUrl').value);
        window.location.href = document.getElementById('baseUrl').value + 'commonLauncher';
    </script>
</body>

</html>