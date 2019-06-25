
//-------------------------------------------------------------------------
// external input functions for Node.js
//-------------------------------------------------------------------------
module.exports = {
    
    //-------------------------------------------------------------------------
    // Stress
    //-------------------------------------------------------------------------
    handleInput_OptionX_StressReasons: function(numberInput, dataUserInfos) {
       
        switch(numberInput)
	    {
	    	case '1':
	            dataUserInfos.stressReasons = "GoalConflict";
	    		break;
	    	case '2':
	    		 dataUserInfos.stressReasons = "NegativeAffect";
	    		break;
	    	case '3':
	    		 dataUserInfos.stressReasons = "General";
	    		break;
	    	default:
	    	    dataUserInfos.stressReasons = "none";
	    	    break;
	    }
    },
    
    handleInput_OptionX_StressSources: function(numberInput, dataUserInfos) {
       
        switch(numberInput)
		{
			case '1':
		        dataUserInfos.stressSources = "Stressoren";
				break;
			case '2':
				 dataUserInfos.stressSources = "Stressverstärker";
				break;
			case '3':
				 dataUserInfos.stressSources = "Stressreaktionen";
				break;
			default:
			    dataUserInfos.stressSources = "none";
			    break;
		}
    },
    
    

	//-------------------------------------------------------------------------
    // Sport
    //-------------------------------------------------------------------------
	handleInput_OptionX_SportVolume: function(numberInput, dataUserInfos) {
       
        switch(numberInput)
		{
			case '1':
		        dataUserInfos.sportVolume = "understate";
				break;
			case '2':
				 dataUserInfos.sportVolume = "unhappy";
				break;
			case '3':
				 dataUserInfos.sportVolume = "overstate";
				break;
			default:
			    dataUserInfos.sportVolume = "none";
			    break;
		}
    },
    
    
    handleInput_OptionX_UnderstateReason: function(numberInput, dataUserInfos) {
       
        switch(numberInput)
		{
			case '1':
		        dataUserInfos.sportUnderstateReason = "notime";
				break;
			case '2':
				 dataUserInfos.sportUnderstateReason = "dislike";
				break;
			case '3':
				 dataUserInfos.sportUnderstateReason = "forget";
				break;
			case '4':
				 dataUserInfos.sportUnderstateReason = "badmood";
				break;
			case '5':
				 dataUserInfos.sportUnderstateReason = "other";
				break;
			default:
			    dataUserInfos.sportUnderstateReason = "none";
			    break;
		}
    },
    
    handleInput_OptionX_OverstateReason: function(numberInput, dataUserInfos) { 
       
        switch(numberInput)
		{
			case '1':
		        dataUserInfos.sportOverstateReason = "weightfear";
				break;
			case '2':
				 dataUserInfos.sportOverstateReason = "other";
				break;
			default:
			    dataUserInfos.sportOverstateReason = "none";
			    break;
		}
    },
    
    handleInput_OptionX_UnhappyReason: function(numberInput, dataUserInfos) {
       
        switch(numberInput)
		{
			case '1':
		        dataUserInfos.sportUnhappyReason = "dislike";
				break;
			case '2':
				 dataUserInfos.sportUnhappyReason = "badmood";
				break;
			case '3':
				 dataUserInfos.sportUnhappyReason = "other";
				break;
			default:
			    dataUserInfos.sportUnhappyReason = "none";
			    break;
		}
    },
    
    handleInput_OptionX_AdditionalReasons: function(numberInput, dataUserInfos) {
       
        switch(numberInput)
		{
			case '1':
		        dataUserInfos.sportAdditionalReasons = "hypoglycemia";
				break;
			case '2':
				 dataUserInfos.sportAdditionalReasons = "secret";
				break;
			case '3':
				 dataUserInfos.sportAdditionalReasons = "noimpact";
				break;
			case '4':
				 dataUserInfos.sportAdditionalReasons = "glucose";
				break;
			case '5':
				 dataUserInfos.sportAdditionalReasons = "other";
				break;
			default:
			    dataUserInfos.sportAdditionalReasons = "none";
			    break;
		}
    },
}