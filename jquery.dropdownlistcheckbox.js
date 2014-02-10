(function($) {

	$.fn.dropDownListCheckbox = function(opts) {
		var item = this;
		var opts = opts || {
			containerCls : 'cccccc',
			checkboxCls : '.ddlcb-checkboxCase',
			arrowCls : 'ddlcb-right',
			mainOption: '.ddlcb-all',
			mainOptionSelected: {},
			mainOptionUnselected: {},
			otherOptionSelected: {},
			otherOptionUnselected: {}			
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
		    var $this = $(this);
		    if ($this.hasClass("ddlcb-full-checked")) {
		        opts.mainOptionUnselected();
            } else {
		        $(opts.checkboxCls).removeClass("ddlcb-partial-checked");                
                opts.mainOptionSelected();
            }
		    $this.toggleClass("ddlcb-full-checked");
		    $.fn.dropDownListCheckbox.toggleOption($(opts.containerCls + " li:first-child"));            
		});

		$("ul > li", this).click(function() {
		    var $this = $(this);
		    if ($this.is(":first-child")) {
		        $(opts.checkboxCls).toggleClass("ddlcb-full-checked");
		        $(opts.checkboxCls).removeClass("ddlcb-partial-checked");
    		    if ($this.hasClass("ddlcb-option-checked")) {
    		        opts.mainOptionUnselected();
                } else {
                    opts.mainOptionSelected();
                }		        
		    } else {
    		    if ($this.hasClass("ddlcb-option-checked")) {
		            $(opts.checkboxCls).removeClass("ddlcb-partial-checked");
    		        opts.otherOptionUnselected($this);
                } else {
		            $(opts.checkboxCls).removeClass("ddlcb-full-checked");
		            $(opts.checkboxCls).addClass("ddlcb-partial-checked");
                    opts.otherOptionSelected($this);
                }		        
    		    // unselect shortcut for main option
    		    $(opts.checkboxCls).removeClass("ddlcb-option-checked");
		    }
		    $.fn.dropDownListCheckbox.toggleOption($this);
		});

		return this;
	};
	
	$.fn.dropDownListCheckbox.toggleOption = function(option) {
		option.parent("ul").hide();
		$("html").unbind("click");
		option.siblings().removeClass("ddlcb-option-checked");
		option.toggleClass("ddlcb-option-checked");
	};
	
	$.fn.dropDownListCheckbox.isMainOptionSelected = function() {
	   return $("ul > li:first-child", $(this)).hasClass("ddlcb-option-checked");
	};	

})(jQuery);
