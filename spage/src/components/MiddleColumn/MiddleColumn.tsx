import * as React from "react";

export default function MiddleColumn() {
  return (
    <>
      <div className='MiddleColumn'>
        <h3>Сообщения</h3>

        <ul className='messages'></ul>
        <form id='message-form' action=''>
          <label htmlFor='message'>
            <input id='message' type='text' name='text' />
          </label>
          <label htmlFor='send-message'>
            <button id='send-message'>Отправить</button>
          </label>
        </form>
      </div>
    </>
  );
}
