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
    <a href="viewProject.php"><i class="far fa-arrow-alt-circle-left"></i></a>
    <div id="projects" class="flexCenter">
        <div class="project flexColumn width_60">
            <h2 class="center">Supprimer une tâche</h2>
            <div class="flexColumn width_100 pad15">
                <form action="#" method="post" class="flexColumn width_60 auto">
                    <h3 class="center red">Voulez-vous vraiment supprimer cette tâche ?</h3>
                    <input type="submit" name="send" value="Oui">
                </form>
            </div>
        </div>

    </div>
</main>

</body>
</html>