$(document).ready(function () {

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

    function sortAthletes(obj) {
        let size = Math.ceil(obj.length / 5)
        let heats = dynamicMatrix(size)
        let j = 0
        let k = 1
        let l = 0

        for (let i = 0; i < obj.length; i++) {
            obj[i].swimTime = parseInt(obj[i].swimTime.replace(/\D/g, ''));
            if (obj[i].swimTime >= 60) {
                obj[i].swimTime = '' + obj[i].swimTime
            }
        }

        obj = obj.sort(function (a, b) {
            return a.swimTime - b.swimTime;
        });

        for (let i = 0; i < obj.length; i++) {
            heats[j][l] = obj[i]
            l++
            if (k == obj.length / 2) {
                j++
                l = 0
            }
            k++
        }
        return heats
    }

    function dynamicMatrix(size) {
        let matrix = []
        for (let i = 0; i < size; i++) {
            matrix[i] = new Array(size);
        }
        return matrix
    }

    function formatTime() {
        $('.boySec').focusout(function () {
            let row_id = $(this).prop('id');
            let id = row_id.replace(/[^0-9.]/g, "");
            let value = $(this).val()
            let seconds = parseInt(value % 60)
            let minutes = parseInt(value / 60)
            if (($('#minutes_' + id + '').is('empty') || minutes == null || minutes == undefined || $('#minutes_' + id + '').val().length == 0)) {
                if (value > 60) {
                    $('#minutes_' + id + '').val(minutes)
                    $('#minutes_' + id + '').siblings('label').addClass('active')
                } else {
                    seconds = value
                    $('#minutes_' + id + '').val(0)
                    $('#minutes_' + id + '').siblings('label').addClass('active')
                }
            } else {
                $('#minutes_' + id + '').val(parseInt($('#minutes_' + id + '').val()) + parseInt(minutes))
                $('#minutes_' + id + '').siblings('label').addClass('active')
            }
            $('#seconds_' + id + '').val(seconds)
            $.post(
                'handler.php', {
                    x: id,
                    athCatDetails: true
                },
                function (result) {
                    let data = JSON.parse(result)
                    let time = ''
                    let athTime = parseInt($('#seconds_' + id + '').val()) + parseInt($('#minutes_' + id + '').val() * 60)
                    if (data[0]['time'].length > 3) {
                        time = FormatStandardTime(data)
                    } else {
                        time = data[0]['time'].replace(/[^0-9.]/g, "");
                    }
                    let points = 0
                    let delta = 0
                    if ($.isNumeric(athTime)) {
                        // if (athTime != 0) {
                        //     athTime += athTime
                        // }

                        if (athTime < time) {
                            while (parseInt(delta) + parseInt(athTime) < time) {
                                delta++
                            }
                            points = (parseInt(delta) * parseInt(data[0]['ptsPerSec'])) + parseInt(data[0]['points'])
                            if ($.isNumeric(points)) {
                                $('#points_' + id + '').html(points)
                            }
                        }
                        if (athTime > time) {
                            while (parseInt(delta) + parseInt(athTime) > time) {
                                delta--
                            }
                            points = (parseInt(delta) * parseInt(data[0]['ptsPerSec'])) + parseInt(data[0]['points'])
                            if ($.isNumeric(points)) {
                                $('#points_' + id + '').html(points)
                            }
                        }
                        if (athTime == time && $.isNumeric(data[0]['points'])) {
                            $('#points_' + id + '').html(data[0]['points'])
                        }
                    }
                }
            )
        })
        $('.girlSec').focusout(function () {
            let row_id = $(this).prop('id');
            let id = row_id.replace(/[^0-9.]/g, "");
            let value = $(this).val()
            let seconds = parseInt(value % 60)
            let minutes = parseInt(value / 60)
            if (($('#minutes_' + id + '').is('empty') || minutes == null || minutes == undefined || $('#minutes_' + id + '').val().length == 0)) {
                if (value > 60) {
                    $('#minutes_' + id + '').val(minutes)
                    $('#minutes_' + id + '').siblings('label').addClass('active')
                } else {
                    seconds = value
                    $('#minutes_' + id + '').val(0)
                    $('#minutes_' + id + '').siblings('label').addClass('active')
                }
            } else {
                $('#minutes_' + id + '').val(parseInt($('#minutes_' + id + '').val()) + parseInt(minutes))
                $('#minutes_' + id + '').siblings('label').addClass('active')
            }
            $('#seconds_' + id + '').val(seconds)
            $.post(
                'handler.php', {
                    x: id,
                    athCatDetails: true
                },
                function (result) {
                    let data = JSON.parse(result)
                    let time = ''
                    let athTime = parseInt($('#seconds_' + id + '').val()) + parseInt($('#minutes_' + id + '').val() * 60)
                    if (data[0]['time'].length > 3) {
                        time = FormatStandardTime(data)
                    } else {
                        time = data[0]['time'].replace(/[^0-9.]/g, "");
                    }
                    let points = 0
                    let delta = 0
                    if ($.isNumeric(athTime)) {
                        // if (athTime != 0) {
                        //     athTime += athTime
                        // }

                        if (athTime < time) {
                            while (parseInt(delta) + parseInt(athTime) < time) {
                                delta++
                            }
                            points = (parseInt(delta) * parseInt(data[0]['ptsPerSec'])) + parseInt(data[0]['points'])
                            if ($.isNumeric(points)) {
                                $('#points_' + id + '').html(points)
                            }
                        }
                        if (athTime > time) {
                            while (parseInt(delta) + parseInt(athTime) > time) {
                                delta--
                            }
                            points = (parseInt(delta) * parseInt(data[0]['ptsPerSec'])) + parseInt(data[0]['points'])
                            if ($.isNumeric(points)) {
                                $('#points_' + id + '').html(points)
                            }
                        }
                        if (athTime == time && $.isNumeric(data[0]['points'])) {
                            $('#points_' + id + '').html(data[0]['points'])
                        }
                    }
                }
            )
        })
    }

    function FormatStandardTime(array) {
        let time = array[0]['time']
        let min = time[0]
        return parseInt(time[2] + time[3]) + parseInt(min) * 60
    }
})