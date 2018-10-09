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
 *  dde-left-block (default):  line up on left margin in extreme cases
 *  dde-right-block:           line up on right margin in extreme cases
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
        var numParts = parts.length - 1; // <-----------

        var leftMidpoint = parts[0].clientWidth / 2;
        var rightMidpoint = box.clientWidth - parts[numParts - 1].clientWidth / 2;

        var innerWidth = rightMidpoint - leftMidpoint;
        var splitWidth = innerWidth / (numParts - 1);

        for (let i = 1; i < numParts; i++) {
            let marginLeft = splitWidth * i + leftMidpoint - parts[i].clientWidth / 2;

            if (marginLeft < 0)
                marginLeft = 0;
            if (marginLeft > box.clientWidth - parts[i].clientWidth)
                marginLeft = box.clientWidth - parts[i].clientWidth;

            parts[i].style.marginLeft = marginLeft + "px";
        }
    }

    for (let i = 0; i < boxes.length; i++) {
        let curBox = boxes[i];

        window.addResizeListener(curBox, function boxResizeCallBack() {
            boxResize(curBox);
        });

        if()
        
        curBox.style.display = "flex";
        curBox.style.flexDirection = "column";
        curBox.style.alignItems = "flex-start";
        // If text wraps, this keeps it looking good
        curBox.style.textAlign = "center"; // <-----

        var parts = curBox.children;

        for (let j = 0; j < parts.length; j++)
            // Need width of container shrunk to content...
            parts[j].style.display = "inline-block"; // <--

    }
});