jQuery(document).ready(function($) {

  var header = $('.row-fix');
  $(window).on('scroll', function(e){
      header.css('top', $(this).scrollTop());
      // или
      // header.offset({top: $(this).scrollTop()});
  });


  var head = $('.row-fix-2');
  $(window).on('scroll', function(e){
      head.css('top', $(this).scrollTop());
      // или
      // header.offset({top: $(this).scrollTop()});
  });

});
