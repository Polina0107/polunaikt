$(function() {
	$(".g-form").submit(function (event) {
		event.preventDefault();

		let appLink = "https://script.google.com/macros/s/AKfycbxkqS8NbDtJwExJMmBJ90EoOVn3DNwqdzSXMeZgXsOahz-ZZRtIL-Lbp_t9VdoQEgO5hQ/exec";
		let successRespond = 'Сообщение успешно отправлено.';
		let errorRespond = 'Не удалось отправить сообщение. Cвяжитесь с администратором сайта по адресу <a href="mailto:smart-landing@ya.ru">smart-landing@ya.ru</a>';
		let form = $('#' + $(this).attr('id'))[0];
		let formRespond = $(this).find('.g-form__title_respond');
		let formTitle = $(this).find('.g-form__title_main');
		let preloader = $(this).find('.g-form__preloader');
		let submitButton = $(this).find('.g-form__button');
		let fd = new FormData(form);

		$.ajax({

			url: appLink,
			type: "POST",
			data: fd,
			processData: false,
			contentType: false,
			beforeSend: function(){

				if(fd.get('honeypot').length) {
					return false;
				} else {
					fd.delete('honeypot');
				}

				preloader.css('opacity', '1');
				submitButton.prop('disabled', true);

			},

		}).done(function(res, textStatus, jqXHR) {

			if(jqXHR.readyState === 4 && jqXHR.status === 200) {

				formTitle.css({
					'display': 'none'
				});

				preloader.css('opacity', '0');
				formRespond.html(successRespond).css('color', '#37b599');
				submitButton.prop('disabled', false);
				form.reset();

			} else {
				formTitle.css({
					'display': 'none'
				});
				formRespond.html(errorRespond).css('color', '#c64b4b');
				preloader.css('opacity', '0');
				setTimeout( () => {
					formRespond.css({
						'display': 'none'
					});
					formTitle.css({
						'display': 'block'
					});

					submitButton.prop('disabled', false);
				}, 5000);

				console.log('Гугл не ответил статусом 200');
			}
		}).fail(function(res, textStatus, jqXHR) {
			formTitle.css({
				'display': 'none'
			});
			preloader.css('opacity', '0');
			formRespond.html('Не удалось отправить сообщение. Cвяжитесь с администратором сайта другим способом').css('color', '#c64b4b');
			setTimeout( () => {
				formRespond.css({
					'display': 'none'
				});
				formTitle.css({
					'display': 'block'
				});
				submitButton.prop('disabled', false);
			}, 5000);

			console.log('Не удалось выполнить запрос по указанному в скрипте пути');
		});
	});
}(jQuery));