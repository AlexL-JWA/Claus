/*slide down (detailed view page) detailed view of company*/
$(document).ready(function () {

    /*
    var totalHeight = 0;
    var minHeight = 0;
    var minLines = $(".wrapper-history").data('lines') || 3;

    $(".history-line").each(function (index) {
        if (index < minLines) {
            minHeight += parseInt($(this).outerHeight(), 10);
        }
        totalHeight += parseInt($(this).outerHeight(), 10);
    });
    $(".wrapper-history").height(minHeight);

    $("#show-history").click(function () {
        var height_hist = $(".wrapper-history").height();

        if (height_hist < totalHeight) {
            $(".wrapper-history").height(totalHeight);
            $("#show-history").css({
                '-webkit-transform': 'rotate(180deg)',
                '-moz-transform': 'rotate(180deg)',
                'transform': 'rotate(180deg)'
            });
        } else {
            $(".wrapper-history").height(minHeight);
            $("#show-history").css({
                '-webkit-transform': 'rotate(0deg)',
                '-moz-transform': 'rotate(0deg)',
                'transform': 'rotate(0deg)'
            });
        };
    });
    */

    /*fading-bg*/
    $(".fading-bg").click(function(){
     $('.page-correspond .col-recent-history').hide();
     $(this).css({
        visibility: "hidden"
    });
 })

    /*block with scroll*/
    if($(".page-correspond").length != 0) {
       if( $(window).width() < 768 ) {
        $(".messages-container,.history-list").getNiceScroll().remove();
    } else {
        $(".messages-container,.history-list").niceScroll({
            cursorcolor: "#83c124",
            cursorborder: "4px solid #83c124",
            touchbehavior: true
        });
    };
}


$('.icon-call-contact img').on({
    click: function() {
        var click = 1;

        if(click) {
            $('.page-correspond .col-recent-history').show();
            $(".fading-bg").css({
                visibility: "visible"
            });
            click = 0;
        } else {
            $('.page-correspond .col-recent-history').hide();
            click = 1;
        }
    }
});

});  /*end document ready*/

$(window).resize(function(){
    if($(".page-correspond").length != 0) {

        if( $(window).width() < 768 ) {
            $(".messages-container,.history-list").getNiceScroll().remove();
            $('.page-correspond .col-recent-history').hide();
            $(".fading-bg").css({
                visibility: "hidden"
            });
        } else {
            $(".messages-container,.history-list").niceScroll({
                cursorcolor: "#83c124",
                cursorborder: "4px solid #83c124",
                touchbehavior: true
            });
            $('.page-correspond .col-recent-history').show();
        }
    }
});



