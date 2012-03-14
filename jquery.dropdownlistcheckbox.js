(function ($) {

    $.fn.dropDownListCheckbox = function (opts) {
        var item = this;
        var opts = opts || {
        	containerCls:'cccccc',
			checkboxCls:'checkboxCase',
			arrowCls:'right'
		};

        $("."+opts.containerCls).click(function (event) {
        	event.stopPropagation();
            var $tgt = $(event.target);
            if ($tgt.hasClass(opts.containerCls) || $tgt.hasClass(opts.arrowCls)) {
                var menu = $(this).children("ul");
                if (menu.is(':visible')) {
                    menu.hide();
            		$("html").unbind("click");
                }
                else {
                    menu.show();

		            $('html').bind("click", function(event) {
		            	$("."+opts.containerCls).children("ul").hide();
		            	console.log("Clic on html"+event.timeStamp);
		            	$("html").unbind("click");
					});
                }
            }
        });

        $("." + opts.checkboxCls).click(function () {
            if ($(this).hasClass("checked")) {
                $(this).removeClass("checked");
            }
            else {
                $(this).addClass("checked");
            }
        });

        this.children("ul").children("li").click(function () {
            $(this).parent("ul").hide();
            $("html").unbind("click");
        });

        return this;
    };
})(jQuery);