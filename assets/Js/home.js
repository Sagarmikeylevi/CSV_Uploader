const uploadArea = document.querySelector('.upload-section');
const uploadInput = document.getElementById('file-upload-input');
const uploadClick = uploadArea.getElementsByTagName('i');

uploadClick[0].addEventListener('click' , ()=>{
   uploadInput.click();
});

uploadInput.onchange = e =>{
    console.log(e);
}