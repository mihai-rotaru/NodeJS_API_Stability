// ==UserScript==
// @name        NodeJS API Stability
// @namespace   RAMWorks
// @description Show Node.js API stability
// @include     http://nodejs.org/api/index.html
// @version     1
// @grant       none
// ==/UserScript==

// function that extracts stability info
function parse_api_stability(html_text) {
//    unsafeWindow.console.log(html_text);
    var re = /api_stability_(\d)/i;
    var res = html_text.match(re);
    //unsafeWindow.console.log(res[1]);
    if(res.length > 0) {
        return res[1];
    } else {
        return null;
    }
};

function callback(xhr, li){
    if (xhr.readyState==4 && xhr.status==200) {		
        var stab = document.createElement('span');
        stab.innerHTML = " " + parse_api_stability(xhr.responseText);
        unsafeWindow.console.log(stab.innerHTML);
        li.appendChild(stab);
    }
}

function request(url, anchor, callback){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        callback(xhr,anchor);
    };
    xhr.open('GET', url, true);
    xhr.send('');
}

// get list of modules
var api_content = document.getElementById('apicontent');
var items = api_content.getElementsByTagName('li');

for( i=0; i<items.length; i++ ) {
    var anchors = items[i].getElementsByTagName('a');
    if(anchors.length > 0) {
        var li = items[i];
        var a = anchors[0];
        var url = a.href;
        var href = a.getAttribute('href');

        // ajax for each item in list
        if( href !== 'documentation.html' && href !== 'synopsis.html' ){
            request(url,li,callback);
        }
    }
}

