export {Populate}

const Populate = async (data) => {       
    (() => {    
        data.schools.forEach(school => {
            if (!school.vizinha) {
                school.de = "SAO BERNARDO DO CAMPO";
                school.selected = false;
                const selEscola = document.getElementById("selEscola");
                const option = document.createElement("option");
                option.value = school.codigo_cie;
                option.text = school.nome;
                selEscola.add(option);
            }
        })
    })();

    (() => {                     
        data.years.forEach((ano) => {
            const selAno = document.getElementById("selAno");
            const option = document.createElement("option");
            option.value = ano.id;
            option.text = ano.descricao;
            selAno.add(option);
        })
    })();

    (() => {             
        data.shifts.forEach((shift) => {
            const selTurno = document.getElementById("selTurno");
            const option = document.createElement("option");
            option.value = shift.id;
            option.text = shift.descricao;
            selTurno.add(option);
        });
    })();
}