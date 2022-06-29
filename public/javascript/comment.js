async function commentClickHandler(event) {
    event.preventDefault();

    console.log('comment btn clicked');
}

document.querySelector('.comment-btn').addEventListener('click', commentClickHandler);