/* Этап 1. Подготовка данных */

// Создание экземпляра класса DOMParser. Он позволит нам парсить XML
const parser = new DOMParser();
// console.log('parser', parser);

// XML, который мы будем парсить
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;
// console.log('xmlString', xmlString);

/* Этап 2. Получение данных */

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const students = xmlDOM.querySelectorAll("student");
let list = {
  list: [],
};
let result = [];

for (const student of students) {
  // Получение данных нод
  const nameNode = student.querySelector("name");
  const firstNode = nameNode.querySelector("first");
  const secondNode = nameNode.querySelector("second");
  const ageNode = student.querySelector("age");
  const profNode = student.querySelector("prof");
  // Получение данных из атрибутов
  const langAttr = nameNode.getAttribute("lang");

  const studentData = `{name: ${firstNode.textContent} ${secondNode.textContent}, age: ${ageNode.textContent}, prof: ${profNode.textContent}, lang: ${langAttr}}`;
  result.push(studentData);
}

list.list = result;
console.log(list);
