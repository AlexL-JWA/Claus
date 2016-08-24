jQuery(document).ready(function ($) {

    $(".prevent_link").click(function (e) {
        e.preventDefault();
        $(this).addClass('active');
        $(this).siblings('.internally_nav_sub').show();
    });

    /* datepicker */
    if ($("#start_data").length || $(".input-daterange").length || $("#datepicker-work-diary").length)
        $('#start_data input,.input-daterange,#datepicker-work-diary').datepicker({
            format: "dd.mm.yyyy",
            autoclose: true
        });
    /* end */

    /* mobile menu */
    $('#mobile_menu img').click(function () {
        if ($(window).width() < 768) {
            var $mobile_menu = $('.clj_nav ul');

            if ($mobile_menu.css('opacity') != '1') {
                $mobile_menu.css({
                    opacity: "1",
                    zIndex: "999"
                });
                var firstClick = true;
                $(document).bind('click.myEvent', function (e) {
                    if (!firstClick && $(e.target).closest($mobile_menu).length == 0) {
                        $(document).unbind('click.myEvent');
                        $mobile_menu.css({
                            opacity: "0",
                            zIndex: "-1"
                        });
                    }
                    firstClick = false;
                });
            }
        }
    });
    /* end */

    $(".internally_nav li.internally_nav_li")
        .last()
        .addClass("last_li");

    /*accordeon*/

    $(".internally_nav_sub li span").click(function () {
        if ($(window).width() < 1200) {
            if ($(this).next(".internally_nav_sub_sub").is(":visible")) {
                $(this).next(".internally_nav_sub_sub").slideUp("fast");
                $(this).removeClass("open_sub");

            } else {
                $(".internally_nav_sub li span").removeClass("open_sub");
                $(".internally_nav_sub_sub").slideUp("fast");
                $(this).next(".internally_nav_sub_sub").slideToggle("fast");
                $(this).addClass("open_sub");
            };
        }

    });

    /* checkbox */
    $('#onj_check_1').change(function () {
        if ($('#onj_check_1').is(':checked') == true) {
            $('#onj_check_input_2').prop('disabled', true);
            $("#onj_check_input_2").val("");
        } else {
            $('#onj_check_2').prop('disabled', false);
        }
    });

    $('#onj_check_2').change(function () {
        if ($('#onj_check_2').is(':checked') == true) {
            $('#onj_check_input_2').prop('disabled', false);
        } else {
            $('#onj_check_input_2').prop('disabled', true);
            $('#onj_check_1').prop('disabled', false);
        }
    });

    var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (is_firefox) {
        $("html").addClass('ff');

    }
});

$(window).resize(function () {
    if ($(window).width() > 768) {
        $('.clj_nav ul').css({
            opacity: "1",
            zIndex: "999"
        });
    } else {
        $('.clj_nav ul').css({
            opacity: "0",
            zIndex: "-1"
        });
        $(".clj_nav ul").removeAttr("style");
    }
});

$(document).mouseup(function (e) {
    var sub_menu = $(".internally_nav_sub");

    if (!sub_menu.is(e.target) && sub_menu.has(e.target).length === 0) {
        sub_menu.hide();
        $(".prevent_link").removeClass("active");
    }

    var sub_sub = $(".internally_nav_sub_sub");

    if (!sub_sub.is(e.target) && sub_sub.has(e.target).length === 0 && $(window).width() < 1200) {
        $(".internally_nav_sub_sub").slideUp("fast");
        $(".internally_nav_sub li span").removeClass("open_sub");
    }

});

/*sticky footer*/

//$(window).bind("load", function() {
//
//	var footerHeight = 0,
//	footerTop = 0,
//	$footer = $("footer");
//
//	positionFooter();
//
//	function positionFooter() {
//
//		footerHeight = $footer.height();
//		footerTop = ($(window).scrollTop()+$(window).height()-footerHeight)+"px";
//
//		if ( ($(document.body).height()+footerHeight) < $(window).height()) {
//			$footer.css({
//				position: "absolute",
//				zIndex: '9999'
//			}).css({
//				top: footerTop
//
//			})
//		} else {
//			$footer.css({
//				position: "static",
//				zIndex: '9999'
//			})
//		}
//
//	}
//
//	$(window)
//	.scroll(positionFooter)
//	.resize(positionFooter)
//
//});
//$(function() {
//
//$("body").css({padding:0,margin:0});
//  var f = function() {
//    $(".ndra-container").css({position:"relative"});
//    var h1 = $("body").height();
//    var h2 = $(window).height();
//    var d = h2 - h1;
//    var h = $(".ndra-container").height() + d;
//    var ruler = $("<div>").appendTo(".ndra-container");
//    h = Math.max(ruler.position().top,h);
//    ruler.remove();
//    $(".ndra-container").height(h);
//  };
//  setInterval(f,1);
//  $(window).resize(f);
//  f();
//
//});

/*Script for tooltip PAGE HIRE*/
var hHint = 1;
$('.hire-hint i').click(function () {
    if (hHint == 1) {
        $('.hire-hint .hint-block').css('opacity', '1');
        hHint = 0;
    } else {
        $('.hire-hint .hint-block').css('opacity', '0');
        hHint = 1;
    }
});

/**/
jQuery(document).ready(function ($) {
    if ($(".clj_nav li span").length != 0) {
        $(".clj_nav").addClass("clj_msg");
    };
});


/**/
/*Tabs*/
(function ($) {
    jQuery.fn.lightTabs = function (options) {

        var createTabs = function () {
            tabs = this;
            i = 0;

            showPage = function (i) {
                $(tabs).children("div").children("div").hide();
                $(tabs).children("div").children("div").eq(i).show();
                $(tabs).children("ul").children("li").removeClass("active");
                $(tabs).children("ul").children("li").eq(i).addClass("active");
            }

            showPage(0);

            $(tabs).children("ul").children("li").each(function (index, element) {
                $(element).attr("data-page", i);
                i++;
            });

            $(tabs).children("ul").children("li").click(function () {
                showPage(parseInt($(this).attr("data-page")));
            });
        };
        return this.each(createTabs);
    };
})(jQuery);

$(document).ready(function () {
    $(".tabs").lightTabs();
    var modal_next = $('.next-modal');


    $('.next-modal').click(function (e) {
        $('html').attr("class", "modal-open");
        console.log('dsdsadfsd');
    });
});






var subMenuOpen
$('.submenu').hide();
$('.clj_nav .myProfile').click(function () {
    if (subMenuOpen) {
        subMenuOpen = 0
        $('.submenu').hide();
    } else {
        subMenuOpen = 1
        $('.submenu').show();
    }
});
$(document).mouseup(function (e) {
    var folder = $(".transaction .data ul , .datepicker, .submenu");
    if (!folder.is(e.target) && folder.has(e.target).length === 0) {
        folder.hide();

    }
});
