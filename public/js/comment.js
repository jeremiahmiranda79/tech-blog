const commentSubmitHandler = async (event) => {
    event.preventDefault();

	console.log('TEST!!!')

	const postId = document.querySelector('#post-title').dataset.post-id;
	
	const commentText = document.querySelector('textarea[name="comment-body"]').value;
  
    // // collect user input
    //const body = document.querySelector('#message');
	// const comment = document.querySelector('#message');

	console.log(commentText)
	console.log(postId)

	if (comment) {
		const response = await fetch('api/comments', {
			method: 'POST',
			body: JSON.stringify({
				postId: postId,
				text: commentText
			}),

			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// document.location.replace('/');
			document.location.reload();
		} else {
			alert(response.statusText);
			document.querySelector('#comment-form').style.display = "block";
		}
	}
};

document
	.querySelector('#comment-form')
	.addEventListener('submit', commentSubmitHandler);