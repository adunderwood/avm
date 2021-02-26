<?php
//header('Content-Type: application/text');

// create a new cURL resource
$ch = curl_init();

// set URL and other appropriate options

$word = $_GET["word"];
$category = $_GET["category"];

$get_url = "http://104.248.71.117/"; //q=" . $qs;

//echo $get_url;

//print($get_url . $qs);
$data = array (
  'word' => $word,
  'category' => $category
);

$params = '';
foreach($data as $key=>$value)
  $params .= $key.'='.$value.'&';
  $params = trim($params, '&');

curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_PORT, 3001);
curl_setopt($ch, CURLOPT_URL, $get_url . "?" . $params);

echo "{\n";
echo "  \"word\": \"" . $word . "\",\n";
echo "  \"category\": \"" . $category . "\",\n";

// grab URL and pass it to the browser
echo "  \"result\": \"";
$train = curl_exec($ch);
echo "\"\n}";

// close cURL resource, and free up system resources
curl_close($ch);
?>
