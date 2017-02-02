$(document).ready(function() {
    // *********Register***********

    $(".regFullName").keyup(function() {
        $(this).parent().removeClass("has-success has-error");
        if ($(this).val().length >= 2 && $(this).val().length <= 40) {
            $(this).parent().addClass("has-success");
        } else {
            $(this).parent().addClass("has-error");
        }
    });

    $(".regClass").keyup(function() {
        $(this).parent().removeClass("has-success has-error");
        if ($(this).val().length >= 4 && $(this).val().length <= 6) {
            $(this).parent().addClass("has-success");
        } else {
            $(this).parent().addClass("has-error");
        }
    });

    $(".regUserName").keyup(function() {
        $(this).parent().removeClass("has-success has-error");
        if ($(this).val().length >= 6 && $(this).val().length <= 32) {
            $(this).parent().addClass("has-success");
        } else {
            $(this).parent().addClass("has-error");
        }
    });
    $(".regEmail").keyup(function() {
        $(this).parent().removeClass("has-success has-error");
        let email = $(this).val(); //keyup form to id or containment selector
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
        if (re.test(email)) {
            $(this).parent().addClass("has-success");
        } else {
            $(this).parent().addClass("has-error");
        }
    });
    $(".regPassword").keyup(function() {
        $(this).parent().removeClass("has-success has-error");
        if ($(this).val().length >= 6 && $(this).val().length <= 24) {
            $(this).parent().addClass("has-success");
        } else {
            $(this).parent().addClass("has-error");
        }
    });

    $(".regConfirmPassword").keyup(function() {
        $(this).parent().removeClass("has-success has-error");
        if ($(this).val() === $(".regPassword").val()) {
            $(this).parent().addClass("has-success");
        } else {
            $(this).parent().addClass("has-error");
        }
    });

    $(".regButton").click(function() {
        if ($(".regPassword").val().length == 0) $(".regPassword").parent().addClass("has-error");
        if ($(".regFullName").val().length == 0) $(".regFullName").parent().addClass("has-error");
        if ($(".regClass").val().length == 0) $(".regClass").parent().addClass("has-error");
        if ($(".regUserName").val().length == 0) $(".regUserName").parent().addClass("has-error");
        if ($(".regEmail").val().length == 0) $(".regEmail").parent().addClass("has-error");
        if ($(".regConfirmPassword").val().length == 0) $(".regConfirmPassword").parent().addClass("has-error");
        if ($(".regFullName").parent().hasClass('has-success') && $(".regClass").parent().hasClass('has-success') && $(".regUserName").parent().hasClass('has-success') && $(".regEmail").parent().hasClass('has-success') && $(".regPassword").parent().hasClass('has-success') && $(".regConfirmPassword").parent().hasClass('has-success')) {
            fetch('register', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'fullName': $(".regFullName").val(),
                        'class': $(".regClass").val(),
                        'username': $(".regUserName").val(),
                        'email': $(".regEmail").val(),
                        'password': $(".regPassword").val()
                    })
                })
                .then(res => {
                    if (res.ok) return res.json()
                })
                .then(data => {
                    if (data.status == 'error') {
                        $(".regMessageError").html('<ul>' + data.message + '</ul>');
                        $(".regMessageError").removeClass("hide");
                    } else if (data.status == 'success') {
                        window.location.reload(true)
                    }
                })
        }

    });

    // end register

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