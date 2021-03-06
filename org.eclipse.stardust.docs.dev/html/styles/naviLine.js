/*******************************************************************************
 * Copyright (c) 2014 SunGard CSA LLC and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * _http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    SunGard CSA LLC - initial API and implementation and/or initial documentation
 *******************************************************************************/
///////////////////////////////////////////////////////////////////////////////////////////////////////       
//
// function writeNavigation: writes the breadcrumbs navigation line for documentation
// pages
//
// Parameters:
//     home: relative location of Stardust Documentation overview (if the link is pointing to
//			 another doc plugin it has to be with versionnumber, which will be eliminated for 
//			 Eclipse Help docu depending on the stylesheet used)
//			 be eliminated
//     prev: relative location of previous chapter - empty if document is the first chapter in this
//           category
//     next: relative location of next chapter - empty if document is the last chapter in this
//           category
//     param: array of breadcrumb chapters with titles ( location - title )
//
///////////////////////////////////////////////////////////////////////////////////////////////////////       

var linkNumber;
var homeLink;
var prevLink;
var nextLink;
var nextTitleString;
var linkArray = new Array(20);

function writeNavigation(nextTitle,prev,next,param) {

//	hide breadcrumbs provided since Eclipse v 3.3 to use the custom Stardust breadcrumbs
	var styletest = getStyleSheet(".help_breadcrumbs");
	if (styletest != null) {
		styletest.style.display = "none";
	}
	
    homeLink = "PLUGINS_ROOT/org.eclipse.stardust.docs.dev/html/toc.html";
    prevLink = prev;
    nextLink = next;
    nextTitleString = nextTitle;

	linkNumber = writeNavigation.arguments.length - 3;
	if (linkNumber >= 0) {
    	for (var i = 0; i < linkNumber; i++) {
    		linkArray[i] = writeNavigation.arguments[i+3];
    	}
		line();
	} else if (writeNavigation.arguments.length==1) {
		document.write('<p class="header"><a href="',homeLink,'" class="header">','Stardust Documentation</a></p>');
		line();
	}
}

// writes a text line pointing to the next topic
function nextTopic()
{
	if (nextTitleString.length > 0) {
		document.write('<p><br>The next topic of <strong>',linkArray[linkNumber-1],'</strong> is <a href="',nextLink,'">',nextTitleString,'</a>.<br>&nbsp;</p>');
	}
}

// draws navigation line and copyright to bottom of page

function writeFooter()
{
	nextTopic();
	document.write('<p>&nbsp;</p><hr>');
	line();
	copyright();
}

function footerCopyright() {
	document.write('<p>&nbsp;</p><hr>');
	copyright();
}

function copyright()
{
	document.write('<table class="header"><tr><td class="header" align="right">Copyright &#169; 2014 SunGard CSA LLC</td></tr></table>');
}

function line() {
	document.write('<table class="header"><tr><td class="header">');
	document.write('<a href="',homeLink,'" class="header">','Stardust Documentation</a> &gt; ');
    for (var i = 0; i < linkNumber; i=i+2) {
  		document.write('<a href=',linkArray[i],' class="header">',linkArray[i+1],'</a> &gt; ');
	}
	document.write(document.title,'</td>');
	if ((prevLink.length != 0) || (nextLink.length != 0)) {
		document.write('<td class="header" align="right">');
		if (prevLink.length > 0) {
			document.write('<input type=button class="navibuttons" value="< Previous" onClick="window.location=\'',prevLink,'\'">');
		}
		if (nextLink.length > 0) {
			document.write('<input type=button class="navibuttons" value="Next >" onClick="window.location=\'',nextLink,'\'">');
		}
		document.write('</td>');
	}
	document.write('</tr></table><hr>');
}

// get the stylesheet class with the given name
function getStyleSheet(name) {
	if(!name || !document.styleSheets) return null;

	var i = document.styleSheets.length;
	
// Workaround as problems occur with the stylesheet retrieving in extra documentation.
// Needed for breadcrumbs in Eclipse help, in that case 2 stylesheets exist.
	if(i > 1) {
		var rules = document.styleSheets[1].rules ? document.styleSheets[1].rules :
		document.styleSheets[1].cssRules;
		var j = rules.length;
        while(j--) { 
        	if(rules[j].selectorText == name) return rules[j];
        }
    }
	return null;
} 

// Toggles expand and collapse images for list style and hides/displays 
// div part specified by parameter obj.

function writeContact() {
	document.write('<br><h3>Contact Us</h3><p>Your opinions and recommendations are always welcome. Our technical documentation team relies heavily on your feedback. Feel free to contact us:');
	document.write('&nbsp;&nbsp;<a href="IPP.Documentation@sungard.com">IPP.Documentation@sungard.com</a></p>');	
}

function openClose(toggle,obj) {
	var el = document.getElementById(obj);
	if ( el.style.display != 'none' ) {
		el.style.display = 'none';
		toggle.className="expand";
	}
	else {
		el.style.display = '';
		toggle.className="collapse";
	}
}
