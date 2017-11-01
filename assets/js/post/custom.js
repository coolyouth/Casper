$(document).ready(function() {
    $('pre code').each(function(i, block) {
      if($(block).attr('class')){
          $(block).attr('class',$(block).attr('class').replace("language-",""));
      }
      $(block.parentNode).attr('class',$(block).attr('class'));
      hljs.highlightBlock(block);
    });
  });
  $('.post-full-content').each(function(i,block){
      if(block.innerHTML.match(/\$\S+\$/)){
        var mathjax = document.createElement("script");
        mathjax.src = "/assets/built/js/mathjax.js?config=TeX-AMS_CHTML-full";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(mathjax, s);
      }
  })