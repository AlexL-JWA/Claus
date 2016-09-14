 $(document).ready(function(){
  $('.carousel').carousel();

  $(".prev_link").click(function(){
    $('.carousel').carousel('prev');
  });
  $(".next_link").click(function(){
    $('.carousel').carousel('next');
  });
});
 // $("#rating-view").rating({min:1, max:10, step:2, size:'lg'});

 $(document).ready(function(){
  if($(".slider-2").length != 0) {
   $('.slider-2').slider({full_width: true});
 }
});
// $(document).on("scroll",function(){
//   if($(document).scrollTop()>650){
//    $(".header-mnu").removeClass("large").addClass("black-header");
//  }
//  else{
//    $(".header-mnu").removeClass("black-header").addClass("large");
//  }
//});

 $(function() {
  if($("form[enctype='multipart/form-data']").length) {
    $('form input:file').uploadThumbs({
        position  : '#preview',    // any: arbitrarily jquery selector
        alternate : '.alt'         // selecter for alternate view input file names
      });
  };

});


// call initialization file
if (window.File && window.FileList && window.FileReader) {
  var filedrag = $("#preview");

    // is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
        // file drop
        filedrag.on("dragover", hover);
        filedrag.on("dragleave", hover);
        filedrag.on("drop", handler);
      }
    }

// file drag hover
function hover(e) {
  e.stopPropagation();
  e.preventDefault();
  if(e.type == "dragover")
    $(e.target).addClass("hover");
  else
    $(e.target).removeClass("hover");
}
// file selection
function handler(e) {
    // cancel event and hover styling
    hover(e);

    // fetch FileList object
    var files = e. originalEvent.target.files || e. originalEvent.dataTransfer.files;
    showImage(files[0]);
  }


  function showImage(f) {
    var img = $('<img>');
    var reader = new FileReader();
    reader.onloadend = function() {
      img.attr('src', reader.result);
      $('#preview').css('background-image', 'url('+reader.result+')').addClass("selected");
    }
    reader.readAsDataURL(f);
  }
  $( ".like .icon-heart297" ).click(function() {
    $( this ).toggleClass( "active" );
  });
