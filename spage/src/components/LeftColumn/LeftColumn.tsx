import * as React from "react";

export default function LeftColumn() {
  return (
    <>
      <nav className='leftColumn'>
        <h3>Комнаты</h3>
        <ul className='rooms'></ul>
        {/* {% if user.is_authenticated %} */}
        <div className='itc-select' id='select-1'>
          {/* <!-- Кнопка для открытия выпадающего списка --> */}
          <button
            id='add-user'
            type='button'
            className='itc-select__toggle'
            name='member'
            value=''
            data-select='toggle'
            data-index='-1'
          >
            Добавить участника
          </button>
          {/* <!-- Выпадающий список --> */}
          <div className='itc-select__dropdown'>
            <ul className='itc-select__options'></ul>
          </div>
        </div>
        <a className='room-button' href='/create'>
          Создать комнату
        </a>
      </nav>
    </>
  );
}
