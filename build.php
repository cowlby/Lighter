<pre>
<?php

use Symfony\Component\ClassLoader\UniversalClassLoader;
use Symfony\Component\Finder\Finder;

require_once __DIR__ . '/Vendor/Packager/packager.php';
require_once __DIR__ . '/Vendor/Symfony/Component/ClassLoader/UniversalClassLoader.php';

$packageDir = __DIR__;
$buildDir   = __DIR__ . '/Build';
$vendorDir  = __DIR__ . '/Vendor';
$sourceDir  = __DIR__ . '/Source';
$stylesDir  = __DIR__ . '/Styles';

if (!is_dir($buildDir)) {
    mkdir($buildDir);
}

if (!is_dir($buildDir . '/Flames')) {
    mkdir($buildDir . '/Flames');
}

if (!is_dir($buildDir . '/Fuels')) {
    mkdir($buildDir . '/Fuels');
}

// Packager
$pkg = new Packager($packageDir);

echo "Building Lighter.js\n";
foreach ($pkg->get_all_files() as $file) {
    printf("* %s \n", $file);
}
$pkg->write_from_files($buildDir . '/Lighter.js', $pkg->get_all_files());
echo "\n";

// Custom Build
$loader = new UniversalClassLoader();
$loader->registerNamespaces(array('Symfony\Component' => $vendorDir));
$loader->register();

$fuels = Finder::create()
    ->files()
    ->name('/^Fuel\.(\w+)\.js$/')
    ->in($sourceDir);

echo "Copying Fuels\n";
foreach ($fuels as $fuel) {
    copy($fuel->getRealPath(), $buildDir . '/Fuels/' . $fuel->getFilename());
    printf("* %s \n", $fuel->getFilename());
}
echo "\n";

$flames = Finder::create()
    ->files()
    ->name('/^Flame\.(\w+)\.css$/')
    ->in($stylesDir);
    
echo "Copying Flames\n";
foreach ($flames as $flame) {
    copy($flame->getRealPath(), $buildDir . '/Flames/' . $flame->getFilename());
    printf("* %s \n", $flame->getFilename());
}
echo "\n";
?>
</pre>
