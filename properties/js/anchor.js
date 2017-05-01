var $toc = $('#toc');
$('h3').each(function(){
  var title = $(this).html();
  var anchor = $(this).parent().parent().children('a').attr('name');
  $toc.append('<li><a href="#'+anchor+'">'+title+'</a></li>');
});
