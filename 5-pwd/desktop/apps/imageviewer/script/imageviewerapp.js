"use strict";

function ImageViewer(element) {
    
    /* root element */
    this.root = element;
    
    this.createApp();
}

ImageViewer.prototype.createApp = function() {
    var xhr, JSONData, appBody, i, imgHolder, thumbnail, hiThumbHeight = 0, hiThumbWidth = 0;
    var that = this;
    xhr = new XMLHttpRequest();
    xhr.abort();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                /* JSONData */
                JSONData = JSON.parse(xhr.responseText); 
                
                /* App Body */
                appBody = document.createElement("div");
                appBody.className = "imageViewerApp";
                that.root.appendChild(appBody);
                
                /* Highest ThumbHeight and ThumbWidth */
                for(i = 0; i < JSONData.length; i += 1) {
                    if(JSONData[i].thumbHeight > hiThumbHeight) {
                        hiThumbHeight = JSONData[i].thumbHeight;
                    }
                    if(JSONData[i].thumbWidth > hiThumbWidth) {
                        hiThumbWidth = JSONData[i].thumbWidth;
                    }
                }
                
                /* Images */
                for(i = 0; i < JSONData.length; i += 1) {
                    imgHolder = document.createElement("a");
                    imgHolder.style.width = hiThumbWidth + "px";
                    imgHolder.style.height = hiThumbHeight + "px";
                    appBody.appendChild(imgHolder);
                    
                    thumbnail = document.createElement("img");
                    thumbnail.alt = "Thumbnail till en större bild";
                    thumbnail.title = "Klicka för att se en större bild";
                    thumbnail.src = JSONData[i].thumbURL;
                    imgHolder.appendChild(thumbnail);
                }
            } else {
                console.log("Läsfel. Status: " + xhr.status);
            }
        }
    };
    xhr.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
    xhr.send(null);
};