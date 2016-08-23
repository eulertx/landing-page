$(window).scroll(function() {
  $('#services .m4').each(function(){
  var imagePos = $(this).offset().top;

  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+600) {
      $(this).addClass("fadeIn");
    }
  });

  $('#last_posts .post:eq(0)').each(function(){
  var imagePos = $(this).offset().top;
  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+600) {
      $(this).addClass("slideRight");
    }
  });

  $('#last_posts .post:eq(1)').each(function(){
  var imagePos = $(this).offset().top;
  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+600) {
      $(this).addClass("fadeIn");
    }
  });

  $('#last_posts .post:eq(2)').each(function(){
  var imagePos = $(this).offset().top;
  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+600) {
      $(this).addClass("slideLeft");
    }
  });

  $('#last_posts .post:eq(3)').each(function(){
  var imagePos = $(this).offset().top;
  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+620) {
      $(this).addClass("slideRight");
    }
  });

  $('#last_posts .post:eq(4)').each(function(){
  var imagePos = $(this).offset().top;
  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+620) {
      $(this).addClass("fadeIn");
    }
  });

  $('#last_posts .post:eq(5)').each(function(){
  var imagePos = $(this).offset().top;
  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+620) {
      $(this).addClass("slideLeft");
    }
  });

  $('#team .m4').each(function(){
  var imagePos = $(this).offset().top;

  var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow+550) {
      $(this).addClass("fadeIn");
    }
  });
});