<?php

namespace Chloe\Timetracking\Model\Manager;

use Chloe\Timetracking\Model\Entity\Project;
use Chloe\Timetracking\Model\Entity\Todo;
use RedBeanPHP\R;
use RedBeanPHP\RedException\SQL;

class TodoManager {

    /**
     * view all task to project
     */
    public function getTodos() {
        $todo = R::getAll("SELECT * FROM todo") ;
        print_r(json_encode($todo));
    }

    /**
     * view one task
     * @param int $id
     */
    public function getTodo(int $project_fk, int $id) {
        $todo = R::findOne("todo", "id = ? AND project_fk = ?", [$id, $project_fk]);
        print_r(json_encode($todo));
    }

    /**
     * add a task
     * @param Todo $todo
     */
    public function add(Todo $todo) {
        $list = R::dispense("user");

        $list->name = $todo->getName();
        $list->time = $todo->getTime();
        $list->date = $todo->getDate();
        $list->projectFk = $todo->getProjectFk()->getId();

        try {
            R::store($list);
        }
        catch (SQL $e) {
            echo "Une erreur est survenue !";
        }
    }

    /**
     * update name to task
     * @param Todo $todo
     */
    public function updateName(int $id, string $name) {
        $project = R::load("todo", $id);

        $project->name = $name;

        try {
            R::store($project);
        }
        catch (SQL $e) {
            echo "Une erreur est survenue";
        }
    }

    /**
     * update date to task
     * @param Todo $todo
     */
    public function updateDate(Todo $todo) {
        $project = R::load("todo", $todo->getId());

        $project->date = $todo->setDate($todo->getDate());

        try {
            R::store($project);
        }
        catch (SQL $e) {
            echo "Une erreur est survenue";
        }
    }

    /**
     * update time to task
     * @param Todo $todo
     */
    public function updateTime(Todo $todo) {
        $project = R::load("todo", $todo->getId());

        $project->time = $todo->setTime($todo->getTime());

        try {
            R::store($project);
        }
        catch (SQL $e) {
            echo "Une erreur est survenue";
        }
    }

    /**
     * delete a task
     * @param int $id
     */
    public function delete(int $id): int {
        R::trash("todo", $id);
        return $id;
    }
}