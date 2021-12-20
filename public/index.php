<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Accueil</title>
    <link rel="stylesheet" href="./build/css/style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/351e9300a0.js" crossorigin="anonymous"></script>
    <script src="./build/js/front.js" defer></script>
</head>
<body>

    <main>
        <h1 class="center">Time Tracking <i class="far fa-clock"></i></h1>
        <div class="border flexRow align">
            <p class="question">Voulez-vous ajoutez un projet ?</p>
            <a href="View/addProject.php" class="addProject align"><i class="fas fa-plus-square"></i> Projet</a>
        </div>
        <div id="projects" class="flexCenter flexRow wrap">
            <?php
            use Chloe\Portfolio\Model\DB;
            require "../DB.php";
            $bdd = DB::getInstance();

            $stmt = $bdd->prepare("SELECT * from project");
            $state = $stmt->execute();

            if ($state) {
                foreach ($stmt -> fetchAll() as $project) {
                ?>
                    <div class="project flexColumn">
                        <h2 class="center"><?=$project['name']?></h2>
                        <div class="flexRow width_100 pad15">
                            <div class="flexColumn width_20 flexCenter">
                                <div class="time center">
                                    <i class="far fa-clock"></i>
                                    <p><?=$project['time']?></p>
                                </div>
                                <div class="time center">
                                    <i class="far fa-calendar-alt"></i>
                                    <p><?=$project['date']?></p>
                                </div>
                            </div>
                            <div class="flexColumn width_80 containerList scroller">
                                <?php
                                $stmt = $bdd->prepare("SELECT * from todo WHERE project_fk = :project_fk");
                                $stmt->bindValue(":project_fk", $project['id']);
                                $state = $stmt->execute();

                                if ($state) {
                                    foreach ($stmt -> fetchAll() as $todo) {
                                    ?>
                                        <div class="width_100 flexRow list">
                                            <p class="width_90"><?=$todo['name']?></p>
                                            <i class="fas fa-stopwatch width_10 center"></i>
                                        </div>
                                        <div class="lineHorizontal"></div>
                                        <?php
                                    }
                                }
                                ?>
                            </div>
                        </div>
                        <div class="flexRow align pad15">
                            <a href="View/deleteProject.php?id=<?=$project['id']?>" class="edit"><i class="far fa-trash-alt"></i></a>
                            <a href="View/viewProject.php?id=<?=$project['id']?>" class="edit"><i class="far fa-eye"></i></a>
                            <a href="View/addToDo.php" class="edit"><i class="fas fa-plus-square"></i></a>
                        </div>
                    </div>
                    <?php
                }
            }
            ?>
        </div>
    </main>

</body>
</html>