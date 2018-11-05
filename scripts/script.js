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
});