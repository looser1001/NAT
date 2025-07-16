
// function closeReportPopup(commentId) {
//     $( "body" ).removeClass( "fixed" );
//     $("#commentReportPopUpWindow-"+commentId).css("display", "none");
//     $("#commentsreportFader").css("display", "none");
// }
//
// function showCommentReportPopup(commentId) {
//     $("#commentReportPopUpWindow-"+commentId).css("display", "block");
//     $("#commentsreportFader").css("display", "block");
//
//     $( "body" ).addClass( "fixed" );
//     $(".focusToBringUp").val("");
// };

function openCommentPopup() {
    $("#transparentDivToClickToClosePopup").css("display", "block");
    $("#commentPopUpActivator").fadeOut(100, function () {
        $("#commentPopUpBlock").animate({
            'bottom': -34
        }, 300);
    });
     $( "body" ).addClass( "fixed" );
    $("#myCommentTextArea").focus();
};

function closeCommentPopup() {
    $("#commentPopUpActivator").fadeIn(100);
    $("#commentPopUpBlock").animate({
        'bottom': -181
    }, 400, function () {});
    $("#transparentDivToClickToClosePopup").css("display", "none");
      $( "body" ).removeClass( "fixed" );
};

var commentPaginator = function (phoneNumber, more) {
    var currPage = 1;
    var more = more;
    var phoneNumber = phoneNumber;

    var toPreventSeveralLoading = true;

    var source   = $("#comment-entry-template").html();
    var compiled = dust.compile(source, "provider-template");
    dust.loadSource(compiled);

    var reLineBreak = new RegExp('<br>', 'g');
    var reAmpersand = new RegExp('&amp;', 'g');
    var reGreaterThan = new RegExp('&gt;', 'g'); // optional?

    this.renderComment = function(e, comment) {
        var data = {
            commentId: comment.ecid,
            commentDate: comment.ecdatatime,
            commentUser: comment.uname,
            commentMessage: comment.ecmsg.replace(reLineBreak, ' ').replace(reAmpersand, '').replace(reGreaterThan, ''),
            commentPost: comment.ecpid,
            phoneNumber: comment.ecphone
        };

        console.log(data);

        dust.render("provider-template", data, function(err, out) {
            var clist = e.find('.commentElement');
            console.log(clist.length);

            if (clist.length > 0)
                e.prepend(out);
            else
                e.append(out);
        });
    }

    this.renderList = function(e, clist) {
        for (var n in clist) {
            var comment = clist[n];
            var data = {
                commentId: comment.ecid,
                commentDate: comment.ecdatatime,
                commentUser: comment.uname,
                commentMessage: comment.ecmsg.replace(reLineBreak, ' ').replace(reAmpersand, '').replace(reGreaterThan, ''),
                commentPost: comment.ecpid,
                phoneNumber: comment.ecphone
            };

            console.log(data);

            dust.render("provider-template", data, function(err, out) {
                e.append(out);
            });
        }
    }



    this.loadComments = function () {
        if (more == 0)
            return;

        var url = '/ebjson/comments_list/'+phoneNumber+'/'+(currPage+1);
        var self = this;

        var item1 = document.getElementById("commentContainer").offsetHeight;
        var item2 = $(document).scrollTop();
        var diff = item1 - item2;

        if (Number(diff) < 900 && toPreventSeveralLoading) {
            toPreventSeveralLoading = false;
            $("#loaderIndicator").show();
            $.ajax({
                type: "GET",
                url: url,
                success: function (data) {

                    $("#loaderIndicator").hide();

                    if (data.res == 0) {
                        console.log(data.error);
                        return;
                    }

                    self.renderList($("#commentContainer"), data.clist);

                    currPage = data.curr_page;
                    toPreventSeveralLoading = true;
                    if (data.more == true)
                        more = 1;
                    else
                        more = 0;
                }
            });
        }
    };


    this.saveComment = function(form) {
        var url = '/ebjson/create_comment';
        var self = this;

        var phoneNumber = form.phoneNumber.value;
        var postId = form.postId.value;
        var cityId = form.cityId.value;
        var message = form.message.value;

        if (message == undefined || message.length == 0) {
            return;
        }

        var obj = JSON.stringify({
            phoneNumber: phoneNumber,
            postId: postId,
            cityId: cityId,
            message : message
        });

        if (toPreventSeveralLoading) {
            toPreventSeveralLoading = false;
            $("#loaderIndicator").show();

            $.ajax({
                type: "POST",
                url: url,
                data: obj,
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                success: function (data) {

                    $("#loaderIndicator").hide();
                    toPreventSeveralLoading = true;
                    closeCommentPopup();

                    if (data.status == 0 || data.status == 3) {
                        //alert(data.error);
                        $('.require-popup')
                            .fadeIn('slow')
                            .delay(3000)
                            .fadeOut('slow');
                        return;
                    } else if (data.status == 2) {
                        $(location).attr('href', data.data);
                        return;
                    }

                    console.log(data.model);
                    self.renderComment($("#commentContainer"), data.model);
                }
            });
        }
    }
};




// function sendReportComment(e) {
//     var form = e.form;
//     var commentId = form.commentId.value;
//     var message = form.message.value;
//
//     if (message === undefined || message.length == 0) {
//         return;
//     }
//
//     var obj = JSON.stringify({
//         commentId: commentId,
//         message : message
//     });
//
//     $.ajax({
//         type: "POST",
//         url: "/ebjson/report_comment",
//         data: obj,
//         dataType: "json",
//         contentType: "application/json; charset=UTF-8",
//         success: function (data) {
//             if (data.status == 1) {
//                 closeReportPopup(commentId);
//                 form.message.value = "";
//             } else if (data.status == 0) {
//                 closeReportPopup(commentId);
//                 form.message.value = "";
//                 if (data.error === 'permission') {
//                     alert("You don't have permission");
//                 }
//             } else {
//                 closeReportPopup(commentId);
//                 alert("Network error, try again later");
//             };
//         }
//     });
// }
