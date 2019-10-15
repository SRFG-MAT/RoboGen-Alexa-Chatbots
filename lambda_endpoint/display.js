const Alexa = require('alexa-sdk');
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeRichText = Alexa.utils.TextUtils.makeRichText;
const makeImage = Alexa.utils.ImageUtils.makeImage;
const builder_BodyTemplate1 = new Alexa.templateBuilders.BodyTemplate1Builder();
const builder_ListTemplate1 = new Alexa.templateBuilders.ListTemplate1Builder();
const builder_ListItems = new Alexa.templateBuilders.ListItemBuilder();

module.exports = {
    
	createRichText: function(text) {
		var textArr = text.split("\r\n");
		richText = "<b>"+textArr[0]+"</b><br/><br/>";
		if (textArr.length > 1) {
			richText += "<font size='2'>";
			for (let i=1; i<textArr.length; i++) {
				var tmpText = textArr[i];
				if (textArr[i].indexOf("Antwort") == 0 && textArr[i].indexOf(":") != -1) {
					var tmpTextArr = textArr[i].split(":");
					tmpText = "<action token='"+i+"'>"+tmpTextArr[0]+"</action>";
					tmpTextArr.shift();
					tmpTextArr = tmpTextArr.join("");
					tmpText += ":"+tmpTextArr;
				}
				richText += tmpText+"<br/>";
			}
			richText += "</font>";
		}
		return richText;
	},
	
    buildTemplate_RoboGenBasicCard_Intro: function(text) { 
        var textTitle = "RoboGen: Intro";
        var imgBackground = 'https://i.ibb.co/xjQvPrG/INT.jpg';
		var richText = this.createRichText(text);
        return builder_BodyTemplate1.setTitle(textTitle)
                                    .setTextContent(makeRichText(richText))
                                    .setBackgroundImage(makeImage(imgBackground))
                                    .build();
    },
    
    buildTemplate_RoboGenBasicCard_Stress: function(text) { 
        var textTitle = "RoboGen: Stress";
        var imgBackground = 'https://i.ibb.co/vd7qgBd/STR.jpg';
		var richText = this.createRichText(text);
        return builder_BodyTemplate1.setTitle(textTitle)
                                    .setTextContent(makeRichText(richText))
                                    .setBackgroundImage(makeImage(imgBackground))
                                    .build();
    },
    
    buildTemplate_RoboGenBasicCard_Sport: function(text) { 
        var textTitle = "RoboGen: Sport";
        var imgBackground = 'https://i.ibb.co/g7h7k0p/EX.jpg';
		var richText = this.createRichText(text);
        return builder_BodyTemplate1.setTitle(textTitle)
                                    .setTextContent(makeRichText(richText))
                                    .setBackgroundImage(makeImage(imgBackground))
                                    .build();
    },
	
    buildTemplate_RoboGenBasicCard_Sleep: function(text) { 
        var textTitle = "RoboGen: Schlaf";
        var imgBackground = 'https://i.ibb.co/x1VrFG5/SLE-2.jpg';
		var richText = this.createRichText(text);
        return builder_BodyTemplate1.setTitle(textTitle)
                                    .setTextContent(makeRichText(richText))
                                    .setBackgroundImage(makeImage(imgBackground))
                                    .build();
    },
	
    buildTemplate_RoboGenBasicCard_Games: function(text) { 
        var textTitle = "RoboGen: Spiele";
        var imgBackground = 'https://i.ibb.co/MSfFzHS/GAM.jpg';
		var richText = this.createRichText(text);
        return builder_BodyTemplate1.setTitle(textTitle)
                                    .setTextContent(makeRichText(richText))
                                    .setBackgroundImage(makeImage(imgBackground))
                                    .build();
    },
    
    buildTemplate_RoboGenBasicCard_Error: function(text) { 
        var textTitle = "Fehler: Diese Eingabe hat leider nicht funktioniert";
        var imgBackground = 'https://i.ibb.co/1KKp6vw/ERR.jpg';
		var richText = this.createRichText(text);
        return builder_BodyTemplate1.setTitle(textTitle)
                                    .setTextContent(makeRichText(richText))
                                    .setBackgroundImage(makeImage(imgBackground))
                                    .build();
    },
    
	// Working but not yet used
    buildTemplate_RoboGenOptionsCard: function(text) {
        var textTitle = "RoboGen";
        var imgBackground = 'https://s3-eu-west-1.amazonaws.com/robogenchatbots/RoboGen_BG.jpg';
		const items = builder_ListItems.addItem(null,'1',makePlainText(text))
									.addItem(null,'2',makePlainText(text))
                                    .addItem(null,'3',makePlainText(text))
                                    .build();
        return builder_ListTemplate1.setTitle(textTitle)
									.setBackgroundImage(makeImage(imgBackground))
                                    .setListItems(items)
                                    .build();
    }
    
}