const API_ENDPOINT = "https://api.neverhaveiever.io/v1/statement";

const PLACEHOLDER = document.querySelector("#js-ph-placeholder");
const STATEMENT = document.querySelector("#js-ph-statement");

function refreshStatement() {
    axios
        .get(API_ENDPOINT, { crossdomain: true })
        .then(function (response) {
            if ("statement" in response.data) {
                STATEMENT.innerHTML = response.data.statement;
            } else {
                STATEMENT.innerHTML = "Retarded API response."
            }
        })
        .catch(function (error) {
            console.log(error);
            STATEMENT.innerHTML = "Seems like the API is dead."
        })
        .finally(function () {
            PLACEHOLDER.classList.add("ph-placeholder--small");
            STATEMENT.classList.remove("ph-statement--animated");
        });
}

document.addEventListener("click", refreshStatement);
document.addEventListener("keydown", refreshStatement);

refreshStatement();
