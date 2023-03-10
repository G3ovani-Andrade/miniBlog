let numPaginas = 1;
let numItens = 20;
const posts = ()=> fetch(`https://jsonplaceholder.typicode.com/posts?_page=${numPaginas}&_limit=${numItens}`).then(ress=>ress.json());
let correntPost = {};
const comentariosPorId =(postId)=> fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then(ress=>ress.json());

function CriarListaPosts(listaPosts,htmlId){
    console.log("passei");
    listaPosts.map(post => {
        const divPost = document.createElement('div');
        const titulo = document.createElement('h1');
        const mensagem = document.createElement('p');
        const containerPosts = document.getElementById(htmlId);


        divPost.classList.add("divPosts");
        console.log(post.id);
        mensagem.innerHTML = post.body;
        //divPost.onclick = carregarComentarios(post.id);
        titulo.innerHTML =  post.title;
        
        // divPost.onclick = ()=>{
        //     alert('Hi there');
        // };
 
        
        titulo.addEventListener('click',oi);

        divPost.appendChild(titulo);
        divPost.appendChild(mensagem);
        containerPosts.appendChild(divPost); 
      
    });
    
    // document.getElementById(`${htmlId}`).innerHTML = listaPosts.map((post) =>
    // `
    // <div onclick="carregarComentarios(${post})" class="divPosts" >
    //     <h1>${post.title}</h1
    //     <p>${post.body}</p>
    // </div>
    // `).join("");
    document.getElementById("posts").innerHTML += `<div class="divBtn"><button onclick="carregarMais()" id="btnCarregarMais">Carregar Mais</button></div>`;
}
function oi() {
    console.log("oi");
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

async function buscarPost(idPost){
    let comentarios = await comentariosPorId(idPost);
    return comentarios
}

async function carregarComentarios(id){
    let comentarioPorPost = await buscarPost(id)
    // correntPost.title = post.title;
    // correntPost.body = post.body;
    // correntPost.id = post.id;
    console.log(id);
}