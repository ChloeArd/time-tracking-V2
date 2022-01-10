<?php

namespace Chloe\Timetracking\Model\Manager;

use Chloe\Timetracking\Model\Entity\Project;
use Chloe\Timetracking\Model\Entity\User;
use RedBeanPHP\R;
use RedBeanPHP\RedException\SQL;

class ProjectManager {

    /**
     * displays all the projects of the logged-in user
     * @param int $user_fk
     */
    public function getProjects(int $user_fk) {
        $project = R::getAll ("SELECT * FROM project WHERE user_fk = $user_fk") ;
        print_r(json_encode($project));
    }

    /**
     * displays one project of the logged-in user
     * @param int $id
     * @param int $user_fk
     */
    public function getProject(int $id, int $user_fk) {
        // one to many
        $project = R::findOne("project", "id = ?", [$id]);

        $user = R::dispense('user');
        $user->id = $user_fk;

        $user->ownProductList[] = $project;

        print_r(json_encode($user));
    }

    /**
     * add a project
     * @param Project $proj
     */
    public function add(string $name, string $time, string $date, User $user_fk) {
        $project = R::dispense("project");

        $project->name = $name;
        $project->time = $time;
        $project->date = $date;
        $project->userFk = $user_fk;

        try {
            R::store($project);
        }
        catch (SQL $e) {
            echo "Une erreur est survenue !";
        }
    }

    /**
     * update the time and date to project
     * @param Project $proj
     */
    public function updateTimeDate(int $id, string $time, string $date) {
        $project = R::load("project", $id);

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
     * update a time to project
     * @param Project $proj
     */
    public function updateTime(int $id, string $time) {
        $project = R::load("project", $id);

        $project->time = $time;

        try {
            R::store($project);
        }
        catch (SQL $e) {
            echo "Une erreur est survenue";
        }
    }

    /**
     * delete a project and his tasks
     * @param int $id
     */
    public function delete(int $id): int {
        R::exec("DELETE FROM todo WHERE project_fk = $id");
        R::trash("project", $id);
        return $id;
    }
}