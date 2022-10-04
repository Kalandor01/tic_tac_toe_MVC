import FieldController from "/controller/fieldController.js";

$(window).resize(function() {
    resize();
});

function resize() {
    $(".cell").css("height", $(".cell").css("width"));
    $(".cell").css("font-size", `${$(".cell").width()}px`);
}

var field;

function newGame() {
    field = new FieldController();
    resize();
}

$(function() {
    $("#newGameButton").on("click", newGame);
    newGame();
})