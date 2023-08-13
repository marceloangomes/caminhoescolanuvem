export { Populate }

const Populate = async (data) => {
    (() => {
        data.schools.forEach(school => {
            if (!school.neighbor) {
                school.de = "SAO BERNARDO DO CAMPO";
                school.selected = false;
                const selEscola = document.getElementById("selEscola");
                const option = document.createElement("option");
                option.value = school.school_id;
                option.text = school.name;
                selEscola.add(option);
            }
        })
    })();

    (() => {
        data.years.forEach((ano) => {
            const selAno = document.getElementById("selAno");
            const option = document.createElement("option");
            option.value = ano.id;
            option.text = ano.description;
            selAno.add(option);
        })
    })();

    (() => {
        data.shifts.forEach((shift) => {
            const selTurno = document.getElementById("selTurno");
            const option = document.createElement("option");
            option.value = shift.id;
            option.text = shift.description;
            selTurno.add(option);
        });
    })();
}