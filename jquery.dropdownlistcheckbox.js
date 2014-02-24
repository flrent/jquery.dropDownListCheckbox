(function($) {

	$.fn.dropDownListCheckbox = function(parameters) {
		var component = this;
		var options = $.extend({}, $.fn.dropDownListCheckbox.defaultOptions, parameters);

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
		        $.fn.dropDownListCheckbox._setNumberOfSelectedOptions(0);
            } else {
                options.mainComponentOptionSelected();
		        $(options.checkboxCls).removeClass("ddlcb-partial-checked");
		        $.fn.dropDownListCheckbox._setNumberOfSelectedOptions($.fn.dropDownListCheckbox.maxNumberOfOptions);
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
    		        $.fn.dropDownListCheckbox._setNumberOfSelectedOptions(0);
                } else {
                    options.mainComponentOptionSelected();
                    $.fn.dropDownListCheckbox._setNumberOfSelectedOptions($.fn.dropDownListCheckbox.maxNumberOfOptions);
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
		
    	_getNumberOfSelectedOptions = function() {
            return $.fn.dropDownListCheckbox.selectedOptionsIndex.length;
    	};    	
    	
    	$.fn.dropDownListCheckbox._generateComponentStatusMessage(this.dropDownListCheckbox);
    	
    	$.fn.dropDownListCheckbox._showComponentStatusMessage = options.showComponentStatusMessage;
    	
    	$.fn.dropDownListCheckbox.componentStatusMessage = options.componentStatusMessage;

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
    
    $.fn.dropDownListCheckbox._showComponentStatusMessage = true;
    
    $.fn.dropDownListCheckbox.componentStatusMessage = "";
	
	$.fn.dropDownListCheckbox.init = function() {
        this._generateComponentStatusMessage();
        return this;
	};
	
	$.fn.dropDownListCheckbox._generateComponentStatusMessage = function(component) {
        if (!this._showComponentStatusMessage) {
            return;
        }
        var message = this._parseComponentStatusMessage(component);
        $("#ddlcb-status-message", $(component)).text(message);
	};
    	
	$.fn.dropDownListCheckbox._parseComponentStatusMessage = function(component) {
	    var customMessage =this.componentStatusMessage;
        var message = (customMessage != "") ? customMessage: this.defaultOptions.componentStatusMessage;
        
        var legalTokens = {
            "$maxNumberOfOptions": function(component) {
                return component.maxNumberOfOptions;
            },
            "$numberOfSelectedOptions": function(component) {
                return _getNumberOfSelectedOptions();
            }
        }
    
        for (var legalToken in legalTokens) {
            message = message.replace(new RegExp("\\" + legalToken, 'g'), legalTokens[legalToken](this));
        }
    
        return message;
	};
	
	$.fn.dropDownListCheckbox.setMaxNumberOfOptions = function(number) {
    	    for (prop in this.dropDownListCheckbox) {
    	        alert(prop + " " + this.dropDownListCheckbox[prop])
    	    }	    
	    this.maxNumberOfOptions = number;
	    this._generateComponentStatusMessage(this);
	    
	    return this;
	};
	
	$.fn.dropDownListCheckbox._setNumberOfSelectedOptions = function(number) {
	    this.numberOfSelectedOptions = number;
	};	
	
	
	
	
	
	$.fn.dropDownListCheckbox.selectedOptionsIndex = [];	
	
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

})(jQuery);
