let userName = document.querySelector("input");
let repoButton = document.querySelector("button");
let data = document.querySelector(".show-data");
repoButton.addEventListener("click" , ()=>{
    if(userName.value == ""){
        data.innerHTML = "<span>Please Write Github Username.</span>";
    }
    else{
        getRepo();
    }
});
function getRepo(){
    fetch(`https://api.github.com/users/${userName.value}/repos`)
    .then((repos) => repos.json())
    .then((repos) => {
        data.innerHTML = '';
        repos.forEach(repo => {
            let div = document.createElement("div");
            let text = document.createTextNode(repo.name);
            let content = document.createElement("div");
            content.className = "content";
            let stars = document.createElement("span");
            let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
            let visit = document.createElement("a");
            let theUrlText = document.createTextNode("Visit");
            visit.appendChild(theUrlText);
            visit.href = `https://github.com/${userName.value}/${repo.name}`;
            visit.setAttribute('target', '_blank');
            stars.appendChild(starsText);
            content.appendChild(stars);
            content.appendChild(visit)
            div.className = "repo-box";
            div.appendChild(text);
            div.appendChild(content);
            data.appendChild(div);
        });
    })
}
