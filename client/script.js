const postId = 1;
const btn = document.querySelector('button');

const postComment = async () => {
    const content = document.getElementById('comment').value;
    const commentBody = {
        'post_id': postId,
        'user_id': Math.floor(Math.random() * 7) + 1,
        'content': content
    };
    await fetch('http://localhost:3000/api/comments', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentBody),
    })
    await fetchComments();
};

btn.addEventListener('click', postComment)
let commentsSection = document.querySelector('#allComments');

fetchComments = async () => {
    await fetch(`http://localhost:3000/api/posts/${postId}/comments`)
        .then(response => response.json())
        .then((comments) => {
            let commentDiv = document.createElement('div');
            commentsSection.innerHTML = '';
            comments.forEach(comment => {
                let avatarImg = document.createElement('img');
                let usernameDiv = document.createElement('div');
                let timestampDiv = document.createElement('div');
                let contentP = document.createElement('p');
                let ratingDiv = document.createElement('div');

                avatarImg.src = comment.avatar_url;
                usernameDiv.appendChild(document.createTextNode(comment.name));
                timestampDiv.appendChild(document.createTextNode(comment.timestamp));
                contentP.appendChild(document.createTextNode(comment.content));
                ratingDiv.appendChild(document.createTextNode(comment.rating ?? 0));

                commentDiv.appendChild(avatarImg);
                commentDiv.appendChild(usernameDiv);
                commentDiv.appendChild(timestampDiv);
                commentDiv.appendChild(contentP);
                commentDiv.appendChild(ratingDiv);
                commentsSection.appendChild(commentDiv);
            })
        })
}

fetchComments();
