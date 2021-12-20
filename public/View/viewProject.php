<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Accueil</title>
    <link rel="stylesheet" href="../build/css/style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/351e9300a0.js" crossorigin="anonymous"></script>
    <script src="../build/js/front.js" defer></script>
</head>
<body>

<main>
    <h1 class="center">Time Tracking <i class="far fa-clock"></i></h1>
    <a href="../index.php"><i class="far fa-arrow-alt-circle-left"></i></a>

    <div id="projects" class="flexCenter flexRow wrap">
        <?php
        use Chloe\Portfolio\Model\DB;
        require "../../DB.php";
        $bdd = DB::getInstance();

        $stmt = $bdd->prepare("SELECT * from project WHERE id = :id");
        $stmt->bindValue(":id", $_GET['id']);
        $state = $stmt->execute();

        if ($state) {
            foreach ($stmt -> fetchAll() as $project) {
            ?>
                <div class="project flexColumn width_90">
                    <h2 class="center"><?=$project['name']?></h2>
                    <div class="flexRow width_100 pad15">
                        <div class="flexColumn width_100 containerList scroller heigt_600">
                            <?php
                            $stmt = $bdd->prepare("SELECT * from todo WHERE project_fk = :project_fk");
                            $stmt->bindValue(":project_fk", $project['id']);
                            $state = $stmt->execute();

                            if ($state) {
                                foreach ($stmt -> fetchAll() as $todo) {
                                ?>
                                    <div class="width_100 flexRow list">
                                        <p class="width_90"><?=$todo['name']?></p>
                                        <div class="width_10 center">
                                            <i class="far fa-calendar-alt "></i> <?=$todo['date']?>
                                        </div>
                                        <div class="width_10 center">
                                            <i class="fas fa-stopwatch"></i> <?=$todo['time']?>
                                        </div>
                                        <a href="editToDo.php?id=<?=$todo['id']?>" class="marg10"><i class="far fa-edit"></i></a>
                                        <a href="deleteToDo.php?id=<?=$todo['id']?>" class="marg10"><i class="far fa-trash-alt"></i></a>

                                    </div>
                                    <div class="lineHorizontal"></div>
                                    <?php
                                }
                            }
                            ?>
                        </div>
                    </div>
                    <div class="flexRow align pad15">
                        <div class="width_50"><i class="far fa-clock"></i> Total heures passées : ... </div>
                        <a href="addToDo.php?id=<?=$project['id']?>" class="width_50 end"><i class="fas fa-plus-square"></i></a>
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