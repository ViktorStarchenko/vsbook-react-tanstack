//Accordion
var acc = document.getElementsByClassName("accordionBtn");
var i;
console.log(acc)
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        console.log(this)
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            panel.classList.remove('active');
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            panel.classList.add('active');
        }
    });
}