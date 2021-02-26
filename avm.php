<?php
header('Content-Type: application/json');

// create a new cURL resource
$ch = curl_init();

// set URL and other appropriate options

$qs = $_GET["q"];
$get_url = "http://104.248.71.117/"; //q=" . $qs;

//echo $get_url;

//print($get_url . $qs);
$data = array (
  'q' => $qs
);

$params = '';
foreach($data as $key=>$value)
  $params .= $key.'='.$value.'&';
  $params = trim($params, '&');

curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_PORT, 3000);
curl_setopt($ch, CURLOPT_URL, $get_url . "?" . $params);

echo "{\n";
echo "  \"q\": \"" . $qs . "\",\n";
// grab URL and pass it to the browser
echo "  \"result\": \"";  
$avm = curl_exec($ch);
echo "\"\n}";

//print($url);
//print($content);

// close cURL resource, and free up system resources
curl_close($ch);

//print $avm;
?>
