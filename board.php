<?php include 'header.php'; ?>

<main class="container wrapper center-align center">
    <h1>Tableau des engagés</h1>
    <form enctype="multipart/form-data">
        <div class="row">
            <div class="input-field col s3" id="first">
                <p>
                    <label>
                        <input type="checkbox" id="catSort" class="checkboxes" />
                        <span>Trier par catégorie</span>
                    </label>
                </p>
            </div>
                
            <div class="input-field col s3" id="second">
            <p>
                    <label>
                        <input type="checkbox" id="sexSort" class="checkboxes" />
                        <span>Trier par sexe</span>
                    </label>
                </p>
            </div>
            <div class="input-field col s3" id="third">
            <p>
                    <label>
                        <input type="checkbox" id="typeSort" class="checkboxes" />
                        <span>Trier par type de compétition</span>
                    </label>
                </p>
            </div>
            <div class="input-field col s3" id="fourth">
                <i class="material-icons prefix">search</i>
                <input id="athSearch" type="text" class="validate">
                <label for="athSearch">Rechercher</label>
            </div>

        </div>
        </div>
    </form>
    <div class="row" id="boardArea">
        <table class="centered responsive-table" id="board">
            <thead>
                <tr>
                    <th>Actions</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Club</th>
                    <th>Genre</th>
                    <th>Catégorie</th>
                    <th>Compétition</th>
                    <th>Engagement</th>
                </tr>
            </thead>
            <tbody id="athBoard">

            </tbody>
        </table>
    </div>
</main>
<?php include 'footer.php'; ?>