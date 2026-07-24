const search = document.querySelector(".search");
const tools = document.querySelectorAll(".tool");

if (search) {
    search.addEventListener("keyup", function () {
        let value = search.value.toLowerCase();

        tools.forEach(function (tool) {
            let text = tool.innerText.toLowerCase();

            if (text.includes(value)) {
                tool.parentElement.style.display = "";
            } else {
                tool.parentElement.style.display = "none";
            }
        });
    });
}

const darkBtn = document.getElementById("darkBtn");

if (darkBtn) {
    darkBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });
}

console.log("ConvertHub is working!");