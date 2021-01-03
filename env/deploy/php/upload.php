<?php

function fail($msg) {
    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
    die($msg);
}

function deleteDir($dirPath) {
    if (! is_dir($dirPath)) {
        if (file_exists($dirPath)) {
        fail("$dirPath must be a directory");
    }
        return true;
    }
    if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
        $dirPath .= '/';
    }
    $files = glob($dirPath . '{,.}[!.,!..]*',GLOB_MARK|GLOB_BRACE); // from: https://stackoverflow.com/a/33059445/5221762
    foreach ($files as $file) {
        if (is_dir($file)) {
            deleteDir($file);
        } else {
            unlink($file);
        }
    }
    return rmdir($dirPath);
}

$uploadedPath = $_FILES["zip_file"]["tmp_name"];

if (!$uploadedPath) {
    fail('Uploaded file is null');
}

$zipPath = __DIR__ . '/deploy.zip';
$tempDir = __DIR__ . '/unzipped';
$destDir = __DIR__ . '/../' . $_POST['basePath'];

if (file_exists($zipPath)) {
    unlink($zipPath);
}

if(!move_uploaded_file($uploadedPath, $zipPath)) {
    fail("Error move uploaded file ($uploadedPath) to ($zipPath)");
}

$zip = new ZipArchive();
$x = $zip->open($zipPath);
if ($x === true) {
    $zip->extractTo($tempDir);
    $zip->close();
}

if (!deleteDir($destDir)) {
    fail("Error remove directory: $destDir");
}

if (!rename($tempDir, $destDir)) {
    fail("Error rename directory from ($tempDir) to ($destDir)");
}

unlink($zipPath);

echo 'Deploy successful!';
