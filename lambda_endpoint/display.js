
const Alexa = require('alexa-sdk');
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeImage = Alexa.utils.ImageUtils.makeImage;
const makeRichText = Alexa.utils.TextUtils.makeRichText;

const builder_BodyTemplate1 = new Alexa.templateBuilders.BodyTemplate1Builder();
const builder_BodyTemplate2 = new Alexa.templateBuilders.BodyTemplate2Builder();

const builder_ListTemplate1 = new Alexa.templateBuilders.ListTemplate1Builder();
const builder_ListTemplate2 = new Alexa.templateBuilders.ListTemplate2Builder();

const builder_ListItems = new Alexa.templateBuilders.ListItemBuilder();


//-------------------------------------------------------------------------
// display template builder
//-------------------------------------------------------------------------
module.exports = {
    
    //-------------------------------------------------------------------------
    // Card for standard RoboGen GUI = 1
    //-------------------------------------------------------------------------
    buildTemplate_RoboGenBasicCard_Intro: function(text) { 
        
        var textTitle = "RoboGen Chatbot: Intro";
        var imgBackground = 'https://s3-eu-west-1.amazonaws.com/robogenchatbots/background_intro.jpg';
        
        return builder_BodyTemplate1.setTitle(textTitle)
                                    .setTextContent(makePlainText(text))
                                    .setBackgroundImage(makeImage(imgBackground))
                                    .build();
    },
    
    //-------------------------------------------------------------------------
    // Card for standard RoboGen GUI = 2
    //-------------------------------------------------------------------------
    buildTemplate_RoboGenBasicCard_Stress: function(text) { 
        
        var textTitle = "RoboGen Chatbot: Stress";
        var imgBackground = 'https://s3-eu-west-1.amazonaws.com/robogenchatbots/background_stress.jpg';
        
        return builder_BodyTemplate1.setTitle(textTitle)
                                    .setTextContent(makePlainText(text))
                                    .setBackgroundImage(makeImage(imgBackground))
                                    .build();
    },
    
    //-------------------------------------------------------------------------
    // Card for standard RoboGen GUI = 3
    //-------------------------------------------------------------------------
    buildTemplate_RoboGenBasicCard_Sport: function(text) { 
        
        var textTitle = "RoboGen Chatbot: Sport";
        var imgBackground = 'https://s3-eu-west-1.amazonaws.com/robogenchatbots/background_sport.jpg';
        
        return builder_BodyTemplate1.setTitle(textTitle)
                                    .setTextContent(makePlainText(text))
                                    .setBackgroundImage(makeImage(imgBackground))
                                    .build();
    },
    
    //-------------------------------------------------------------------------
    // Card for standard RoboGen GUI = 4
    //-------------------------------------------------------------------------
    buildTemplate_RoboGenBasicCard_Error: function(text) { 
        
        var textTitle = "Fehler: Diese Eingabe hat leider nicht funktioniert";
        var imgBackground = 'https://s3-eu-west-1.amazonaws.com/robogenchatbots/background_error.jpg';
        
        return builder_BodyTemplate1.setTitle(textTitle)
                                    .setTextContent(makePlainText(text))
                                    .setBackgroundImage(makeImage(imgBackground))
                                    .build();
    },
    
    
    
    
    
    
    // NOT WORKING YET AREA
    
    //-------------------------------------------------------------------------
    // Card for displaying selectable options = 5
    //-------------------------------------------------------------------------
    buildTemplate_RoboGenOptionsCard: function(text, option1, option2, option3, option4, option5) {    // TODO: not working.....
        
        var textTitle = "RoboGen Chatbot";
        var imgLogo = "https://s3-eu-west-1.amazonaws.com/robogenchatbots/RoboGen_Logo.png";
        var imgBackground = 'https://s3-eu-west-1.amazonaws.com/robogenchatbots/RoboGen_BG.jpg';
        
        var items = builder_ListItems.addItem(makeImage(imgLogo),'1','First', 'Second', 'Third')
                                     .addItem(makeImage(imgLogo),'2','First', 'Second', 'Third')
                                     .addItem(makeImage(imgLogo),'3','First', 'Second', 'Third')
                                     .addItem(makeImage(imgLogo),'4','First', 'Second', 'Third')
                                     .addItem(makeImage(imgLogo),'5','First', 'Second', 'Third')
                                     .build();
                           
        return builder_ListTemplate2.setTitle(textTitle)
                                    .setListItems("A")
                                    .setBackgroundImage(makeImage(imgBackground))
                                    .build();
    },
    
    //-------------------------------------------------------------------------
    // Card for Diabetes Topics = 6
    //-------------------------------------------------------------------------
    buildTemplate_DiabetesTopicsCard: function(text) {   // TODO: text currently ignored!!!!!
        
        var textTitle = "Spezielle Themen für Diabetiker";
        var fillerTextContent = "Wordpress Artikel: https://p2dm.salzburgresearch.at/stress-prevention/";
        var imgLogo = "https://s3-eu-west-1.amazonaws.com/robogenchatbots/RoboGen_Logo.png";
        var imgBackground = 'https://s3-eu-west-1.amazonaws.com/robogenchatbots/RoboGen_BG.jpg';
        
        return builder_BodyTemplate2.setTitle(textTitle)
                                    .setTextContent(makePlainText(fillerTextContent))  // rich text or plain text
                                    .setImage(makeImage(imgLogo))
                                    .setBackgroundImage(makeImage(imgBackground))
                                    .build();
    }
}