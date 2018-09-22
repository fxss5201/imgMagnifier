;
(function () {
    $.fn.imgMagnifierDefaults = {
        src: "", // 需要放大的图片链接
        width: 50, // 原始放大区域的宽高
        height: 50,
        init: function(){
            console.log(this)
        }
    };

    $.fn.imgMagnifier = function (options) {
        var options = $.extend({}, $.fn.imgMagnifierDefaults, options);
        this.each(function (index, element) {
            var _this = $(this);

            var style = $('<style></style>'),
                magnifierAreaClass = '.magnifier-area {display:none;box-sizing:border-box;user-select:text;position:absolute;z-index:9999;cursor:move;width:' + options.width + 'px;height:' + options.height + 'px;border:1px solid #333;background:rgba(0,0,0,0.3);}'
            style.html(magnifierAreaClass);
            $("head").append(style);

            _this.css("position", "relative");
            var magnifierAreaHtml = $('<div class="magnifier-area"></div>');
            _this.append(magnifierAreaHtml);

            var elementInfo = {};
            elementInfo.width = _this.width();
            elementInfo.height = _this.height();
            console.log(elementInfo)

            _this.on("mouseenter", function (event){
                var mouseX = event.offsetX,
                    mouseY = event.offsetY,
                    diffX = elementInfo.width - mouseX,
                    diffY = elementInfo.height - mouseY;
                mouseX = diffX < options.width ? (elementInfo.width - options.width) : mouseX;
                mouseY = diffY < options.height ? (elementInfo.height - options.height) : mouseY;
                magnifierAreaHtml.show().css({
                    top: mouseY + "px",
                    left: mouseX + "px"
                });
            });
            _this.on("mousemove", function (event) {
                var mouseX = event.offsetX,
                    mouseY = event.offsetY;
                mouseX = mouseX > (elementInfo.width - options.width) ? (elementInfo.width - options.width) : mouseX;
                mouseY = mouseY > (elementInfo.height - options.height) ? (elementInfo.height - options.height) : mouseY;
                magnifierAreaHtml.css({
                    top: mouseY + "px",
                    left: mouseX + "px"
                });
            });
            _this.on("mouseleave", function (event) {
                magnifierAreaHtml.hide();
            });
        });
        return this;
    };
})(jQuery);