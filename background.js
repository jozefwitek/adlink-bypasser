document.getElementById("bypassButton").addEventListener("click", bypass);

window.onload = function () {
    let queryInfo = {
        active: true,
        currentWindow: true,
    };
    chrome.tabs.query(queryInfo, function (tabs) {
        document.getElementById("url").value = tabs[0].url;
    });
};

async function bypass() {
    const baseLink = "https://bypass.pm/bypass2?url=";
    const bypassLink = document.getElementById("url").value;
    if (!bypassLink)
        return (document.getElementById("result").innerHTML =
            "no url provided");
    await fetch(baseLink + bypassLink)
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                document.getElementById(
                    "result"
                ).innerHTML = `<h3>Result:</h3><h4><a href="${data.destination}" target="_blank">${data.destination}</a></h4>`;
            } else {
                document.getElementById("result").innerHTML = data.msg;
            }
        });
}
