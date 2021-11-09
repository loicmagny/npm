"use strict";

$(document).ready(function () {
  var laserRun = 'http://localhost/Excel-converter/laser_run.php';

  if ($(location).attr('href') == laserRun) {
    var generateHTMLTable = function generateHTMLTable(data, gender) {
      var l = 1;
      var k = 1;
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        $('#' + gender + 'sHeats').append('<li>' + '<div class="collapsible-header heat" id="heat_' + l + '_' + gender + 's"><i class="material-icons"><img src="https://img.icons8.com/ios-glyphs/24/000000/male.png"/></i>Série ' + l + ' -&nbsp; <span id="' + gender + 'sHeatDistance' + l + '"> </span></div>' + '<div class="collapsible-body" id="heat_' + l + '_' + gender + 's_content">' + '<table id="' + gender + 'sTable_' + l + '">' + '<thead>' + '<tr>' + '<th>Poste de tir</th>' + '<th>Nom</th>' + '<th>Temps</th>' + '<th>Points</th>' + '<th>Handicap Start</th>' + '<th id="actions_' + l + '">Actions</th>' + '</tr>' + '</thead>' + '<tbody id="' + gender + 'sTable_' + l + '_content">' + '</tbody>' + '</table>' + '</div>' + '</li>' + '</ul>');

        for (var j = 0; j < data[i].length; j++) {
          $('#' + gender + 'sTable_' + l + '_content').append('<tr>' + '<form class="col s12">' + '<td>' + '<div class="input-field col s12">' + '<input class="' + gender + 'Line" id="line' + data[i][j]['ath_id'] + '" name="line' + data[i][j]['ath_id'] + '" type="text" class="validate" value="' + k + '">' + '<label class="active" for="line' + data[i][j]['ath_id'] + '">Poste de tir</label>' + '</div>' + '</td>' + '<td>' + data[i][j]['first_name'] + ' ' + data[i][j]['last_name'] + '</td>' + '<td>' + '<div class="input-field col s12">' + '<input class="' + gender + 'Min" id="minutes_' + data[i][j]['ath_id'] + '" name="minutes_' + data[i][j]['ath_id'] + '" type="text" class="validate">' + '<label for="minutes_' + data[i][j]['ath_id'] + '">Minutes</label>' + '</div>' + '<div class="input-field col s12">' + '<input class="' + gender + 'Sec" id="seconds_' + data[i][j]['ath_id'] + '" name="seconds_' + data[i][j]['ath_id'] + '" type="text" class="validate">' + '<label for="seconds_' + data[i][j]['ath_id'] + '">Secondes</label>' + '</div>' + '</td>' + '<td id="points_' + data[i][j]['ath_id'] + '">0</td>' + '<td id="handicap_' + data[i][j]['ath_id'] + '">' + data[i][j]['lr_handicap'] + '</td>' + '<td id="actions_' + data[i][j]['ath_id'] + '">' + '<button class="btn-floating btn-large waves-effect waves-light green btn tooltipped addSwimResult" data-position="right" data-tooltip="Ajouter"' + 'value="add_' + data[i][j]['ath_id'] + '" ><i id="add_' + data[i][j]['ath_id'] + '" class="material-icons">add</i>' + '</td>' + '</form>' + '</tr>');
          k++;
        }

        $('#' + gender + 'sHeatDistance' + l + '').html('' + data[i][0].lr_distance + 'm');
        k = 1;
        l++;
      }
    };

    var formatHandicapTime = function formatHandicapTime(time) {
      var minutes = 0;
      var seconds = 0;
      var handicap = '';

      if (time >= 60) {
        minutes = parseInt(time / 60);
        seconds = parseInt(time % 60);
        handicap = '' + minutes + ':' + seconds + '';
      } else {
        handicap = '0:' + time + '';
      }

      return handicap;
    };

    var splitAthletesByDist = function splitAthletesByDist(datas) {
      var split = new Array([], []);

      for (var i = 0; i < datas.length; i++) {
        if (datas[i].lr_distance == 400) {
          split[0].push(datas[i]);
        } else if (datas[i].lr_distance == 800) {
          split[1].push(datas[i]);
        }
      }

      return split;
    };

    var calculateHandicapStart = function calculateHandicapStart(datas) {
      for (var i = 0; i < datas.length; i++) {
        datas[i].lr_handicap = formatHandicapTime(parseInt(datas[0].points) - parseInt(datas[i].points));
      }

      return datas;
    };

    var formatTime = function formatTime() {
      $('.boySec').focusout(function () {
        var row_id = $(this).prop('id');
        var id = row_id.replace(/[^0-9.]/g, '');
        var value = $(this).val();
        var seconds = parseInt(value % 60);
        var minutes = parseInt(value / 60);

        if ($('#minutes_' + id + '').is('empty') || minutes == null || minutes == undefined || $('#minutes_' + id + '').val().length == 0) {
          if (value > 60) {
            $('#minutes_' + id + '').val(minutes);
            $('#minutes_' + id + '').siblings('label').addClass('active');
          } else {
            seconds = value;
            $('#minutes_' + id + '').val(0);
            $('#minutes_' + id + '').siblings('label').addClass('active');
          }
        } else {
          $('#minutes_' + id + '').val(parseInt($('#minutes_' + id + '').val()) + parseInt(minutes));
          $('#minutes_' + id + '').siblings('label').addClass('active');
        }

        $('#seconds_' + id + '').val(seconds);
        $.post('handler.php', {
          x: id,
          athCatDetails: true
        }, function (result) {
          var data = JSON.parse(result);
          var time = '';
          var athTime = parseInt($('#seconds_' + id + '').val()) + parseInt($('#minutes_' + id + '').val() * 60);

          if (data[0]['lr_time'].length > 3) {
            time = parseTime(data);
          } else {
            time = data[0]['lr_time'].replace(/[^0-9.]/g, '');
          }

          var points = 0;
          var delta = 0;

          if ($.isNumeric(athTime)) {
            // if (athTime != 0) {
            //     athTime += athTime
            // }
            console.log(athTime);
            console.log(time);

            if (athTime < time) {
              while (parseInt(delta) + parseInt(athTime) < time) {
                delta++;
              }

              points = parseInt(delta) * parseInt(data[0]['lr_ptsPerSec']) + parseInt(data[0]['lr_points']);

              if ($.isNumeric(points)) {
                $('#points_' + id + '').html(points);
              }
            }

            if (athTime > time) {
              while (parseInt(delta) + parseInt(athTime) > time) {
                delta--;
              }

              points = parseInt(delta) * parseInt(data[0]['lr_ptsPerSec']) + parseInt(data[0]['lr_points']);

              if ($.isNumeric(points)) {
                $('#points_' + id + '').html(points);
              }
            }

            if (athTime == time && $.isNumeric(data[0]['lr_points'])) {
              $('#points_' + id + '').html(data[0]['lr_points']);
            }
          }
        });
      });
      $('.girlSec').focusout(function () {
        var row_id = $(this).prop('id');
        var id = row_id.replace(/[^0-9.]/g, '');
        var value = $(this).val();
        var seconds = parseInt(value % 60);
        var minutes = parseInt(value / 60);

        if ($('#minutes_' + id + '').is('empty') || minutes == null || minutes == undefined || $('#minutes_' + id + '').val().length == 0) {
          if (value > 60) {
            $('#minutes_' + id + '').val(minutes);
            $('#minutes_' + id + '').siblings('label').addClass('active');
          } else {
            seconds = value;
            $('#minutes_' + id + '').val(0);
            $('#minutes_' + id + '').siblings('label').addClass('active');
          }
        } else {
          $('#minutes_' + id + '').val(parseInt($('#minutes_' + id + '').val()) + parseInt(minutes));
          $('#minutes_' + id + '').siblings('label').addClass('active');
        }

        $('#seconds_' + id + '').val(seconds);
        $.post('handler.php', {
          x: id,
          athCatDetails: true
        }, function (result) {
          var data = JSON.parse(result);
          var time = '';
          var athTime = parseInt($('#seconds_' + id + '').val()) + parseInt($('#minutes_' + id + '').val() * 60);

          if (data[0]['time'].length > 3) {
            time = parseTime(data);
          } else {
            time = data[0]['time'].replace(/[^0-9.]/g, '');
          }

          var points = 0;
          var delta = 0;

          if ($.isNumeric(athTime)) {
            // if (athTime != 0) {
            //     athTime += athTime
            // }
            if (athTime < time) {
              while (parseInt(delta) + parseInt(athTime) < time) {
                delta++;
              }

              points = parseInt(delta) * parseInt(data[0]['ptsPerSec']) + parseInt(data[0]['points']);

              if ($.isNumeric(points)) {
                $('#points_' + id + '').html(points);
              }
            }

            if (athTime > time) {
              while (parseInt(delta) + parseInt(athTime) > time) {
                delta--;
              }

              points = parseInt(delta) * parseInt(data[0]['ptsPerSec']) + parseInt(data[0]['points']);

              if ($.isNumeric(points)) {
                $('#points_' + id + '').html(points);
              }
            }

            if (athTime == time && $.isNumeric(data[0]['points'])) {
              $('#points_' + id + '').html(data[0]['points']);
            }
          }
        });
      });
    };

    var parseTime = function parseTime(array) {
      var time = array[0]['lr_time'];
      var min = time[0];
      return parseInt(time[2] + time[3]) + parseInt(min) * 60;
    };

    $.post('handler.php', {
      getAthTimes: true,
      gender: 1
    }, function (data) {
      var datas = splitAthletesByDist(JSON.parse(data));
      var sorted = Array();

      for (var i = 0; i < datas.length; i++) {
        datas[i] = datas[i].sort(function (a, b) {
          return b.points - a.points;
        });
        sorted[i] = calculateHandicapStart(datas[i]);
      }

      generateHTMLTable(datas, 'boy');
      $('.collapsible').collapsible();
      formatTime();
    });
    $.post('handler.php', {
      getAthTimes: true,
      gender: 0
    }, function (data) {
      var datas = splitAthletesByDist(JSON.parse(data));
      console.log(datas);
      var sorted = Array();

      for (var i = 0; i < datas.length; i++) {
        datas[i] = datas[i].sort(function (a, b) {
          return b.points - a.points;
        });
        sorted[i] = calculateHandicapStart(datas[i]);
      }

      generateHTMLTable(sorted, 'girl');
      $('.collapsible').collapsible();
      formatTime();
    });
  }
});