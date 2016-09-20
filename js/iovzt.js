/**
 * Preloader plugin
 * @author Olexandr Iskryzhytskyi iov.mail.zt@gmail.com
 */
(function ($) {
    var cImageLoaded = false;
    function Preloader(element, options) {
        this.$element = $(element);
        this.options = this._mergeOptions(options);
        this._init();
    }
    Preloader.prototype = {
        defaults: {
            'parentLoadingClass': 'loading',
            'wrapperClass': 'loader-wrapper',
            'loaderClass': 'loader',
            'autoshow': true,
            'position': 'before',
            'cSpeed': 9,
            'cWidth': 32,
            'cHeight': 33,
            'cTotalFrames': 20,
            'cFrameWidth': 32,
            'cImageSrc': '/images/loader-sprite.gif'
        },
        constructor: Preloader,
        show: function () {
            var self = this;
            this.$wrapper = this.$element.find('.' + this.options.wrapperClass);
            if (this.$wrapper.length == 0) {
                this.$wrapper = $('<div />').addClass(this.options.wrapperClass);
                this.$loader = $('<div />').addClass(this.options.loaderClass).css({
                    backgroundImage: 'url(' + this.options.cImageSrc + ')',
                    width: this.options.cWidth + 'px',
                    height: this.options.cHeight + 'px'
                }).appendTo(this.$wrapper);
                if (this.options.position == 'before') {
                    this.$element.prepend(this.$wrapper);
                } else {
                    this.$element.append(this.$wrapper);
                }
            }
            this.$wrapper.show();
            this.$element.addClass(this.options.parentLoadingClass);
            var FPS = Math.round(100 / this.options.cSpeed);
            this.SECONDS_BETWEEN_FRAMES = 1 / FPS;
            this.cPreloaderTimeout = setTimeout(function () {
                self._continueAnimation();
            }, this.SECONDS_BETWEEN_FRAMES / 1000);
        },
        hide: function (remove) {
            remove = remove | true;
            this.$wrapper.hide();
            this.$element.removeClass(this.options.parentLoadingClass);
            if (remove) {
                this.$wrapper.remove();
            }
            clearTimeout(this.cPreloaderTimeout);
            this.cPreloaderTimeout = false;
        },
        _continueAnimation: function () {
            var self = this;
            this.cXpos += this.options.cFrameWidth;
            this.cIndex += 1;
            if (this.cIndex >= this.options.cTotalFrames) {
                this.cXpos = 0;
                this.cIndex = 0;
            }
            this.$loader.css('backgroundPosition', (-this.cXpos) + 'px 0');
            this.cPreloaderTimeout = setTimeout(function () {
                self._continueAnimation();
            }, this.SECONDS_BETWEEN_FRAMES * 1000);
        },
        _init: function () {
            this.cXpos = 0;
            this.cIndex = 0;
            if (!cImageLoaded) {
                this.show();
            } else {
                var self = this,
                        genImage = new Image();
                genImage.onload = function () {
                    cImageLoaded = true;
                    if (self.options.autoshow) {
                        self.show();
                    }
                };
                genImage.onerror = function () {
                    console.log('Could not load the preload image.');
                };
                genImage.src = this.options.cImageSrc;
            }
        },
        _mergeOptions: function (options) {
            if (typeof (options) == 'undefined') {
                options = {};
            }
            return $.extend(true, {}, this.defaults, options);
        },
        _callFunction: function (args) {
            if (args[0] && typeof (args[0]) == 'string' && $.inArray(args[0], ['show', 'hide']) !== -1 &&
                    typeof Preloader.prototype[args[0]] == 'function') {
                return Preloader.prototype[args[0]].apply(this, Array.prototype.slice.call(args, 1));
            }
            return false;
        }
    };
    $.fn.preloader = function () {
        var args = arguments;
        if (this.length == 1 && this.data('preloader')) {
            var data = $(this).data('preloader');
            if (args.length) {
                return data._callFunction(args);
            } else {
                return this;
            }
        } else {
            return this.each(function () {
                var data = $(this).data('preloader');
                // Initialize the WidthSetter.
                if (!data) {
                    var options = args[0] | {};
                    data = new Preloader(this, options);
                    $(this).data('preloader', data);
                } else if (args.length) {
                    data._callFunction(args);
                }
            });
        }
    };
})(jQuery);

/**
 * Check if object is empty
 * @param {type} map
 * @returns {Boolean}Check object has properties
 */
