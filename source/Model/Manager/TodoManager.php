<?php

namespace Chloe\Timetracking\Model\Manager;

use Chloe\Timetracking\Model\DB;
use Chloe\Timetracking\Model\Entity\Project;
use Chloe\Timetracking\Model\Entity\Todo;
use RedBeanPHP\R;
use RedBeanPHP\RedException\SQL;

class TodoManager {

    /**
     * view one task
     * @param int $id
     */
    public function getTodo(int $id, Project $project_fk) {
        $todo = R::findOne("todo", "id = ? AND project_fk = ?", [$id, $project_fk]);
        var_dump($todo);
    }

    /**
     * view all task to project
     * @param int $project_fk
     */
    public function getTodos(int $project_fk) {
        $todo = R::findAll("todo", "project_fk = ?", [$project_fk]);
        var_dump($todo);
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
    public function updateName(Todo $todo) {
        $project = R::load("todo", $todo->getId());

        $project->name = $todo->setName($todo->getName());

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