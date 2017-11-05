$(document).ready(function () {
    // Start fitVids
    var $postContent = $(".post-full-content");
    $postContent.fitVids();
    // End fitVids

    //Satrt code block
    $('pre code').each(function (i, block) {
        //orders
        var lines = $(this).text().split('\n').length - 1;
        var $numbering = $('<ul/>').addClass('number');
        $(this)
            .parent()
            .append($numbering);
        for (i = 1; i <= lines; i++) {
            $numbering.append($('<li/>').text(i));
        }
        //hightlight.js
        if ($(block).attr('class')) {
            $(block).attr('class', $(block).attr('class').replace("language-", ""));
        }
        $(block.parentNode).attr('class', $(block).attr('class'));
        hljs.highlightBlock(block);
    });
    //End code block

    //Start mathjax
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
    //End mathjax


    //Start Prepare toc
    var clearTitle = function(){
        var hasH1 = false;
        var hasH2 = false;
        $('.toc li').each(function(i,block){
            if($(block).hasClass('toc-level-H1')){
                hasH1 = true;
            }else if($(block).hasClass('toc-level-H2')){
                hasH2 = true;
            }
        })
        $('.toc li').each(function(i,block){
            if(!hasH1&&!hasH2){
                $(block).attr('class', "toc-link toc-level-H1");
            }else if(!hasH1&&hasH2){
                if($(block).hasClass('toc-level-H2')){
                    $(block).attr('class', "toc-link toc-level-H1");
                }else{
                    $(block).attr('class', "toc-link toc-level-H2");
                }
            }else if(hasH1&&!hasH2){
                if($(block).hasClass('toc-level-H3')){
                    $(block).attr('class', "toc-link toc-level-H2");
                }
            }
        })
    }
    $('.post-full-content h1,.post-full-content h2,.post-full-content h3').each(function (i, block) {
        $(block).attr('id', block.innerText.replace(/[#<>.\s]/g, "_"));
        $(block).attr('class', "header-link");
        $('.toc').append('<li class="toc-link toc-level-' + block.tagName + '" ><span id=' + $(block).attr('id') + '> ' + block.innerText + '</span></li>')
        clearTitle();
    })

    var tocHelper = (function () {
        var toc_open = false;
        var toc_hold = false;
        var toc_pause = false;
        var toc_hover = false;
        var toc = $('.toc')
        var disactive = function () {
            if ($('div.toc').hasClass("active")) {
                $('div.toc').removeClass("active")
                $('.floating-header-toc span#open').addClass('active');
                $('.floating-header-toc span#close').removeClass('active');
            }
        }
        var active = function () {
            if (!$('div.toc').hasClass("active")) {
                $('div.toc').addClass("active")
                $('.floating-header-toc span#open').removeClass('active');
                $('.floating-header-toc span#close').addClass('active');
            }
        }
        var close = function () {
            if (!toc_pause && !toc_hold) {
                toc_open = false
                toc_hover = false
                var clearHover = function () {
                    if (toc_hover === false) {
                        disactive();
                    }
                }
                toc_timer = setTimeout(clearHover, 100)
            }
        }
        var open = function () {
            if (!toc_pause && !toc_hold) {
                toc_open = true;
                toc_hover = true;
                active();
            }
        }
        var hold = function () {
            var clearHold = function () {
                toc_hold = false
            }
            if (!toc_pause) {
                var toc = $('div.toc')
                if (toc_hold) {
                    toc_open = false;
                    $('.floating-header-toc .box').removeClass("hold")
                    setTimeout(clearHold, 400)
                    disactive();
                } else {
                    toc_hold = true;
                    toc_open = true;
                    active();
                    $('.floating-header-toc .box').addClass("hold")
                }
            }

        }
        var pause = function () {
            toc_pause = true;
            if (toc_open) {
                toc.removeClass("active")
            }

        }
        var unpause = function () {
            toc_pause = false;
            if (toc_open) {
                toc.addClass("active")
            }
        }
        return { close: close, open: open, hold: hold, pause: pause, unpause: unpause }
    })();
    $('.floating-header-toc .box').mouseover(function (e) { tocHelper.open() })
    $('.floating-header-toc .box').mouseout(function (e) { tocHelper.close() })
    $('.toc').mouseover(function () { tocHelper.open() })
    $('.toc').mouseout(function () { tocHelper.close() })
    $('.toc').click(function (event) {
        var $obj = $(event.target);
        var id = $obj.attr('id');
        if (id) { window.scrollTo(0, $("#" + id).offset().top - 40) }
    })
    $('.floating-header-toc .box').click(function () { tocHelper.hold() })

    //End toc
    var progressBar = document.querySelector('progress');
    var header = document.querySelector('.floating-header');
    var title = document.querySelector('.post-full-title');
    var lastScrollY = window.scrollY;
    var lastWindowHeight = window.innerHeight;
    var lastDocumentHeight = $(document).height();
    var ticking = false;
    var toc_link = document.querySelectorAll('.toc-link');
    var header_link_node = document.querySelectorAll('.header-link');
    var toc_title = document.querySelector('.floating-header-toc #title');
    var end = document.querySelector('.post-full-footer');
    var header_link = [];
    header_link_node.forEach(function (block, i) {
        header_link.push(block);
    })
    header_link.push(end)
    var header_position = [];
    header_link.forEach(function (block, i) {
        header_position.push(block.getBoundingClientRect().top + window.scrollY - 60);
    })
    header_position.push(end.getBoundingClientRect().top)

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
            ticking = true;
        }
    }

    function update() {
        var trigger = title.getBoundingClientRect().top + window.scrollY;
        var triggerOffset = title.offsetHeight + 35;
        var progressMax = lastDocumentHeight - lastWindowHeight;
        // show/hide floating header
        if (lastScrollY >= trigger + triggerOffset) {
            header.classList.add('floating-active');
            tocHelper.unpause();
        } else {
            header.classList.remove('floating-active');
            tocHelper.pause();
        }
        for (var i = 0; i < header_link.length; i++) {
            var f = i + 1 === header_link.length,
                l = header_position[i],
                c = f ? Infinity : header_position[i + 1]
            if (l < lastScrollY && lastScrollY <= c) {
                if (i < header_link.length - 1) {
                    toc_link[i].classList.add('active');
                    toc_title.innerText = header_link[i].innerText
                    tocHelper.unpause();
                } else {
                    tocHelper.pause();
                    toc_title.innerText = "推荐阅读"
                }
            } else {
                if (i < header_link.length - 1) {
                    toc_link[i].classList.remove('active');
                }
            }
        }
        progressBar.setAttribute('max', progressMax);
        progressBar.setAttribute('value', lastScrollY);

        ticking = false;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, false);

    update();
});