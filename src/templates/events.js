function eventsTemplate(eventsFromDB, userId) {
  const secretsUL = /*html*/ `
    <ul class="event-list">${eventsFromDB
      .map((event) => eventTemplate(event, userId))
      .join('')}</ul>
    `;
  return secretsUL;
}

function eventTemplate(event, userId) {
  return /*html*/ `
    <li class="event-item" id=${event.id}>
                <h2 class="event-title">${event.title}</h2>
                <p class="event-content">${event.content}</p>
                <p class="event-time">${event.event_date.replace(/T/, ' ')}</p>
                <p class="event-address">${event.event_address}</p>
                ${
                  userId && event.user_id == userId
                    ? /*html*/ `<form method="post" action="/delete/${event.id}" class="delete">
                <button type="submit" class="delete-btn">Delete</button> </form>`
                    : ''
                }      
                </div>              
            </li>
    `;
}

module.exports = { eventsTemplate };
