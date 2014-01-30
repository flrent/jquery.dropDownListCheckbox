(function($) {

	$.fn.dropDownListCheckbox = function(opts) {
		var item = this;
		var opts = opts || {
			containerCls : 'cccccc',
			checkboxCls : '.ddlcb-checkboxCase',
			arrowCls : 'ddlcb-right'
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

		$(opts.checkboxCls).click(function() {
			if ($(this).hasClass("ddlcb-checked")) {
				$(this).removeClass("ddlcb-checked");
			} else {
				$(this).addClass("ddlcb-checked");
			}
		});

		this.children("ul").children("li").click(function() {
			var $this = $(this);
			$this.parent("ul").hide();
			$("html").unbind("click");
			if ($this.hasClass("ddlcb-checked")) {
				$this.removeClass("ddlcb-checked");
			} else {
				$this.parent("ul").children("li").removeClass("ddlcb-checked");
				$this.addClass("ddlcb-checked");
			}
		});

		return this;
	};
})(jQuery);
