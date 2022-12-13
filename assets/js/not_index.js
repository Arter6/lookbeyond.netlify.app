$(window).ready(function() 
{
    $(".image_overlay").click(function ()
    {
        $(this).toggleClass("hovered");
    })
    $(".image_overlay").off("hover");
});