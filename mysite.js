var start_cookie = getCookie('start_picture');
if (start_cookie != null && start_cookie != '') {
	document.getElementById('start_photo').src = start_cookie[3] + '.jpg';
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