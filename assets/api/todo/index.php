<?php

use Chloe\Portfolio\Model\DB;

session_start();
require_once '../../../DB.php';

$bdd = DB::getInstance();

header('Content-Type: application/json');

$requestType = $_SERVER['REQUEST_METHOD'];

switch ($requestType) {
    case 'GET':
        $response = [];
        if(isset($_GET['id'], $_GET['id2'])) {
            $stmt = $bdd->prepare("SELECT * FROM todo WHERE id = :id AND project_fk = :project_fk");
            $stmt->bindValue(":id", $_GET['id2']);
            $stmt->bindValue(":project_fk", $_GET['id']);
        }
        else {
            $stmt = $bdd->prepare("SELECT * FROM todo");
        }
        if($stmt->execute()) {
            foreach ($stmt->fetchAll() as $info) {
                $response[] = [
                    'id' => $info['id'],
                    'name' => $info['name'],
                    'time' => $info['time'],
                    'date' => $info['date'],
                    'project_fk' => $info['project_fk']
                ];
            }
        }
        return json_encode($response);
}