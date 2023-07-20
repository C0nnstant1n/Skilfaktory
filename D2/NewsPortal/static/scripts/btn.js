/**
  * Функция-обертка над XMLHttpRequest, осуществляющая запрос
  * url - урл, по которому будет осуществляться запрос
  * callback - функция, которая вызовется при успешном выполнении
  * и первым параметром получит объект-результат запроса
  */
function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };

    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
  };

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');

/**
* Функция обработки полученного результата
* apiData - объект с результатом запроса
*/
function displayResult(apiData) {
let cards = '';
apiData.results.forEach(item => {
  const cardBlock = `
    <div class="card">
      <h2>${item.title}</h2>
      <p>${item.post_text}</p>
    </div>
  `;
  cards = cards + cardBlock;
});

// console.log('end cards', cards);

resultNode.innerHTML = cards;
}

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
useRequest('http://127.0.0.1:8000/api/post/?limit=4&offset=0', displayResult);
})