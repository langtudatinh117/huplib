$(document).ready(function() {
    $(".search-btn, .quit-search-btn").click(function() {
        $(".search-box").toggle();
    });
    $(".login").click(function() {
        $(".tab-login").removeClass("active");
        $(".tab-register").removeClass("active");
        $("#login").removeClass("in active");
        $("#register").removeClass("in active");
        $(".tab-login").addClass("active");
        $("#login").addClass("in active");
        $("#login-register").modal();
    });
    $(".register").click(function() {
        $(".tab-login").removeClass("active");
        $(".tab-register").removeClass("active");
        $("#login").removeClass("in active");
        $("#register").removeClass("in active");
        $(".tab-register").addClass("active");
        $("#register").addClass("in active");
        $("#login-register").modal();
    });
});