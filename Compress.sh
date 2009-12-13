#!/bin/bash
YUI=/usr/local/bin/yuicompressor

if [ ! -d Source ] ; then
  echo "Source folder is missing."
  exit 1
fi

if [ ! -d Compressed ] ; then
  echo "Creating Compressed folder."
  mkdir Compressed
else
  echo "Recreating Compressed folder."
  rm -rf Compressed
  mkdir Compressed
fi

cd Source

echo "Joining Lighter/Fuel"
cat Lighter.js > Lighter.full.js
cat Fuel.js >> Lighter.full.js

echo "Compressing Lighter.js."
java -jar $YUI -o ../Compressed/Lighter.js Lighter.full.js

echo "Removing temp Lighter.full.js file."
rm Lighter.full.js

echo "Compressing Fuels."
for file in Fuel.*.js ; do
  java -jar $YUI -o ../Compressed/$file $file
  echo $file
done

cd ../Styles

echo "Compressing Flames."
for file in Flame.*.css ; do
  java -jar $YUI -o ../Compressed/$file $file
  echo $file
done

cd ../assets

echo "Compressing final files."
java -jar $YUI -o ../Compressed/ZeroClipboard.js ZeroClipboard.js
