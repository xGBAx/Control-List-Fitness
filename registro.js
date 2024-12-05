document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("data-form");
    const dateInput = document.getElementById("date");
    const exerciseInput = document.getElementById("exercise");
    const weightInput = document.getElementById("weight");
    const seriesInput = document.getElementById("series");
    const repsInput = document.getElementById("reps");
    const cardioInput = document.getElementById("cardio");
    const dataTable = document.getElementById("data-table");

    let editIndex = null; // Índice do treino sendo editado

    // Recupera os dados do LocalStorage
    const getData = () => JSON.parse(localStorage.getItem("workouts")) || [];

    // Salva os dados no LocalStorage
    const saveData = (data) => localStorage.setItem("workouts", JSON.stringify(data));

    // Atualiza a tabela com os dados armazenados
    const renderTable = () => {
        dataTable.innerHTML = "";
        const workouts = getData();
        workouts.forEach((workout, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td data-label="Data">${workout.date}</td>
                <td data-label="Exercício">${workout.exercise}</td>
                <td data-label="Carga (kg)">${workout.weight} kg</td>
                <td data-label="Séries">${workout.series}</td>
                <td data-label="Repetições">${workout.reps}</td>
                <td data-label="Cardio">${workout.cardio ? "Sim" : "Não"}</td>
                <td data-label="Ações">
                    <button class="edit" data-index="${index}">Editar</button>
                    <button class="delete" data-index="${index}">Remover</button>
                </td>
            `;
            dataTable.appendChild(row);
        });
    };

    // Adiciona novo treino ou edita o treino existente
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const date = dateInput.value;
        const exercise = exerciseInput.value.trim();
        const weight = weightInput.value.trim();
        const series = seriesInput.value.trim();
        const reps = repsInput.value.trim();
        const cardio = cardioInput.checked;

        if (date && exercise && weight && series && reps) {
            const workouts = getData();

            if (editIndex !== null) {
                // Atualizar o treino existente
                workouts[editIndex] = { date, exercise, weight, series, reps, cardio };
                editIndex = null; // Limpar o índice após editar
                form.querySelector("button[type='submit']").textContent = "Adicionar";
            } else {
                // Adicionar um novo treino
                workouts.push({ date, exercise, weight, series, reps, cardio });
            }

            saveData(workouts);
            renderTable();
            form.reset();
        }
    });

    // Detecta cliques nos botões de edição ou exclusão
    dataTable.addEventListener("click", (e) => {
        const workouts = getData();

        if (e.target.classList.contains("delete")) {
            // Remover treino
            const index = e.target.dataset.index;
            workouts.splice(index, 1);
            saveData(workouts);
            renderTable();
        } else if (e.target.classList.contains("edit")) {
            // Editar treino
            const index = e.target.dataset.index;
            const workout = workouts[index];

            dateInput.value = workout.date;
            exerciseInput.value = workout.exercise;
            weightInput.value = workout.weight;
            seriesInput.value = workout.series;
            repsInput.value = workout.reps;
            cardioInput.checked = workout.cardio;

            editIndex = index; // Salvar o índice do treino sendo editado
            form.querySelector("button[type='submit']").textContent = "Salvar Alterações";
        }
    });

    // Renderiza a tabela ao carregar a página
    renderTable();
});