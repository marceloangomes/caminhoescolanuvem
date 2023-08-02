export {Test};

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
        "escola": {
            "codigo_cie": 42055,
            "nome": "EE Brazilia Tondi de Lima",
            "endereco": "Rua Izabel de Andrade Lima, 733 – Vila São José, Ferrazópolis, São Bernardo do Campo",
            "contato": "(11)4127-9190 (11)4335-3868",
            "lat": -23.732824,
            "lng": -46.535157,
            "vizinha": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selecionada": false,
            "juncoesId": [
                5
            ]
        },
        "dist": 2236,
        "enderecoDestino": [
            "R. Itamarajú, 1 - Ferrazópolis, São Bernardo do Campo - SP, 09790-430, Brasil"
        ],
        "enderecoOrigem": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "2,2 km",
        "tempo": "32 minutos"
    },
    {
        "escola": {
            "codigo_cie": 9246,
            "nome": "EE Carlos Pezzolo, Prof.",
            "endereco": "Rua Tiradentes, 1755 – Vila do Tanque, Santa Terezinha, São Bernardo do Campo",
            "contato": "(11)4127-4636 (11)4127-1241",
            "lat": -23.724709,
            "lng": -46.534068,
            "vizinha": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selecionada": false,
            "juncoesId": [
                5
            ]
        },
        "dist": 1620,
        "enderecoDestino": [
            "R. Tiradentes, 68 - Santa Terezinha, São Bernardo do Campo - SP, 29043-021, Brasil"
        ],
        "enderecoOrigem": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "1,6 km",
        "tempo": "20 minutos"
    },
    {
        "escola": {
            "codigo_cie": 9167,
            "nome": "EE Joaquim Moreira Bernardes, Prof.",
            "endereco": "Avenida Conde de São Lourenço, 65 – Jardim Silvina, Montanhão, São Bernardo do Campo",
            "contato": "(11)4127-3242 (11)4335-4005",
            "lat": -23.738233,
            "lng": -46.531196,
            "vizinha": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selecionada": false,
            "juncoesId": [
                5
            ]
        },
        "dist": 3268,
        "enderecoDestino": [
            "Av. Conde de São Lourenço, 65 - Ferrazópolis, São Bernardo do Campo - SP, 09791-260, Brasil"
        ],
        "enderecoOrigem": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "3,3 km",
        "tempo": "45 minutos"
    },
    {
        "escola": {
            "codigo_cie": 902020,
            "nome": "EE Luis dos Santos, Metalúrgico",
            "endereco": "Rua Primo Bechelli, 133 – Parque Selecta, Montanhão, São Bernardo do Campo",
            "contato": "(11)4127-7268 (11)4335-4208",
            "lat": -23.741424,
            "lng": -46.527942,
            "vizinha": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selecionada": false,
            "juncoesId": [
                18
            ]
        },
        "dist": 4133,
        "enderecoDestino": [
            "R. Primo Bechelli, 130 - Montanhão, São Bernardo do Campo - SP, 09791-620, Brasil"
        ],
        "enderecoOrigem": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "4,1 km",
        "tempo": "57 minutos"
    },
    {
        "escola": {
            "codigo_cie": 9155,
            "nome": "EE Luiza Collaço Queiroz Fonseca, Profª.",
            "endereco": "Rua Vicente Moreira da Rocha, 44 – Ferrazópolis, São Bernardo do Campo",
            "contato": "(11)4127-9122 (11)4335-3787",
            "lat": -23.726979,
            "lng": -46.542492,
            "vizinha": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selecionada": false,
            "juncoesId": [
                18
            ]
        },
        "dist": 2908,
        "enderecoDestino": [
            "Av. Albert Schweitzer, 647 - Ferrazópolis, São Bernardo do Campo - SP, 09790-000, Brasil"
        ],
        "enderecoOrigem": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "2,9 km",
        "tempo": "38 minutos"
    },
    {
        "escola": {
            "codigo_cie": 38519,
            "nome": "EE Maria Cristina Schmidt Miranda, Profª.",
            "endereco": "Rua Abramo Luchesi, 12 – Jardim Leblon, Ferrazópolis, São Bernardo do Campo",
            "contato": "(11)4127-7544 (11)4335-1847",
            "lat": -23.723466,
            "lng": -46.539456,
            "vizinha": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selecionada": false,
            "juncoesId": [
                5
            ]
        },
        "dist": 2384,
        "enderecoDestino": [
            "R. Ábramo Luchesi, 12 - Jardim Leblon, São Bernardo do Campo - SP, 09781-030, Brasil"
        ],
        "enderecoOrigem": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "2,4 km",
        "tempo": "30 minutos"
    },
    {
        "escola": {
            "codigo_cie": 924428,
            "nome": "EE Mauricio de Castro",
            "endereco": "Rua do Oleoduto, s/n – Vila São Pedro, Montanhão, São Bernardo do Campo",
            "contato": "(11)4335-9235 (11)4335-4426",
            "lat": -23.717734,
            "lng": -46.526362,
            "vizinha": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selecionada": false,
            "juncoesId": [
                5
            ]
        },
        "dist": 964,
        "enderecoDestino": [
            "R. do Oleoduto, 66 - Montanhão, São Bernardo do Campo - SP, 09784-050, Brasil"
        ],
        "enderecoOrigem": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "1,0 km",
        "tempo": "12 minutos"
    },
    {
        "escola": {
            "codigo_cie": 921543,
            "nome": "EE Nelson Monteiro Palma, Prof.",
            "endereco": "Rua Francisco Bonicio, s/n – Jardim Irajá, Santa Terezinha, São Bernardo do Campo",
            "contato": "(11)4335-3684 (11)4335-3627",
            "lat": -23.723931,
            "lng": -46.533096,
            "vizinha": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selecionada": false,
            "juncoesId": [
                5
            ]
        },
        "dist": 1946,
        "enderecoDestino": [
            "R. Francisco Bonício, s/n - Irajá, São Bernardo do Campo - SP, 09781-260, Brasil"
        ],
        "enderecoOrigem": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "1,9 km",
        "tempo": "25 minutos"
    },
    {
        "escola": {
            "codigo_cie": 42043,
            "nome": "EE Palmira Grassiotto Ferreira da Silva, Profª.",
            "endereco": "Rua Almeida Leme, 100 – Parque São Bernardo, São Bernardo do Campo",
            "contato": "(11)4121-1848 (11)4330-5426",
            "lat": -23.709007,
            "lng": -46.524704,
            "vizinha": false,
            "de": "SAO BERNARDO DO CAMPO",
            "selecionada": false,
            "juncoesId": [
                18
            ]
        },
        "dist": 2172,
        "enderecoDestino": [
            "R. Paula Souza, 104 - Parque Sao Bernardo, São Bernardo do Campo - SP, 09761-180, Brasil"
        ],
        "enderecoOrigem": [
            "R. dos Pássaros, 231 - Montanhão, São Bernardo do Campo - SP, 09784-085, Brasil"
        ],
        "distLongo": "2,2 km",
        "tempo": "31 minutos"
    }
]

  // Test cases
  Test("FormatResult: ", FormatResult(distanceCloses), null);
  