$(document).ready(function () {
    let board = 'http://localhost/Excel-converter/board.php'
    if ($(location).attr('href') == board) {
        function displayBoard() {
            $.post(
                'handler.php', {
                    getAthletes: true
                },
                function (data) {
                    let datas = JSON.parse(data)
                    for (x in datas) {
                        $('#athBoard').append(
                            '<tr id="athBoard_' + x + '_content">' +
                            '<form enctype="multipart/form-data">' +
                            '<td>' +
                            '<div class="row">' +
                            '<div class="col s4">' +
                            '    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small blue" data-position="left" data-tooltip="Modifier" ><i id="editAth_' + datas[x].id + '" class="material-icons">edit</i>' +
                            '</div>' +
                            '<div class="col s4">' +
                            '    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small red" data-position="top" data-tooltip="Supprimer" ><i id="deleteAth_' + datas[x].id + '" class="material-icons">delete</i>' +
                            '</div>' +
                            '</div>' +
                            '</td>' +
                            '<td id="athLastName_' + datas[x].id + '">' + datas[x].last_name + '</td>' +
                            '<td id="athFirstName_' + datas[x].id + '">' + datas[x].first_name + '</td>' +
                            '<td id="athClub_' + datas[x].id + '">' + datas[x].club + '</td>' +
                            '<td id="athGender_' + datas[x].id + '">' + datas[x].gender + '</td>' +
                            '<td id="athCat_' + datas[x].id + '">' + datas[x].cat_name + '</td>' +
                            '<td id="athType_' + datas[x].id + '">' + datas[x].type_id + '</td>' +
                            '<td id="athTime_' + datas[x].id + '">' + datas[x].swimTime + '</td>' +
                            '</form>' +
                            '</tr>'
                        )
                    }
                }
            )
        }
        displayBoard()
        $('#catSort').click(function () {
            if ($("#catSort").is(':checked')) {
                verifyCheckboxesState()
                $.post(
                    'handler.php', {
                        sortByCat: true
                    },
                    function (data) {
                        let datas = JSON.parse(data)
                        console.log(datas)
                        $('#board').hide()
                        let l = 1
                        for (x in datas) {
                            $('#boardArea').append(
                                '<ul class="collapsible" id="catList">' +
                                '<li>' +
                                '<div class="collapsible-header" id="cat_' + datas[x][0].cat_id + '"><i class="material-icons"><img src="https://img.icons8.com/ios-glyphs/24/000000/male.png"/></i>' + datas[x][0].cat_name + ' - ' + datas[x].length + ' athlètes</div>' +
                                '<div class="collapsible-body" id="cat_' + datas[x][0].cat_id + '">' +
                                '<table id="athTable_' + datas[x][0].cat_id + '">' +
                                '<thead>' +
                                '<tr>' +
                                '<th>Actions</th>' +
                                '<th>Nom</th>' +
                                '<th>Prénom</th>' +
                                '<th>Club</th>' +
                                '<th>Genre</th>' +
                                '<th>Catégorie</th>' +
                                '<th>Compétition</th>' +
                                '<th>Engagement</th>' +
                                '</tr>' +
                                '</thead>' +
                                '<tbody id="athTable_' + datas[x][0].cat_id + '_content">' +
                                '</tbody>' +
                                '</table>' +
                                '</div>' +
                                '</li>' +
                                '</ul>'
                            )
                            l++
                        }

                        $('.collapsible').collapsible();

                        for (i in datas) {
                            for (let j = 0; j < datas[i].length; j++) {
                                $('#athTable_' + datas[i][0].cat_id + '_content').append(
                                    '<tr id="athBoard_' + x + '_content">' +
                                    '<form enctype="multipart/form-data">' +
                                    '<td>' +
                                    '<div class="row">' +
                                    '<div class="col s4">' +
                                    '    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small blue" data-position="left" data-tooltip="Modifier" ><i id="editAth_' + datas[i][j].id + '" class="material-icons">edit</i>' +
                                    '</div>' +
                                    '<div class="col s4">' +
                                    '    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small red" data-position="top" data-tooltip="Supprimer" ><i id="deleteAth_' + datas[i][j].id + '" class="material-icons">delete</i>' +
                                    '</div>' +
                                    '</div>' +
                                    '</td>' +
                                    '<td id="athLastName_' + datas[i][j].id + '">' + datas[i][j].last_name + '</td>' +
                                    '<td id="athFirstName_' + datas[i][j].id + '">' + datas[i][j].first_name + '</td>' +
                                    '<td id="athClub_' + datas[i][j].id + '">' + datas[i][j].club + '</td>' +
                                    '<td id="athGender_' + datas[i][j].id + '">' + datas[i][j].gender + '</td>' +
                                    '<td id="athCat_' + datas[i][j].id + '">' + datas[i][j].cat_name + '</td>' +
                                    '<td id="athType_' + datas[i][j].id + '">' + datas[i][j].type_id + '</td>' +
                                    '<td id="athTime_' + datas[i][j].id + '">' + datas[i][j].swimTime + '</td>' +
                                    '</form>' +
                                    '</tr>'
                                )
                            }
                        }
                    })
            } else if (!$("#catSort").is(':checked')) {
                // $('#board').show()
                verifyCheckboxesState()
                $('.collapsible').remove()
            }
        })
        $('#sexSort').click(function () {
            if ($('#sexSort').is(':checked')) {
                verifyCheckboxesState()
                $.post(
                    'handler.php', {
                        sortBySex: true
                    },
                    function (data) {
                        let datas = JSON.parse(data)
                        console.log(datas)
                        $('#board').hide()
                        let l = 1
                        for (x in datas) {
                            $('#boardArea').append(
                                '<ul class="collapsible" id="sexList">' +
                                '<li>' +
                                '<div class="collapsible-header" id="cat_' + datas[x][0].cat_id + '"><i class="material-icons"><img src="https://img.icons8.com/ios-glyphs/24/000000/male.png"/></i>' + datas[x][0].gender + ' - ' + datas[x].length + ' athlètes</div>' +
                                '<div class="collapsible-body" id="cat_' + datas[x][0].cat_id + '">' +
                                '<table id="athTable_' + datas[x][0].cat_id + '">' +
                                '<thead>' +
                                '<tr>' +
                                '<th>Actions</th>' +
                                '<th>Nom</th>' +
                                '<th>Prénom</th>' +
                                '<th>Club</th>' +
                                '<th>Genre</th>' +
                                '<th>Catégorie</th>' +
                                '<th>Compétition</th>' +
                                '<th>Engagement</th>' +
                                '</tr>' +
                                '</thead>' +
                                '<tbody id="athTable_' + datas[x][0].cat_id + '_content">' +
                                '</tbody>' +
                                '</table>' +
                                '</div>' +
                                '</li>' +
                                '</ul>'
                            )
                            l++
                        }

                        $('.collapsible').collapsible();

                        for (i in datas) {
                            for (let j = 0; j < datas[i].length; j++) {
                                $('#athTable_' + datas[i][0].cat_id + '_content').append(
                                    '<tr id="athBoard_' + x + '_content">' +
                                    '<form enctype="multipart/form-data">' +
                                    '<td>' +
                                    '<div class="row">' +
                                    '<div class="col s4">' +
                                    '    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small blue" data-position="left" data-tooltip="Modifier" ><i id="editAth_' + datas[i][j].id + '" class="material-icons">edit</i>' +
                                    '</div>' +
                                    '<div class="col s4">' +
                                    '    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small red" data-position="top" data-tooltip="Supprimer" ><i id="deleteAth_' + datas[i][j].id + '" class="material-icons">delete</i>' +
                                    '</div>' +
                                    '</div>' +
                                    '</td>' +
                                    '<td id="athLastName_' + datas[i][j].id + '">' + datas[i][j].last_name + '</td>' +
                                    '<td id="athFirstName_' + datas[i][j].id + '">' + datas[i][j].first_name + '</td>' +
                                    '<td id="athClub_' + datas[i][j].id + '">' + datas[i][j].club + '</td>' +
                                    '<td id="athGender_' + datas[i][j].id + '">' + datas[i][j].gender + '</td>' +
                                    '<td id="athCat_' + datas[i][j].id + '">' + datas[i][j].cat_name + '</td>' +
                                    '<td id="athType_' + datas[i][j].id + '">' + datas[i][j].type_id + '</td>' +
                                    '<td id="athTime_' + datas[i][j].id + '">' + datas[i][j].swimTime + '</td>' +
                                    '</form>' +
                                    '</tr>'
                                )
                            }
                        }
                    })
            } else if (!$('#sexSort').is(':checked')) {
                // $('#board').show()
                verifyCheckboxesState()
                $('.collapsible').remove()
            }
        })
        $('#typeSort').click(function () {
            if ($('#typeSort').is(':checked')) {
                verifyCheckboxesState()
                $.post(
                    'handler.php', {
                        sortByType: true
                    },
                    function (data) {
                        let datas = JSON.parse(data)
                        console.log(datas)
                        $('#board').hide()
                        let l = 1
                        for (x in datas) {
                            $('#boardArea').append(
                                '<ul class="collapsible" id="typeList">' +
                                '<li>' +
                                '<div class="collapsible-header" id="cat_' + datas[x][0].cat_id + '"><i class="material-icons"><img src="https://img.icons8.com/ios-glyphs/24/000000/male.png"/></i>' + datas[x][0].type_id + ' - ' + datas[x].length + ' athlètes</div>' +
                                '<div class="collapsible-body" id="cat_' + datas[x][0].cat_id + '">' +
                                '<table id="athTable_' + datas[x][0].cat_id + '">' +
                                '<thead>' +
                                '<tr>' +
                                '<th>Actions</th>' +
                                '<th>Nom</th>' +
                                '<th>Prénom</th>' +
                                '<th>Club</th>' +
                                '<th>Genre</th>' +
                                '<th>Catégorie</th>' +
                                '<th>Compétition</th>' +
                                '<th>Engagement</th>' +
                                '</tr>' +
                                '</thead>' +
                                '<tbody id="athTable_' + datas[x][0].cat_id + '_content">' +
                                '</tbody>' +
                                '</table>' +
                                '</div>' +
                                '</li>' +
                                '</ul>'
                            )
                            l++
                        }

                        $('.collapsible').collapsible();

                        for (i in datas) {
                            for (let j = 0; j < datas[i].length; j++) {
                                $('#athTable_' + datas[i][0].cat_id + '_content').append(
                                    '<tr id="athBoard_' + x + '_content">' +
                                    '<form enctype="multipart/form-data">' +
                                    '<td>' +
                                    '<div class="row">' +
                                    '<div class="col s4">' +
                                    '    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small blue" data-position="left" data-tooltip="Modifier" ><i id="editAth_' + datas[i][j].id + '" class="material-icons">edit</i>' +
                                    '</div>' +
                                    '<div class="col s4">' +
                                    '    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small red" data-position="top" data-tooltip="Supprimer" ><i id="deleteAth_' + datas[i][j].id + '" class="material-icons">delete</i>' +
                                    '</div>' +
                                    '</div>' +
                                    '</td>' +
                                    '<td id="athLastName_' + datas[i][j].id + '">' + datas[i][j].last_name + '</td>' +
                                    '<td id="athFirstName_' + datas[i][j].id + '">' + datas[i][j].first_name + '</td>' +
                                    '<td id="athClub_' + datas[i][j].id + '">' + datas[i][j].club + '</td>' +
                                    '<td id="athGender_' + datas[i][j].id + '">' + datas[i][j].gender + '</td>' +
                                    '<td id="athCat_' + datas[i][j].id + '">' + datas[i][j].cat_name + '</td>' +
                                    '<td id="athType_' + datas[i][j].id + '">' + datas[i][j].type_id + '</td>' +
                                    '<td id="athTime_' + datas[i][j].id + '">' + datas[i][j].swimTime + '</td>' +
                                    '</form>' +
                                    '</tr>'
                                )
                            }
                        }
                    })
            } else if (!$('#typeSort').is(':checked')) {

                verifyCheckboxesState()
                $('.collapsible').remove()
            }
        })
        $('#athSearch').keyup(function () {
            let string = $('#athSearch').val()
            if (string.length > 0) {
                $.post(
                    'handler.php', {
                        str: string,
                        searchAth: true
                    },
                    function (data) {
                        let datas = JSON.parse(data)
                        $('#athBoard').empty()
                        for (x in datas) {
                            $('#athBoard').append(
                                '<tr id="athBoard_' + x + '_content">' +
                                '<form enctype="multipart/form-data">' +
                                '<td>' +
                                '<div class="row">' +
                                '<div class="col s4">' +
                                '    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small blue" data-position="left" data-tooltip="Modifier" ><i id="editAth_' + datas[x].id + '" class="material-icons">edit</i>' +
                                '</div>' +
                                '<div class="col s4">' +
                                '    <button class=" btn tooltipped btn-floating btn-large waves-effect waves-light btn-small red" data-position="top" data-tooltip="Supprimer" ><i id="deleteAth_' + datas[x].id + '" class="material-icons">delete</i>' +
                                '</div>' +
                                '</div>' +
                                '</td>' +
                                '<td id="athLastName_' + datas[x].id + '">' + datas[x].last_name + '</td>' +
                                '<td id="athFirstName_' + datas[x].id + '">' + datas[x].first_name + '</td>' +
                                '<td id="athClub_' + datas[x].id + '">' + datas[x].club + '</td>' +
                                '<td id="athGender_' + datas[x].id + '">' + datas[x].gender + '</td>' +
                                '<td id="athCat_' + datas[x].id + '">' + datas[x].cat_name + '</td>' +
                                '<td id="athType_' + datas[x].id + '">' + datas[x].type_id + '</td>' +
                                '<td id="athTime_' + datas[x].id + '">' + datas[x].swimTime + '</td>' +
                                '</form>' +
                                '</tr>'
                            )
                        }
                    })
            } else {
                displayBoard()
            }
        })
        $('#boardArea').on('click', 'button', function (e) {
            let target = e.target.id
            let id = target.replace(/[^0-9.]/g, "");
            $('#athLastName_' + id + '').html(
                '<div class="input-field col">' +
                '<input id="lastName_' + id + '" type="text" class="validate">' +
                '<label for="lastName_' + id + '">Nom de famille</label>' +
                '</div>'
            )
            $('#athFirstName_' + id + '').html('<div class="input-field">' +
                '<input id="firstName_' + id + '" type="text" class="validate">' +
                '<label for="firstName_' + id + '">Prénom</label>' +
                '</div>')
            $('#athClub_' + id + '').html('<div class="input-field">' +
                '<input id="club" type="text" class="validate">' +
                '<label for="club">Club</label>' +
                '</div>')
            $('#athGender_' + id + '').html(
                '<div class="input-field col s12">' +
                '<select>' +
                '<option value="" disabled selected>Sexe</option>' +
                '<option value="0">Homme</option>' +
                '<option value="1">Femme</option>' +
                '</select>' +
                '<label>Materialize Select</label>' +
                '</div>'
            )
            $('#athCat_' + id + '').html('<div class="input-field col s12">' +
                '<select>' +
                '<option value="" disabled selected>Catégorie</option>' +
                '</select>' +
                '<label>Materialize Select</label>' +
                '</div>')
            $('#athType_' + id + '').html('<div class="input-field col s12">' +
                '<select>' +
                '<option value="" disabled selected>Compétition</option>' +
                '<option value="1">Triathle</option>' +
                '<option value="2">Laser Run</option>' +
                '</select>' +
                '<label>Materialize Select</label>' +
                '</div>')
            $('#athTime_' + id + '').html(
                '<div class="input-field col s6">' +
                '<input class="athMin" id="minutes_' + id + '" name="minutes_' + id + '" type="text" class="validate">' +
                '<label for="minutes_' + id + '">Minutes</label>' +
                '</div>' +
                '<div class="input-field col s6">' +
                '<input class="athSec" id="seconds_' + id + '" name="seconds_' + id + '" type="text" class="validate">' +
                '<label for="seconds_' + id + '">Secondes</label>' +
                '</div>'
            )
            $('select').formSelect();
        })
        verifyCheckboxesState()

        function verifyCheckboxesState() {
            let state = true
            let i = 0
            $(".checkboxes").each(function () {
                state = $(this).is(':checked')
                if (state == false) {
                    i++
                    if (i == 3) {
                        $('#board').show()
                    }
                }
            });
        }

        function fillInputs(array, id) {
            $('#athLastName_' + id + '').val(array[0].cat_name)
            $('#athFirstName_' + id + '').val(array[0].distance)
            $('#athClub_' + id + '').val(array[0].time)
            $('#athGender_' + id + '').val(array[0].points)
            $('#athCat_' + id + '').val(array[0].ptsPerSec)
            $('#athType_' + id + '').val(array[0].lr_distance)
            $('#athTime_' + id + '').val(array[0].lr_turns)
            $('#athLastName_' + id + '').siblings('label').addClass('active')
            $('#athFirstName_' + id + '').siblings('label').addClass('active')
            $('#athClub_' + id + '').siblings('label').addClass('active')
            $('#athGender_' + id + '').siblings('label').addClass('active')
            $('#athCat_' + id + '').siblings('label').addClass('active')
            $('#athType_' + id + '').siblings('label').addClass('active')
            $('#athTime_' + id + '').siblings('label').addClass('active')
        }
    }
})