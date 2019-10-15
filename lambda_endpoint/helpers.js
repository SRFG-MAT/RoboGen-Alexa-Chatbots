module.exports = {
    
    supportsDisplay: function(caller) {
    	var hasDisplay = 
    	caller.event.context &&
    	caller.event.context.System &&
    	caller.event.context.System.device &&
    	caller.event.context.System.device.supportedInterfaces &&
    	caller.event.context.System.device.supportedInterfaces.Display;
    	return hasDisplay;
    },
    
    output_EmitandDisplay: function(object, display, textWithDisplay, textWithoutDisplay, welcomeReprompt, card) {
    	if (this.supportsDisplay(object)) {
    		var template = null; 
    		switch(card) {
    		    case "INT": 
    		    	template = display.buildTemplate_RoboGenBasicCard_Intro(textWithDisplay);
    		    	break;
    		    case "STR":
					template = display.buildTemplate_RoboGenBasicCard_Stress(textWithDisplay);
    		    	break;
    		    case "EX":
    		        template = display.buildTemplate_RoboGenBasicCard_Sport(textWithDisplay);
    		    	break;
				case "SLE":
    		        template = display.buildTemplate_RoboGenBasicCard_Sleep(textWithDisplay);
    		    	break;
				case "GAM":
    		        template = display.buildTemplate_RoboGenBasicCard_Games(textWithDisplay);
    		    	break;
    		    case "ERR":
    		        template = display.buildTemplate_RoboGenBasicCard_Error(textWithDisplay);
    		    	break;
    		    default:
    		        template = display.buildTemplate_RoboGenBasicCard_Error(textWithDisplay);
    		    	break;
    		}   
    	    object.response.speak(textWithDisplay).renderTemplate(template).shouldEndSession(null).listen(welcomeReprompt);
    	    object.emit(':responseReady');
    	}
    	else {
    	    object.emit(':ask', textWithoutDisplay, textWithoutDisplay);
    	}
    },
    
	softResetStateMachine: function(dataStateMachine) {
		dataStateMachine.selectedPath = [];
		dataStateMachine.lastOptions = [];
		dataStateMachine.lastSelection = "";
		dataStateMachine.lastInterventions = [];
		dataStateMachine.lastLink = "";
    },
	
    resetStateMachine: function(dataStateMachine) {
		dataStateMachine.introComplete = false;
		dataStateMachine.selectedPath = [];
		dataStateMachine.lastOptions = [];
		dataStateMachine.lastSelection = "";
		dataStateMachine.lastInterventions = [];
		dataStateMachine.lastLink = "";
    }, 
    
    resetUserData: function(dataUserInfos) {
		dataUserInfos.showDiabetes = false;
		dataUserInfos.showSenior = false;
		dataUserInfos.shownInterventions = [];
    }
	
};