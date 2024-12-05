const btnMasculino = document.getElementById("btn-masculino");
const btnFeminino = document.getElementById("btn-feminino");
const exerciciosMasculinos = document.getElementById("exercicios-masculinos");
const exerciciosFemininos = document.getElementById("exercicios-femininos");

btnMasculino.addEventListener("click", () => {
    exerciciosMasculinos.style.display = "block";
    exerciciosFemininos.style.display = "none";
    btnMasculino.classList.add("btn-primary");
    btnMasculino.classList.remove("btn-secondary");
    btnFeminino.classList.add("btn-secondary");
    btnFeminino.classList.remove("btn-primary");
});

btnFeminino.addEventListener("click", () => {
    exerciciosMasculinos.style.display = "none";
    exerciciosFemininos.style.display = "block";
    btnFeminino.classList.add("btn-primary");
    btnFeminino.classList.remove("btn-secondary");
    btnMasculino.classList.add("btn-secondary");
    btnMasculino.classList.remove("btn-primary");
});