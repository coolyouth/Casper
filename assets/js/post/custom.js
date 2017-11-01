$(document).ready(function() {
    $('pre code').each(function(i, block) {
      if($(block).attr('class')){
          $(block).attr('class',$(block).attr('class').replace("language-",""));
      }
      $(block.parentNode).attr('class',$(block).attr('class'));
      hljs.highlightBlock(block);
    });
  });