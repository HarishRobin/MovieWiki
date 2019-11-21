function returnFn(e) {
    //returning to previous state
    window.history.back();
}

// After Window Loaded we listen for a click event on back button to return the previous state
window.addEventListener('load',() => {
    const backBtn = document.querySelector('#goBack');
    
    // click event Listened
    backBtn.addEventListener('click',returnFn);
});