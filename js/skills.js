$(document).ready(function(){
	var catLink = $('.bd-skills .category li');
	$(catLink).each(function(){
		$(this).click(function(){
			var dataId = $(this).data('id');
			$(this).parent('ul.category').hide();
			$(this).parents('.bd-skills').find('#' +dataId ).show();
		});
	});
	$('.category-detailed .top a').click(function(){
		$(this).parents('.category-detailed').hide();
		$('ul.category').show();
	});
});









