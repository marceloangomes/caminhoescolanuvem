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
            "codigo_cie": 42055,
            "nome": "EE Brazilia Tondi de Lima",
            "endereco": "Rua Izabel de Andrade Lima, 733 – Vila São José, Ferrazópolis, São Bernardo do Campo",
            "contato": "(11)4127-9190 (11)4335-3868",
            "lat": -23.732824,
            "lng": -46.535157,
            "vizinha": false,
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
            "codigo_cie": 9246,
            "nome": "EE Carlos Pezzolo, Prof.",
            "endereco": "Rua Tiradentes, 1755 – Vila do Tanque, Santa Terezinha, São Bernardo do Campo",
            "contato": "(11)4127-4636 (11)4127-1241",
            "lat": -23.724709,
            "lng": -46.534068,
            "vizinha": false,
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
            "codigo_cie": 9167,
            "nome": "EE Joaquim Moreira Bernardes, Prof.",
            "endereco": "Avenida Conde de São Lourenço, 65 – Jardim Silvina, Montanhão, São Bernardo do Campo",
            "contato": "(11)4127-3242 (11)4335-4005",
            "lat": -23.738233,
            "lng": -46.531196,
            "vizinha": false,
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
            "codigo_cie": 902020,
            "nome": "EE Luis dos Santos, Metalúrgico",
            "endereco": "Rua Primo Bechelli, 133 – Parque Selecta, Montanhão, São Bernardo do Campo",
            "contato": "(11)4127-7268 (11)4335-4208",
            "lat": -23.741424,
            "lng": -46.527942,
            "vizinha": false,
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
            "codigo_cie": 9155,
            "nome": "EE Luiza Collaço Queiroz Fonseca, Profª.",
            "endereco": "Rua Vicente Moreira da Rocha, 44 – Ferrazópolis, São Bernardo do Campo",
            "contato": "(11)4127-9122 (11)4335-3787",
            "lat": -23.726979,
            "lng": -46.542492,
            "vizinha": false,
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
            "codigo_cie": 38519,
            "nome": "EE Maria Cristina Schmidt Miranda, Profª.",
            "endereco": "Rua Abramo Luchesi, 12 – Jardim Leblon, Ferrazópolis, São Bernardo do Campo",
            "contato": "(11)4127-7544 (11)4335-1847",
            "lat": -23.723466,
            "lng": -46.539456,
            "vizinha": false,
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
            "codigo_cie": 924428,
            "nome": "EE Mauricio de Castro",
            "endereco": "Rua do Oleoduto, s/n – Vila São Pedro, Montanhão, São Bernardo do Campo",
            "contato": "(11)4335-9235 (11)4335-4426",
            "lat": -23.717734,
            "lng": -46.526362,
            "vizinha": false,
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
            "codigo_cie": 921543,
            "nome": "EE Nelson Monteiro Palma, Prof.",
            "endereco": "Rua Francisco Bonicio, s/n – Jardim Irajá, Santa Terezinha, São Bernardo do Campo",
            "contato": "(11)4335-3684 (11)4335-3627",
            "lat": -23.723931,
            "lng": -46.533096,
            "vizinha": false,
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
            "codigo_cie": 42043,
            "nome": "EE Palmira Grassiotto Ferreira da Silva, Profª.",
            "endereco": "Rua Almeida Leme, 100 – Parque São Bernardo, São Bernardo do Campo",
            "contato": "(11)4121-1848 (11)4330-5426",
            "lat": -23.709007,
            "lng": -46.524704,
            "vizinha": false,
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
    { "id": 1, "id_turno": 1, "id_tipoensino": 1, "id_modelo": 1, "id_ano": 6 },
    { "id": 2, "id_turno": 1, "id_tipoensino": 1, "id_modelo": 1, "id_ano": 7 },
    { "id": 3, "id_turno": 1, "id_tipoensino": 1, "id_modelo": 1, "id_ano": 8 },
    { "id": 4, "id_turno": 1, "id_tipoensino": 1, "id_modelo": 1, "id_ano": 9 },

    { "id": 5, "id_turno": 2, "id_tipoensino": 1, "id_modelo": 1, "id_ano": 6 },
    { "id": 6, "id_turno": 2, "id_tipoensino": 1, "id_modelo": 1, "id_ano": 7 },
    { "id": 7, "id_turno": 2, "id_tipoensino": 1, "id_modelo": 1, "id_ano": 8 },
    { "id": 8, "id_turno": 2, "id_tipoensino": 1, "id_modelo": 1, "id_ano": 9 },

    { "id": 9, "id_turno": 1, "id_tipoensino": 2, "id_modelo": 1, "id_ano": 10 },
    { "id": 10, "id_turno": 1, "id_tipoensino": 2, "id_modelo": 1, "id_ano": 11 },
    { "id": 11, "id_turno": 1, "id_tipoensino": 2, "id_modelo": 1, "id_ano": 12 },

    { "id": 12, "id_turno": 2, "id_tipoensino": 2, "id_modelo": 1, "id_ano": 10 },
    { "id": 13, "id_turno": 2, "id_tipoensino": 2, "id_modelo": 1, "id_ano": 11 },
    { "id": 14, "id_turno": 2, "id_tipoensino": 2, "id_modelo": 1, "id_ano": 12 },

    { "id": 15, "id_turno": 3, "id_tipoensino": 2, "id_modelo": 1, "id_ano": 10 },
    { "id": 16, "id_turno": 3, "id_tipoensino": 2, "id_modelo": 1, "id_ano": 11 },
    { "id": 17, "id_turno": 3, "id_tipoensino": 2, "id_modelo": 1, "id_ano": 12 },

    { "id": 18, "id_turno": 1, "id_tipoensino": 1, "id_modelo": 2, "id_ano": 6 },
    { "id": 19, "id_turno": 1, "id_tipoensino": 1, "id_modelo": 2, "id_ano": 7 },
    { "id": 20, "id_turno": 1, "id_tipoensino": 1, "id_modelo": 2, "id_ano": 8 },
    { "id": 21, "id_turno": 1, "id_tipoensino": 1, "id_modelo": 2, "id_ano": 9 },

    { "id": 22, "id_turno": 2, "id_tipoensino": 2, "id_modelo": 2, "id_ano": 10 },
    { "id": 23, "id_turno": 2, "id_tipoensino": 2, "id_modelo": 2, "id_ano": 11 },
    { "id": 24, "id_turno": 2, "id_tipoensino": 2, "id_modelo": 2, "id_ano": 12 },

    { "id": 25, "id_turno": 4, "id_tipoensino": 1, "id_modelo": 2, "id_ano": 6 },
    { "id": 26, "id_turno": 4, "id_tipoensino": 1, "id_modelo": 2, "id_ano": 7 },
    { "id": 27, "id_turno": 4, "id_tipoensino": 1, "id_modelo": 2, "id_ano": 8 },
    { "id": 28, "id_turno": 4, "id_tipoensino": 1, "id_modelo": 2, "id_ano": 9 },

    { "id": 29, "id_turno": 4, "id_tipoensino": 2, "id_modelo": 2, "id_ano": 10 },
    { "id": 30, "id_turno": 4, "id_tipoensino": 2, "id_modelo": 2, "id_ano": 11 },
    { "id": 31, "id_turno": 4, "id_tipoensino": 2, "id_modelo": 2, "id_ano": 12 },

    { "id": 32, "id_turno": 3, "id_tipoensino": 1, "id_modelo": 3, "id_ano": 6 },
    { "id": 33, "id_turno": 3, "id_tipoensino": 1, "id_modelo": 3, "id_ano": 7 },
    { "id": 34, "id_turno": 3, "id_tipoensino": 1, "id_modelo": 3, "id_ano": 8 },
    { "id": 35, "id_turno": 3, "id_tipoensino": 1, "id_modelo": 3, "id_ano": 9 },

    { "id": 36, "id_turno": 3, "id_tipoensino": 2, "id_modelo": 3, "id_ano": 10 },
    { "id": 37, "id_turno": 3, "id_tipoensino": 2, "id_modelo": 3, "id_ano": 11 },
    { "id": 38, "id_turno": 3, "id_tipoensino": 2, "id_modelo": 3, "id_ano": 12 },
    { "id": 54, "id_turno": 3, "id_tipoensino": 2, "id_modelo": 3, "id_ano": 20 },

    { "id": 39, "id_turno": 1, "id_tipoensino": 2, "id_modelo": 4, "id_ano": 10 },
    { "id": 40, "id_turno": 1, "id_tipoensino": 2, "id_modelo": 4, "id_ano": 11 },
    { "id": 41, "id_turno": 1, "id_tipoensino": 2, "id_modelo": 4, "id_ano": 12 },

    { "id": 42, "id_turno": 2, "id_tipoensino": 2, "id_modelo": 4, "id_ano": 10 },
    { "id": 43, "id_turno": 2, "id_tipoensino": 2, "id_modelo": 4, "id_ano": 11 },
    { "id": 44, "id_turno": 2, "id_tipoensino": 2, "id_modelo": 4, "id_ano": 12 },

    { "id": 45, "id_turno": 4, "id_tipoensino": 2, "id_modelo": 4, "id_ano": 10 },
    { "id": 46, "id_turno": 4, "id_tipoensino": 2, "id_modelo": 4, "id_ano": 11 },
    { "id": 47, "id_turno": 4, "id_tipoensino": 2, "id_modelo": 4, "id_ano": 12 },

    { "id": 48, "id_turno": 1, "id_tipoensino": 2, "id_modelo": 1, "id_ano": 10 },
    { "id": 49, "id_turno": 1, "id_tipoensino": 2, "id_modelo": 1, "id_ano": 11 },
    { "id": 50, "id_turno": 1, "id_tipoensino": 2, "id_modelo": 1, "id_ano": 12 },

    { "id": 51, "id_turno": 2, "id_tipoensino": 2, "id_modelo": 1, "id_ano": 10 },
    { "id": 52, "id_turno": 2, "id_tipoensino": 2, "id_modelo": 1, "id_ano": 11 },
    { "id": 53, "id_turno": 2, "id_tipoensino": 2, "id_modelo": 1, "id_ano": 12 }

]

