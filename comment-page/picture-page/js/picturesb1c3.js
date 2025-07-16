
var imagePaginator = function (phone, more) {
    var currPage = 1;
    var more = more;
    var phone = phone;

    var source   = $("#image-entry-template").html();
    var compiled = dust.compile(source, "entry-template");
    dust.loadSource(compiled);

    /* this.renderImages = function(e, imageList) {
        for (var n in imageList) {
            var data = {
                image_name: imageList[n].name,
                idomain: imageList[n].staticDomain,
                full_path: imageList[n].fullPath
            };
            dust.render("entry-template", data, function(err, out) {
                e.append(out);
            });
        }
    }; */

    this.generateGallery = function (jqSelector) {
        return {
            selector: jqSelector,
            height: jqSelector.height()
        };
    };

    this.renderImages = function (imageList) {
        var gallery = [
            this.generateGallery($("#galleryImagesOne")),
            this.generateGallery($("#galleryImagesTwo")),
            this.generateGallery($("#galleryImagesThree"))
        ];

        gallery.sort(function (a, b) {
            return a.height - b.height;
        });

        imageList.forEach(function (image) {
            var data = {
                image_name: image.name,
                idomain: image.staticDomain,
                full_path: image.fullPath
            };

            dust.render("entry-template", data, function(err, out) {
                gallery.sort(function (a, b) {
                    return a.height - b.height;
                });

                gallery[0].selector.append(out);
                gallery[0].height += image.height;
            });
        });
    }

    this.checkMore = function () {
        if (more == true){
            $("#moreImagesButton").show();
            more = 1;
        }
        else{
            $("#moreImagesButton").hide();
            more = 0;
        }
    };

    this.loadImages = function () {
        if (more == 0)
            return;

        var url = '/image_list_json/' + phone + '/' + (currPage + 1);

        var self = this;
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                if (data.res == 0) {
                    console.log(data.error);
                    return;
                }

                /* self.renderImages($("#galleryImagesOne"), data.ilist[0]);
                self.renderImages($("#galleryImagesTwo"), data.ilist[1]);
                self.renderImages($("#galleryImagesThree"), data.ilist[2]); */
                var imageList = data.ilist[0].concat(data.ilist[1]).concat(data.ilist[2]);
                self.renderImages(imageList);

                currPage = data.currPage;
                if (data.more == true){
                    $("#moreImagesButton").show();
                    more = 1;
                }
                else{
                    $("#moreImagesButton").hide();
                    more = 0;
                }
            }
        });
    };
}

var videoPaginator = function (phone, more) {
    var currPage = 1;
    var more = more;
    var phone = phone;

    var source   = $("#video-entry-template").html();
    var compiled = dust.compile(source, "video-entry-template");
    dust.loadSource(compiled);

    this.renderVideo = function(e, videoList) {
        for (var n in videoList) {
            var data = {
                video_name: videoList[n].video_name,
                video_path: videoList[n].video_path,
                cover_name: videoList[n].cover_name,
                cover_path: videoList[n].cover_path,
                video_domain: videoList[n].video_domain,
                cover_domain: videoList[n].cover_domain};

            console.log(data);
            dust.render("video-entry-template", data, function(err, out) {
                e.append(out);
            });
        }
    };

    this.checkMore = function () {
        if (more == true){
            $("#moreVideoButton").show();
            more = 1;
        }
        else{
            $("#moreVideoButton").hide();
            more = 0;
        }
    };

    this.loadVideo = function () {
        if (more == 0)
            return;

        var url = '/video_list_json/' + phone+'/' + (currPage + 1);

        var self = this;
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                if (data.res == 0) {
                    console.log(data.error);
                    return;
                }

                self.renderVideo($("#galleryVideoOne"), data.ilist[0]);
                self.renderVideo($("#galleryVideoTwo"), data.ilist[1]);
                self.renderVideo($("#galleryVideoThree"), data.ilist[2]);

                currPage = data.currPage;
                if (data.more == true){
                    $("#moreVideoButton").show();
                    more = 1;
                }
                else{
                    $("#moreVideoButton").hide();
                    more = 0;
                }
            }
        });
    };
}
