// written by Kostas Maistrelis
const createUUID = function(){
  /*χρησημοποιει την randomUUID() που ειναι μια μεθοδος της διεπαφης crypto 
  και μας επηστερφη ενα τυχαιο string 36 χαρακτηρων για μοναδικο αναγνωριστηκο UUID*/
  return self.crypto.randomUUID();
}
// written by Kostas Maistrelis
const LoaderAnim = function(message) {
  console.log("#########new LoaderAnim");
  let loading = document.getElementById('loading');
  let loading_message = document.createElement('span');
  loading_message.setAttribute("id", "loading_msg");
  loading.append(loading_message);
  let dots = document.createElement('span');
  dots.setAttribute("id", "dots");
  loading.append(dots);

  loading_message.innerText = message;

  this.start=function(){
    console.log('loaderAnim Start');
    loading.style.display = 'block';
    dots.innerText = '';
    let dots_count = 0;
    this.t  = window.setInterval(()=>{
      
      dots_count++;
      if (dots_count > 3){
        dots.innerText ='.';
        dots_count = 0;
      } else {
        dots.innerText += '.';
      }
    },500);

  };
  this.stop=function(){
    console.log('loaderAnim Stop');
    clearInterval(this.t);
    loading.style.display = 'none';
    dots.innerText = '';
    loading_message.innerText = '';

  };
};

// written by Kostas Maistrelis
const getData = async () => {
  let url = 'data.php';
  let loaderAnim = new LoaderAnim('loading');
  loaderAnim.start();
  let response =  await fetch(url,{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    
  }).finally(()=>{
    console.log('fetch finaly');
    loaderAnim.stop();
  });

  loaderAnim.stop();
  loaderAnim = null;
  if (!response.ok) {
    throw new Error('Network response was not OK');
  }
  return response.json();
}
// written by Kostas Maistrelis
const sendData = async (data) => {
  let url = 'data.php?post=1';
  let loaderAnim = new LoaderAnim('sending');
  loaderAnim.start();
  let response =  await fetch(url,{
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      //'Content-Type': 'text/plain'
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).finally(()=>{
    loaderAnim.stop();
  });

  loaderAnim.stop();
  loaderAnim = null;
  if (!response.ok) {
    throw new Error('Network response was not OK');
  }
}


