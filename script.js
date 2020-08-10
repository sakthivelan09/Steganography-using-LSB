var dd1=document.getElementById("d1");
var dd2=document.getElementById("d2");
var dd3=document.getElementById("d3");
var dd4=document.getElementById("d4");
var coverimg;
var hidimg;
var steg;
var extraction;
var temp;
function upload(){
  var coverinput=document.getElementById("cinput");
  coverimg=new SimpleImage(coverinput);
  coverimg.drawTo(dd1);
}
function upload1(){
  var hidinput=document.getElementById("hinput");
  hidimg=new SimpleImage(hidinput);
  hidimg.drawTo(dd2);
}
function stego(){
  var cropwidth=coverimg.getWidth();
  var cropheight=coverimg.getHeight();
 if(cropwidth>hidimg.getWidth()){
   cropwidth=hidimg.getWidth();
 }
  if(cropheight>hidimg.getHeight()){
    cropheight=hidimg.getHeight();
  }
  coverimg=crop(coverimg,cropwidth,cropheight);
  hidimg=crop(hidimg,cropwidth,cropheight);
  coverimg=chop2hide(coverimg);
  hidimg=shift(hidimg);
  steg=combine(coverimg,hidimg);
  temp=steg;
  steg.drawTo(dd3);
}
function crop(img,w,h){
    var n=new SimpleImage(w,h);
    for(var pix of img.values()){
        var x=pix.getX();
        var y=pix.getY();
        if(x<w && y<h){
            var np=n.getPixel(x,y);
            np.setRed(pix.getRed());
            np.setBlue(pix.getBlue());
            np.setGreen(pix.getGreen());
        }
    }
    return n;
}
function chop2hide(img){
    for(var pix of img.values()){
        pix.setRed(clearbits(pix.getRed()));
         pix.setBlue(clearbits(pix.getBlue()));
          pix.setGreen(clearbits(pix.getGreen()));
    }
    return img;
}
function clearbits(pixel){
    var x=Math.floor(pixel/16)*16;
    return x;
}
function shift(hide1){
    for(var pix of hide1.values()){
        pix.setRed(clearbits1(pix.getRed()));
         pix.setBlue(clearbits1(pix.getBlue()));
          pix.setGreen(clearbits1(pix.getGreen()));
    }
    return hide1;
}
function clearbits1(pixel){
    var x=Math.floor(pixel/16);
    return x;
}
function combine(img,hide1){
    var combined=new SimpleImage(img.getWidth(),img.getHeight());
    for(var pix of img.values()){
        var hidepix=hide1.getPixel(pix.getX(),pix.getY());
        var combpix=combined.getPixel(pix.getX(),pix.getY());
        combpix.setRed(pix.getRed()+hidepix.getRed());
        combpix.setBlue(pix.getBlue()+hidepix.getBlue());
        combpix.setGreen(pix.getGreen()+hidepix.getGreen());
    }
    return combined;
}
function ext(){
  var extraction=extract(temp);
  extraction.drawTo(dd4);
}
function extract(img){
    for(var pix of img.values()){
        pix.setRed(change(pix.getRed()));
        pix.setBlue(change(pix.getBlue()));
        pix.setGreen(change(pix.getGreen()));
    }
    return img;
}
function change(n){
    var x=(n-Math.floor(n/16)*16)*16;
    return x;
}