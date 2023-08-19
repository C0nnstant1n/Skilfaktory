const coll = document.getElementsByClassName("collapsible");
let i, n;
const collapse = document.getElementsByClassName("content")

for (n of collapse){
  n.style.display = "none"
}

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.display === "grid") {
      content.style.display = "none";
    } else {
      content.style.display = "grid";
    }
  });
}