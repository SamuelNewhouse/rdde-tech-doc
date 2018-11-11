document.addEventListener("DOMContentLoaded", function () {
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
    window.addEventListener("resize", checkSize);

    checkSize();
});