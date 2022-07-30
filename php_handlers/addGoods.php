<?php 

require_once './db_connection.php' ;

class AddGoods {

    


    public function __construct()
    {
        
    }

    
}


$ag = new AddGoods () ;


$name = "../upload/" . $_FILES['alex-data']["name"];
move_uploaded_file($_FILES['alex-data']["tmp_name"], $name);

echo json_encode($_FILES['alex-data']);
// echo json_encode($_POST) ;


// mail('my.own.gin@yandex.ru' , 'hello world' , 'hello man');

?>