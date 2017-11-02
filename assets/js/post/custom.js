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
$(document).ready(function () {
    // Start fitVids
    var $postContent = $(".post-full-content");
    $postContent.fitVids();
    // End fitVids

    var progressBar = document.querySelector('progress');
    var header = document.querySelector('.floating-header');
    var title = document.querySelector('.post-full-title');

    var lastScrollY = window.scrollY;
    var lastWindowHeight = window.innerHeight;
    var lastDocumentHeight = $(document).height();
    var ticking = false;

    function onScroll() {
        lastScrollY = window.scrollY;
        requestTick();
    }

    function onResize() {
        lastWindowHeight = window.innerHeight;
        lastDocumentHeight = $(document).height();
        requestTick();
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    }

    function update() {
        var trigger = title.getBoundingClientRect().top + window.scrollY;
        var triggerOffset = title.offsetHeight + 35;
        var progressMax = lastDocumentHeight - lastWindowHeight;

        // show/hide floating header
        if (lastScrollY >= trigger + triggerOffset) {
            header.classList.add('floating-active');
        } else {
            header.classList.remove('floating-active');
        }

        progressBar.setAttribute('max', progressMax);
        progressBar.setAttribute('value', lastScrollY);

        ticking = false;
    }

    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onResize, false);

    update();
});
