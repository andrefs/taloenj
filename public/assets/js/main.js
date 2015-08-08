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
    $('a.choose-img').click(function(ev){
        $('input#img-upload').click();
        ev.preventDefault();
    });
    $('a.img-upload').click(function(ev){
        $.ajax({
              url: '/api/print',
              type: 'POST',
              data: new FormData($('form.img-upload')[0]),
              processData: false,
              contentType: false
        });
        ev.preventDefault();
     });

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

    $('input#z1').val(z1);
    $('input#z2').val(z2);
    //console.log('convert -level '+(z1*100)+'%,'+(z2*100)+'% -colorspace gray SRC DST');

    var img = $('img.preview');
    var filter = 'grayscale(100%) brightness('+brightness+') contrast('+contrast+')'
    //var filter = 'brightness('+brightness+') contrast('+contrast+')'
    img.css('-webkit-filter', filter);
    img.css('filter', filter);
};

taloenj.imgUpload.preview = function(ev, file, previewID, index, jqXHR){
    var imgURL    = window.URL.createObjectURL(file);
    var container = $('div.img-preview');

    var img = container.find(' img.preview');
    img.attr('src', imgURL).load(function(){
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
        container.show();
    });
};


/*********
 * Start *
 *********/

(function() {
    $(document).ready(function(){
        if($('input#img-upload')){ taloenj.imgUpload.init(); }
    });
})();


