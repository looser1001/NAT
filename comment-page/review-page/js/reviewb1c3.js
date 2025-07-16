function closeFlagWindow() {
    $("#responseReportPopUpWindow").css("display", "none");
    $("#reviewsFeedbackFader").css("display", "none");
}

function hideEveryThing() {
    $("#reviewsFeedbackFader").css("display", "none");
    $("#reviewFeedbackPopUpWindow").css("display", "none");
}

function closeFeedbackPopup() {
    hideEveryThing();
    $( "body" ).removeClass( "fixed" );
}

function closeSubmitreviewPopup() {
    $("#readReviewsCover").css("display", "none");
    $("#writeReviewFirstPopup").css("display", "none");
};

function openFeedbackPopup() {
    $("#reviewsFeedbackFader").css("display", "block");
    $("#reviewFeedbackPopUpWindow").css("display", "block");
    $( "body" ).addClass( "fixed" );
    $(".focusToBringUp").val("");
}

function sendFeedBackReviews() {
    var email = $("#feedbackReviewEmail").val();
    var detail = $("#feedbackReviewDetails").val();
    var phoneNumber = $("#phoneNumber").val();
    var postId = $("#lastPostId").val();


    var obj = JSON.stringify({
        detail: detail,
        email: email,
        phoneNumber: phoneNumber,
        postId: postId,
    });

    $.ajax({
        type: "POST",
        url: "/ebjson/report_escort",
        data: obj,
        dataType: "json",
        contentType: "application/json; charset=UTF-8",
        success: function (data) {
            if (data.status == 1) {
                hideEveryThing();
            } else if (data.status == 0) {
                if (data.error == "validation email") {
                    alert("Invalid email");
                } else {
                    console.error(data.error);
                }
            } else {
                hideEveryThing();
                console.error(data.error);
            }
        }
    })
}