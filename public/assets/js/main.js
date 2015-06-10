/*******************
 *                 *
 *    TALOENJ      *
 *                 *
 *******************/
var taloenj = window.taloenj;
if(!taloenj){ taloenj = window.taloenj = {}; }

/****************
 * Image upload *
 ****************/
taloenj.imgUpload = {};

// Init
taloenj.imgUpload.init = function(){
    //$('.choose-img').click(function(){ $('input#img-upload').click(); });
    $('.choose-img').click(function(){ console.log(arguments); $('input#img-upload').click();});

    // $("#img-upload").fileinput({
    //     allowedFileTypes: ["image"],
    //     maxFileCount: 1,
    //     previewFileType: "image",
    //     //browseClass: "btn btn-success",
    //     //browseLabel: "Pick Image",
    //     browseIcon: '<i class="glyphicon glyphicon-picture"></i>',
    //     // removeClass: "btn btn-danger",
    //     // removeLabel: "Delete",
    //     // removeIcon: '<i class="glyphicon glyphicon-trash"></i>',
    //     showRemove: false,
    //     showCaption: false,
    //     showPreview: false,
    //     uploadClass: "btn btn-info",
    //     uploadLabel: "Upload",
    //     uploadIcon: '<i class="glyphicon glyphicon-upload"></i>',
    // });

    // Event functions
    $('#img-upload').change(function (ev) {
        // Get a reference to the taken picture or chosen file
        var files = ev.target.files,
            file;
        if (files && files.length > 0) {
            file = files[0];
        }
        if(file){ taloenj.imgUpload.preview(ev, file); }
    });

    $('input.brightness.vertical').change(function(ev){
        var val = $(this).val();
        taloenj.imgUpload.sbInH.slider('setValue',+val,false,false);
        taloenj.imgUpload.setFilters(ev);
    });
    $('input.contrast.vertical').change(function(ev){
        var val = $(this).val();
        taloenj.imgUpload.scInH.slider('setValue',+val,false,false);
        taloenj.imgUpload.setFilters(ev);
    });
    $('input.brightness.horizontal').change(function(ev){
        var val = $(this).val();
        taloenj.imgUpload.sbInV.slider('setValue',+val,false,false);
        taloenj.imgUpload.setFilters(ev);
    });
    $('input.contrast.horizontal').change(function(ev){
        var val = $(this).val();
        taloenj.imgUpload.scInV.slider('setValue',+val,false,false);
        taloenj.imgUpload.setFilters(ev);
    });
    //$('input.brightness, input.contrast').change(taloenj.imgUpload.setFilters);
    //$('input.brightness, input.contrast').change(taloenj.imgUpload.setFilters);
    //$('input.brightness, input.contrast').change(taloenj.imgUpload.setFilters);
    //$('input.brightness, input.contrast').change(taloenj.imgUpload.setFilters);
};

taloenj.imgUpload.setFilters = function(){
    console.log(this);
    var el = $(this);
    var orientation = el.hasClass('vertical') ? 'vertical' : 'horizontal';

    var brightness = $('input.brightness.'+orientation).val();
    var contrast   = $('input.contrast.'+orientation).val();

    var b = +brightness+0.2;
    var c = +contrast-0.2;

    var z1 = ((+c-1)/(2*+b*+c));
    var z2 = ((+c+1)/(2*+b*+c));
    console.log('convert -level '+(z1*100)+'%,'+(z2*100)+'% -colorspace gray  ~/Downloads/misc/14700_447267968762439_4718233407936251983_n.jpg test.jpg');


    var img = $('img.preview');
    var filter = 'grayscale(100%) brightness('+brightness+') contrast('+contrast+')'
    //var filter = 'brightness('+brightness+') contrast('+contrast+')'
    console.log(filter);
    img.css('-webkit-filter', filter);
    img.css('filter', filter);
};

taloenj.imgUpload.preview = function(ev, file, previewID, index, jqXHR){
    var imgURL    = window.URL.createObjectURL(file);
    var container = $('div.img-preview');
    container.show();

    var img = container.find(' img.preview');
    img.attr('src', imgURL);

    var sliders = container.find('div.sliders');

    var bInV = container.find('input.brightness.vertical');
    var cInV = container.find('input.contrast.vertical');
    var bInH = container.find('input.brightness.horizontal');
    var cInH = container.find('input.contrast.horizontal');
    taloenj.imgUpload.sbInV = bInV.slider({
        tooltip: 'always',
        reversed: true
    });
    taloenj.imgUpload.scInV = cInV.slider({
        tooltip: 'always',
        reversed: true
    });
    taloenj.imgUpload.sbInH = bInH.slider({
        tooltip: 'always',
    });
    taloenj.imgUpload.scInH = cInH.slider({
        tooltip: 'always',
    });
};

// taloenj.imgUpload.preview = function(ev, file, previewID, index, jqXHR){
//     var parent = $('div#img-previews');
//     var imgURL    = window.URL.createObjectURL(file);
//     var container = $('<div class="img-preview row"></div>').appendTo(parent);
//     var img = $('<img class="preview img-responsive col-xs-12 col-sm-8" src="'+imgURL+'"></div>').appendTo(container);
// 
//     var sliders    = $('<div class="sliders col-xs-12 col-sm-4 container-fluid"></div>').appendTo(container);
//     var brightness = $('<div class="row brightness"><span class="symbol col-md-1 text-center"><i class="fa fa-3x fa-sun-o"></i><span></div>').appendTo(sliders);
//     var contrast   = $('<div class="row contrast"><span class="symbol col-md-1 text-center"><i class="fa fa-3x fa-rotate-180 fa-adjust"></i></span></div>').appendTo(sliders);
//     var bIn        = $('<input id="brightness" data-slider-id="bSlider" type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="14"/>').appendTo(brightness);
//     var cIn = $('<input id="contrast" data-slider-id="cSlider" type="text" data-slider-min="0" data-slider-max="20" data-slider-step="1" data-slider-value="14"/>').appendTo(contrast);
//     bIn.slider({ tooltip: 'always' });
//     $('#bSlider').addClass('col-md-6');
//     cIn.slider({ tooltip: 'always' });
// };

taloenj.imgUpload._previewAddContrastSliders = function(slidersContainer){
};


/*********
 * Start *
 *********/

(function() {
    $(document).ready(function(){
        if($('input#img-upload')){ taloenj.imgUpload.init(); }
    });
})();