const modelShifts = [
    {
        "id": 1,
        "id_turno": 1,
        "id_modelo": 1,
        "horario": {
            "inicio": "07:00:00",
            "fim": "12:35:00"
        }
    },
    {
        "id": 2,
        "id_turno": 2,
        "id_modelo": 1,
        "horario": {
            "inicio": "13:00:00",
            "fim": "18:35:00"
        }
    },
    {
        "id": 3,
        "id_turno": 3,
        "id_modelo": 1,
        "horario": {
            "inicio": "19:00:00",
            "fim": "23:00:00"
        }
    },
    {
        "id": 4,
        "id_turno": 4,
        "id_modelo": 2,
        "horario": {
            "inicio": "07:00:00",
            "fim": "16:00:00"
        }
    },
    {
        "id": 5,
        "id_turno": 1,
        "id_modelo": 2,
        "horario": {
            "inicio": "07:00:00",
            "fim": "14:00:00"
        }
    },
    {
        "id": 6,
        "id_turno": 2,
        "id_modelo": 2,
        "horario": {
            "inicio": "14:15:00",
            "fim": "21:15:00"
        }
    },
    {
        "id": 7,
        "id_turno": 3,
        "id_modelo": 3,
        "horario": {
            "inicio": "19:00:00",
            "fim": "23:00:00"
        }
    }
]

const shifts = [
    { "id": 1, "descricao": "MANHÃ", "ordem": 1 },
    { "id": 2, "descricao": "TARDE", "ordem": 2 },
    { "id": 3, "descricao": "NOITE", "ordem": 3 },
    { "id": 4, "descricao": "INTEGRAL", "ordem": 4 }
]
const models = [
    { "id": 1, "descricao": "Parcial" },
    { "id": 2, "descricao": "Integral" },
    { "id": 3, "descricao": "EJA" },
    { "id": 4, "descricao": "NOVOTEC" }
]

const data = { 'junctions': junctions, 'modelShifts': modelShifts, 'shifts': shifts, 'models': models };

// Test cases
Test("FormatResult: ", FormatResult(distanceCloses, data), null);

wayVisions, wayNeighbors, data, components)
