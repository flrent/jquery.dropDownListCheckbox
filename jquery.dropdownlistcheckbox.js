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

		    //$this.toggleClass("ddlcb-full-checked");

		    if ($this.hasClass("ddlcb-full-checked")) {
		        options.mainComponentOptionUnselected();
		        return;
		    }
		    if ($this.hasClass("ddlcb-partial-checked")) {
		      //  $(options.checkboxCls).removeClass("ddlcb-partial-checked");
		        $.fn.dropDownListCheckbox._resetSelectedOptions();
		        options.mainComponentOptionSelected();
		        return;		        
		    }		    
		    if ($this.attr("class") == "ddlcb-checkboxCase") {
		        options.mainComponentOptionSelected();
		    }
		});

		$("ul > li", this).click(function() {
		    var $this = $(this);
		    if ($this.is(":first-child")) {
		        $(options.checkboxCls).toggleClass("ddlcb-full-checked");
		        $(options.checkboxCls).removeClass("ddlcb-partial-checked");
    		    if ($this.hasClass("ddlcb-option-checked")) {
    		        $.fn.dropDownListCheckbox._resetSelectedOptions();
    		        options.mainComponentOptionUnselected();
                } else {
                    options.mainComponentOptionSelected();
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
		    _toggleOption($this);
		});
		
    	$.fn.dropDownListCheckbox._generateComponentStatusMessage(this.dropDownListCheckbox);
    	
    	$.fn.dropDownListCheckbox._showComponentStatusMessage = options.showComponentStatusMessage;
    	
    	$.fn.dropDownListCheckbox.componentStatusMessage = options.componentStatusMessage;

		return this;
	};
	
    $.fn.dropDownListCheckbox.defaultOptions = {
        containerCls : "cccccc",
        checkboxCls : ".ddlcb-checkboxCase",
        arrowCls : "ddlcb-right",
        mainOption: ".ddlcb-all",
        mainComponentOptionSelected: {},
        mainComponentOptionUnselected: {},
        otherComponentOptionSelected: {},
        otherComponentOptionUnselected: {},
        showComponentStatusMessage: true,
        componentStatusMessage: "$numberOfSelectedOptions record(s) selected"
    };
	$.fn.dropDownListCheckbox._generateComponentStatusMessage = function() {
        if (!this._showComponentStatusMessage) {
            return;
        }
        var message = this._parseComponentStatusMessage();
        $("#ddlcb-status-message").text(message);
	};
    	
	$.fn.dropDownListCheckbox._parseComponentStatusMessage = function() {
	    var customMessage = this.componentStatusMessage;
        var message = (customMessage != "") ? customMessage: this.defaultOptions.componentStatusMessage;
        
        var legalTokens = {
            "$maxNumberOfOptions": function(component) {
                return component.maxNumberOfOptions;
            },
            "$numberOfSelectedOptions": function(component) {
                return component._getNumberOfSelectedOptions();
            }
        }
    
        for (var legalToken in legalTokens) {
            message = message.replace(new RegExp("\\" + legalToken, 'g'), legalTokens[legalToken](this));
        }
    
        return message;
	};

    $.fn.dropDownListCheckbox._getNumberOfSelectedOptions = function() {
        return this.selectedOptionsIndex.length;
    };
    
    $.fn.dropDownListCheckbox._resetSelectedOptions = function() {
        this.selectedOptionsIndex = [];
    };
    
    $.fn.dropDownListCheckbox._updateCheckingIcons = function(component) {
        var ddlcb = $(".ddlcb-checkboxCase");
        var firstComponentOption = $("li:first-child", component);
        ddlcb.removeClass("ddlcb-partial-checked ddlcb-full-checked");
        firstComponentOption.removeClass("ddlcb-option-checked")
        if (this.selectedOptionsIndex.length == 0) {
            return;
        }        
        if (this.selectedOptionsIndex.length < this.maxNumberOfOptions) {
            ddlcb.addClass("ddlcb-partial-checked");
        } else {
            ddlcb.addClass("ddlcb-full-checked");
		    this._toggleOption(firstComponentOption);
        }
    };
    
    $.fn.dropDownListCheckbox._toggleOption = function(option) {
        option.parent("ul").hide();
        $("html").unbind("click");
        option.siblings().removeClass("ddlcb-option-checked");
        option.toggleClass("ddlcb-option-checked");
    };    
	
    $.fn.dropDownListCheckbox._showComponentStatusMessage = true;
    
    $.fn.dropDownListCheckbox.componentStatusMessage = "";
    
	$.fn.dropDownListCheckbox.maxNumberOfOptions = 0;
	
	$.fn.dropDownListCheckbox.selectedOptionsIndex = [];
	
	$.fn.dropDownListCheckbox.init = function() {
        this._generateComponentStatusMessage();
        return this;
	};
	
	$.fn.dropDownListCheckbox.setMaxNumberOfOptions = function(number) {
    	   // for (prop in this.dropDownListCheckbox) {
    	   //     alert(prop + " " + this.dropDownListCheckbox[prop])
    	   // }	    
	    this.maxNumberOfOptions = number;
	    this._generateComponentStatusMessage(this);
	    
	    return this;
	};	

	$.fn.dropDownListCheckbox.registerExternalOption = function(identifiers) {
	    var selectedOptionsIndex = this.selectedOptionsIndex;
	    for (var i = 0; i < identifiers.length; i++) {
	        selectedOptionsIndex.push(identifiers[i]);
        }
        this._generateComponentStatusMessage();
        this._updateCheckingIcons($(this));
	};	
	
	$.fn.dropDownListCheckbox.unregisterExternalOption = function(identifiers) {
	    var selectedOptionsIndex = this.selectedOptionsIndex;
	    for (var i = 0; i < identifiers.length; i++) {
	        selectedOptionsIndex.splice(selectedOptionsIndex.indexOf(identifiers[i]), 1);
        }
        this._generateComponentStatusMessage();
        this._updateCheckingIcons($(this));        
	};
	
	
	
	
	
	$.fn.dropDownListCheckbox.isMainOptionSelected = function() {
        return $("ul > li:first-child", $(this)).hasClass("ddlcb-option-checked");
	};

})(jQuery);
