$(document).ready(function() {
    $('pre code').each(function(i, block) {
      if($(block).attr('class')){
          $(block).attr('class',$(block).attr('class').replace("language-",""));
      }
      $(block.parentNode).attr('class',$(block).attr('class'));
      hljs.highlightBlock(block);
    });
  });
  $(function(){
    $('pre code').each(function(){
        var lines = $(this).text().split('\n').length - 1;
        var $numbering = $('<ul/>').addClass('number');
        $(this)
            .parent()
            .append($numbering);
        for(i=1;i<=lines;i++){
            $numbering.append($('<li/>').text(i));
        }
    });
});
