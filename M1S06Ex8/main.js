let numPaginas = 1;
let numItens = 20;
const posts = ()=> fetch(`https://jsonplaceholder.typicode.com/posts?_page=${numPaginas}&_limit=${numItens}`).then(ress=>ress.json());


function CriarListaPosts(listaPosts,htmlId){
    console.log(listaPosts);
    // listaPosts.forEach(post => {
    //     document.getElementById("posts").innerHTML += 
    //     `<div>
    //         <p>Titulo ${post.title}</p>
    //         <p>Titulo ${post.id}</p>
    //     </div>`
    // });
    document.getElementById(`${htmlId}`).innerHTML = listaPosts.map((post) =>
    `
    <div id="${post.id}" class="divPosts">
        <h1>${post.title}</h1>
        <p>${post.body}</p>
    </div>
    `).join("");
    document.getElementById("posts").innerHTML += `<div class="divBtn"><button onclick="carregarMais()" id="btnCarregarMais">Carregar Mais</button></div>`;
}

async function getAllPosts(){
    let novosPosts = await posts();
    CriarListaPosts(novosPosts,"posts");
    checarLimit(novosPosts);
}

const carregarMais = async() =>{
    numItens+=20;
    let novosPosts = await posts();
    CriarListaPosts(novosPosts,"posts");
    checarLimit(novosPosts);
    
}

function checarLimit(listaPost){
    if(listaPost.length >= numItens){
       document.getElementById("btnCarregarMais").style.display = "block";
        console.log("Array POSTS: " + listaPost.length,"Número de Posts"+ numItens);
    }else{
       document.getElementById("btnCarregarMais").style.display = "none";
    }
}
getAllPosts();