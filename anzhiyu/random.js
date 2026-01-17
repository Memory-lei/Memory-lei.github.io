var posts=["2025/01/17/csgo-gaming-tips/","2025/01/17/frontend-learning-notes/","2025/12/23/hello-world/","2025/01/17/my-first-blog/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };