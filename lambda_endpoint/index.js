
//-------------------------------------------------------------------------
// infos
//-------------------------------------------------------------------------
// Author: Mathias Schmoigl
// Datum: 12 April 2019
// Version: 1.0
// Projekt: RoboGen

//-------------------------------------------------------------------------
// mögliche Inputs von user
//-------------------------------------------------------------------------
// entscheidungsbaum
// intro
// stress
// sport
// optionswahl eins/zwei/drei
// ja
// nein 
// hilfe
// abbrechen
// stopp
// ...

//-------------------------------------------------------------------------
// 1. Global Variables
//-------------------------------------------------------------------------
"use strict";
const Alexa = require('alexa-sdk');
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

let speechOutput = '';           // Rückgabewert der Antwort
let welcomeOutput_WithDisplay = "Öffne Entscheidungsbäume Skill. Du kannst jetzt einen Entscheidungsbaum auswählen!";
let welcomeOutput_WithoutDisplay = "Öffne Entscheidungsbäume Skill. Du kannst jetzt einen Entscheidungsbaum auswählen! Dieses Gerät hat keinen Display, daher können visuelle Features des Skill nicht unterstützt werden.";
let welcomeReprompt = "reprompt text";
let reprompt;

const inputs = require('./inputs.js');
const outputs = require('./outputs.js');
const display = require('./display.js');
const helpers = require('./helpers.js');
const video = require('./video.js');

var dataStateMachine =
{
	answerRequired : false,             // JA oder Nein
	selectionRequired : false,          // Option Eins, Option Zwei, Option Drei
	treeType : 'none',			        // none, intro, stress, sport
	treeDepth : 0                       // 0=none , 1=level1 , 2=level2
};        
var dataUserInfos =        
{        
	userName : 'Fremder oder Fremde',   // holding firstname of user
	userWantsToTalk : 'no',		        // no, yes, later at date XXX
	isStressed : false,        
	hasDiabetes : false,        
	requiredTopic: 'none',				// none, stress, sport
	stressReasons : 'none',             // none, GoalConflict, NegativeAffect, General
	stressSources : 'none',             // none, Stressoren, Stressverstärker, Stressreaktionen
	sportVolume : 'none',               // none, understate, overstate, unhappy
	sportUnderstateReason : 'none',     // none, notime, dislike, forget, badmood, other
	sportOverstateReason : 'none',      // none, weightfear, other
	sportUnhappyReason : 'none',        // none, dislike, badmood, other
	sportAdditionalReasons : 'none'     // none, hypoglycemia, secret, noimpact, glucose, other
};


