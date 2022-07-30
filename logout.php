<?php



setcookie('login' , '' ,  0) ;
setcookie('password' , '' , 0);

session_destroy() ;

$_SESSION = [] ;


header( 'Location: /', true, 307 );

?>