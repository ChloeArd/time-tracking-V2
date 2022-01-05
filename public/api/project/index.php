<?php

use Chloe\Timetracking\Model\DB;
use Chloe\Timetracking\Model\Entity\Project;
use Chloe\Timetracking\Model\Manager\ProjectManager;
use Chloe\Timetracking\Model\Manager\TodoManager;
use RedBeanPHP\R;
use RedBeanPHP\RedException\SQL;

session_start();

require "../../../vendor/autoload.php";
require_once '../../../source/Model/DB.php';

$bdd = DB::getInstance();

header('Content-Type: application/json');

$requestType = $_SERVER['REQUEST_METHOD'];
$manager = new ProjectManager();

switch ($requestType) {
    case 'GET':
        if(isset($_GET['id'])) {
            $manager->getProject($_GET['id'], $_SESSION['id']);
        }
        else {
            $manager->getProjects($_SESSION['id']);
        }

        return "";

    case 'POST':
        $response = [
            'error' => 'success',
            'message' => 'Votre projet a été ajouté avec succès !',
        ];

        $data = json_decode(file_get_contents('php://input'));
        if (isset($data->name, $data->time, $data->date)) {

            $project = R::dispense("project");

            $project->name = htmlentities(trim(ucfirst($data->name)));
            $project->time = $data->time;
            $project->date = $data->date;
            $project->userFk = $_SESSION['id'];

            try {
                R::store($project);
            }
            catch (SQL $e) {
                echo "Une erreur est survenue !";
            }
        }

    case 'PUT':
        $response = [
            'error' => 'success',
            'message' => 'Ok.',
        ];

        $data = json_decode(file_get_contents('php://input'));

        if (isset($data->id, $data->date, $data->time, $data->idTodo, $data->dateTodo, $data->timeTodo)) {
            $stmt = $bdd->prepare("UPDATE project SET date = :date, time = :time WHERE id = :id");
            $stmt->bindValue(":id", $data->id);
            $stmt->bindValue(":date", $data->date);
            $stmt->bindValue(":time", $data->time);
            $stmt->execute();

            $stmt = $bdd->prepare("UPDATE todo SET date = :date, time = :time WHERE id = :id AND project_fk = :project_fk");
            $stmt->bindValue(":project_fk", $data->id);
            $stmt->bindValue(":id", $data->idTodo);
            $stmt->bindValue(":date", $data->dateTodo);
            $stmt->bindValue(":time", $data->timeTodo);

            if (!$stmt->execute()) {
                $response = [
                    'error' => 'error1',
                    'message' => 'Une erreur est survenue.',
                ];
            }
        }
        elseif (isset($data->id, $data->time)) {
            $stmt = $bdd->prepare("UPDATE project SET time = :time WHERE id = :id");
            $stmt->bindValue(":id", $data->id);
            $stmt->bindValue(":time", $data->time);
            $stmt->execute();
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
            'message' => 'Le projet a été supprimé avec succès.',
        ];

        $data = json_decode(file_get_contents('php://input'));
        if (isset($data->id)) {
            $todoManager = new TodoManager();
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
