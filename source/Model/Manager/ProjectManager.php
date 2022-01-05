<?php

namespace Chloe\Timetracking\Model\Manager;

use Chloe\Timetracking\Model\Entity\Project;
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
        $project = R::findOne("project", "id = ? AND user_fk = ?", [$id, $user_fk]);
        print_r(json_encode($project));
    }

    /**
     * add a project
     * @param Project $proj
     */
    public function add(Project $proj): bool {
        $project = R::dispense("project");

        $project->name = $proj->getName();
        $project->time = $proj->getTime();
        $project->date = $proj->getDate();
        $project->userFk = $proj->getUserFk()->getId();

        try {
            R::store($project);
        }
        catch (SQL $e) {
            echo "Une erreur est survenue !";
        }
        return true;
    }

    /**
     * update the time and date to project
     * @param Project $proj
     */
    public function updateTimeDate(Project $proj) {
        $project = R::load("project", $proj->getId());

        $project->time = $proj->setTime($proj->getTime());
        $project->date = $proj->setDate($proj->getDate());

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
    public function updateTime(Project $proj) {
        $project = R::load("project", $proj->getId());

        $project->time = $proj->setTime($proj->getTime());

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