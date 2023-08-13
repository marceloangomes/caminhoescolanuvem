import { FormatResult } from '/App/main.js'

// A simple test function
const Test = (description, actual, expected) => {
    if (actual === expected) {
        console.log(`✔️ Test passed: ${description}`);
    } else {
        console.error(`❌ Test failed: ${description}. Expected ${expected}, but got ${actual}`);
    }
}

const distanceCloses = [
    {
        "school": {
            "school_id": 42055,
            "name": "EE Brazilia Tondi de Lima",
            "address": "Rua Izabel de Andrade Lima, 733 – Vila São José, Ferrazópolis, São Bernardo do Campo",
            "contact": "(11)4127-9190 (11)4335-3868",
            "lat": -23.732824,
            "lng": -46.535157,
            "neighbor": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selected": false,
            "junctionsId": [
                5
            ]
        },
        "dist": 2236,
        "addressDestiny": [
            "R. Itamarajú, 1 - Ferrazópolis, São Bernardo do Campo - SP, 09790-430, Brasil"
        ],
        "addressOrigin": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "2,2 km",
        "time": "32 minutos"
    },
    {
        "school": {
            "school_id": 9246,
            "name": "EE Carlos Pezzolo, Prof.",
            "address": "Rua Tiradentes, 1755 – Vila do Tanque, Santa Terezinha, São Bernardo do Campo",
            "contact": "(11)4127-4636 (11)4127-1241",
            "lat": -23.724709,
            "lng": -46.534068,
            "neighbor": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selected": false,
            "junctionsId": [
                5
            ]
        },
        "dist": 1620,
        "addressDestiny": [
            "R. Tiradentes, 68 - Santa Terezinha, São Bernardo do Campo - SP, 29043-021, Brasil"
        ],
        "addressOrigin": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "1,6 km",
        "time": "20 minutos"
    },
    {
        "school": {
            "school_id": 9167,
            "name": "EE Joaquim Moreira Bernardes, Prof.",
            "address": "Avenida Conde de São Lourenço, 65 – Jardim Silvina, Montanhão, São Bernardo do Campo",
            "contact": "(11)4127-3242 (11)4335-4005",
            "lat": -23.738233,
            "lng": -46.531196,
            "neighbor": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selected": false,
            "junctionsId": [
                5
            ]
        },
        "dist": 3268,
        "addressDestiny": [
            "Av. Conde de São Lourenço, 65 - Ferrazópolis, São Bernardo do Campo - SP, 09791-260, Brasil"
        ],
        "addressOrigin": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "3,3 km",
        "time": "45 minutos"
    },
    {
        "school": {
            "school_id": 902020,
            "name": "EE Luis dos Santos, Metalúrgico",
            "address": "Rua Primo Bechelli, 133 – Parque Selecta, Montanhão, São Bernardo do Campo",
            "contact": "(11)4127-7268 (11)4335-4208",
            "lat": -23.741424,
            "lng": -46.527942,
            "neighbor": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selected": false,
            "junctionsId": [
                18
            ]
        },
        "dist": 4133,
        "addressDestiny": [
            "R. Primo Bechelli, 130 - Montanhão, São Bernardo do Campo - SP, 09791-620, Brasil"
        ],
        "addressOrigin": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "4,1 km",
        "time": "57 minutos"
    },
    {
        "school": {
            "school_id": 9155,
            "name": "EE Luiza Collaço Queiroz Fonseca, Profª.",
            "address": "Rua Vicente Moreira da Rocha, 44 – Ferrazópolis, São Bernardo do Campo",
            "contact": "(11)4127-9122 (11)4335-3787",
            "lat": -23.726979,
            "lng": -46.542492,
            "neighbor": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selected": false,
            "junctionsId": [
                18
            ]
        },
        "dist": 2908,
        "addressDestiny": [
            "Av. Albert Schweitzer, 647 - Ferrazópolis, São Bernardo do Campo - SP, 09790-000, Brasil"
        ],
        "addressOrigin": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "2,9 km",
        "time": "38 minutos"
    },
    {
        "school": {
            "school_id": 38519,
            "name": "EE Maria Cristina Schmidt Miranda, Profª.",
            "address": "Rua Abramo Luchesi, 12 – Jardim Leblon, Ferrazópolis, São Bernardo do Campo",
            "contact": "(11)4127-7544 (11)4335-1847",
            "lat": -23.723466,
            "lng": -46.539456,
            "neighbor": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selected": false,
            "junctionsId": [
                5
            ]
        },
        "dist": 2384,
        "addressDestiny": [
            "R. Ábramo Luchesi, 12 - Jardim Leblon, São Bernardo do Campo - SP, 09781-030, Brasil"
        ],
        "addressOrigin": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "2,4 km",
        "time": "30 minutos"
    },
    {
        "school": {
            "school_id": 924428,
            "name": "EE Mauricio de Castro",
            "address": "Rua do Oleoduto, s/n – Vila São Pedro, Montanhão, São Bernardo do Campo",
            "contact": "(11)4335-9235 (11)4335-4426",
            "lat": -23.717734,
            "lng": -46.526362,
            "neighbor": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selected": false,
            "junctionsId": [
                5
            ]
        },
        "dist": 964,
        "addressDestiny": [
            "R. do Oleoduto, 66 - Montanhão, São Bernardo do Campo - SP, 09784-050, Brasil"
        ],
        "addressOrigin": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "1,0 km",
        "time": "12 minutos"
    },
    {
        "school": {
            "school_id": 921543,
            "name": "EE Nelson Monteiro Palma, Prof.",
            "address": "Rua Francisco Bonicio, s/n – Jardim Irajá, Santa Terezinha, São Bernardo do Campo",
            "contact": "(11)4335-3684 (11)4335-3627",
            "lat": -23.723931,
            "lng": -46.533096,
            "neighbor": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selected": false,
            "junctionsId": [
                5
            ]
        },
        "dist": 1946,
        "addressDestiny": [
            "R. Francisco Bonício, s/n - Irajá, São Bernardo do Campo - SP, 09781-260, Brasil"
        ],
        "addressOrigin": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "1,9 km",
        "time": "25 minutos"
    },
    {
        "school": {
            "school_id": 42043,
            "name": "EE Palmira Grassiotto Ferreira da Silva, Profª.",
            "address": "Rua Almeida Leme, 100 – Parque São Bernardo, São Bernardo do Campo",
            "contact": "(11)4121-1848 (11)4330-5426",
            "lat": -23.709007,
            "lng": -46.524704,
            "neighbor": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selected": false,
            "junctionsId": [
                18
            ]
        },
        "dist": 2172,
        "addressDestiny": [
            "R. Paula Souza, 104 - Parque Sao Bernardo, São Bernardo do Campo - SP, 09761-180, Brasil"
        ],
        "addressOrigin": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "2,2 km",
        "time": "31 minutos"
    }
]

