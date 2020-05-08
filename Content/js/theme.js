

var swiper = new Swiper('.swiper-container.slider-home-page', {
    spaceBetween: 30,
    effect: 'fade',
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


function openServiceModal(elm) {
    var content_id = elm.getAttribute("name");
    openPopupWithElmId(content_id);
}

window.openPopupWithElmId = function (elm_id, large, flex, backdrop) {
    var opts = {
        id: elm_id,
        backdrop: backdrop,
        large: large,
        flex: flex
    };

    var id = ("modal-popup-shared");
    var modal = $('#' + id);
    var content = $('#' + opts.id);
    if (content.length === 0) throw ("target element not found.");
    content = content.clone();
    content.attr("id", opts.id + "_1");
    var sizeClass = "";

    if (opts.flex === undefined) opts.flex = true;
    if (opts.flex) sizeClass = "modal-flex";
    if (opts.backdrop === undefined) opts.backdrop = true;

    if (opts.large && !opts.flex)
        sizeClass = "modal-lg";
    else if (!opts.large && opts.flex)
        sizeClass += " modal-flex-sm";

    if (modal.length === 0) {
        var html = [
            '<div id="' + id + '" class="modal fade" data-backdrop="' + opts.backdrop + '" role="dialog" aria-hidden="true" tabindex="-1" style="border-radius: 0">',
            '<a href="javascript:void(0)" class="modal-closer d-none d-md-block" data-dismiss="modal" title="' + window.Res['Common.Close'] + '">&times;</a>',
            '<div class="modal-dialog{0} modal-dialog-app" role="document">'.format(!!(sizeClass) ? " " + sizeClass : ""),
            '<div class="modal-content">',
            '<div class="modal-body">',
            '<div class="modal-flex-fill-area" >',

            '</div>',
            '</div>',
            '<div class="modal-footer d-md-none">',
            '<button type="button" class="btn btn-secondary btn-sm btn-default" data-dismiss="modal">' + window.Res['Common.Close'] + '</button>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join("");

        modal = $(html).appendTo('body').on('hidden.bs.modal', function (e) {
            // Cleanup
            //$(modal.find('.modal-flex-fill-area')).remove();
            modal.remove();
        });

        modal.find('.modal-flex-fill-area').append(content);

        // Create spinner
        // var spinner = $('<div class="spinner-container w-100 h-100 active" style="position:absolute; top:0; background:#fff; border-radius:4px"></div>').append(createCircularSpinner(64, true, 2));
        // modal.find('.modal-body').append(spinner);

        // modal.find('.modal-body > iframe').on('load', function (e) {
        //     modal.find('.modal-body > .spinner-container').removeClass('active');
        // });
    }

    modal.modal('show');
}