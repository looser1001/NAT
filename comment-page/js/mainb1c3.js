    var OFFSET_BANNERS_PRELOAD = 80;   // constant with bottom offset for preloading banners while scrolling the page

    // View model functions
    function sendPostData() {
        $("#confirmReviewPopup").css("display", "none");
        // $("#formBackFrom").submit();
    };
    function showPopup() {
        $("#confirmReviewPopup").css("display", "block");
    };

    function openRightSidePanel() {
        $("#frontPageBottomGearButton").fadeOut("2");
        $(".rightSidePanelWrapper").show();
        $(".rightSidePanelWrapper").animate({
            right: "2"
        }, 300, function () {
            $(".invertedShevronButtonWrapper").fadeIn("200");
            //$("#frontPageBottomMenuToggle").fadeOut("10");
            $(".shevronButtonWrapper").fadeOut("10");
        });
    }

    function closeAllPanels() {
        console.log(2);
        if ($(window).width() < 1070) {
            $(".invertedShevronButtonWrapper").fadeOut("100");
            $(".shevronButtonWrapper").fadeIn("10");
            ///$("#frontPageBottomMenuToggle").fadeIn("200");
            $("#frontPageBottomGearButton").fadeIn("10");
            $(".rightSidePanelWrapper").animate({
                right: "-235"
            }, 500);
            $(".rightSidePanelWrapper").fadeOut("100");
            $("#homePageBottomMenu").animate({
                bottom: "-160px"
            }, 600, function () {
                $(".shevronButtonWrapper").fadeIn("10");
            })
        }
    }
    function tooglePanelOnBack () {
        if ( $('#footerback2' ).data('show') === 'show' ) {
            closeAllPanels();
        } else {
            openRightSidePanel()
        }
    }

    function clearSelect() {
        $("#statesSelect")[0].selected = true;
        $("#canadaSelect")[0].selected = true;
        $("#europeSelect")[0].selected = true;
    }

    function safe() {
        $('#bottomMenuDenied').fadeIn(50);
        setTimeout(function () {
            $('#bottomMenuDenied').fadeOut(500)
        },1000)
    };

    function openAbout() {
        $('#aboutSourcePanel').fadeIn(0);
        $('#aboutSourcePanel')[0].classList.add('open');
    };

    function closeAbout() {
        $('#aboutSourcePanel').fadeOut(500);
        $('#aboutSourcePanel')[0].classList.remove('open');
    };

    function openRightSidePanel() {
        $("#frontPageBottomGearButton").fadeOut("2");
        $(".rightSidePanelWrapper").show();
        $(".rightSidePanelWrapper").animate({
            right: "2"
        }, 300, function () {
            $(".invertedShevronButtonWrapper").fadeIn("200");
            //$("#frontPageBottomMenuToggle").fadeOut("10");
            $(".shevronButtonWrapper").fadeOut("10");
        });
        load_niche_banners();
    };

    function closeAllPanels() {
        if ($(window).width() < 1070) {
            $(".invertedShevronButtonWrapper").fadeOut("100");
            $(".shevronButtonWrapper").fadeIn("10");
            ///$("#frontPageBottomMenuToggle").fadeIn("200");
            $("#frontPageBottomGearButton").fadeIn("10");
            $(".rightSidePanelWrapper").animate({
                right: "-235"
            }, 500);
            $(".rightSidePanelWrapper").fadeOut("100");
            $("#homePageBottomMenu").animate({
                bottom: "-160px"
            }, 600, function () {
                $(".shevronButtonWrapper").fadeIn("10");
            })
        }
    };

    function load_niche_banners () {
        var bannerConainer = document.querySelector('#menubanner_container .menubanner_wrapper');

        if (!bannerConainer.children.length) {
            var generateBannerHTML = function (zoneId) {
                reviveAsync = {};
                var ins = document.createElement('ins');
                ins.setAttribute('data-revive-zoneid', zoneId);
                var reviveId = $('#dataholder').attr('data-revive-id');
                ins.setAttribute('data-revive-id', reviveId);
                bannerConainer.appendChild(ins);
            }

            var script = document.createElement('script');

            var reviveUrl = $('#dataholder').attr('data-revive');
            script.src = reviveUrl + "/www/delivery/asyncjs.php?version=" +
                Math.floor(Math.random(9999)*100000);
            script.type = 'text/javascript';
            script.async = true;
            script.onload = script.onreadystatechange = function() {
                console.log(this.readyState);
            }
                
            generateBannerHTML(36);
            generateBannerHTML(37);
            generateBannerHTML(38);
            generateBannerHTML(41);

            bannerConainer.appendChild(script);
        }
    }

    function openCityChoicePopup() {
        $("#cityChoicePopUp").css("display", "block");
        var cityName = $('.fpcity').text().trim();
        if (cityName) openCityChooser(cityName);
    };

    function closeCityChoicePopup() {
        $("#cityChoicePopUp").css("display", "none")
    };

    function openCityChooser(cityName) {
        $('.ac-sub').find('input').prop('checked', false);
        var jqCityElements = $('.ac-sub-text p a').removeClass('current').filter(function () {
            return $(this).text().toLowerCase() == cityName.toLowerCase();
        });
        if (jqCityElements.length) {
            var jqCityElement = $(jqCityElements.get(0));
            jqCityElement.addClass('current');
            jqCityElement.closest('.ac-sub').find('input').prop('checked', true);
            jqCityElement.closest('.ac-sub').closest('article').closest('.ac-sub').find('input:first').prop('checked', true);

            var container = $('html');
            var selectedElementPosition = jqCityElement.position().top;
            container.scrollTop(selectedElementPosition + container.scrollTop() - container.height() / 2);
        }
    }

    function clearSelect() {
        $("#statesSelect").selected = true;
        $("#canadaSelect").selected = true;
        $("#europeSelect").selected = true;
    };

    function safe() {
        $('#bottomMenuDenied').fadeIn(50);
        setTimeout(function () {
            $('#bottomMenuDenied').fadeOut(500)
        },1000)
    };

    function openAbout() {
        $('#aboutSourcePanel').fadeIn(0);
        $('#aboutSourcePanel')[0].classList.add('open');
    };

    function closeAbout() {
        $('#aboutSourcePanel').fadeOut(500);
        $('#aboutSourcePanel')[0].classList.remove('open');
    };

    function showReadReviewPopup() {
        if ("") {
            console.log("action for exist");

            if (userModel.checkRole("review")) {
                reviewService.getReviews(vm.phoneNumber, vm.postId)
                    .then(function (data) {
                        initReviews(data);
                    }, function (data, headers, config) {});
            } else {
                $("#readReviewsCover").css("display", "block");
                $("#writeReviewFirstPopup").css("display", "block");
                $("#alreadySubmittedReview").hide();
            }
        }
        else {
            $("#readReviewsCover").css("display", "block");
            $("#writeReviewFirstPopup").css("display", "block");
        }
    };

    function createForm(model, url) {
        var method = "post";
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", url);

        for(var key in model) {
            if(model.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", model[key]);
                form.appendChild(hiddenField);
            }
        }
        document.body.appendChild(form);
        return form;
    };
    function cityChange(elem) {
        if(elem.value.split("=")[1] == "true"){
            var form = createForm({cityv: elem.value.split("=")[0]}, "/provider_list/last_review/");
            form.submit();
        }
    }
    /**
     * Performs checking left menu panel and correcting position
     * of the city chooser for the desktop version
     */
    function calcModalsDesktopPoition () {
        if ($('.rightSidePanelWrapper').length) {
            $('#choseCityContainer, .mainPage.frontpage').addClass('sidepanel-margin');
        }
    }
    /*
     * Performs checking is element is visible on the page
     * @param elem selector of the element
     * @param offset number in pixels down to the screen for pre-loading
     */
    function isScrolledIntoView(elem, offset = 0) {
        if (!$(elem).length) return false;
        
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top - offset;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
    /**
     * Load banners dynamicaly
     * generates html-blocks and load scripts from ad-server
     * 
     */
    function loadBanner(selector, zoneId) {
        setTimeout(function() {
            var bannerContainer = document.querySelector(selector);

            if (bannerContainer && !bannerContainer.children.length) {
                // console.log('loading ', selector, '; zone id = ', zoneId,'; ...');
                reviveAsync = {};
                var ins = document.createElement('ins');
                ins.setAttribute('data-revive-zoneid', zoneId);
                var reviveId = $('#dataholder').attr('data-revive-id');
                ins.setAttribute('data-revive-id', reviveId);
                bannerContainer.appendChild(ins);

                var script = document.createElement('script');
                var reviveUrl = $('#dataholder').attr('data-revive');
                script.src = reviveUrl + '/www/delivery/asyncjs.php?version=' +
                    Math.floor(Math.random(9999)*100000);
                script.type = 'text/javascript';
                script.async = true;
                script.onload = script.onreadystatechange = function() {
                    // console.log(this.readyState);
                }
                bannerContainer.appendChild(script);
            }
        }, 0);
    }

    $(window).on('scroll', function (e) {
        /**
         * Loading banners dynamicaly by scrolling
         */
        if (isScrolledIntoView('#comments-banner', OFFSET_BANNERS_PRELOAD)) {
            loadBanner('#comments-banner', 69);
        }
        if (isScrolledIntoView('#video-banner', OFFSET_BANNERS_PRELOAD)) {
            loadBanner('#video-banner', 70);
        }
    });

    $(document).ready( function () {
        var blockSelectClick = false;
        var currentLocation = $("#cityChoicePopUp").data('cityval') ?  $("#cityChoicePopUp").data('cityval') : null;

        initBackButtonLogic();
        calcModalsDesktopPoition();

        if (isScrolledIntoView('#comments-banner', 0)) {
            loadBanner('#comments-banner', 69);
        }
        setTimeout(function () {
            if (isScrolledIntoView('#video-banner', 0)) {
                loadBanner('#video-banner', 70);
            }
        }, 1000);

        window.eRHead = $(".reviewItemHeaderTitleAndNumber");
        window.eRHeadActive = $(".reviewItemHeaderTitleAndNumberActive");
        window.eRDetail = $(".hideableMainReviewContent");
        window.eRClose = $(".hideReviewItemButton");
        window.eROpen = $(".showReviewItemButton");
        window.isRDetail = false;

        window.btnOpenResponse = $(".btnOpenResponse");
        window.btnCloseResponse = $(".btnCloseResponse");
        window.textCheckLength = $(".textCheckLength");
        window.countValue = $(".countValue");
        window.SubmitButtonResponse = $(".SubmitButtonResponse");
        window.eResponses = $(".responses");

        reviewInit();

        responseInit();

        if ($(window).width() > 600) {
            $("#homePageMainBgImage").attr('src', '/images/frontPage/mainImage10.png');
        }

        function initBackButtonLogic() {
            var providerListUrls = [
                '/provider_list/last_review/',
                '/provider_list/most_review/',
                '/provider_list/last_post/'
            ];
            var COOKIE_NAME = 'provider_list';
            var backButtonImageURL = '/images/ebBackToPost.png';
            var listCrawlerURL = $.trim($('#configURL').text());

            var pages = {
                current: window.location.href,
                isProviderListPage: /\/provider_list\//.test(window.location.href),
                isPrevPageProviderList: !!providerListUrls
                    .filter(function(url) {
                        return document.referrer.indexOf(url) != -1;
                    }).length,
                isPrevPageCurrentDomain: document.referrer.indexOf(location.hostname) != -1 || document.referrer == '',
                isPrevPageLC: listCrawlerURL != '' && document.referrer.indexOf(listCrawlerURL) != -1
            }

            var cookie = $.cookie.bind(void 0, COOKIE_NAME);

            if (pages.isPrevPageLC) {
                cookie('', { path: '/' });
                return;
            }

            if (pages.isProviderListPage) {
                cookie(pages.current, { path: '/' });
                return;
            }

            var isInterenalLink = !!cookie();

            if (isInterenalLink) {
                var backButton = $('#back-button');
                backButton.attr('src', backButtonImageURL);
                backButton.on('click tap', function() {
                    var pageName = $('#dataholder').attr('data-page');

                    if (pageName == 'review_list' || pageName == 'posts_list') {
                        window.history.back(); // for restoring scrolling position in the list
                        return;
                    }

                    var providerListPage = cookie();
                    console.log('going.... -> ', providerListPage);
                    cookie('', { path: '/' });
                    $(location).attr('href', providerListPage);
                });
            }
        }
    });


function checkLength(e){
    try{
        $(".activeForm")[0].classList.remove("activeForm");
    }catch(err){}

    var count = 156 - e.value.length;
    window.countValue.text(count);
    if(count < 0){
        window.textCheckLength.css({'color' : 'red'});
        window.SubmitButtonResponse.map((i,it)=>{
            it.classList.add('submitResponseButtonDisabled');
            it.classList.remove('submitResponseButton');
        })
    }else{
        window.textCheckLength.css({'color' : '#929292'});
        window.SubmitButtonResponse.map((i,it)=>{
            it.classList.remove('submitResponseButtonDisabled');
            it.classList.add('submitResponseButton');
        })
    }
}

function responseInit() {
    window.eResponses.hide();
    window.btnCloseResponse.hide();
    window.btnOpenResponse.show();

    window.textCheckLength.css({'color' : '#929292'});
    window.SubmitButtonResponse.map((i,it)=>{
        it.classList.remove('submitResponseButtonDisabled');
        it.classList.add('submitResponseButton');
    })
}

function openResponses(element) {
    var findBLock =   $('#' + element.id).data("name");
    if ( $('#' + findBLock).data('show') == 'hiding' || $('#' + findBLock).data('show') == undefined) {
        $('#'+ findBLock ).show();
        $('#'+  findBLock ).data( "show", '');
        $('#'+  findBLock ).data( "show", 'showing');
    } else {
        $( '#'+  findBLock).hide();
        $('#'+  findBLock ).data( "show", '');
        $('#'+  findBLock ).data( "show", 'hiding');
    }
    $(element).parent().find('.responses').show();
    $(element).parent().find(window.btnCloseResponse).show();
    $(element).parent().find(window.btnOpenResponse).hide();
    // window.eResponses.show();
    // window.btnCloseResponse.show();
    // window.btnOpenResponse.hide();
}

function closeResponses(element) {
    $(element).parent().find('.responses').hide();
    $(element).parent().find(window.btnCloseResponse).hide();
    $(element).parent().find(window.btnOpenResponse).show();
    // window.eResponses.hide();
    // window.btnCloseResponse.hide();
    // window.btnOpenResponse.show();
}

function reviewInit(){
    window.eRHeadActive.hide();
    window.eRDetail.hide();
    window.eRClose.hide();
}

function reviewHide(index){
    window.eRHeadActive[index].style.display = "none";
    window.eRDetail[index].style.display = "none";
    window.eRClose[index].style.display = "none";

    window.eRHead[index].style.display = "block";
    window.eROpen[index].style.display = "block";
}

function reviewShow(index){
    // window.eRHeadActive.hide();
    // window.eRHead.show();
    // window.eROpen.show();
    // window.eRDetail.hide();
    // window.eRClose.hide();
    window.eRHeadActive[index].style.display = "block";
    window.eRDetail[index].style.display = "block";
    window.eRClose[index].style.display = "block";

    window.eRHead[index].style.display = "none";
    window.eROpen[index].style.display = "none";
}

function reviewDetailClose(element){
    return reviewHide(element.getAttribute('data-index')-1);
}

function reviewDetailOpen(element){
    window.countValue.text(156);
    window.SubmitButtonResponse.map((i,it)=>{
        it.classList.add('submitResponseButtonDisabled');
        it.classList.remove('submitResponseButton');
    });
    return reviewShow(element.getAttribute('data-index')-1);
}

function backButtonHandler() {
    if(backUrlToPost !== '' && backUrlToPost !== null) {
        window.location.href = backUrlToPost;
        console.log(backUrlToPost)
    } else {
        var auth = new RegExp("auth", 'gi');
        //    if (auth.test(window.location.href))
        //        return;

        // window.history.back()
        const  url = document.getElementById('configURL').innerHTML.trim();
        const  protocol = document.getElementById('configProtocol').innerHTML.trim();
        var getLink = "//"+url+"/last_phone_post/";
        var pathArray = window.location.pathname.split( '/' );
        var getPhone = pathArray[2];
        localStorage.setItem('test' , getLink);
        localStorage.setItem('test2' , pathArray);
        localStorage.setItem('test3' , getPhone);
        window.location.href = getLink + getPhone;

    }
}
