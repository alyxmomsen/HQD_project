<?php 


function getGoodsByModelName ($modelName) {
    
    require_once './db_connection.php' ;

    $statement = $pdo->prepare("SELECT * FROM `Goods` WHERE `modelname` = ? ORDER BY `taste` ASC") ;
    $statement->execute([$modelName]) ;
    $result = $statement->fetchAll(PDO::FETCH_ASSOC) ;

    return json_encode($result);
}

echo getGoodsByModelName($_POST['modelname']) ;

// echo json_encode($_POST) ;





?>