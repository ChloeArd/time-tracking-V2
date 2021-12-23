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
        if(isset($_GET['id'])) {
            $stmt = $bdd->prepare("SELECT * FROM project WHERE id = :id");
            $stmt->bindValue(":id", $_GET['id']);
        }
        else {
            $stmt = $bdd->prepare("SELECT * FROM project");
        }
        if($stmt->execute()) {
            foreach ($stmt->fetchAll() as $info) {
                $response[] = [
                    'id' => $info['id'],
                    'name' => $info['name'],
                    'time' => $info['time'],
                    'date' => $info['date']
                ];
            }
        }
        echo json_encode($response);
        return json_encode($response);
}