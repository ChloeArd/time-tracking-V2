<?php
session_start();
if (isset($_SESSION['id'])) {?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Ajouter un projet</title>
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
                <h2 class="center">Ajouter un projet</h2>
                <div class="flexColumn width_100 pad15">
                    <form action="" method="post" class="flexColumn width_60 auto">
                        <input id="name" name="name" type="text" placeholder="Nom du projet">
                        <input id="addProject" type="submit" name="send" value="Ajouter">
                    </form>
                </div>
            </div>
        </div>
    </main>
    </body>
    </html>
<?php
}
