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
        mathjax.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(mathjax, s);
      }
  })