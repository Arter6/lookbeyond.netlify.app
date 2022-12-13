let child_number = 0;

$(document).ready(function () {

    let current_url = $(location).prop("href");
    let url_array = current_url.split('/');
    let url = url_array[url_array.length - 1].split('.')[0];

    switch (url)
    {
        case "":
        case "index":
            child_number = 1;
            break;
        case "satellites":
            child_number = 2;
            break;
        case "stations":
            child_number = 3;
            break;
        case "rockets":
            child_number = 4;
            break;
        case "rovers":
            child_number = 5;
            break;
    }

    $(".nav_menu > ul > li > ul > li > a").click(menu_uncheck);
    sized();
});

function menu_uncheck()
{
    $("#nav_menu_toggle").prop("checked",false);
    $(".nav_menu > ul > li").removeClass("hovered");
}

function sized()
{
    if ($(window).width()>800)
    {
        menu_uncheck();
        $(".nav_menu > ul > li ul").off("hover");
        $(".nav_menu > ul > li > a").off("click");
        $(".nav_menu > ul > li > a").hover(function()
        {
            $(this).css("color","#6EC1E4");
        } , function()
        {
            if (this != document.querySelector("#index_nav_menu > ul > li:nth-child(" + child_number + ") a"))
            {
                $(this).css("color","white");
            }
        });
        $(".nav_menu > ul > li ul").hover(function()
        {
            $($(this).parent().children()[0]).css("color","#6EC1E4");
        } , function()
        {
            if ($(this).parent()[0] != document.querySelector("#index_nav_menu > ul > li:nth-child(" + child_number + ")"))
            {
                $($(this).parent().children()[0]).css("color","white");
            }
        });
        $(".nav_menu > ul > li > a").click(function() {

        });
        document.querySelector("#index_nav_menu > ul > li:nth-child(" + child_number + ") a").style.color = "#6EC1E4";
        document.querySelector("#index_nav_menu > ul > li:nth-child(" + child_number + ") a .nav_menu_underline").style.border = "2px solid rgba(1, 68, 203,1)";
    }
    else
    {
        $(".nav_menu > ul > li > a").off("click");
        $(".nav_menu > ul > li > a").off("hover");
        $(".nav_menu > ul > li > a").click(function(event) {
            if (!$(this).is(".nav_menu > ul > li:first-child > a"))
            {
                event.preventDefault();
            }
            $(this).parent().toggleClass("temp_parent");
            $($(this).parents()[1]).children().not(".temp_parent").removeClass("hovered");
            $(this).parent().toggleClass("temp_parent");
            $(this).parent().toggleClass("hovered");
        });
        document.querySelector("#index_nav_menu > ul > li:nth-child(" + child_number + ") a").style.color = "white";
    }
}

window.onresize = function()
{
    sized();
};