const junctions = [
    { "id": 1, "shift_id": 1, "teachingType_id": 1, "model_id": 1, "year_id": 6 },
    { "id": 2, "shift_id": 1, "teachingType_id": 1, "model_id": 1, "year_id": 7 },
    { "id": 3, "shift_id": 1, "teachingType_id": 1, "model_id": 1, "year_id": 8 },
    { "id": 4, "shift_id": 1, "teachingType_id": 1, "model_id": 1, "year_id": 9 },

    { "id": 5, "shift_id": 2, "teachingType_id": 1, "model_id": 1, "year_id": 6 },
    { "id": 6, "shift_id": 2, "teachingType_id": 1, "model_id": 1, "year_id": 7 },
    { "id": 7, "shift_id": 2, "teachingType_id": 1, "model_id": 1, "year_id": 8 },
    { "id": 8, "shift_id": 2, "teachingType_id": 1, "model_id": 1, "year_id": 9 },

    { "id": 9, "shift_id": 1, "teachingType_id": 2, "model_id": 1, "year_id": 10 },
    { "id": 10, "shift_id": 1, "teachingType_id": 2, "model_id": 1, "year_id": 11 },
    { "id": 11, "shift_id": 1, "teachingType_id": 2, "model_id": 1, "year_id": 12 },

    { "id": 12, "shift_id": 2, "teachingType_id": 2, "model_id": 1, "year_id": 10 },
    { "id": 13, "shift_id": 2, "teachingType_id": 2, "model_id": 1, "year_id": 11 },
    { "id": 14, "shift_id": 2, "teachingType_id": 2, "model_id": 1, "year_id": 12 },

    { "id": 15, "shift_id": 3, "teachingType_id": 2, "model_id": 1, "year_id": 10 },
    { "id": 16, "shift_id": 3, "teachingType_id": 2, "model_id": 1, "year_id": 11 },
    { "id": 17, "shift_id": 3, "teachingType_id": 2, "model_id": 1, "year_id": 12 },

    { "id": 18, "shift_id": 1, "teachingType_id": 1, "model_id": 2, "year_id": 6 },
    { "id": 19, "shift_id": 1, "teachingType_id": 1, "model_id": 2, "year_id": 7 },
    { "id": 20, "shift_id": 1, "teachingType_id": 1, "model_id": 2, "year_id": 8 },
    { "id": 21, "shift_id": 1, "teachingType_id": 1, "model_id": 2, "year_id": 9 },

    { "id": 22, "shift_id": 2, "teachingType_id": 2, "model_id": 2, "year_id": 10 },
    { "id": 23, "shift_id": 2, "teachingType_id": 2, "model_id": 2, "year_id": 11 },
    { "id": 24, "shift_id": 2, "teachingType_id": 2, "model_id": 2, "year_id": 12 },

    { "id": 25, "shift_id": 4, "teachingType_id": 1, "model_id": 2, "year_id": 6 },
    { "id": 26, "shift_id": 4, "teachingType_id": 1, "model_id": 2, "year_id": 7 },
    { "id": 27, "shift_id": 4, "teachingType_id": 1, "model_id": 2, "year_id": 8 },
    { "id": 28, "shift_id": 4, "teachingType_id": 1, "model_id": 2, "year_id": 9 },

    { "id": 29, "shift_id": 4, "teachingType_id": 2, "model_id": 2, "year_id": 10 },
    { "id": 30, "shift_id": 4, "teachingType_id": 2, "model_id": 2, "year_id": 11 },
    { "id": 31, "shift_id": 4, "teachingType_id": 2, "model_id": 2, "year_id": 12 },

    { "id": 32, "shift_id": 3, "teachingType_id": 1, "model_id": 3, "year_id": 6 },
    { "id": 33, "shift_id": 3, "teachingType_id": 1, "model_id": 3, "year_id": 7 },
    { "id": 34, "shift_id": 3, "teachingType_id": 1, "model_id": 3, "year_id": 8 },
    { "id": 35, "shift_id": 3, "teachingType_id": 1, "model_id": 3, "year_id": 9 },

    { "id": 36, "shift_id": 3, "teachingType_id": 2, "model_id": 3, "year_id": 10 },
    { "id": 37, "shift_id": 3, "teachingType_id": 2, "model_id": 3, "year_id": 11 },
    { "id": 38, "shift_id": 3, "teachingType_id": 2, "model_id": 3, "year_id": 12 },
    { "id": 54, "shift_id": 3, "teachingType_id": 2, "model_id": 3, "year_id": 20 },

    { "id": 39, "shift_id": 1, "teachingType_id": 2, "model_id": 4, "year_id": 10 },
    { "id": 40, "shift_id": 1, "teachingType_id": 2, "model_id": 4, "year_id": 11 },
    { "id": 41, "shift_id": 1, "teachingType_id": 2, "model_id": 4, "year_id": 12 },

    { "id": 42, "shift_id": 2, "teachingType_id": 2, "model_id": 4, "year_id": 10 },
    { "id": 43, "shift_id": 2, "teachingType_id": 2, "model_id": 4, "year_id": 11 },
    { "id": 44, "shift_id": 2, "teachingType_id": 2, "model_id": 4, "year_id": 12 },

    { "id": 45, "shift_id": 4, "teachingType_id": 2, "model_id": 4, "year_id": 10 },
    { "id": 46, "shift_id": 4, "teachingType_id": 2, "model_id": 4, "year_id": 11 },
    { "id": 47, "shift_id": 4, "teachingType_id": 2, "model_id": 4, "year_id": 12 },

    { "id": 48, "shift_id": 1, "teachingType_id": 2, "model_id": 1, "year_id": 10 },
    { "id": 49, "shift_id": 1, "teachingType_id": 2, "model_id": 1, "year_id": 11 },
    { "id": 50, "shift_id": 1, "teachingType_id": 2, "model_id": 1, "year_id": 12 },

    { "id": 51, "shift_id": 2, "teachingType_id": 2, "model_id": 1, "year_id": 10 },
    { "id": 52, "shift_id": 2, "teachingType_id": 2, "model_id": 1, "year_id": 11 },
    { "id": 53, "shift_id": 2, "teachingType_id": 2, "model_id": 1, "year_id": 12 }

]

