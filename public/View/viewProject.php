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
        <div class="project flexColumn width_90">
            <h2 class="center">Titre</h2>
            <div class="flexRow width_100 pad15">
                <div class="flexColumn width_100 containerList scroller heigt_600">
                    <div class="width_100 flexRow list">
                        <p class="width_90">Tâches à éffectuer</p>
                        <div class="width_10 center">
                            <i class="far fa-calendar-alt "></i> 00/00/0000
                        </div>
                        <div class="width_10 center">
                            <i class="fas fa-stopwatch"></i> 00h
                        </div>
                        <a href="editToDo.php" class="marg10"><i class="far fa-edit"></i></a>
                        <a href="deleteToDo.php" class="marg10"><i class="far fa-trash-alt"></i></a>

                    </div>
                    <div class="lineHorizontal"></div>
                </div>
            </div>
            <div class="flexRow align pad15">
                <div class="width_50"><i class="far fa-clock"></i> Total heures passées : ... </div>
                <a href="addToDo.php" class="width_50 end"><i class="fas fa-plus-square"></i></a>
            </div>
        </div>
    </div>
</main>

</body>
</html>