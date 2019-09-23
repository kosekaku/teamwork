 //posting article 
 const newPost = () => {
  const post = document.querySelector('.articles__post');
  if(post.style.display=="none") {
    const title = document.querySelector('.article__title');
    const body = document.querySelector('.article__body');
    // reset the form to ensure its empty for new article
    title.value="";
    body.value = "";
    post.style.display="block";
  }else{
    post.style.display="none";
  }
  
};


// edit post
const editPost = () => {
  const post = document.querySelector('.articles__post');
  if(post.style.display=="none"){
    post.style.display="block";
    const btn = document.querySelector('.submit_article');
    //btn.innerHTML.value = "Edit";
  }else{
    post.style.display="block";
    const btn = document.querySelector('.article__submit');
    btn.value = "Update";
    const previousArticle1Title = document.querySelector('.article1>span').innerHTML;
    const previousArticle1Body = document.querySelector('.article1>p').innerHTML;
    const title = document.querySelector('.article__title');
    const body = document.querySelector('.article__body');
    title.value=previousArticle1Title;
    body.value = previousArticle1Body;
  
  } 
  
};