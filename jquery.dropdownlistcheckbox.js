(function($) {

	$.fn.dropDownListCheckbox = function(parameters) {
		var component = this;
		var options = $.extend({}, $.fn.dropDownListCheckbox.defaultOptions, parameters);
		
		this.dropDownListCheckbox.numberOfSelectedOptions = 0;
		
		this.dropDownListCheckbox.componentStatusMessage = options.componentStatusMessage;

		$(options.containerCls).click(
				function(event) {
					event.stopPropagation();
					var $tgt = $(event.target);
					if ($tgt.hasClass(options.containerCls)
							|| $tgt.hasClass(options.arrowCls)) {
						var menu = $(this).children("ul");
						if (menu.is(':visible')) {
							menu.hide();
							$("html").unbind("click");
						} else {
							menu.show();

							$('html').bind("click", function(event) {
								$(options.containerCls).children("ul").hide();
								console.log("Clic on html" + event.timeStamp);
								$("html").unbind("click");
							});
						}
					}
				});
				
		// add behaviour

		$(options.checkboxCls).click(function() {
		    var $this = $(this);
		    if ($this.hasClass("ddlcb-full-checked") || $this.hasClass("ddlcb-partial-checked")) {
		        options.mainComponentOptionUnselected();
		        $.fn.dropDownListCheckbox._setNumberOfSelectedOption(0);
            } else {
                options.mainComponentOptionSelected();
		        $(options.checkboxCls).removeClass("ddlcb-partial-checked");
		        $.fn.dropDownListCheckbox._setNumberOfSelectedOption($.fn.dropDownListCheckbox.maxNumberOfOptions);
            }
		    $this.toggleClass("ddlcb-full-checked");
		    $.fn.dropDownListCheckbox.toggleOption($(options.containerCls + " li:first-child"));
		    _generateComponentStatusMessage(component.dropDownListCheckbox);
		});

		$("ul > li", this).click(function() {
		    var $this = $(this);
		    if ($this.is(":first-child")) {
		        $(options.checkboxCls).toggleClass("ddlcb-full-checked");
		        $(options.checkboxCls).removeClass("ddlcb-partial-checked");
    		    if ($this.hasClass("ddlcb-option-checked")) {
    		        options.mainComponentOptionUnselected();
    		        $.fn.dropDownListCheckbox._setNumberOfSelectedOption(0);
                } else {
                    options.mainComponentOptionSelected();
                    $.fn.dropDownListCheckbox._setNumberOfSelectedOption($.fn.dropDownListCheckbox.maxNumberOfOptions);
                }		        
		    } else {
    		    if ($this.hasClass("ddlcb-option-checked")) {
		            $(options.checkboxCls).removeClass("ddlcb-partial-checked");
    		        options.otherComponentOptionUnselected($this);
                } else {
		            $(options.checkboxCls).removeClass("ddlcb-full-checked");
		            $(options.checkboxCls).addClass("ddlcb-partial-checked");
                    options.otherComponentOptionSelected($this);
                }		        
                // unselect shortcut for main option
                $(options.checkboxCls).removeClass("ddlcb-option-checked");
            }
		    $.fn.dropDownListCheckbox.toggleOption($this);
		    _generateComponentStatusMessage(component.dropDownListCheckbox);
		});
		
    	_generateComponentStatusMessage = function(component) {
    	   // for (prop in component) {
    	   //     alert(prop + " " + component[prop])
    	   // }
            if (!options.showComponentStatusMessage) {
                return;
            }
            var message = component._parseComponentStatusMessage(component);
            $("#ddlcb-status-message", $(component)).text(message);
    	};
    	
    	_parseComponentStatusMessage = function(component) {
            var message = options.componentStatusMessage;
            
            var legalTokens = {
                "$maxNumberOfOptions": function(component) {
                    return component.maxNumberOfOptions;
                },
                "$numberOfSelectedOptions": function(component) {
                    return component.numberOfSelectedOptions;
                }
            }
    
            for (var legalToken in legalTokens) {
                message = message.replace(new RegExp("\\" + legalToken, 'g'), legalTokens[legalToken](this));
            }
    
            return message;
    	};
    	
    	_generateComponentStatusMessage(this.dropDownListCheckbox);

		return this;
	};
	
    $.fn.dropDownListCheckbox.defaultOptions = {
        containerCls : 'cccccc',
        checkboxCls : '.ddlcb-checkboxCase',
        arrowCls : 'ddlcb-right',
        mainOption: '.ddlcb-all',
        mainComponentOptionSelected: {},
        mainComponentOptionUnselected: {},
        otherComponentOptionSelected: {},
        otherComponentOptionUnselected: {},
        showComponentStatusMessage: true,
        componentStatusMessage: "$numberOfSelectedOptions record(s) selected"
    };	
	
	$.fn.dropDownListCheckbox.selectedOptionsIndex = [];	
	
	$.fn.dropDownListCheckbox.setMaxNumberOfOptions = function(number) {
	    this.maxNumberOfOptions = number;
	};
	
	$.fn.dropDownListCheckbox.registerExternalOption = function(identifiers) {
	    var selectedOptionsIndex = this.selectedOptionsIndex;
	    for (var i = 0; i < identifiers.length; i++) {
	        selectedOptionsIndex.push(identifiers[i]);
        }	    
	};	
	
	$.fn.dropDownListCheckbox.unregisterExternalOption = function(identifiers) {
	    var selectedOptionsIndex = this.selectedOptionsIndex;
	    for (var i = 0; i < identifiers.length; i++) {
	        selectedOptionsIndex.splice(selectedOptionsIndex.indexOf(identifiers[i]), 1);
        }
	};	
	
	
	
	
	
	
	$.fn.dropDownListCheckbox._setNumberOfSelectedOption = function(number) {
	    this.numberOfSelectedOptions = number;
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
	
	$.fn.dropDownListCheckbox.maxNumberOfOptions = 0;
	
	$.fn.dropDownListCheckbox.numberOfSelectedOptions = 0;
	
	$.fn.dropDownListCheckbox._generateComponentStatusMessage = function() {
        if (!this.showComponentStatusMessage) {
            return;
        }
        var message = this._parseComponentStatusMessage();
        $("#ddlcb-status-message", $(this)).text(message);
	};
	
	$.fn.dropDownListCheckbox._parseComponentStatusMessage = function() {
        var message = this.componentStatusMessage;
        
        var legalTokens = {
            "$maxNumberOfOptions": function(component) {
                return component.maxNumberOfOptions;
            },
            "$numberOfSelectedOptions": function(component) {
                return component.numberOfSelectedOptions;
            }
        }

        for (var legalToken in legalTokens) {
            message = message.replace(new RegExp("\\" + legalToken, 'g'), legalTokens[legalToken](this));
        }

        return message;
	};

	$.fn.dropDownListCheckbox.init = function() {
        this._generateComponentStatusMessage();
        return this;
	};

})(jQuery);
