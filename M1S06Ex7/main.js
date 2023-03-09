const posts = ()=> fetch(`https://jsonplaceholder.typicode.com/posts?_page=1&_limit=20`).then(ress=>ress.json());

function listarPost(listaPosts){
    console.log(listaPosts);
    // listaPosts.forEach(post => {
    //     document.getElementById("posts").innerHTML += 
    //     `<div>
    //         <p>Titulo ${post.title}</p>
    //         <p>Titulo ${post.id}</p>
    //     </div>`
    // });
    document.getElementById("posts").innerHTML = listaPosts.map(post =>
    `
    <div id="${post.id}" class="divPosts">
        <h1>${post.title}</h1>
        <p>${post.body}</p>
    </div>
    `).join("");
}
async function buscarPosts(){
    let novosPosts = await posts();
    listarPost(novosPosts)
}
buscarPosts();