const conversationDateElement = document.querySelector('.conversation-date');
const chatElement = document.querySelector('.chat');

const getData = async () => {
    try {
        const response = await fetch('https://redventures.github.io/chatly-ifier/api/v1.json');
        const { data } = await response.json();
        const { conversationDate, messages } = data;
        const date = new Date(conversationDate);

        const dateOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          };
        conversationDateElement.textContent = date.toLocaleString('en-US', dateOptions);

        renderMessages(messages);

    } catch (err) {
        console.error(err);
    }
}

getData();

const renderMessages = (messages) => {
    console.log(messages);
    messages.map(msg => {
        const { username, image, message, timestamp, focused } = msg;

        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container');

        // User Thumbnail
        const thumbnail = document.createElement('img');
        thumbnail.classList.add('thumbnail');
        thumbnail.src = image;
        thumbnail.alt = `${username}`
        messageContainer.appendChild(thumbnail);

        // Speech Bubble
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        if (focused) {
            bubble.classList.add('focused');
        }
        bubble.textContent = message;
        const pointer = document.createElement('div');
        pointer.classList.add('pointer');
        bubble.appendChild(pointer);
        messageContainer.appendChild(bubble);

        // Username and Time
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('details');
        const name = document.createElement('span');
        name.classList.add('name');
        name.textContent = username;
        detailsContainer.appendChild(name);
        
        // Time
        const time = document.createElement('span');
        time.classList.add('time');
        const msgTime = new Date(timestamp).toLocaleString('en-US',{
            hour: 'numeric',
            minute: 'numeric',
        });
        time.innerHTML = `
            <img class='clock' src="https://img.icons8.com/material-outlined/15/000000/clock--v1.png"/> ${msgTime}
        `;
        detailsContainer.appendChild(time);

        bubble.appendChild(detailsContainer);
        chatElement.appendChild(messageContainer);
    });
}