//-------------------------------------------------------------------------
// 2. Handlers
//-------------------------------------------------------------------------
const handlers = {
	
	'LaunchRequest': function () {
		helpers.output_EmitandDisplay(this, display, welcomeOutput_WithDisplay, welcomeOutput_WithoutDisplay, welcomeReprompt, 1);
	},
    'SessionEndedRequest': function () {
		speechOutput = '';
		//this.emit(':saveState', true);//uncomment to save attributes to db on session end
		this.emit(':tell', speechOutput);
    },
    //-------------------------------------------------------------------------
    // Intro
    //-------------------------------------------------------------------------
	'Entscheidungsbaum_Intro': function () {

		speechOutput = outputs.getOutputString_Intro_0_1();
		
        var randomNumber = Math.floor(Math.random() * 3);
        
		switch(randomNumber)
		{
			case 0:
				speechOutput = speechOutput + outputs.getOutputString_Intro_0_2();
				break;
			case 1:
				speechOutput = speechOutput + `Hallo ` + dataUserInfos.userName + outputs.getOutputString_Intro_0_3();
				break;
			case 2:
				speechOutput = speechOutput + outputs.getOutputString_Intro_0_4();
				break;
			default:
		        break;
		}
		
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 1);
		dataStateMachine = {answerRequired:false, selectionRequired:true, treeType:'intro', treeDepth:1};
    },
    'Intro_Level1': function () {
		speechOutput = outputs.getOutputString_Intro_1_1();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 1);
		dataStateMachine = {answerRequired:true, selectionRequired:false, treeType:'intro', treeDepth:2};
    },
    'Intro_Level2_Ja': function () {
    	speechOutput = outputs.getOutputString_Intro_2_1();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 1);
		dataStateMachine = {answerRequired:true, selectionRequired:false, treeType:'intro', treeDepth:3};
    },
    'Intro_Level2_Nein': function () {
    	speechOutput = outputs.getOutputString_Intro_2_2();
        helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 1);
		dataStateMachine = {answerRequired:true, selectionRequired:false, treeType:'intro', treeDepth:3};
    },
    'Intro_Level3': function () {
    	speechOutput = outputs.getOutputString_Intro_3_1() + dataUserInfos.userName;
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 1);
		dataStateMachine = {answerRequired:false, selectionRequired:false, treeType:'none', treeDepth:0};
    },
    //-------------------------------------------------------------------------
    // Stress
    //-------------------------------------------------------------------------
	'Entscheidungsbaum_Stress': function () {
		
		speechOutput = outputs.getOutputString_Stress_0_1();
        var randomNumber = Math.floor(Math.random() * 3);
        
		switch(randomNumber)
		{
			case 0:
				speechOutput = speechOutput + outputs.getOutputString_Stress_0_2();
				break;
			case 1:
				speechOutput = speechOutput + outputs.getOutputString_Stress_0_3();
				break;
			case 2:
				speechOutput = speechOutput + outputs.getOutputString_Stress_0_4();
				break;
			default:
		        break;
		}
		
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 2);
		dataStateMachine = {answerRequired:true, selectionRequired:false, treeType:'stress', treeDepth:1};
    },
    'Stress_Level1_Ja': function () {
		speechOutput = outputs.getOutputString_Stress_1_1();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 2);
		dataStateMachine = {answerRequired:true, selectionRequired:false, treeType:'stress', treeDepth:2};
		dataUserInfos.isStressed = true;
    },
    'Stress_Level1_Nein': function () {
		speechOutput = outputs.getOutputString_Stress_1_2();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 2);
		dataStateMachine = {answerRequired:false, selectionRequired:false, treeType:'none', treeDepth:0};
		dataUserInfos.isStressed = false;
    },
    'Stress_Level2_Ja': function () {
    	speechOutput = outputs.getOutputString_Stress_2_1();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 2);
		dataStateMachine = {answerRequired:true, selectionRequired:false, treeType:'stress', treeDepth:3};
		dataUserInfos.hasDiabetes = true;
    },
    'Stress_Level2_Nein': function () {
    	speechOutput = outputs.getOutputString_Stress_2_2();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 2);
		dataStateMachine = {answerRequired:true, selectionRequired:false, treeType:'stress', treeDepth:3};
		dataUserInfos.hasDiabetes = false;
    },
    'Stress_Level3_Ja': function () {
    	speechOutput = outputs.getOutputString_Stress_3_1();
    	helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 2);
    	dataStateMachine = {answerRequired:false, selectionRequired:true, treeType:'stress', treeDepth:4};
    	dataUserInfos.requiredTopic = 'stress';
    },
    'Stress_Level3_Nein': function () {
    	dataUserInfos.requiredTopic = 'none';
    	this.emit('Stress_Level4'); // forwarding here
    },
    'Stress_Level4': function () {
    	speechOutput = outputs.getOutputString_Stress_4();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 2);
		dataStateMachine = {answerRequired:false, selectionRequired:true, treeType:'stress', treeDepth:5};
    },
    'Stress_Level5': function () {
    	
    	speechOutput = outputs.getOutputString_Stress_5() +
    	` Stress-Status: ` + dataUserInfos.isStressed + 
    	`, Diabetes: ` + dataUserInfos.hasDiabetes + 
    	`, Stress-Ursache: ` + dataUserInfos.stressReasons + 
    	`, Stress-Grund: ` + dataUserInfos.stressSources;
    	
    	if(dataUserInfos.requiredTopic == 'stress')
		{
            speechOutput = speechOutput + 
            '. Du hast noch ein offenes Thema in diesem Entscheidungsbaum. Um es aufzurufen, sag einfach: Thema anzeigen';
		}
		
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 2);
		dataStateMachine = {answerRequired:false, selectionRequired:false, treeType:'none', treeDepth:0};
    },
    //-------------------------------------------------------------------------
    // Sport
    //-------------------------------------------------------------------------
	'Entscheidungsbaum_Sport': function () {
		speechOutput = outputs.getOutputString_Sport_0_1();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 3);
		dataStateMachine = {answerRequired:true, selectionRequired:false, treeType:'sport', treeDepth:1};
    },
    'Sport_Level1_Ja': function () {
		speechOutput = outputs.getOutputString_Sport_1_1();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 3);
		dataStateMachine = {answerRequired:true, selectionRequired:false, treeType:'sport', treeDepth:2};
		dataUserInfos.hasDiabetes = true;
		
    },
    'Sport_Level1_Nein': function () {
		speechOutput = outputs.getOutputString_Sport_1_2();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 3);
		dataStateMachine = {answerRequired:true, selectionRequired:false, treeType:'sport', treeDepth:2};
		dataUserInfos.hasDiabetes = false;
    },
    'Sport_Level2_Ja': function () {
    	speechOutput = outputs.getOutputString_Sport_2_1();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 3);
		dataStateMachine = {answerRequired:false, selectionRequired:true, treeType:'sport', treeDepth:3};
		dataUserInfos.requiredTopic = 'sport';
    },
    'Sport_Level2_Nein': function () {
    	speechOutput = outputs.getOutputString_Sport_2_2();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 3);
		dataStateMachine = {answerRequired:false, selectionRequired:false, treeType:'none', treeDepth:0};
		dataUserInfos.requiredTopic = 'none';
    },
    'Sport_Level3': function () {
    	speechOutput = outputs.getOutputString_Sport_3();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 3);
		dataStateMachine = {answerRequired:false, selectionRequired:true, treeType:'sport', treeDepth:4};
    	
    },
    'Sport_Level4': function () {
    	speechOutput = outputs.getOutputString_Sport_4();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 3);
		dataStateMachine = {answerRequired:false, selectionRequired:true, treeType:'sport', treeDepth:5};
    },
    'Sport_Level5': function () {
    	speechOutput = outputs.getOutputString_Sport_5();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 3);
		dataStateMachine = {answerRequired:false, selectionRequired:true, treeType:'sport', treeDepth:6};
    },
    'Sport_Level6': function () {
    	speechOutput = outputs.getOutputString_Sport_6();
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 3);
		dataStateMachine = {answerRequired:false, selectionRequired:true, treeType:'sport', treeDepth:7};
    },
    'Sport_Level7': function () {
    	
    	speechOutput = outputs.getOutputString_Sport_7() +
    	` Diabetes: ` + dataUserInfos.hasDiabetes + 
    	`, Sport-Ausmass: ` + dataUserInfos.sportVolume + 
    	`, Grund für zu wenig: ` + dataUserInfos.sportUnderstateReason + 
    	`, Grund für zu viel: ` + dataUserInfos.sportOverstateReason + 
    	`, Grund für unglücklich: ` + dataUserInfos.sportUnhappyReason +
    	`, Weitere Gründe: ` + dataUserInfos.sportAdditionalReasons;
    	
    	if(dataUserInfos.requiredTopic == 'sport')
		{
            speechOutput = speechOutput + 
            '. Du hast noch ein offenes Thema in diesem Entscheidungsbaum. Um es aufzurufen, sag einfach: Thema anzeigen';
		}
		
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 3);
		dataStateMachine = {answerRequired:false, selectionRequired:false, treeType:'none', treeDepth:0};
    },

    //-------------------------------------------------------------------------
    // Option/Auswahl X
    //-------------------------------------------------------------------------
    'Option_X': function () {
    	
    	if(dataStateMachine.selectionRequired == true)
		{
			if(dataStateMachine.treeType == "stress")
			{
				if(dataStateMachine.treeDepth == 4)
			    {
			    	inputs.handleInput_OptionX_StressReasons(this.event.request.intent.slots.number.value, dataUserInfos);
			    	this.emit('Stress_Level4');
			    }
			    else if(dataStateMachine.treeDepth == 5)
			    {
			    	inputs.handleInput_OptionX_StressSources(this.event.request.intent.slots.number.value, dataUserInfos);
			    	this.emit('Stress_Level5');
			    }
			    else
			    {
			    	speechOutput = outputs.getOutputString_Error_TreeDepth();
					helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
			    }
			}
			else if(dataStateMachine.treeType == "sport")
			{
				if(dataStateMachine.treeDepth == 3)
				{
					inputs.handleInput_OptionX_SportVolume(this.event.request.intent.slots.number.value, dataUserInfos);
					
					if(dataUserInfos.sportVolume == "understate")
					{
						this.emit('Sport_Level3');
					}
					else if (dataUserInfos.sportVolume == "unhappy")
					{
						this.emit('Sport_Level4');
					}
					else if(dataUserInfos.sportVolume == "overstate")
					{
						this.emit('Sport_Level5');
					}
					else
					{
						speechOutput = outputs.getOutputString_Error_TreeDepth();
		                helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
					}
				}
				else if(dataStateMachine.treeDepth == 4)
				{
					inputs.handleInput_OptionX_UnderstateReason(this.event.request.intent.slots.number.value, dataUserInfos);
					this.emit('Sport_Level6');
				}
				else if(dataStateMachine.treeDepth == 5)
				{
					inputs.handleInput_OptionX_UnhappyReason(this.event.request.intent.slots.number.value, dataUserInfos);
					this.emit('Sport_Level6');
				}
				else if(dataStateMachine.treeDepth == 6)
				{
					inputs.handleInput_OptionX_OverstateReason(this.event.request.intent.slots.number.value, dataUserInfos);
					this.emit('Sport_Level6');
				}
				else if(dataStateMachine.treeDepth == 7)
				{
					inputs.handleInput_OptionX_AdditionalReasons(this.event.request.intent.slots.number.value, dataUserInfos);
					this.emit('Sport_Level7');
				}
			}
			else if(dataStateMachine.treeType == "intro" && dataStateMachine.treeDepth == 1)
			{
				if(this.event.request.intent.slots.number.value == '1')
				{
					dataUserInfos.userWantsToTalk = 'yes';
					dataStateMachine = {answerRequired:false, selectionRequired:false, treeType:'none', treeDepth:0};
					
					this.emit('Intro_Level1');
				}
				else if(this.event.request.intent.slots.number.value == '2')
				{
					dataUserInfos.userWantsToTalk = 'no';
					dataStateMachine = {answerRequired:false, selectionRequired:false, treeType:'none', treeDepth:0};
					
					speechOutput = outputs.getOutputString_Intro_Bye1();
		            helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 1);
				}
				else if(this.event.request.intent.slots.number.value == '3')
				{
					dataUserInfos.userWantsToTalk = 'later';
					dataStateMachine = {answerRequired:false, selectionRequired:false, treeType:'none', treeDepth:0};
					
					speechOutput = outputs.getOutputString_Intro_Bye2();
		            helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 1);
				}
			}
		}
		else
		{
		  speechOutput = outputs.getOutputString_Error_NoOptionSelectable();
		  helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
		}
    },
    //-------------------------------------------------------------------------
    // Option Name
    //-------------------------------------------------------------------------
    'Option_Name': function () {
    	
    	dataUserInfos.userName = this.event.request.intent.slots.name.value;
    	
    	if(dataStateMachine.treeType == "intro" && dataStateMachine.treeDepth == 3)
    	{
    	    this.emit('Intro_Level3');
    	}
    	else
    	{
    		speechOutput = outputs.getOutputString_Name() + dataUserInfos.userName;
		    helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
    	}
    },
    //-------------------------------------------------------------------------
    // Ausgewähltes Thema anzeigen
    //-------------------------------------------------------------------------
    'Thema_Anzeigen': function () {
    	
    	if(dataUserInfos.requiredTopic == 'stress' && dataStateMachine.treeDepth == 0)
    	{
    	    helpers.httpsGet('p2dm.salzburgresearch.at', '/de/stress-praevention/', (theResult) => {
                speechOutput = theResult;
                this.response.cardRenderer('Wordpress Artikel: Stress', speechOutput);
                this.response.speak(speechOutput).listen(welcomeReprompt);
                this.emit(':responseReady');
            });

    		dataUserInfos.requiredTopic = 'none'; // reset topic required
    	}
    	else if(dataUserInfos.requiredTopic == 'sport' && dataStateMachine.treeDepth == 0)
    	{
    		helpers.httpsGet('p2dm.salzburgresearch.at', '/de/diabetes-ziele-mit-den-anderen-dingen-im-alltag-kombinieren/', (theResult) => {
                speechOutput = theResult;
                this.response.cardRenderer('Wordpress Artikel: Sport', speechOutput);
                this.response.speak(speechOutput).listen(welcomeReprompt);
                this.emit(':responseReady');
            });
            
            dataUserInfos.requiredTopic = 'none'; // reset topic required
    	}
    	else
    	{
		    speechOutput = outputs.getOutputString_Error_NoTopicSelected();
		    this.emit(':ask', speechOutput, speechOutput);
    	}
	},
    //-------------------------------------------------------------------------
    // Ja
    //-------------------------------------------------------------------------
	'AMAZON.YesIntent': function () {

		if(dataStateMachine.answerRequired == true)
		{
			if(dataStateMachine.treeDepth == 1)
			{
				switch (dataStateMachine.treeType) {
		    		case 'none':
		    			speechOutput = outputs.getOutputString_Error_TreeType();
		    			helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
						break;
            		case 'intro':
            			this.emit('Intro_Level1_Ja');
            			break;
            		case 'stress':
            			this.emit('Stress_Level1_Ja');
            			break;
            		case 'sport':
            			this.emit('Sport_Level1_Ja');
            			break;
            		default:
            			break;
		    	}
			}
			else if(dataStateMachine.treeDepth == 2)
			{
				switch (dataStateMachine.treeType) {
		            case 'none':
		            	speechOutput = outputs.getOutputString_Error_TreeType();
		            	helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
			        	break;
                    case 'intro':
                    	this.emit('Intro_Level2_Ja');
                    	break;
                    case 'stress':
                    	this.emit('Stress_Level2_Ja');
                    	break;
                    case 'sport':
                    	this.emit('Sport_Level2_Ja');
                    	break;
                    default:
                    	break;
    			}
			}
			else if(dataStateMachine.treeDepth == 3)
			{
				this.emit('Stress_Level3_Ja'); // TODO
			}
			else
			{
				speechOutput = outputs.getOutputString_Error_TreeDepth();
		        helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
			}
		}
		else
		{
		  speechOutput = outputs.getOutputString_Error_Yes();
		  helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
		}
    },
    //-------------------------------------------------------------------------
    // Nein
    //-------------------------------------------------------------------------
	'AMAZON.NoIntent': function () {
		speechOutput = '';

		if(dataStateMachine.answerRequired == true)
		{
			if(dataStateMachine.treeDepth == 1)
			{
			    switch (dataStateMachine.treeType) {
		            case 'none':
		            	speechOutput = outputs.getOutputString_Error_TreeType();
		            	helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
			        	break;
                    case 'intro':
                    	this.emit('Intro_Level1_Nein');
                    	break;
                    case 'stress':
                    	this.emit('Stress_Level1_Nein');
                    	break;
                    case 'sport':
                    	this.emit('Sport_Level1_Nein');
                    	break;
                    default:
                    	break;
    	        }
			}
			else if(dataStateMachine.treeDepth == 2)
			{
			    switch (dataStateMachine.treeType) {
		            case 'none':
		            	speechOutput = outputs.getOutputString_Error_TreeType();
		            	helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
			        	break;
                    case 'intro':
                    	this.emit('Intro_Level2_Nein');
                    	break;
                    case 'stress':
                    	this.emit('Stress_Level2_Nein');
                    	break;
                    case 'sport':
                    	this.emit('Sport_Level2_Nein');
                    	break;
                    default:
                    	break;
    	        }
			}
			else if(dataStateMachine.treeDepth == 3)
			{
				this.emit('Stress_Level3_Nein'); // TODO
			}
			else
			{
				speechOutput = outputs.getOutputString_Error_TreeDepth();
		        helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
			}
		}
		else
		{
		  speechOutput = outputs.getOutputString_Error_No();
		  helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
		}
    },
    //-------------------------------------------------------------------------
    // Hilfe
    //-------------------------------------------------------------------------
	'AMAZON.HelpIntent': function () {
		speechOutput = outputs.getOutputString_Help();
		this.emit(':ask', speechOutput, speechOutput);
	},
    //-------------------------------------------------------------------------
    // Abbrechen (App schließen)
    //-------------------------------------------------------------------------
    'AMAZON.CancelIntent': function () {
		speechOutput = outputs.getOutputString_Cancel();
		this.emit(':tell', speechOutput);
		this.close();
	},
	//-------------------------------------------------------------------------
    // Stopp (Entscheidungsbaum verlassen)
    //-------------------------------------------------------------------------
   'AMAZON.StopIntent': function () {
		speechOutput = outputs.getOutputString_Stop();
		dataStateMachine.treeType = 'none';
		dataStateMachine.treeDepth = 0;
		dataStateMachine.answerRequired = false;
		this.emit(':tell', speechOutput);
   },
   //-------------------------------------------------------------------------
   // TODOs
   //-------------------------------------------------------------------------
   'AMAZON.NavigateHomeIntent': function () {
		speechOutput = "Home ist noch nicht unterstützt.";
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
    },
	'AMAZON.PauseIntent': function () {
		speechOutput = "Pause ist noch nicht unterstützt.";
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
    },
	'AMAZON.ResumeIntent': function () {
		speechOutput = "Weiter ist noch nicht unterstützt.";
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
    },
	'AMAZON.MoreIntent': function () {
		speechOutput = "Mehr ist noch nicht unterstützt.";
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
    },
	'AMAZON.NavigateSettingsIntent': function () {
		speechOutput = "Eintellungen sind noch nicht unterstützt.";
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
    },
	'AMAZON.NextIntent': function () {
		speechOutput = "Nächster ist noch nicht unterstützt.";
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
    },
	'AMAZON.PageUpIntent': function () {
		speechOutput = "This is a place holder response for the intent named AMAZON.PageUpIntent. This intent has no slots. Anything else?";
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
    },
	'AMAZON.PageDownIntent': function () {
		speechOutput = "This is a place holder response for the intent named AMAZON.PageDownIntent. This intent has no slots. Anything else?";
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
    },
	'AMAZON.PreviousIntent': function () {
		speechOutput = "This is a place holder response for the intent named AMAZON.PreviousIntent. This intent has no slots. Anything else?";
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
    },
	'AMAZON.ScrollRightIntent': function () {
		speechOutput = "This is a place holder response for the intent named AMAZON.ScrollRightIntent. This intent has no slots. Anything else?";
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
    },
	'AMAZON.ScrollDownIntent': function () {
		speechOutput = "This is a place holder response for the intent named AMAZON.ScrollDownIntent. This intent has no slots. Anything else?";
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
    },
	'AMAZON.ScrollLeftIntent': function () {
		speechOutput = "This is a place holder response for the intent named AMAZON.ScrollLeftIntent. This intent has no slots. Anything else?";
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
    },
	'AMAZON.ScrollUpIntent': function () {
		speechOutput = "This is a place holder response for the intent named AMAZON.ScrollUpIntent. This intent has no slots. Anything else?";
		helpers.output_EmitandDisplay(this, display, speechOutput, speechOutput, welcomeReprompt, 4);
    },	
	'Unhandled': function () {
        speechOutput = outputs.getOutputString_Error_LambdaFunction();
        this.emit(':ask', speechOutput, speechOutput);
    }
};


//-------------------------------------------------------------------------
// export handler and registration
//-------------------------------------------------------------------------
exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    //alexa.resources = languageStrings;   // To enable string internationalization (i18n) features, set a resources object.
    alexa.registerHandlers(handlers);
	//alexa.dynamoDBTableName = 'DYNAMODB_TABLE_NAME'; //uncomment this line to save attributes to DB
    alexa.execute();
};
