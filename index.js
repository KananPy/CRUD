const apiURL = 'https://blog-api-t6u0.onrender.com/posts';
const postsList = document.getElementById('posts-list');
const titleInput = document.getElementById('title');
const bodyInput = document.getElementById('body');

const fetchPosts = () => {
    fetch(apiURL)
        .then(response => response.json())
        .then(posts => {
            postsList.innerHTML = posts.map(post => `
                <div class="post">
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                    <button class="delete" data-id="${post.id}">Delete</button>
                </div>
            `).join('');
        });
};

fetchPosts();

document.getElementById('post-form').addEventListener('submit', event => {
    event.preventDefault();

    const title = titleInput.value;
    const body = bodyInput.value;

    fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body })
    })
    .then(() => {
        fetchPosts();
        titleInput.value = '';
        bodyInput.value = '';
    });
});

document.addEventListener('click', event => {
    if (event.target.classList.contains('delete')) {
        const postId = event.target.getAttribute('data-id');
        fetch(`${apiURL}/${postId}`, { method: 'DELETE' })
            .then(fetchPosts);
    }
});
