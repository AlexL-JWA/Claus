$( ".quest span" ).each(function(){
    $(this).click(function(){
        $(this).parent('.quest').find('p').slideToggle( "slow", function() {
    // Animation complete.
        });
        $(this).children('i').toggleClass('rotated');
    });
});

$('.nav a').on('click',function () {
        elementClick = $(this).attr("href");
        $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
        // вычитаем высоту «шапки»
        destination = $(elementClick).offset().top;

        if($.browser.safari || $.browser.chrome){
            $('body').animate( { scrollTop: destination }, 1100 );
        }else{
            $('html').animate( { scrollTop: destination }, 1100 );
        }
        return false;
    });

$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});









