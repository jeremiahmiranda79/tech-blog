const postButtonHandler = async (event) => {
    	event.preventDefault();
    
    	const postClick = document
    		.querySelector('#post-click')
			    
    	if (postId && postText) {
    		const response = await fetch('/api/post', {
    			method: 'POST',
    			body: JSON.stringify({
    				postId: postId,
    				text: postText,
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
    };

document
	.querySelector('#post-click')
	.addEventListener('click', postSubmitHandler); 