(function($) {

	$.fn.dropDownListCheckbox = function(opts) {
		var item = this;
		var opts = opts || {
			containerCls : 'cccccc',
			checkboxCls : '.ddlcb-checkboxCase',
			arrowCls : 'ddlcb-right',
			mainOption: '.ddlcb-all'
		};

		$(opts.containerCls).click(
				function(event) {
					event.stopPropagation();
					var $tgt = $(event.target);
					if ($tgt.hasClass(opts.containerCls)
							|| $tgt.hasClass(opts.arrowCls)) {
						var menu = $(this).children("ul");
						if (menu.is(':visible')) {
							menu.hide();
							$("html").unbind("click");
						} else {
							menu.show();

							$('html').bind("click", function(event) {
								$(opts.containerCls).children("ul").hide();
								console.log("Clic on html" + event.timeStamp);
								$("html").unbind("click");
							});
						}
					}
				});
				
		// add behaviour

		$(opts.checkboxCls).click(function() {
		    $(this).toggleClass("ddlcb-checked");
		    $.fn.dropDownListCheckbox.toggleOption($(opts.containerCls + " li:first-child"));
		});

		this.children("ul").children("li").click(function() {
		    var $this = $(this);
		    if ($this.is(":first-child")) {
		        $(opts.checkboxCls).toggleClass("ddlcb-checked");
		    }
		    $.fn.dropDownListCheckbox.toggleOption($this);
		    // unselect shortcut for main option
		    $(opts.checkboxCls).removeClass("ddlcb-checked");
		});

		return this;
	};
	
	$.fn.dropDownListCheckbox.toggleOption = function(option) {
		option.parent("ul").hide();
		$("html").unbind("click");
		option.siblings().removeClass("ddlcb-checked");
		option.toggleClass("ddlcb-checked");
	};

})(jQuery);
