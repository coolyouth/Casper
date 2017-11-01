$(document).ready(function() {
    $('pre code').each(function(i, block) {
      if($(block).attr('class')){
          $(block).attr('class',$(block).attr('class').replace("language-",""));
      }
      hljs.highlightBlock(block);
    });
  });