const modelShifts = [
    {
        "id": 1,
        "shift_id": 1,
        "model_id": 1,
        "classSchedule": {
            "begin": "07:00:00",
            "end": "12:35:00"
        }
    },
    {
        "id": 2,
        "shift_id": 2,
        "model_id": 1,
        "classSchedule": {
            "begin": "13:00:00",
            "end": "18:35:00"
        }
    },
    {
        "id": 3,
        "shift_id": 3,
        "model_id": 1,
        "classSchedule": {
            "begin": "19:00:00",
            "end": "23:00:00"
        }
    },
    {
        "id": 4,
        "shift_id": 4,
        "model_id": 2,
        "classSchedule": {
            "begin": "07:00:00",
            "end": "16:00:00"
        }
    },
    {
        "id": 5,
        "shift_id": 1,
        "model_id": 2,
        "classSchedule": {
            "begin": "07:00:00",
            "end": "14:00:00"
        }
    },
    {
        "id": 6,
        "shift_id": 2,
        "model_id": 2,
        "classSchedule": {
            "begin": "14:15:00",
            "end": "21:15:00"
        }
    },
    {
        "id": 7,
        "shift_id": 3,
        "model_id": 3,
        "classSchedule": {
            "begin": "19:00:00",
            "end": "23:00:00"
        }
    }
]

const shifts = [
    { "id": 1, "description": "MANHÃ", "order": 1 },
    { "id": 2, "description": "TARDE", "order": 2 },
    { "id": 3, "description": "NOITE", "order": 3 },
    { "id": 4, "description": "INTEGRAL", "order": 4 }
]
const models = [
    { "id": 1, "description": "Parcial" },
    { "id": 2, "description": "Integral" },
    { "id": 3, "description": "EJA" },
    { "id": 4, "description": "NOVOTEC" }
]

const data = { 'junctions': junctions, 'modelShifts': modelShifts, 'shifts': shifts, 'models': models };

// Test cases
Test("FormatResult: ", FormatResult(distanceCloses, data), null);

wayVisions, wayNeighbors, data, components)
