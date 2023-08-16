const postSubmitHandler = async (event) => {
    event.preventDefault();

    const postTitle = document.querySelector('textarea[name="post-title"]').value;

    const postBody = document.querySelector('textarea[name="post-body"]').value;

    if (postTitle && postBody) {
        const response = await fetch('/api/posts', {
			method: 'POST',
			body: JSON.stringify({
                title: postTitle,
				text: postBody,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.reload();
		} else {
			alert(response.statusText);
			document.querySelector('#post-form').style.display = 'block';
		}
    }
}

const delButtonHandler = async (event) => {
	event.preventDefault();

	// console.log('DELETE@!!')
	// console.log(event)

	// const id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length - 1
    // ];

	// const response = await fetch(`/api/posts/${id}`, {
    //     method: 'DELETE',
    //     body: JSON.stringify({
    //       postId: id
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
      
    //   if (response.ok) {
    //     document.location.replace('/dashboard/');
    //   } else {
    //     alert(response.statusText);
    //   }

	if (event.target.hasAttribute('data-id')) {
		const id = event.target.getAttribute('data-id');
		console.log(id)
		const response = await fetch(`/api/posts/${id}`, {
			method: 'DELETE',
		});
	
		if (response.ok) {
			document.location.replace('/posts');
		} else {
			alert('Failed to delete post');
		}
	}
};

document 
    .querySelector('#post-form')
    .addEventListener('submit', postSubmitHandler);

document
  .querySelector('#delete')
  .addEventListener('click', delButtonHandler);