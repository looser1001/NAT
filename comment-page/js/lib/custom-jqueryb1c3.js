var customJquery = function () {

    // list of variables responsible for geometry and positioning(width, height, top, bottom etc) starts
    this.siteMaxWidth = 600;

    // list of variables -- DOM objects starts
    this.mainPage = ".mainPage"; // page with header and footer and tabs width to rescale
    this.reviewListsMainPageFirst = "#reviewListsMainPageFirst";
    // list of variables -- DOM objects ends

    this.askWindowWidth = function () {
        this.windowWidth = $(window).width()
    };

    this.askWindowHeight = function () {
        this.windowHeight = $(window).height()
    };

    this.properShevronButtonPositioning = function () {
        var heightt = customPage.windowHeight;
        $(".shevronButtonWrapper").css("top", 0.4 * heightt + "px");
        $(".invertedShevronButtonWrapper").css("top", 0.4 * heightt + "px");
    };

    this.popupLeftMargin = function () {
        var windowWidth = $("#topImageHeader").width();
        if (windowWidth <= 600) {
            var realWidth = windowWidth;
        } else {
            var realWidth = 600;
        }
        var popupLeftMargin = (realWidth - 300) / 2;
        $(".commentReportPopUpWindow").css("margin-left", popupLeftMargin + "px");
        $("#reviewFeedbackPopUpWindow").css("margin-left", popupLeftMargin + "px"); ////
    };

    this.cityPopupLeftMargin = function () {
        var leftCityPopupPosition = (customPage.windowWidth - 345) / 2;
        $("#cityChoicePopUpWindow").css("left", leftCityPopupPosition + "px");
    };

    this.calculateAndAssignTopMargin = function () {
        var tabbedPageContentTopPadding = this.windowWidth / 5;
        var reviewListsMainPageTopPaddingPhotos = (this.windowWidth / 5) - 66;

        if (this.windowWidth <= 600) {
            var realWidth = this.windowWidth;
        } else {
            var realWidth = 600;
        }
        var reviewListsMainPageTopPaddingRenewed = realWidth / 5 + 20;
        var reviewListsMainPageTopPaddingPhotosRenewed = (realWidth / 5) - 66;

        $("#reviewListsMainPage").css("margin-top", reviewListsMainPageTopPaddingRenewed + "px");
        $(".tabbedPageContent").css("padding-top", reviewListsMainPageTopPaddingRenewed + "px");
        $(".tabbedPageContentPhotos").css("margin-top", reviewListsMainPageTopPaddingPhotosRenewed + "px");
        $(".tabbedPageContentPosts").css("margin-top", reviewListsMainPageTopPaddingRenewed + "px"); ////// done

        var formTopPartHeight = realWidth * 0.17;
        var formTopPartHeightSecond = formTopPartHeight - 10;
        $(".formTopPart").css("height", formTopPartHeight + "px");
        $(".formTopPartSecond").css("height", formTopPartHeight + "px");
    };
};

$(document).ready(function () {

    $(window).on('load', function () {
        customPage.askWindowWidth();
        customPage.calculateAndAssignTopMargin();
        customPage.popupLeftMargin();
        customPage.askWindowHeight();
    });

    $(window).on('load resize', function () {
        //customPage.cityPopupLeftMargin();
        customPage.askWindowWidth();
        customPage.calculateAndAssignTopMargin();
        customPage.popupLeftMargin();
        customPage.askWindowHeight();
        customPage.properShevronButtonPositioning();	
    });


});