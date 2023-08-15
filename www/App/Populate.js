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
        data.citys.forEach((city) => {
            const selYear = document.getElementById("selCity");
            const option = document.createElement("option");
            option.value = city.id;
            option.text = city.name;
            selcity.add(option);
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