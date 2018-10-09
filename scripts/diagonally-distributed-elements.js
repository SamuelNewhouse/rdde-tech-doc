/**
 * Diagonally Distributed Elements
 *  
 * Responsively aligns centers of elements on a corner-to-corner diagonal across a parent element. 
 * 
 *  Example... 
 * 
 *  <div class="dde-box">    =   ------------- 
 *    <span>Hello</span>     =   | Hello     | 
 *    <span>world.</span>    =   |  world.   | 
 *    <span>How</span>       =   |    How    | 
 *    <span>are</span>       =   |     are   | 
 *    <span>you?</span>      =   |      you? | 
 *  </div>                   =   ------------- 
 * 
 * Uses and requires javascript-detect-element-resize.js to be responsive
 * https://github.com/sdecima/javascript-detect-element-resize 
 * 
 *  Options (set as class on the parent element)
 * --------------------------------------------------------------------------------------
 *  dde-box (required):        sets up an element as the container for text
 *  dde-down (default):        run text on a downhill diagonal 
 *  dde-up:                    run text on an uphill diagonal
 * 
 * https://www.github.com/
 * Samuel Newhouse
 * 
 * version 0.1
**/

document.addEventListener("DOMContentLoaded", function () {
    if (typeof window.addResizeListener !== "function" || typeof window.removeResizeListener !== "function") {
        console.log("ERROR: javascript-detect-element-resize.js is required for rdmledt.js");
        console.log("See: https://github.com/sdecima/javascript-detect-element-resize");
        return;
    }

    var boxes = document.getElementsByClassName("ddt-box");

    if (!boxes)
        return;

    function boxResize(box) {        
        var parts = box.children;
        // Last child will be a div added from javascript-detect-element-resize.js.
        // It must be ignored for this to work properly.
        var numParts = parts.length - 1; // <--------------------------------------            

        var halfSizes = [];
        for (let i = 0; i < numParts; i++)
            halfSizes[i] = parts[i].clientWidth / 2;

        var fullWidth = box.clientWidth;
        var leftMidpoint = halfSizes[0];
        var rightMidpoint = fullWidth - halfSizes[numParts - 1];

        var innerWidth = rightMidpoint - leftMidpoint;
        var splitWidth = innerWidth / (numParts - 1);

        var leftOffset = leftMidpoint;
        var rightOffset = fullWidth - rightMidpoint;

        var halfPartsIndex = Math.floor(numParts / 2);
        for (let i = 1; i < halfPartsIndex; i++) {
            let iMirror = numParts - i - 1;
            let marginLeft = splitWidth * i + leftOffset - halfSizes[i];            
            let marginRight = splitWidth * i + rightOffset - halfSizes[iMirror];
            marginLeft = Math.max(0, marginLeft);
            marginRight= Math.max(0, marginRight);
            parts[i].style.marginLeft = marginLeft + "px";
            parts[iMirror].style.marginRight = marginRight + "px";
        }
        if (numParts % 2 !== 0)
            parts[halfPartsIndex].style.marginLeft = leftOffset + splitWidth * halfPartsIndex - halfSizes[halfPartsIndex] + "px";
    }

    for (let i = 0; i < boxes.length; i++) {
        let curBox = boxes[i];

        window.addResizeListener(curBox, function boxResizeCallBack() {
            boxResize(curBox);
        });

        // flex is used for its align-items property.
        curBox.style.display = "flex";
        curBox.style.flexDirection = "column";
        curBox.style.alignItems = "flex-start";
        curBox.style.textAlign = "center";

        var parts = curBox.children;

        var halfPartsIndex = Math.floor(parts.length / 2);

        for (let j = 0; j < parts.length; j++) {
            // Need width of container shrunk to content. <--
            parts[j].style.display = "inline-block"; // <----
            if (j >= halfPartsIndex)
                parts[j].style.alignSelf = "flex-end";
        }
    }
});