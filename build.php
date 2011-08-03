<?php

require_once 'Vendor/Packager/packager.php';
require_once 'Vendor/ClassLoader/UniversalClassLoader';

$loader = new UniversalClassLoader();

// register classes with namespaces
$loader->registerNamespaces(array(
    'Symfony\Component' => __DIR__.'/component',
    'Symfony' => __DIR__.'/framework',
    'Sensio' => array(__DIR__.'/src', __DIR__.'/vendor'),
));

$loader->register();

$packageDir = __DIR__;
$buildDir   = __DIR__ . '/Build';
$pkg = new Packager($packageDir);

echo "<pre>";
foreach ($pkg->get_all_files() as $file) {
    echo $file . "\n";
    echo 'Provides:    ' . join(',', $pkg->get_file_provides($file)) . "\n";
    echo 'Depends on:  ' . join(', ', $pkg->get_file_dependancies($file)) . "\n";
    echo 'Lives in     ' . $pkg->get_file_path($file) . "\n";
    echo 'Description: ' . $pkg->get_file_description($file) . "\n";
    echo "\n";
}

if (!is_dir($buildDir)) {
    mkdir($buildDir);
}

$pkg->write_from_files($buildDir . '/Lighter.js', $pkg->get_all_files());

