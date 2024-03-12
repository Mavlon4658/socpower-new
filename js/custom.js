'use strict';

$('document').ready(function () {

    function themeCircles(container, elems, classname) {
        var circles = document.querySelectorAll(elems);
        var time = 200;
        var wrap = document.querySelector(container);
        var options = { threshold: .3 };

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    showCircles(circles);
                } else {
                    hideCircles(circles);
                }
            });
        }, options);

        if (wrap) {
            observer.observe(wrap);
        }

        function showCircles(items) {
            var _loop = function _loop(i) {
                setTimeout(function () {
                    items[i].classList.add(classname);
                }, 150 + i * time);
            };

            for (var i = 0; i < items.length; i++) {
                _loop(i);
            }
        }

        function hideCircles(items) {
            var _loop2 = function _loop2(i, j) {
                setTimeout(function () {
                    items[i].classList.remove(classname);
                }, 200 + j * 25);
            };

            for (var i = items.length - 1, j = 0; i >= 0; i--, j++) {
                _loop2(i, j);
            }
        }
    }

    function mouseParallax(container, layers) {
        var elem = $(container),
            items = $(layers),
            pos = elem.offset(),
            elem_left = pos.left,
            elem_top = pos.top,
            elem_width = elem.width(),
            elem_height = elem.height(),
            x_center = void 0,
            y_center = void 0;

        elem.mousemove(function (e) {

            x_center = elem_width / 2 - (e.pageX - elem_left);
            y_center = elem_height / 2 - (e.pageY - elem_top);

            items.each(function () {

                var speed = $(this).attr('data-speed'),
                    xPos = Math.round(-1 * x_center / 80 * speed),
                    yPos = Math.round(y_center / 80 * speed);

                if (yPos < 0) yPos = -2 * speed;

                $(this).css('transform', 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0px)');
            });
        });

        elem.mouseleave(function () {
            items.each(function () {
                $(this).css('transform', 'translate3d(0px, 0px, 0px)');
            });
        });
    }

    function playVideo(classname, video, trigger) {
        var parentEl = $(trigger).parent($('video__content')).parent($('video__container')),
            videoEl = parentEl.find($(video));
        var videoURL = "https://www.youtube.com/embed/" + $(videoEl).attr('data-video') + "autoplay=1";

        parentEl.addClass(classname);
        videoEl.prop('src', videoURL);
    }

    var anchors = document.querySelectorAll('[data-js="scroll-to"]');

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        var _loop4 = function _loop4() {
            var anchor = _step.value;

            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                var blockID = anchor.getAttribute('href');

                document.querySelector(blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        };

        for (var _iterator = anchors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop4();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    (function () {
        if (document.querySelector('[data-parallax="best-section"]') || document.querySelector('[data-parallax="best-layer"]')) {
            mouseParallax('[data-parallax="best-section"]', '[data-parallax="best-layer"]');
        }
    })();

    (function () {

        if(document.querySelector('[data-section="faq"]') || document.querySelector('[data-js="faq-circle"]')) {
            themeCircles('[data-section="faq"]', '[data-js="faq-circle"]', 'circles__item_show');
        }

        function toggleDropdown(trigger, classname) {

            $(trigger).on('click', function () {

                var faqHeader = $(this).children('.faq__item-header');

                if (faqHeader.hasClass(classname)) {

                    faqHeader.removeClass(classname);

                    faqHeader.next().slideUp();

                    return false;
                }

                $(trigger).each(function () {

                    $(this).children('.faq__item-header').removeClass(classname);

                    $(this).children('.faq__item-header').next().slideUp();
                });

                faqHeader.toggleClass(classname);

                faqHeader.hasClass(classname) ? faqHeader.next().slideDown() : faqHeader.next().slideUp();
            });
        }

        toggleDropdown('[data-js="toggle-faq"]', 'faq__item-header_open');
    })();

    (function () {

        $('[data-js="toggle-menu"]').on('click', function () {

            $('[data-js="menu-mobile"]').addClass('header__menu_show');

            $('body').addClass('modal-open');
        });

        $('[data-js="close-menu"]').on('click', function () {

            closeMobileNav();
        });

        $('[data-scroll="mobile__menu"]').on('click', function () {

            closeMobileNav();
        });

        function closeMobileNav() {

            $('[data-js="menu-mobile"]').removeClass('header__menu_show');

            $('body').removeClass('modal-open');
        }
    })();

    (function () {

        if (document.querySelector('[data-parallax="section"]') && document.querySelector('[data-js="circle"]')) {
            themeCircles('[data-parallax="section"]', '[data-js="circle"]', 'circles__item_show');
        }
        if (document.querySelector('[data-parallax="section"]') && document.querySelector('[data-parallax="item"]')) {
            mouseParallax('[data-parallax="section"]', '[data-parallax="item"]');
        }
    })();

    (function () {

        var options = {

            escClose: true,

            overlayClose: true,

            hashOpen: true,

            on: {
                close: function close() {

                    history.pushState('', document.title, window.location.pathname);
                }
            }

        };

        new Kmodal('#sign-in', options);

        new Kmodal('#sign-up', options);

        new Kmodal('#legal', options);

        new Kmodal('#partner', options);

        new Kmodal('#recover', options);

        var eyeClassname = 'popup__form-input-btn_active';

        $('[data-js-action="toggle-input-type"]').on('click', function () {

            $(this).toggleClass(eyeClassname);

            $(this).hasClass(eyeClassname) ? $('[data-js-action="input-pass"]').prop({ type: 'text' }) : $('[data-js-action="input-pass"]').prop({ type: 'password' });
        });
    })();

    (function () {

        if ($('[data-js-slider="video"]').length) {

            var slider = new Swiper('[data-js-slider="video"]', {

                loop: true,

                slidesPerView: 1,

                spaceBetween: 0,

                slideClass: 'slider__item',

                slideActiveClass: 'slider__item_active',

                navigation: {

                    nextEl: '.slider__arrow_next',

                    prevEl: '.slider__arrow_prev'

                },

                pagination: {

                    el: '.slider__pagination',

                    dynamicBullets: true,

                    bulletClass: 'slider__bullet',

                    bulletActiveClass: 'slider__bullet_active',

                    currentClass: 'slider__bullet_current',

                    clickable: true

                }

            });

            slider.on('slideChange', function () {

                $('.video__box').removeClass('video__container_play');

                $('[data-js="slider-video-src"]').attr('src', '');
            });

            $('[data-js="slider-video-play"]').on('click', function () {

                playVideo('video__container_play', '[data-js="slider-video-src"]', this);
            });
        }
    })();

    (function () {

        var stats = document.querySelector('[data-parallax="stats"]');

        var tags = document.querySelectorAll('[data-tag="steps"]');

        var waves = document.querySelectorAll('[data-waves="steps"]');

        var time = 300;

        var wavesClassname = 'stats__wave_show';

        var statsClassname = 'stats__tag_show';

        var leftStats = document.querySelector('[data-js="stats-left"]');

        var observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    showWaves(waves, wavesClassname);

                    leftStats.classList.add('stats__left-bg_show');

                    showWaves(tags, statsClassname);
                }
            });
        }, { threshold: .5 });

        if (stats) {
            observer.observe(stats);
        }

        function showWaves(elems, classname) {
            var _loop3 = function _loop3(i) {

                setTimeout(function () {

                    elems[i].classList.add(classname);
                }, 150 + i * time);
            };

            for (var i = 0; i < elems.length; i++) {
                _loop3(i);
            }
        }
    })();

    (function () {
        if (document.querySelector('[data-parallax="users-section"]') || document.querySelector('[data-parallax="users-layer"]')) {
            mouseParallax('[data-parallax="users-section"]', '[data-parallax="users-layer"]');
        }
    })();

    (function () {

        $('[data-js="main-video-play"]').on('click', function () {

            playVideo('video__container_play', '[data-js="main-video-src"]', this);
        });
    })();

    (function() {
        function plural(number, titles) {
            var cases = [2, 0, 1, 1, 1, 2];
            return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
        }
        $.getJSON('/api/utils/stats', function(data) {
            $('#users-counter-value').text(data.users_total.toLocaleString() + ' ' + plural(data.users_total, ['человек', 'человека', 'человек']));
        });
    })();

    $('.article__slider').each(function (idx, el) {
        let slider = new Swiper(el, {
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                1300: {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                }
            },
            navigation: {
                nextEl: $('.article__slider__btn_next')[idx],
                prevEl: $('.article__slider__btn_prev')[idx],
            }
        })
    })

    $('.article__slider_2__wrap').each(function (idx, el) {
        let slider = new Swiper($(el).find('.article__slider_2')[0], {
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                nextEl: $(el).find('.slider_next')[0],
                prevEl: $(el).find('.slider_prev')[0]
            }
        })
    })

    $('.article__slider_3__wrap').each(function (idx, el) {
        let swiper = new Swiper($(el).find('.article__slider_3')[0], {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: $(el).find('.slider_next')[0],
                prevEl: $(el).find('.slider_prev')[0]
            },
            breakpoints: {
                1220: {
                    slidesPerView: 'auto',
                    spaceBetween: 0
                }
            }
        })
    })

    if ($('.img_wrap__right').length) {
        new Swiper('.img_wrap__right .swiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                nextEl: '.img_wrap__right .slider_next',
                prevEl: '.img_wrap__right .slider_prev'
            }
        })
    }

    let article_card = 3;
    function sortArticleCard () {
        $('.article__cards_item').each(function (idx, el) {
            if (idx + 1 > article_card) {
                $(el).hide(0);
            } else {
                $(el).show(0)
            }
        })
    }

    $('.article .show_more').click(function () {
        article_card += 3;
        sortArticleCard();

        if (article_card >= $('.article__cards_item').length) {
            $('.article .show_more').css({
                position: 'relative',
                zIndex: '-1',
                opacity: '0'
            })
        }
    })

    sortArticleCard();
});