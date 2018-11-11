document.addEventListener("DOMContentLoaded", function () {
    "use strict";
    var sizeToggles = document.getElementsByClassName("size-toggle");

    for (let i = 0; i < sizeToggles.length; i++) {
        let curSizeToggle = sizeToggles[i];
        let curClassList = curSizeToggle.classList;

        curSizeToggle.style.cursor = "pointer";
        curClassList.add("size-toggle-expand");

        curSizeToggle.addEventListener("click", function (event) {
            if (curClassList.contains("size-toggle-expand")) {
                curClassList.remove("size-toggle-expand");
                curClassList.add("size-toggle-shrink");
            }
            else {
                curClassList.remove("size-toggle-shrink");
                curClassList.add("size-toggle-expand");
            }
        });
    }

    function closeNavbar() {
        document.getElementById("navbar").classList.add("closed");
        document.getElementById("close-navbar").classList.add("closed");
    }

    function openNavbar() {
        document.getElementById("navbar").classList.remove("closed");
        document.getElementById("close-navbar").classList.remove("closed");
    }

    var lastNavFocus = null;
    function checkNavFocus() {
        var element = document.elementFromPoint(400, 30);

        var curNavFocus = null;
        // Move up through document tree until a section is found.
        for (; element && element !== document; element = element.parentNode)
            if (element.matches("section"))
                curNavFocus = element.id;

        if (curNavFocus && curNavFocus != lastNavFocus) {
            if (lastNavFocus) {
                let last = document.querySelector('.nav-link[href="#' + lastNavFocus + '"]');
                last.classList.remove("navbar-focus");
            }

            let cur = document.querySelector('.nav-link[href="#' + curNavFocus + '"]');
            cur.classList.add("navbar-focus");
            lastNavFocus = curNavFocus;
        }
    }

    var lastWinWidth = 99999;
    function checkSize() {
        let curSize = parseFloat(window.innerWidth);

        if (curSize < lastWinWidth && curSize <= 1000)
            closeNavbar();
        else if (curSize > lastWinWidth && curSize >= 1000)
            openNavbar();

        lastWinWidth = curSize;
    }

    document.getElementById("close-navbar").addEventListener("click", closeNavbar);
    document.getElementById("open-navbar").addEventListener("click", openNavbar);
    window.addEventListener("scroll", checkNavFocus);
    window.addEventListener("resize", checkSize);

    checkSize();
    checkNavFocus();
});