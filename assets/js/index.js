window.onload = function () {
    let videos = document.querySelectorAll('[id^=video]');
    for (const video of videos) {
        video.playbackRate = 0.7;
    }
};

wrapper_nothing = document.getElementsByClassName("wrapper_nothing")[0];

function checkVisible(elm) {
    let rect = elm.getBoundingClientRect();
    let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function toColor(num) {
    num >>> 0;
    let b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16,
        a = ((num & 0xFF000000) >>> 24) / 255;
    return "rgba(" + [r, g, b, a].join(",") + ")";
}

window.onscroll = function () {
    while (!wrapper_nothing) {
        wrapper_nothing = document.getElementsByClassName("wrapper_nothing")[0];
    }
    let pos = getElementVisibility(wrapper_nothing);
    let color = generateColor("#000000","#ffffff",100);
    $(".wrapper_nothing").css({"background-color": "#"+color[Math.round(pos * (color.length-1))], "transition" : "background-color 0.7s"});
}

function getElementVisibility(elm)
{
    const viewport = { top: window.scrollY, bottom: window.scrollY + window.innerHeight };

    const elmBR = elm.getBoundingClientRect();
    const elmPos = { top: elmBR.top + window.scrollY, bottom: elmBR.bottom + window.scrollY };

    if (viewport.top > elmPos.bottom || viewport.bottom < elmPos.top)
    {
        return 0;
    }

    if (viewport.top < elmPos.top && viewport.bottom > elmPos.bottom)
    {
        return 1;
    }

    if (elmPos.top < viewport.top && elmPos.bottom > viewport.bottom)
    {
        return 1;
    }

    const elmHeight = elmBR.height;
    let elmHeightInView=elmHeight;

    if (elmPos.top < viewport.top)
    {
        elmHeightInView = elmHeight - (window.scrollY - elmPos.top);
    }

    if (elmPos.bottom > viewport.bottom)
    {
        elmHeightInView = elmHeightInView - (elmPos.bottom - viewport.bottom);
    }

    let percentageInView = (elmHeightInView / elmHeight);
    percentageInView+= elmPos.bottom > viewport.bottom ? -0.3 : 0.4;

    return percentageInView;
}

function hex(c) {
    var s = "0123456789abcdef";
    var i = parseInt(c);
    if (i == 0 || isNaN(c))
        return "00";
    i = Math.round(Math.min(Math.max(0, i), 255));
    return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex(rgb)
{
    return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim(s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

/* Convert a hex string to an RGB triplet */
function convertToRGB(hex)
{
    var color = [];
    color[0] = parseInt((trim(hex)).substring(0, 2), 16);
    color[1] = parseInt((trim(hex)).substring(2, 4), 16);
    color[2] = parseInt((trim(hex)).substring(4, 6), 16);
    return color;
}

function generateColor(colorStart, colorEnd, colorCount)
{

    // The beginning of your gradient
    var start = convertToRGB(colorStart);

    // The end of your gradient
    var end = convertToRGB(colorEnd);

    // The number of colors to compute
    var len = colorCount;

    //Alpha blending amount
    var alpha = 0.0;

    var saida = [];

    for (i = 0; i < len; i++)
    {
        var c = [];
        alpha += (1.0 / len);

        c[0] = start[0] * alpha + (1 - alpha) * end[0];
        c[1] = start[1] * alpha + (1 - alpha) * end[1];
        c[2] = start[2] * alpha + (1 - alpha) * end[2];

        saida.push(convertToHex(c));

    }

    return saida;

}