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