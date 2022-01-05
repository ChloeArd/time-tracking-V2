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
    public function add(string $name, string $time, string $date, Project $project_fk) {
        $list = R::dispense("todo");

        $list->name = $name;
        $list->time = $time;
        $list->date = $date;
        $list->projectFk = $project_fk;

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

    public function updateDateTime(int $id, string $time, string $date) {
        $project = R::load("todo", $id);

        $project->time = $time;
        $project->date = $date;

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
    public function updateDate(int $id, string $date) {
        $project = R::load("todo", $id);

        $project->date = $date;

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
    public function updateTime(int $id, string $time) {
        $project = R::load("todo", $id);

        $project->time = $time;

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