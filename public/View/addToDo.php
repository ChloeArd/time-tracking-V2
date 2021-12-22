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
        <div id="projects" class="flexCenter">
            <div class="project flexColumn width_60">
                <h2 class="center">Ajouter une tâche</h2>
                <div class="flexColumn width_100 pad15">
                    <form action="" method="post" class="flexColumn width_60 auto">
                        <input name="name" type="text" placeholder="Nom de la tâche">
                        <input type="hidden" name="project_fk" value="<?=$_GET['id']?>">
                        <input type="submit" name="send" value="Ajouter">
                    </form>
                </div>
            </div>
        </div>
    </main>
</body>
</html>

<?php
use Chloe\Portfolio\Model\DB;
require "../../DB.php";
$bdd = DB::getInstance();

if (isset($_POST['send'])) {
    if (isset($_POST['name'], $_POST['project_fk'])) {

        $contents =  [ "subject" => [
            "title" => $_POST['name'],
            "time" => "00:00:00",
            "date" => date("Y-m-d"),
            "project_fk" => $_POST['project_fk']
            ]
        ];

        // add a content of table in json file
        $inp = file_get_contents("../data/todo.json");
        $tempArray = json_decode($inp);
        array_push($tempArray, $contents);
        $file = fopen("../data/todo.json", "w+");
        fwrite($file, json_encode($tempArray));
        fclose($file);

        /*$stmt = $bdd->prepare("
        INSERT INTO todo (name, time, date, project_fk) VALUES (:name, :time, :date, :project_fk)
    ");
        $stmt->bindValue(":name", htmlentities(trim(ucfirst($_POST['name']))));
        $stmt->bindValue(":time", "00:00:00");
        $stmt->bindValue(":date", date("Y-m-d"));
        $stmt->bindValue(":project_fk", $_POST['project_fk']);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            header("Location: ../index.php?success=0");
        }
        else {
            echo "Erreur lors de l'ajout d'une tâche !";
        }*/
    }
}