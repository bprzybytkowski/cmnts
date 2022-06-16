const postId = 1;
const btn = document.querySelector('.comment-add');

const generateUserId = () => Math.floor(Math.random() * 7 + 1);

let currentUserId = generateUserId();
const avatarImg = document.querySelector('.current-user-avatar');

const getUserAvatar = async () => {
    await fetch(`http://localhost:3000/api/users/${currentUserId}`)
        .then(response => response.json())
        .then((user) => {
            avatarImg.src = user.avatar_url
        })
}

const postComment = async () => {
    let content = document.querySelector('.comment-content');
    const commentBody = {
        'post_id': postId,
        'user_id': currentUserId,
        'content': content.value
    };
    await fetch('http://localhost:3000/api/comments', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentBody),
    })
    currentUserId = generateUserId();
    await getUserAvatar();
    await fetchComments();
    content.value = '';
};

btn.addEventListener('click', postComment)
let commentsSection = document.querySelector('.comments-thread');

const fetchComments = async () => {
    const responsePromise = await fetch(`http://localhost:3000/api/posts/${postId}/comments`);
    const response = await responsePromise.json();

    for (const comment of response) {
        let commentDiv = document.createElement('div');
        commentDiv.classList.add('comment-single');

        let avatarImg = document.createElement('img');
        let commentHeader = document.createElement('div');
        commentHeader.classList.add('comment-header');
        let usernameDiv = document.createElement('div');
        usernameDiv.classList.add('username');
        let timestampDiv = document.createElement('div');
        timestampDiv.classList.add('timestamp');
        let commentContent = document.createElement('div');
        commentContent.classList.add('content');
        let ratingDiv = document.createElement('div');
        ratingDiv.classList.add('rating');
        let scoreDiv = document.createElement('div');
        scoreDiv.classList.add('score');
        let upvoteDiv = document.createElement('div');
        upvoteDiv.classList.add('upvote');

        avatarImg.src = comment.avatar_url;
        usernameDiv.appendChild(document.createTextNode(comment.name + ' • '));
        timestampDiv.appendChild(document.createTextNode(timeSince(comment.timestamp)));
        commentHeader.appendChild(usernameDiv);
        commentHeader.appendChild(timestampDiv);
        commentContent.appendChild(document.createTextNode(comment.content));

        const upvoters = await fetchUpvoters(comment.id);

        scoreDiv.appendChild(document.createTextNode(upvoters.length));

        upvoteDiv.appendChild(document.createTextNode(' Upvote'));

        commentDiv.appendChild(avatarImg);
        commentDiv.appendChild(commentHeader);
        commentDiv.appendChild(commentContent);
        ratingDiv.appendChild(scoreDiv);
        ratingDiv.appendChild(upvoteDiv);
        commentDiv.appendChild(ratingDiv);
        commentsSection.appendChild(commentDiv);
    }
};


async function fetchUpvoters(commentId) {
    const response = await fetch(`http://localhost:3000/api/comments/${commentId}/upvoters`);
    return response.json();
}


// modified function by @Money_Badger https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time#comment122752017_23352499
function timeSince(timestampString) {
    const timestamp = parseMySqlTimestamp(timestampString);
    const now = new Date(),
        secondsPast = (now.getTime() - timestamp.getTime()) / 1000;
    if (secondsPast < 60) {
        return Math.round(secondsPast) + 's ago';
    }
    if (secondsPast < 3600) {
        return parseInt(secondsPast / 60) + ' min ago';
    }
    if (secondsPast <= 86400) {
        return parseInt(secondsPast / 3600) + ' hr ago';
    }
    if (secondsPast <= 172800) {
        return 'yesterday';
    }
    if (secondsPast <= 2592000) {
        return parseInt(secondsPast / 86400) + ' d ago';
    }
    if (secondsPast <= 31104000) {
        return parseInt(secondsPast / 2592000) + ' mo ago';
    }
    if (secondsPast > 31104000) {
        return parseInt(secondsPast / 31104000) + ' y ago';
    }
}

// modified function by @Marco Demaio https://stackoverflow.com/a/5058318
function parseMySqlTimestamp(timestampString) {
    let t, result = null;

    if (typeof timestampString === 'string') {
        t = timestampString.split(/[- :]/);

        result = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0));
    }

    return result;
}

getUserAvatar();
fetchComments();
