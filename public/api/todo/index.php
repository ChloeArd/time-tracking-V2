<?php

use Chloe\Timetracking\Model\DB;
use Chloe\Timetracking\Model\Manager\TodoManager;

session_start();

require "../../../vendor/autoload.php";
require_once '../../../DB.php';

$bdd = DB::getInstance();

header('Content-Type: application/json');

$requestType = $_SERVER['REQUEST_METHOD'];
$manager = new TodoManager();

switch ($requestType) {
    case 'GET':
        if(isset($_GET['id'])) {
            $manager->getTodo($_GET['id']);
        }
        else {
            $manager->getTodos();
        }

        return "";

    case 'POST':
        $response = [
            'error' => 'success',
            'message' => 'La tâche a été ajouté avec succès.',
        ];

        $data = json_decode(file_get_contents('php://input'));
        if (isset($data->name, $data->time, $data->date, $data->user_fk)) {

            $name = htmlentities(trim(ucfirst($data->name)));

            $content = new Project(null, $name, $data->time, $data->date, $_SESSION['id']);
            $result = $manager->add($content);
            if (!$result) {
                $response = [
                    'error' => 'error1',
                    'message' => 'Une erreur est survenue.',
                ];
            }
        }


    case 'PUT':
        $response = [
            'error' => 'success',
            'message' => 'Ok.',
        ];
        $data = json_decode(file_get_contents('php://input'));

        if (isset($data->id, $data->date, $data->idProject)) {
            if (DateTime::createFromFormat("d/m/Y", $data->date)) {
                $stmt = $bdd->prepare("UPDATE todo SET date = :date WHERE id = :id AND project_fk = :project_fk");
                $stmt->bindValue(":id", $data->id);
                $stmt->bindValue(":date", $data->date);
                $stmt->bindValue(":project_fk", $data->idProject);
                $stmt->execute();

                if (!$stmt->execute()) {
                    $response = [
                        'error' => 'error1',
                        'message' => 'Une erreur est survenue.',
                    ];
                }
            }
            else {
                $response = [
                    'error' => 'error3',
                    'message' => 'Le format de la date est invalide !',
                ];
            }
        }
        elseif (isset($data->id, $data->time, $data->idProject)) {
            if (DateTime::createFromFormat("h:i:s", $data->time)) {
                $stmt = $bdd->prepare("UPDATE todo SET time = :time WHERE id = :id AND project_fk = :project_fk");
                $stmt->bindValue(":id", $data->id);
                $stmt->bindValue(":time", $data->time);
                $stmt->bindValue(":project_fk", $data->idProject);
                $stmt->execute();

                if (!$stmt->execute()) {
                    $response = [
                        'error' => 'error1',
                        'message' => 'Une erreur est survenue.',
                    ];
                }
            }
            else {
                $response = [
                    'error' => 'error4',
                    'message' => 'Le format de l\'heure est invalide !',
                ];
            }
        }
        else {
            $response = [
                'error' => 'error2',
                'message' => 'Il manque une ou plusieurs valeur(s).',
            ];
        }

        echo json_encode($response);
        return json_encode($response);

    case 'DELETE':

        $response = [
            'error' => 'success',
            'message' => 'La tâche a été supprimé avec succès.',
        ];

        $data = json_decode(file_get_contents('php://input'));
        if (isset($data->id)) {
            $id = intval($data->id);

            $result = $manager->delete($id);

            if (!$result) {
                $response = [
                    'error' => 'error1',
                    'message' => 'Une erreur est survenue.',
                ];
            }
        }
        else {
            $response = [
                'error' => 'error2',
                'message' => 'L\'id est manquant.',
            ];
        }
        echo json_encode($response);
        return json_encode($response);
}