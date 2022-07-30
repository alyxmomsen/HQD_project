<?php 

function checkLoginAndPass ($l , $p) {

    require_once './db_connection.php' ;
    
    $query = "SELECT * FROM `users` WHERE `nickname`=? AND `password`=?" ;
    $statement = $pdo->prepare($query) ;
    $statement->execute([$l , $p]) ;
    $result = $statement->fetchAll(PDO::FETCH_ASSOC) ;

    if(count($result)) {

        return $result[0] ;
    }
    else {

        return false ;
    }

    // ssss
}


function getUserDataByID ($id) {

    require_once './db_connection.php' ;

    $query = "SELECT * FROM `users` WHERE `id`= ? " ;
    $statement = $pdo->prepare($query) ;
    $statement->execute([$id]) ;
    $result = $statement->fetchAll(PDO::FETCH_ASSOC) ;

    if(count($result)) {

        if(count($result) == 1) {

            return $result[0] ;
        }
        else {

            return false ;
        }   
    }
    else {

        return false ;
    }
} 

function checkCookie ($log , $pass) {

    require_once './db_connection.php' ;

    $pdo = new PDO("mysql:host=localhost;dbname=another;cahrset=utf8", 'root', '');
    $query = "SELECT * FROM `users` WHERE `nickname`=? AND `password`=?" ;
    $statement = $pdo->prepare($query) ;
    $statement->execute([$log , $pass]) ;
    $result = $statement->fetchAll(PDO::FETCH_ASSOC) ;

    


    if(count($result)) {
        
        
        return true ;
    }
    else {
        return false ;
    }

}

?>
<?php 

session_start() ;




if(isset($_COOKIE['login']) && isset($_COOKIE['password'])) {

    
    

    if(checkCookie($_COOKIE['login'] , $_COOKIE['password'])) {

        

        if(!isset($_SESSION['id'])) {


            $userByLoginPass = checkLoginAndPass($_COOKIE['login'] , $_COOKIE['password']) ;


            if(count($userByLoginPass)) {
                
                $_SESSION['id'] = $userByLoginPass['id'] ;
    
                header( 'Location: /', true, 307 );

            }
            else {

            }



            
        }
        else {

            $userByID = getUserDataByID($_SESSION['id']) ;

            if($userByID) {

                

                if($_COOKIE['login'] === $userByID['nickname'] && $_COOKIE['password'] === $userByID['password']) {
                    header( 'Location: /', true, 307 );
                }
            }
        }
    }

}
else {
    // echo 'nope' ;
}


if(isset($_POST['log_in'])) {
    
    

    $login = $_POST['login'] ;
    $password = $_POST['password'] ;

    // echo $password ;
    // echo '<br>' ;
    // echo $login ;

    $userDataSet = checkLoginAndPass($login , $password) ;

    // print_r($userDataSet) ;

    if($userDataSet) {

        setcookie('login' , $userDataSet['nickname']) ;
        setcookie('password' , $userDataSet['password']) ;

        $_SESSION['user_id'] = $userDataSet['id'] ;


        header( 'Location: /', true, 307 );

    }
    else {

    }




       

        

        
    // print_r($_COOKIE);
 


}
else {

}



?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <form action="<?= $_SERVER['PHP_SELF'] ?>" method="post">
    Логин: <input type="text" name="login" />
    
    Пароль: <input type="password" name="password" />
    <input type="submit" value="войти" name="log_in" />
    
    </form>
</body>
</html>


