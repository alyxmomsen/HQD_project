<?php 

require_once '../db_connection.php' ;

class GoodsManager {

    public $data ;

    public $pdo ;

    public function smthRequest ($query) {

        $pdo = $this->pdo ;
        $statement = $pdo->prepare($query) ;
        $statement->execute() ;
        $result = $statement->fetchAll(PDO::FETCH_ASSOC) ;

        return $result ;
    }

    public function getSomeGoods($limit , $op1 = '') {

        $pdo = $this->pdo ;
        $statement = $pdo->prepare("SELECT * FROM `Goods` ORDER BY `id` /* ASC */DESC LIMIT {$limit}") ;
        $statement->execute() ;
        $result = $statement->fetchAll(PDO::FETCH_ASSOC) ;

        echo json_encode($result);
    }

    public function toGoods () {

        $brands = $this->smthRequest('SELECT DISTINCT `brandname` FROM `Goods`');
        $models = $this->smthRequest('SELECT DISTINCT `modelname` FROM `Goods`') ;

        return [$brands , $models] ;
    }

    function __construct($pdo)
    {
        $this->pdo = $pdo ;        
    }
}

$goodsManager = new GoodsManager($pdo);


if($_POST['type'] === 'to_landing') {
    
    $goodsManager->getSomeGoods(3);
} else {

    if($_POST['type'] === 'to_goods') {

        echo json_encode($goodsManager->toGoods()) ;

    }
}







?>