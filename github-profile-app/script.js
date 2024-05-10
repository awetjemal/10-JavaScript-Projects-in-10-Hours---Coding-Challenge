const APIURL = "https://api.github.com/users/";

const mainEl = document.querySelector('main');
const formEl = document.querySelector('form');


async function getUser(user){
  const resp = await fetch(APIURL + user);
  const respData =await resp.json();

  console.log(respData);
  createUserCard(respData);
}
getUser('florinpop17');

function createUserCard(userData){
  mainEl.innerHTML = '';
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
  <div>
  <img class="avatar" src="${userData.avatar_url}" alt="${userData.name}">
  </div>
  <div class="user-info">
    <h2>${userData.name}</h2>
    <p>${userData.bio}</p>
    <ul>
        <li>${userData.followers}
        <strong>Followers</strong>
        </li>
        <li>${userData.following}
        <strong>Following</strong>
        </li></li>
        <li>${userData.public_repos}
        <strong>Repos</strong>
        </li></li>
    </ul>
    <h4>Repos:</h4>
    <div id="repos"><div/>
  </div>
  `;
  mainEl.appendChild(card);
}
async function getUserRepos(user){
  const resp = await fetch(APIURL + user + '/repos');
  const respData =await resp.json();
  console.log(respData);
  addReposToCard(respData);
}
getUserRepos('florinpop17');

function addReposToCard(repos){
  const reposEl = document.getElementById('repos');
  repos.sort((a, b) => 
    b.stargazers_count - a.stargazers_count
  ).slice(0, 10).forEach(repo => {
    const repoEl = document.createElement('li');
    repoEl.classList.add('repo');
    repoEl.href = repo.html_url;
    repoEl.innerText = repo.name;
    repoEl.target = '_blank';


    reposEl.appendChild(repoEl);
  });
}

formEl.addEventListener('submit', (e) =>{
  e.preventDefault();
  const searchTerm = document.getElementById('search').value;
  if(searchTerm){
    getUser(searchTerm);
    getUserRepos(searchTerm);

    document.getElementById('search').value = '';
  }
});