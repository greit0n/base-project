const startBtn = document.querySelector('.btn-start');

window.addEventListener('keypress', (key) => {
   if (key.code === 'Enter') {
       startBtn.click();
   }
});