var cookie = getCookie('lastImage');
if (cookie != null && cookie != 'imgundefined' && cookie != '') {
    getImg(cookie);
}

var background_cookie = getCookie('background');
if (background_cookie != null && background_cookie != '') {
	document.body.style.background = 'url(' + background_cookie[3] + '.jpg) no-repeat';
	document.body.style.backgroundSize = '100% auto';
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

var photoes = document.getElementsByClassName('qwer');
for(var ind = 0; ind < photoes.length; ind++) {
	addListener(photoes[ind], 'click', getImgByEvent);
}

addListener(document.getElementById('close'), 'click', remove);
addListener(document.getElementById('start_picture'), 'click', start_picture);
addListener(document.getElementById('background_picture'), 'click', background_picture);

function addListener(element, eventName, handler) {
    if (element.attachEvent) {
        return element.attachEvent('on' + eventName, handler);
    }
    else {
        return element.addEventListener(eventName, handler);
    }
}

function remove() {
    document.getElementById('wrap').style.display = 'none';
    document.getElementById('myModal').style.display = 'none';
    document.getElementById('buttons').style.display = 'none';
    var elem = document.getElementById('search');
    var elems = elem.getElementsByClassName('unavailable');
    for (var ind = 0; ind < elems.length; ind++) {
    	var val = elems[ind];
        if(val.style.display == 'block') {
            val.style.display = 'none';
            document.cookie = "lastImage=; path=/; expires=";
        }
    }
}

function background_picture() {
	search_photo('background');
}

function start_picture() {
	search_photo('start_picture');
}

function search_photo(name) {
	var elem = document.getElementById('search');
    var elems = elem.getElementsByClassName('unavailable');
    for (var ind = 0; ind < elems.length; ind++) {
    	var val = elems[ind];
        if(val.style.display == 'block') {
            document.cookie = name + "=" + val.id;
        }
    }
}

function getImgByEvent() {
    var photo = 'img' + this.id;
    document.cookie = "lastImage=" + photo;
    document.getElementById(photo).style.display = 'block';
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('wrap').style.display = 'block';
}

function getImg(photo) {
    document.cookie = "lastImage=" + photo;
    document.getElementById(photo).style.display = 'block';
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('wrap').style.display = 'block';
}

function press(event) {
    var elem = document.getElementById('search');
    var elems = elem.getElementsByClassName('unavailable');
    
    if(event.keyCode == 27) {
    	event.returnValue = false;
        event.preventDefault();
        document.getElementById('myModal').style.display = 'none';
        document.getElementById('wrap').style.display = 'none';
        document.getElementById('buttons').style.display = 'none';
        for (var ind = 0; ind < elems.length; ind++) {
        	var val = elems[ind];
            if(val.style.display == 'block') {
                val.style.display = 'none';
                document.cookie = "lastImage=; path=/; expires=";
            }
        }
    }

    if(event.keyCode == 39) {
    	event.returnValue = false;
        event.preventDefault();
        var index = 0;
        for(var ind = 0; ind < elems.length; ind++) {
        	var val = elems[ind];
            index += 1;
            if(val.style.display == 'block') {
                val.style.display = 'none';
                document.cookie = "lastImage=; path=/; expires=";
                break;
            }
        }
        if(index == elems.length) {
            index = 0;
        }
        elems[index].style.display = 'block';
        document.cookie = "lastImage=" + elems[index].id;
    }

    if(event.keyCode == 37) {
    	event.returnValue = false;
        event.preventDefault();
        var index = 0;
        for(var ind = 0; ind < elems.length; ind++) {
        	var val = elems[ind];
            index += 1;
            if(val.style.display == 'block') {
                val.style.display = 'none';
                document.cookie = "lastImage=; path=/; expires=";
                break;
            }
        }
        if(index - 1 == 0) {
            index = elems.length + 1;
        }
        elems[index - 2].style.display = 'block';
        document.cookie = "lastImage=" + elems[index - 2].id;
    }
    
    if(event.keyCode == 112) {
    	event.preventDefault();
        document.getElementById('myModal').style.display = 'block';
        document.getElementById('wrap').style.display = 'block';
    }
}