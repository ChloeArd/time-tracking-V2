<?php

use Chloe\Timetracking\Model\DB;
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

            //$manager->add(htmlentities(trim(ucfirst($data->name))), $data->time, $data->date, $_SESSION['id']);
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
            $manager->updateTimeDate($data->id, $data->time, $data->date);

            $managerTodo = new TodoManager();
            $managerTodo->updateDateTime($data->idTodo, $data->timeTodo, $data->dateTodo);

        }
        elseif (isset($data->id, $data->time)) {

            $manager->updateTime($data->id, $data->time);
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
