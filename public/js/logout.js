const logoutHandler = async () => {
	console.log('hello world')

	const response = await fetch('/api/users/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application.json'}
	});

	if (response.ok) {
		alert('User Logged out!!!');
		document.location.replace('/');
	} else {
		alert(response.statusText);
	}
};

document.querySelector('#logout').addEventListener('click', logoutHandler);