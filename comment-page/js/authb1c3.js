/**
 * Auth module
 */
/* void function () { */

    var phoneNumber = null;

    $(document).ready(function () {
        phoneNumber = $('#phoneNumber').attr('value');
        var pageName = $('#dataholder').data('page');
        /****************************** Review button handlers ******************************/
        $('#alreadySubmittedReview').one('click', function () {
            getLoginUrl('review_list', 'review_list', 'REVIEW');
        });
        $('#submitReviewButton').one('click', function () {
            getLoginUrl('review_confirmation', 'review_list', 'REVIEW');
        });
        $('#lock-button').on('click', function () {
            if(!$(this).hasClass('user-not-verified')) {
                getLoginUrl(pageName, 'image_list', 'IMAGES');
            }
        });
    });

    /**
     * Retreives login/signup url for further processing
     */
    function getLoginUrl(callbackUrlType, returnUrl, authView) {
        $.ajax({
            url: '/get_login_url',
            type: 'POST',
            data: {
                authView: authView,
                authAction: 'LOGIN',
                callbackUrl: '/' + callbackUrlType + '/' + phoneNumber,
                returnUrl: returnUrl + '/' + phoneNumber,
                phoneNumber: phoneNumber
            },
            success: function (e) {
                $(location).attr('href', e);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(jqXHR, textStatus, errorThrown);
            }
        });
    }
/* }(); */
