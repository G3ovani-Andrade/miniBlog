let numPaginas = 1;
let numItens = 20;
const posts = ()=> fetch(`https://jsonplaceholder.typicode.com/posts?_page=${numPaginas}&_limit=${numItens}`).then(ress=>ress.json());
let correntPost = {};
const comentariosPorId =(postId)=> fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then(ress=>ress.json());

function CriarListaPosts(listaPosts,htmlId){
    const containerPosts = document.getElementById(htmlId);
    containerPosts.innerHTML = "";
    listaPosts.map(post => {
        console.log(post.id);
        const divPost = document.createElement('div');
        const titulo = document.createElement('h1');
        const mensagem = document.createElement('p');
    
        divPost.classList.add("divPosts");
        mensagem.innerHTML = post.body;
        titulo.innerHTML =  `${post.title}`;
       
        divPost.onclick = ()=>{
             carregarComentarios(post.id,post.body,post.title)
        };
 
        divPost.appendChild(titulo);
        divPost.appendChild(mensagem);
        containerPosts.appendChild(divPost); 
    });
    checarLimit(listaPosts);
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
    if(listaPost.length == numItens){
      document.getElementById("btnCarregarMais").style.display = "block";
        console.log("Array POSTS: " + listaPost.length,"Número de Posts"+ numItens);
    }else{
       document.getElementById("btnCarregarMais").style.display = "none";
    }
}
getAllPosts();

async function buscarPost(idPost){
    let comentarios = await comentariosPorId(idPost);
    console.log(comentarios);
    return comentarios;
}

async function carregarComentarios(id,body,title){
    let comentarioPorPost = await buscarPost(id);

    correntPost.title = title.replace(/\n/g,'');
    correntPost.body = body.replace(/\n/g,'');
    correntPost.id = id;
    let tituloModal = document.getElementById("tituloModal");
    tituloModal.innerHTML = correntPost.title;
    let bodyModal = document.getElementById("bodyModal");
    bodyModal.innerHTML = correntPost.body;
    document.getElementById('modal').style.display = "block";
    let modal = document.getElementById("listaComentarios");
    modal.innerHTML ="";
    comentarioPorPost.map((comentario)=>{
        let div = document.createElement("div");
        let nome = document.createElement("p")
        let email = document.createElement("p")
        let mensagem = document.createElement("p")

        div.classList = "div";
        div.classList = "comentario"
        nome.innerHTML = `<b>Nome: </b>${comentario.name.replace(/\n/g,'')}`;
        email.innerHTML = `<b>Email: </b>${comentario.email.replace(/\n/g,'')}`;
        mensagem.innerText = comentario.body.replace(/\n/g,'');

        div.appendChild(nome);
        div.appendChild(mensagem);
        div.appendChild(email);
        modal.appendChild(div);
    });
}



const fechar = ()=>{
    document.getElementById('modal').style.display = "none";
}