function isEmpty(map) {
    for (var key in map) {
        if (map.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

// extend
if ($.fn.uploadThumbs) {
    $.fn.uploadThumbs.set = function (option, tag) {
        var $parent = $(option.position);
        if ($parent.length) {

            $parent.css('background-image', 'url(' + $(tag).attr('src') + ')');
        }
    };
}

var flashMsg = {
    show: function (msg, type) {
        type = type | 'success';
        var $popup = $('#flash-messages');
        $(".js-content", $popup).html($("<p />").addClass('message-' + type).html(msg));
        $popup.modal("show");
    }
};

var messageThread = {
    defaults: {
        wrapperSelector: '.js-message-container',
        threadSelector: '.js-message-thread',
        fetchUrl: '',
        scrollTo: null
    },
    init: function (options) {
        var self = this;
        this.options = $.extend(true, {}, this.defaults, options || {});
        this.$wrapper = $(this.options.wrapperSelector);
        this.$wrapper.preloader({position: 'before', 'autoshow': false});
        this.loading = false;
        this.lastId = null;
        this.hasMore = true;
        this.fetchUrl = self.options.fetchUrl + (self.options.scrollTo > 0 ? "&message=" + self.options.scrollTo.toString() : "");
        this._load(function () {
            self.scrollTo(self.options.scrollTo, 300);
            self.fetchUrl = self.options.fetchUrl;
        });
    },
    scrollTo: function (id, duration) {
        if (id > 0) {
            var $el = $(".js-message-item[data-id=" + id + "]", this.$wrapper);
            if ($el.length) {
                var $prev = $el.prev(),
                        height = 0;
                while ($prev.length) {
                    height += $prev.outerHeight();
                    $prev = $prev.prev();
                }
                this.$wrapper.animate({scrollTop: height}, duration | 0);
                $el.addClass("highlighted");
                setTimeout(function () {
                    $el.removeClass("highlighted");
                }, 5000);
            }
        }
    },
    _load: function (callback) {
        var self = this;
        if (!this.loading) {
            if (this.hasMore) {
                this.loading = true;
                this.$wrapper.preloader('show');
                this.$wrapper.off('scroll');
                $.post(this.fetchUrl, {'lastId': this.lastId}, function (json) {
                    if (typeof (json.html) != 'undefined') {
                        var lastScrollHeight = self.$wrapper[0].scrollHeight;
                        self.$wrapper.prepend(json.html);
                        // update niceScroll
                        self.lastId = json.lastId;
                        self.hasMore = json.hasMore;
                        self.$wrapper.animate({scrollTop: (self.$wrapper[0].scrollHeight - lastScrollHeight)}, 0);
                        if (json.threadId && typeof (json.unreadCount) != 'undefined') {
                            var $threadCounter = $(self.options.threadSelector + '[data-id=' + json.threadId + ']').find('.js-unread-count');
                            json.unreadCount = parseInt(json.unreadCount);
                            if (json.unreadCount > 0) {
                                $threadCounter.text(json.unreadCount).show();
                            } else {
                                $threadCounter.hide();
                            }
                        }
                        self.$wrapper.preloader('hide');
                        self.$wrapper.on('scroll', function () {
                            if (!self.loading && $(this).scrollTop() < 5) {
                                self._load();
                            }
                        });
                    }
                    setTimeout(function () {
                        if (typeof (callback) == 'function') {
                            callback();
                        }
                        self.loading = false;
                    }, 100);
                }, 'json').fail(function () {
                    self.loading = false;
                    self.$wrapper.preloader('hide');
                    alert('Occurred error.');
                });
            } else {
                self.$wrapper.off('scroll');
            }
        }
    }
};

/**
 * Scroll to form error
 */
function formScrollToError(form, timeout) {
    form = form || null;
    timeout = (typeof (timeout) != 'undefined') ? timeout : 300;
    var headerHeight = $('body > #topnav').height(),
            $container = $('.form-group.has-error:first', form);
    if ($container.length) {
        var $tabPane = $container.closest('.tab-pane');
        while ($tabPane.length) {
            var $tabContent = $tabPane.parent('.tab-content');
            if ($tabContent.length) {

                var $nav = $tabContent.prev('.nav');
                if ($nav.length) {

                    $nav.find('a[data-toggle="tab"][href="#' + $tabPane.prop('id') + '"]').tab('show');
                }
                $tabPane = $nav.closest('.tab-pane');
            }
        }
        var $tabCollapse = $tabPane.length ? $tabPane.closest('.collapse') : $container.closest('.collapse');
        if ($tabCollapse.length && !$tabCollapse.hasClass('in')) {
            $tabCollapse.collapse('toggle');
        }
        var $modalDialog = $container.closest('.modal-dialog');
        setTimeout(function () {
            var $el = $('.help-block:not(:empty)', $container);
            if ($el.length == 0) {
                $el = $container;
            }
            if ($modalDialog.length) {
                $modalDialog.parent('.modal').animate({scrollTop: ($el.offset().top - $modalDialog.offset().top) - (68 - parseInt($modalDialog.css('margin-top')))}, "slow");
            } else {
                $("html, body").animate({scrollTop: $el.offset().top - (headerHeight + 68)}, "slow");
            }
            $('.form-control', $container).focus();
        }, timeout);
    }
}

$(document).ready(function () {

    // init all ajax response
    $(document).ajaxSuccess(function (event, xhr, settings) {
        if (xhr.responseText && xhr.responseText.indexOf('[js]') === 0) {
            eval(xhr.responseText.substr(4));
        } else if (xhr.responseJSON && xhr.responseJSON['loginRequired'] && xhr.responseJSON['redirect']) {
            location = xhr.responseJSON['redirect'];
        }
    });

    // work load more
    $('#work-load-more').on('click', function () {
        var $wrapper = $(this).closest(".wrapper-history").find(".items");
        if ($(this).hasClass('all')) {

            $(".js-item", $wrapper).slice(3).slideUp();
            $(this).removeClass('all').css({
                '-webkit-transform': 'rotate(0deg)',
                '-moz-transform': 'rotate(0deg)',
                'transform': 'rotate(0deg)'
            }).prev('p').text('View more');
        } else {

            var $items = $(".js-item:hidden", $wrapper).slice(0, 11);
            if ($items.length > 10) {

                $items.slice(0, 10).slideDown();
                $(this).removeClass('all').css({
                    '-webkit-transform': 'rotate(0deg)',
                    '-moz-transform': 'rotate(0deg)',
                    'transform': 'rotate(0deg)'
                });
            } else {

                $items.slideDown();
                $(this).addClass('all').css({
                    '-webkit-transform': 'rotate(180deg)',
                    '-moz-transform': 'rotate(180deg)',
                    'transform': 'rotate(180deg)'
                }).prev('p').text('Hide');
            }
        }
        return false;
    });

    // form error handler
    $('form').on('afterValidate', function (event, messages, errorAttributes) {
        formScrollToError(this);
        return false;
    });
    formScrollToError();
});
