$(document).ready(function () {
	let swimming = 'http://localhost/Excel-converter/swimming.php';

	if ($(location).attr('href') == swimming) {
		$.post(
			'handler.php',
			{
				getBoys: true,
			},
			function (data) {
				let datas = JSON.parse(data);
				let sorted = [];
				for (x in datas) {
					sorted[x] = sortAthletes(datas[x]);
				}
				generateHTML(sorted, 'boy');
				$('.collapsible').collapsible();
				formatTime();
				$.post(
					'handler.php',
					{
						getTimes: true,
						gender: 0,
					},
					function (data) {
						let datas = JSON.parse(data);
						formatTimeEntry(datas, 'girl');
					}
				);
			}
		);
		$.post(
			'handler.php',
			{
				getGirls: true,
			},
			function (data) {
				let datas = JSON.parse(data);
				let sorted = [];
				for (x in datas) {
					sorted[x] = sortAthletes(datas[x]);
				}
				generateHTML(sorted, 'girl');
				$('.collapsible').collapsible();
				formatTime();
				$.post(
					'handler.php',
					{
						getTimes: true,
						gender: 1,
					},
					function (data) {
						let datas = JSON.parse(data);
						formatTimeEntry(datas, 'boy');
					}
				);
			}
		);

		$('#boysHeats').on('click', 'button', function (e) {
			let target = e.target.id;
			let id = target.replace(/[^0-9.]/g, '');
			let athTime =
				'' +
				$('#minutes_' + id + '').val() +
				' ' +
				$('#seconds_' + id + '').val() +
				'';
			let athPoints = $('#points_' + id + '').text();
			let athHeat = $(this).parent().parent().parent().prop('id');
			athHeat = athHeat.replace(/[^0-9.]/g, '');

			$('#actions_' + id + '').html(
				'<td>' +
					'<button class="btn-floating btn-large waves-effect waves-light blue btn tooltipped editSwimResult" data-position="right" data-tooltip="Modifier"' +
					'value="edit_' +
					id +
					'" ><i id="edit_' +
					id +
					'" class="material-icons edit">edit</i>' +
					'</td>'
			);
			$('.tooltipped').tooltip();
			$.post(
				'handler.php',
				{
					insertAthResult: true,
					time: athTime,
					athlete: id,
					heat: athHeat,
					points: athPoints,
					fouls: 0,
					gender: 1,
				},
				function () {}
			);
			$('#edit_' + id + '').click(function () {
				$.post(
					'handler.php',
					{
						editAthResult: true,
						time: athTime,
						athlete: id,
						heat: athHeat,
						points: athPoints,
						fouls: 0,
						gender: 1,
					},
					function (data) {}
				);
			});
		});
		$('#girlsHeats').on('click', 'button', function (e) {
			let target = e.target.id;
			let id = target.replace(/[^0-9.]/g, '');
			let athTime =
				'' +
				$('#minutes_' + id + '').val() +
				' ' +
				$('#seconds_' + id + '').val() +
				'';
			let athPoints = $('#points_' + id + '').text();
			let athHeat = $(this).parent().parent().parent().prop('id');
			athHeat = athHeat.replace(/[^0-9.]/g, '');

			$('#actions_' + id + '').html(
				'<td>' +
					'<button class="btn-floating btn-large waves-effect waves-light blue btn tooltipped editSwimResult" data-position="top" data-tooltip="Modifier"' +
					'value="edit_' +
					id +
					'" ><i id="edit_' +
					id +
					'" class="material-icons edit">edit</i>' +
					'</td>'
			);
			$('.tooltipped').tooltip();
			$.post(
				'handler.php',
				{
					insertAthResult: true,
					time: athTime,
					athlete: id,
					heat: athHeat,
					points: athPoints,
					fouls: 0,
					gender: 0,
				},
				function () {}
			);
			$('#edit_' + id + '').click(function () {
				$.post(
					'handler.php',
					{
						editAthResult: true,
						time: athTime,
						athlete: id,
						heat: athHeat,
						points: athPoints,
						fouls: 0,
						gender: 0,
					},
					function (data) {}
				);
			});
		});

		function translateTime(str) {
			let min = str[0];
			return parseInt(str[2] + str[3]) + parseInt(min) * 60;
		}
		function dynamicMatrix(size) {
			let matrix = [];
			for (let i = 0; i < size; i++) {
				matrix[i] = new Array(size);
			}
			return matrix;
		}
		function sortAthletes(obj) {
			let size = Math.ceil(obj.length / 5);
			let heats = dynamicMatrix(size);
			let j = 0;
			let k = 0;
			let l = 0;
			for (let i = 0; i < obj.length; i++) {
				obj[i].swimTime = parseInt(obj[i].swimTime.replace(/\D/g, ''));
				if (obj[i].swimTime >= 60) {
					obj[i].swimTime = '' + obj[i].swimTime;
				}
			}
			obj = obj.sort(function (a, b) {
				return a.swimTime - b.swimTime;
			});
			for (let i = 0; i < obj.length; i++) {
				heats[j][l] = obj[i];
				l++;
				k++;
				if (obj.length > 5) {
					if (k == Math.ceil(obj.length / 2) || k == 5) {
						j++;
						l = 0;
						k = 0;
					}
				}
			}
			return heats;
		}
		function formatTime() {
			$('.boySec').focusout(function () {
				let row_id = $(this).prop('id');
				let id = row_id.replace(/[^0-9.]/g, '');
				let value = $(this).val();
				let seconds = parseInt(value % 60);
				let minutes = parseInt(value / 60);
				if (
					$('#minutes_' + id + '').is('empty') ||
					minutes == null ||
					minutes == undefined ||
					$('#minutes_' + id + '').val().length == 0
				) {
					if (value > 60) {
						$('#minutes_' + id + '').val(minutes);
						$('#minutes_' + id + '')
							.siblings('label')
							.addClass('active');
					} else {
						seconds = value;
						$('#minutes_' + id + '').val(0);
						$('#minutes_' + id + '')
							.siblings('label')
							.addClass('active');
					}
				} else {
					$('#minutes_' + id + '').val(
						parseInt($('#minutes_' + id + '').val()) + parseInt(minutes)
					);
					$('#minutes_' + id + '')
						.siblings('label')
						.addClass('active');
				}
				$('#seconds_' + id + '').val(seconds);
				$.post(
					'handler.php',
					{
						x: id,
						athCatDetails: true,
					},
					function (result) {
						let data = JSON.parse(result);
						let time = '';
						let athTime =
							parseInt($('#seconds_' + id + '').val()) +
							parseInt($('#minutes_' + id + '').val() * 60);
						if (data[0]['time'].length > 3) {
							time = parseTime(data);
						} else {
							time = data[0]['time'].replace(/[^0-9.]/g, '');
						}
						let points = 0;
						let delta = 0;
						if ($.isNumeric(athTime)) {
							// if (athTime != 0) {
							//     athTime += athTime
							// }

							if (athTime < time) {
								while (parseInt(delta) + parseInt(athTime) < time) {
									delta++;
								}
								points =
									parseInt(delta) * parseInt(data[0]['ptsPerSec']) +
									parseInt(data[0]['points']);
								if ($.isNumeric(points)) {
									$('#points_' + id + '').html(points);
								}
							}
							if (athTime > time) {
								while (parseInt(delta) + parseInt(athTime) > time) {
									delta--;
								}
								points =
									parseInt(delta) * parseInt(data[0]['ptsPerSec']) +
									parseInt(data[0]['points']);
								if ($.isNumeric(points)) {
									$('#points_' + id + '').html(points);
								}
							}
							if (athTime == time && $.isNumeric(data[0]['points'])) {
								$('#points_' + id + '').html(data[0]['points']);
							}
						}
					}
				);
			});
			$('.girlSec').focusout(function () {
				let row_id = $(this).prop('id');
				let id = row_id.replace(/[^0-9.]/g, '');
				let value = $(this).val();
				let seconds = parseInt(value % 60);
				let minutes = parseInt(value / 60);
				if (
					$('#minutes_' + id + '').is('empty') ||
					minutes == null ||
					minutes == undefined ||
					$('#minutes_' + id + '').val().length == 0
				) {
					if (value > 60) {
						$('#minutes_' + id + '').val(minutes);
						$('#minutes_' + id + '')
							.siblings('label')
							.addClass('active');
					} else {
						seconds = value;
						$('#minutes_' + id + '').val(0);
						$('#minutes_' + id + '')
							.siblings('label')
							.addClass('active');
					}
				} else {
					$('#minutes_' + id + '').val(
						parseInt($('#minutes_' + id + '').val()) + parseInt(minutes)
					);
					$('#minutes_' + id + '')
						.siblings('label')
						.addClass('active');
				}
				$('#seconds_' + id + '').val(seconds);
				$.post(
					'handler.php',
					{
						x: id,
						athCatDetails: true,
					},
					function (result) {
						let data = JSON.parse(result);
						let time = '';
						let athTime =
							parseInt($('#seconds_' + id + '').val()) +
							parseInt($('#minutes_' + id + '').val() * 60);
						if (data[0]['time'].length > 3) {
							time = parseTime(data);
						} else {
							time = data[0]['time'].replace(/[^0-9.]/g, '');
						}
						let points = 0;
						let delta = 0;
						if ($.isNumeric(athTime)) {
							// if (athTime != 0) {
							//     athTime += athTime
							// }

							if (athTime < time) {
								while (parseInt(delta) + parseInt(athTime) < time) {
									delta++;
								}
								points =
									parseInt(delta) * parseInt(data[0]['ptsPerSec']) +
									parseInt(data[0]['points']);
								if ($.isNumeric(points)) {
									$('#points_' + id + '').html(points);
								}
							}
							if (athTime > time) {
								while (parseInt(delta) + parseInt(athTime) > time) {
									delta--;
								}
								points =
									parseInt(delta) * parseInt(data[0]['ptsPerSec']) +
									parseInt(data[0]['points']);
								if ($.isNumeric(points)) {
									$('#points_' + id + '').html(points);
								}
							}
							if (athTime == time && $.isNumeric(data[0]['points'])) {
								$('#points_' + id + '').html(data[0]['points']);
							}
						}
					}
				);
			});
		}
		function parseTime(array) {
			let time = array[0]['time'];
			let min = time[0];
			return parseInt(time[2] + time[3]) + parseInt(min) * 60;
		}

		function formatTimeEntry(datas, gender) {
			let success = 0;
			for (let i = 0; i < datas.length; i++) {
				let time = translateTime(datas[i]['time']);
				if (time < 60) {
					$('#minutes_' + datas[i]['ath_id'] + '').val(0);
					$('#seconds_' + datas[i]['ath_id'] + '').val(time);
					$('#minutes_' + datas[i]['ath_id'] + '')
						.siblings('label')
						.addClass('active');
					$('#seconds_' + datas[i]['ath_id'] + '')
						.siblings('label')
						.addClass('active');
				}
				if (time >= 60) {
					$('#minutes_' + datas[i]['ath_id'] + '').val(parseInt(time / 60));
					$('#seconds_' + datas[i]['ath_id'] + '').val(parseInt(time % 60));
					$('#minutes_' + datas[i]['ath_id'] + '')
						.siblings('label')
						.addClass('active');
					$('#seconds_' + datas[i]['ath_id'] + '')
						.siblings('label')
						.addClass('active');
				}
				$('#points_' + datas[i]['ath_id'] + '').html(datas[i]['points']);
				$('#actions_' + datas[i]['ath_id'] + '').html(
					'<td>' +
						'<button class="btn-floating btn-large waves-effect waves-light blue btn tooltipped editSwimResult" data-position="top" data-tooltip="Ajouter"' +
						'value="edit_' +
						datas[i]['ath_id'] +
						'" ><i id="edit_' +
						datas[i]['ath_id'] +
						'" class="material-icons edit">edit</i>' +
						'</td>'
				);
				success++;
				if (
					success ==
					$('#' + gender + 'sTable_' + i + '_content').children().length - 1
				) {
					success = 0;
				}
			}
		}

		function generateHTML(sorted, gender) {
			let k = 1;
			let l = 1;
			for (let i = 0; i < sorted.length; i++) {
				for (let j = 0; j < sorted[i].length; j++) {
					$('#' + gender + 'sHeats').append(
						'<li>' +
							'<div class="collapsible-header heat" id="heat_' +
							l +
							'_' +
							gender +
							's"><i class="material-icons"><img src="https://img.icons8.com/ios-glyphs/24/000000/male.png"/></i>Série ' +
							l +
							' -&nbsp; <span id="' +
							gender +
							'sHeatDistance' +
							l +
							'"> </span></div>' +
							'<div class="collapsible-body" id="heat_' +
							l +
							'_' +
							gender +
							's_content">' +
							'<table id="' +
							gender +
							'sTable_' +
							l +
							'">' +
							'<thead>' +
							'<tr>' +
							'<th>Ligne</th>' +
							'<th>Nom</th>' +
							'<th>Temps</th>' +
							'<th>Points</th>' +
							'<th id="actions">Actions</th>' +
							'</tr>' +
							'</thead>' +
							'<tbody id="' +
							gender +
							'sTable_' +
							l +
							'_content">' +
							'</tbody>' +
							'</table>' +
							'</div>' +
							'</li>' +
							'</ul>'
					);

					for (let x = 0; x < sorted[i][j].length; x++) {
						$('#' + gender + 'sTable_' + l + '_content').append(
							'<tr>' +
								'<form class="col s12">' +
								'<td>' +
								'<div class="input-field col s6">' +
								'<input class="' +
								gender +
								'Line" id="line' +
								sorted[i][j][x]['id'] +
								'" name="line' +
								sorted[i][j][x]['id'] +
								'" type="text" class="validate" value="' +
								k +
								'">' +
								'<label class="active" for="line' +
								sorted[i][j][x]['id'] +
								'">Ligne</label>' +
								'</div>' +
								'</td>' +
								'<td>' +
								sorted[i][j][x]['first_name'] +
								' ' +
								sorted[i][j][x]['last_name'] +
								'</td>' +
								'<td>' +
								'<div class="input-field col s6">' +
								'<input class="' +
								gender +
								'Min" id="minutes_' +
								sorted[i][j][x]['id'] +
								'" name="minutes_' +
								sorted[i][j][x]['id'] +
								'" type="text" class="validate">' +
								'<label for="minutes_' +
								sorted[i][j][x]['id'] +
								'">Minutes</label>' +
								'</div>' +
								'<div class="input-field col s6">' +
								'<input class="' +
								gender +
								'Sec" id="seconds_' +
								sorted[i][j][x]['id'] +
								'" name="seconds_' +
								sorted[i][j][x]['id'] +
								'" type="text" class="validate">' +
								'<label for="seconds_' +
								sorted[i][j][x]['id'] +
								'">Secondes</label>' +
								'</div>' +
								'</td>' +
								'<td id="points_' +
								sorted[i][j][x]['id'] +
								'">0</td>' +
								'<td id="actions_' +
								sorted[i][j][x]['id'] +
								'">' +
								'<button class="btn-floating btn-large waves-effect waves-light green btn tooltipped addSwimResult" data-position="right" data-tooltip="Ajouter"' +
								'value="add_' +
								sorted[i][j][x]['id'] +
								'" ><i id="add_' +
								sorted[i][j][x]['id'] +
								'" class="material-icons">add</i>' +
								'</td>' +
								'</form>' +
								'</tr>'
						);
						k++;
					}
					$('#' + gender + 'sHeatDistance' + l + '').html(
						'' + sorted[i][j][0].distance + 'm'
					);
					k = 1;
					l++;
				}
			}
			$('.tooltipped').tooltip();
		}
	}
});
