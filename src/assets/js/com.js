function remReSize() {
    var w = document.documentElement.clientWidth;
    if (w > 750) {
        w = 750;
    };
    document.getElementsByTagName('html')[0].style.fontSize = 200 / 750 * w + 'px';
};
remReSize();
window.addEventListener('resize', remReSize, false);  