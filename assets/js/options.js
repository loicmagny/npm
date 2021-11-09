$(document).ready(function () {

    let options = 'http://localhost/Excel-converter/options.php'
    if ($(location).attr("href") == options) {
        $.post(
            'handler.php', {
                AllCatIds: true
            },
            function (data) {
                let datas = JSON.parse(data)
                for (x in datas) {
                    $('#catSelect').append('<option value="' + datas[x].cat_id + '" id="select_' + datas[x].cat_id + '">' + datas[x].cat_name + '</option>')
                    $('select').formSelect();
                }

            })

        $('#catSelect').change(function () {
            let id = $('#catSelect').val()

            $.post(
                'handler.php', {
                    cat_id: id,
                    catDetails: true
                },
                function (data) {
                    let datas = JSON.parse(data)
                    $('#select_' + datas[0].cat_id + '').html('<option value="' + datas[0].cat_id + '" id="select_' + datas[0].cat_id + '">' + datas[0].cat_name + '</option>')
                    fillOptionsInputs(datas)
                })
        })

        $('#cat_name').change(function () {
            let id = $('#catSelect').val()
            let name = $('#cat_name').val()
            $.post(
                'handler.php', {
                    cat_id: id,
                    cat_name: name,
                    editCatName: true
                },
                function (data) {
                    let datas = JSON.parse(data)
                    $('#select_' + datas[0].cat_id + '').html('<option value="' + datas[0].cat_id + '" id="select_' + datas[0].cat_id + '">' + datas[0].cat_name + '</option>')
                    fillOptionsInputs(datas)
                }
            )
        })
        $('#swimDistance').change(function () {
            let id = $('#catSelect').val()
            let swimDistance = $('#swimDistance').val()
            $.post(
                'handler.php', {
                    cat_id: id,
                    distance: swimDistance,
                    editSwimDistance: true
                },
                function (data) {
                    let datas = JSON.parse(data)
                    $('#select_' + datas[0].cat_id + '').html('<option value="' + datas[0].cat_id + '" id="select_' + datas[0].cat_id + '">' + datas[0].cat_name + '</option>')
                    fillOptionsInputs(datas)
                }
            )
        })
        $('#swimTime').change(function () {
            let id = $('#catSelect').val()
            let swimTime = $('#swimTime').val()
            $.post(
                'handler.php', {
                    cat_id: id,
                    time: swimTime,
                    editSwimTime: true
                },
                function (data) {
                    let datas = JSON.parse(data)
                    $('#select_' + datas[0].cat_id + '').html('<option value="' + datas[0].cat_id + '" id="select_' + datas[0].cat_id + '">' + datas[0].cat_name + '</option>')
                    fillOptionsInputs(datas)
                }
            )
        })
        $('#swimPoints').change(function () {
            let id = $('#catSelect').val()
            let swimPoints = $('#swimPoints').val()
            $.post(
                'handler.php', {
                    cat_id: id,
                    points: swimPoints,
                    editSwimPoints: true
                },
                function (data) {
                    let datas = JSON.parse(data)
                    $('#select_' + datas[0].cat_id + '').html('<option value="' + datas[0].cat_id + '" id="select_' + datas[0].cat_id + '">' + datas[0].cat_name + '</option>')
                    fillOptionsInputs(datas)
                }
            )
        })
        $('#swimPtsPerSec').change(function () {
            let id = $('#catSelect').val()
            let swimPtsPerSec = $('#swimPtsPerSec').val()
            $.post(
                'handler.php', {
                    cat_id: id,
                    ptsPerSec: swimPtsPerSec,
                    editSwimPtsPerSec: true
                },
                function (data) {
                    let datas = JSON.parse(data)
                    $('#select_' + datas[0].cat_id + '').html('<option value="' + datas[0].cat_id + '" id="select_' + datas[0].cat_id + '">' + datas[0].cat_name + '</option>')
                    fillOptionsInputs(datas)
                }
            )
        })
        $('#lr_distance').change(function () {
            let id = $('#catSelect').val()
            let lrDistance = $('#lr_distance').val()
            $.post(
                'handler.php', {
                    cat_id: id,
                    lr_distance: lrDistance,
                    editLRDistance: true
                },
                function (data) {
                    let datas = JSON.parse(data)
                    $('#select_' + datas[0].cat_id + '').html('<option value="' + datas[0].cat_id + '" id="select_' + datas[0].cat_id + '">' + datas[0].cat_name + '</option>')
                    fillOptionsInputs(datas)
                }
            )
        })
        $('#lr_turns').change(function () {
            let id = $('#catSelect').val()
            let lrTurns = $('#lr_turns').val()
            $.post(
                'handler.php', {
                    cat_id: id,
                    lr_turns: lrTurns,
                    editLRTurns: true
                },
                function (data) {
                    let datas = JSON.parse(data)
                    $('#select_' + datas[0].cat_id + '').html('<option value="' + datas[0].cat_id + '" id="select_' + datas[0].cat_id + '">' + datas[0].cat_name + '</option>')
                    fillOptionsInputs(datas)
                }
            )
        })
        $('#lr_time').change(function () {
            let id = $('#catSelect').val()
            let lrTime = $('#lr_time').val()
            $.post(
                'handler.php', {
                    cat_id: id,
                    lr_time: lrTime,
                    editLRTime: true
                },
                function (data) {
                    let datas = JSON.parse(data)
                    $('#select_' + datas[0].cat_id + '').html('<option value="' + datas[0].cat_id + '" id="select_' + datas[0].cat_id + '">' + datas[0].cat_name + '</option>')
                    fillOptionsInputs(datas)
                }
            )
        })
        $('#lr_ptsPerSec').change(function () {
            let id = $('#catSelect').val()
            let lrPtsPerSec = $('#lr_ptsPerSec').val()
            $.post(
                'handler.php', {
                    cat_id: id,
                    lr_ptsPerSec: lrPtsPerSec,
                    editLRPtsPerSec: true
                },
                function (data) {
                    let datas = JSON.parse(data)
                    $('#select_' + datas[0].cat_id + '').html('<option value="' + datas[0].cat_id + '" id="select_' + datas[0].cat_id + '">' + datas[0].cat_name + '</option>')
                    fillOptionsInputs(datas)
                }
            )
        })
        $('#lr_points').change(function () {
            let id = $('#catSelect').val()
            let lrPoints = $('#lr_points').val()
            $.post(
                'handler.php', {
                    cat_id: id,
                    lr_points: lrPoints,
                    editLRPoints: true
                },
                function (data) {
                    let datas = JSON.parse(data)
                    $('#select_' + datas[0].cat_id + '').html('<option value="' + datas[0].cat_id + '" id="select_' + datas[0].cat_id + '">' + datas[0].cat_name + '</option>')
                    fillOptionsInputs(datas)
                }
            )
        })
    }

    function fillOptionsInputs(array) {
        $('#cat_name').val(array[0].cat_name)
        $('#swimDistance').val(array[0].distance)
        $('#swimTime').val(array[0].time)
        $('#swimPoints').val(array[0].points)
        $('#swimPtsPerSec').val(array[0].ptsPerSec)
        $('#lr_distance').val(array[0].lr_distance)
        $('#lr_turns').val(array[0].lr_turns)
        $('#lr_time').val(array[0].lr_time)
        $('#lr_points').val(array[0].lr_points)
        $('#lr_ptsPerSec').val(array[0].lr_ptsPerSec)
        $('#cat_name').siblings('label').addClass('active')
        $('#swimDistance').siblings('label').addClass('active')
        $('#swimTime').siblings('label').addClass('active')
        $('#swimPoints').siblings('label').addClass('active')
        $('#swimPtsPerSec').siblings('label').addClass('active')
        $('#lr_distance').siblings('label').addClass('active')
        $('#lr_turns').siblings('label').addClass('active')
        $('#lr_time').siblings('label').addClass('active')
        $('#lr_points').siblings('label').addClass('active')
        $('#lr_ptsPerSec').siblings('label').addClass('active')
    }

})