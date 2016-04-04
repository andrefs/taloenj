var sinon   = require('sinon');
var mockery = require('mockery');
var stub, mockIM, sandbox;

describe('ImageMagick',function(){

    beforeEach(function(){
        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false,
            useCleanCache: true
        });
        sandbox = sinon.sandbox.create();
    });


    afterEach(function(){
        sandbox.restore();
        mockery.deregisterAll();
        mockery.disable();
    });

    it('should return correct image dimensions', function(done){
        mockIM = {identify: sandbox.stub()};
        var fs = require('fs');
        fs.exists = sandbox.stub();

        mockery.registerMock('imagemagick', mockIM);
        mockery.registerMock('fs', fs);
        mockIM.identify.callsArgWith(1, null, 'imagePath JPEG 732x733 732x733+0+0 8-bit sRGB 34.9KB 0.000u 0:00.000');
        fs.exists.callsArgWith(1, true);

        var tim = require('../lib/imagemagick'); // Taloenj IM library

        tim.dims('imagePath', function(err, dims){
            assert.deepEqual(dims, {w:732,  h:733});
            done();
        });
    });

    it('should throw an error when the file does not exist', function(done){
        var tim = require('../lib/imagemagick'); // Taloenj IM library

        tim.dims('NotAFile', function(err, dims){
            assert.isNotNull(err);
            done();
        });
    });

    it('should throw an error when the file is not an image', function(done){
        var tim = require('../lib/imagemagick'); // Taloenj IM library

        tim.dims('package.json', function(err, dims){
            assert.isNotNull(err);
            done();
        });
    });
});
