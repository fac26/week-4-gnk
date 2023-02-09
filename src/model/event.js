const db = require('../database/db.js');

const insert_event = db.prepare(/*sql*/ `
  INSERT INTO events (title, content, event_date, event_address, user_id)
  VALUES ($title, $content, $event_date, $event_address, $user_id)
  RETURNING id
`);

function createEvent(title, content, event_date, event_address, user_id) {
  return insert_event.get({
    title,
    content,
    event_date,
    event_address,
    user_id,
  });
}

const select_event_by_id = db.prepare(/*sql*/ `
  SELECT id, user_id FROM events WHERE id = ?
`);

function getEventByID(id) {
  return select_event_by_id.get(id);
}

//add user_id to table
const select_all_events = db.prepare(/*sql*/ `
    SELECT 
        id,
        title,
        content,
        event_date,
        event_address,
        user_id
    FROM events
    
`);

function listEvents() {
  return select_all_events.all();
}

//delete
const delete_from_DB = db.prepare(/*sql*/ `
DELETE FROM events WHERE id=?

`);
function deleteEventFromDB(id) {
  delete_from_DB.run(id);
}
const delete_all_events = db.prepare(/*sql*/ `
DELETE FROM events 

`);
function deleteAll() {
  delete_all_events.run();
}
module.exports = {
  createEvent,
  getEventByID,
  listEvents,
  deleteEventFromDB,
  deleteAll,
};
