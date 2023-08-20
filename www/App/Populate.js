export { Populate }

const Populate = async (data) => {
    (() => {
        data.schools.forEach(school => {
            if (!school.neighbor) {
                school.de = "SAO BERNARDO DO CAMPO";
                school.selected = false;
                const selSchool = document.getElementById("selSchool");
                const option = document.createElement("option");
                option.value = school.school_id;
                option.text = school.name;
                selSchool.add(option);
            }
        })
    })();

    (() => {
        data.years.forEach((ano) => {
            const selYear = document.getElementById("selYear");
            const option = document.createElement("option");
            option.value = ano.id;
            option.text = ano.description;
            selYear.add(option);
        })
    })();

    (() => {
        const Fill = (id, nameCity, def) => {
            const option = document.createElement("option");
            option.value = id;
            option.text = nameCity;
            selCity.add(option);
            if (def) selCity.value = id;
        }
        const selCity = document.getElementById("selOriginCity");
        Fill(0, "Todas", false)
        data.citys.forEach((city) => {
            Fill(city.id, city.name, city.default)
        })
    })();

    (() => {
        data.shifts.forEach((shift) => {
            const selShift = document.getElementById("selShift");
            const option = document.createElement("option");
            option.value = shift.id;
            option.text = shift.description;
            selShift.add(option);
        });
    })();
}