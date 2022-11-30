<?php
// written by Kostas Maistrelis
$sleep_create = 3;
$sleep_return = 3;
//  written by Kostas Maistrelis
function myErrorHandler($errno, $errstr, $errfile, $errline)
{
  error_log('error');
  header('HTTP/1.1 500 Internal Server Error');
  header('Content-Type: text/plain; charset=utf-8');

  // $errstr may need to be escaped:
  $errstr = htmlspecialchars($errstr);

  switch ($errno) {
    case E_USER_ERROR:
      echo "<b>My ERROR</b> [$errno] $errstr<br />\n";
      echo "  Fatal error on line $errline in file $errfile";
      echo ', PHP ' . PHP_VERSION . ' (' . PHP_OS . ")<br />\n";
      echo "Aborting...<br />\n";
      exit(1);

    case E_USER_WARNING:
      echo "<b>My WARNING</b> [$errno] $errstr<br />\n";
      break;

    case E_USER_NOTICE:
      echo "<b>My NOTICE</b> [$errno] $errstr<br />\n";
      break;

    default:
      echo "Unknown error type: [$errno] $errstr<br />\n";
      break;
  }

  /* Don't execute PHP internal error handler */
  return true;
}
$old_error_handler = set_error_handler('myErrorHandler');


// written by Kostas Maistrelis
if (isset($_GET['post'])){
  try {
    //throw new Exception('debug exception');
    //trigger_error('debug error');
    sleep($sleep_create);
    $data = json_decode(stripslashes(file_get_contents("php://input")), true);
    file_put_contents('data.json', json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));

  } catch (Throwable $e) {
    error_log('catch throwable');
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Error caught: ' . $e->getMessage();
  }
  
} else {


  sleep($sleep_return);

  header('Content-Type: application/json; charset=utf-8');
  $data = file_get_contents('data.json');
  echo $data;
}



