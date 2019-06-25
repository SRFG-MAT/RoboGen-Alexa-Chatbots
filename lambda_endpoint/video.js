
'use strict';

var parameters = [
    {type: 'string', key: 'videoURL', 'default': '', description: 'URL to Video'},
];

//-------------------------------------------------------------------------
// display a video
//-------------------------------------------------------------------------
module.exports = {
    
    // Creates a <video> tag in the HTML DOM
 makeVideo: function(url) {
    let video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.src = url;
    video.muted = false;
    video.autoplay = false;
    video.oncanplay = function(ctx) {
        video.width = video.videoWidth;
        video.height = video.videoHeight;
    };
    return video;
},

// Set up a <video> element and use it as a source for a texture
setup: function (args, ctx) {

    ctx.video = this.makeVideo(args.videoURL);

    var videoMat = new this.sumerian.Material(this.sumerian.ShaderLib.textured);

    var texture = ctx.texture = new this.sumerian.Texture(null, {
        generateMipmaps: false,
        minFilter: 'BilinearNoMipMaps'
    });

    texture.updateCallback = function () {
          return texture.image && !texture.image.paused;
      };

      texture.readyCallback = function() {
          return texture.image && texture.image.readyState === 4;
      };

    texture.setImage(ctx.video);
    videoMat.setTexture('DIFFUSE_MAP', texture);
    ctx.entity.meshRendererComponent.materials[0] = videoMat;
    ctx.material = videoMat;
    ctx.video.play();
},

 cleanup: function(args, ctx) {
    ctx.video = null;
},
}