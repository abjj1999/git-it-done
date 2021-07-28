//referring to the container
var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        //request was successful
        if(response.ok){
            response.json().then(function(data) {
                displayIssues(data);
            });
        }
        else{
            alert("there was a problem");
        }
    });
}

//creating the DOM element for the issues
var displayIssues = function(issues){
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (var i = 0; i < issues.length; ++i){
        //create a link element to take the user to the issue on github

        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create span to hold issue title 
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a type element 
        var typeEl = document.createElement("span");

        //check if its a pull or an issue
        if(issues[i].pull_request){
            typeEl.textContent = "(Pull request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }

        //apend to container 
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    }
};



getRepoIssues("facebook/.github");