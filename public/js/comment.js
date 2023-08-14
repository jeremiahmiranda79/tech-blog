const commentSubmitHandler = async (event) => {
	event.preventDefault();

	const postId = document
		.querySelector('#post-title')
		.getAttribute('data-post-id');

	console.log('postId', postId)

	const commentText = document.querySelector(
		'textarea[name="comment-body"]'
	).value;

	console.log('commentText', commentText)

	if (postId && commentText) {
		const response = await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify({
				postId: postId,
				text: commentText,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.reload();
		} else {
			alert(response.statusText);
			document.querySelector('#comment-form').style.display = 'block';
		}
	}
};

document
	.querySelector('#comment-form')
	.addEventListener('submit', commentSubmitHandler); 