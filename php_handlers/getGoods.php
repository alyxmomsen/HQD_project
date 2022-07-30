<?php 


class GoodsManager {

    public $data ;


    public function smthRequest ($query) {

        require_once './db_connection.php' ;

        $statement = $pdo->prepare($query) ;
        $statement->execute() ;
        $result = $statement->fetchAll(PDO::FETCH_ASSOC) ;

        return $result ;

    }


    public function getSomeGoods($limit , $op1 = '') {
        
        require_once './db_connection.php' ;

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

    function __construct()
    {
        
    }


}

$goodsManager = new GoodsManager();


if($_POST['type'] === 'to_landing') {
    
    $goodsManager->getSomeGoods(3);
} else {

    if($_POST['type'] === 'to_goods') {

        

        // echo $goodsManager->toGoods();

        echo json_encode($goodsManager->toGoods()) ;

    }
}








?>