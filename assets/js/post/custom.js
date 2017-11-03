$(document).ready(function () {
    $('pre code').each(function (i, block) {
        if ($(block).attr('class')) {
            $(block).attr('class', $(block).attr('class').replace("language-", ""));
        }
        $(block.parentNode).attr('class', $(block).attr('class'));
        hljs.highlightBlock(block);
    });
});
$(function () {
    $('pre code').each(function () {
        var lines = $(this).text().split('\n').length - 1;
        var $numbering = $('<ul/>').addClass('number');
        $(this)
            .parent()
            .append($numbering);
        for (i = 1; i <= lines; i++) {
            $numbering.append($('<li/>').text(i));
        }
    });
});
$('.post-full-content p').each(function (i, block) {
    if (block.innerHTML.match(/\$\S+\$/)) {
        var mathjax = document.createElement("script");
        mathjax.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(mathjax, s);
        var config = document.createElement("script");
        config.type = "text/x-mathjax-config";
        config.innerText = 'MathJax.Hub.Config({tex2jax: {inlineMath: [["$","$"]]}});'
        mathjax.parentNode.insertBefore(config, mathjax);
    }
})
