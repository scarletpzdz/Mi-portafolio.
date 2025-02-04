document.addEventListener("DOMContentLoaded", function() {
    const botones = document.querySelectorAll(".btn");

    botones.forEach(boton => {
        boton.addEventListener("mouseover", () => {
            boton.style.transform = "scale(1.1)";
        });

        boton.addEventListener("mouseout", () => {
            boton.style.transform = "scale(1)";
        });
    });
});
