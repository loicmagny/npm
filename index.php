<?php
include 'header.php';
?>

<main id="home">
    <div class="container">
        <div class="row center">
            <img class="logo circle" src="assets/img/npm-logo.jpg" alt="npm-logo" />
        </div>
        <div class="row center">
            <form action="board.php" method="POST" enctype="multipart/form-data" id="converter">
                <button class="waves-effect waves-light btn" name="action"><i class="material-icons left">cloud</i>Commencer</a>
            </form>
        </div>
    </div>
</main>
<?php include 'footer.php'; ?>