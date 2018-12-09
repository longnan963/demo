(function($) {
    function Preload(imgs, options) {
        this.imgArr = (typeof options == 'string') ? [imgs] : imgs;
        this.opts = $.extend({}, Preload.DEFALUTS, options);
        if (this.opts.order == 'order') {
            this.order()
        } else {
            this.unOrdered();
        }

    }
    Preload.DEFALUTS = {
        order: 'unOrder',
        each: null,
        all: null
    }
    //有序预加载
    Preload.prototype.order = function() {
            let imgArr = this.imgArr,
                opts = this.opts,
                count = 0,
                len = imgArr.length;
            load();
            function load() {
                let img = new Image();
                $(img).on('load error', function() {
                     opts.each && opts.each(count)
                    if (count >= len) {
                        opts.all && opts.all();
                    } else {
                        load();
                    }
                    count++;
                })
                img.src = imgArr[count]
            }
        },
        //无效预加载
        Preload.prototype.unOrdered = function() {
            let imgArr = this.imgArr,
                opts = this.opts,
                count = 0,
                len = imgArr.length;
            $.each(imgArr, function(i, src) {
                if (typeof src != 'string')
                    return;
                let img = new Image();
                $(img).on('load error', function() {
                    opts.each && opts.each(count)
                    if (count >= len - 1) {
                        opts.all && opts.all();
                    }
                    count++;
                })
                img.src = src;
            });
        }
    $.extend({
        preload: function(imgs, opts) {
            new Preload(imgs, opts)
        }
    })
})(jQuery)