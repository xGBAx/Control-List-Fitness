document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("data-form");
    const dateInput = document.getElementById("date");
    const exerciseInput = document.getElementById("exercise");
    const weightInput = document.getElementById("weight");
    const seriesInput = document.getElementById("series");
    const repsInput = document.getElementById("reps");
    const cardioInput = document.getElementById("cardio");
    const cardioTimeInput = document.getElementById("cardio-time");
    const dataTable = document.getElementById("data-table");

    let editIndex = null;

    cardioInput.addEventListener("change", () => {
        cardioTimeInput.disabled = !cardioInput.checked;
        if (!cardioInput.checked) {
            cardioTimeInput.value = "";
        }
    });

    const getData = () => JSON.parse(localStorage.getItem("workouts")) || [];
    const saveData = (data) => localStorage.setItem("workouts", JSON.stringify(data));

    const renderTable = () => {
        dataTable.innerHTML = "";
        const workouts = getData();
        workouts.forEach((workout, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${workout.date}</td>
                <td>${workout.exercise}</td>
                <td>${workout.weight} kg</td>
                <td>${workout.series}</td>
                <td>${workout.reps}</td>
                <td>${workout.cardio ? "Sim" : "Não"}</td>
                <td>${workout.cardioTime || "-"}</td>
                <td>
                    <button class="edit" data-index="${index}">Editar</button>
                    <button class="delete" data-index="${index}">Remover</button>
                </td>
            `;
            dataTable.appendChild(row);
        });
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const date = dateInput.value;
        const exercise = exerciseInput.value.trim();
        const weight = weightInput.value.trim();
        const series = seriesInput.value.trim();
        const reps = repsInput.value.trim();
        const cardio = cardioInput.checked;
        const cardioTime = cardio ? cardioTimeInput.value.trim() : null;

        if (date && exercise && weight && series && reps && (!cardio || cardioTime)) {
            const workouts = getData();
            if (editIndex !== null) {
                workouts[editIndex] = { date, exercise, weight, series, reps, cardio, cardioTime };
                editIndex = null;
                form.querySelector("button[type='submit']").textContent = "Adicionar";
            } else {
                workouts.push({ date, exercise, weight, series, reps, cardio, cardioTime });
            }
            saveData(workouts);
            renderTable();
            form.reset();
            cardioTimeInput.disabled = true;
        }
    });

    dataTable.addEventListener("click", (e) => {
        const workouts = getData();
        if (e.target.classList.contains("delete")) {
            const index = e.target.dataset.index;
            workouts.splice(index, 1);
            saveData(workouts);
            renderTable();
        } else if (e.target.classList.contains("edit")) {
            const index = e.target.dataset.index;
            const workout = workouts[index];
            dateInput.value = workout.date;
            exerciseInput.value = workout.exercise;
            weightInput.value = workout.weight;
            seriesInput.value = workout.series;
            repsInput.value = workout.reps;
            cardioInput.checked = workout.cardio;
            cardioTimeInput.disabled = !workout.cardio;
            cardioTimeInput.value = workout.cardioTime || "";
            editIndex = index;
            form.querySelector("button[type='submit']").textContent = "Salvar Alterações";
        }
    });

    renderTable();
});