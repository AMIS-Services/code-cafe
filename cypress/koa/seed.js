const request = require("request-promise");

const users = [
  {
    email: "bram.kaashoek@amis.nl",
    password: "123",
    username: "Bram",
    favoriteAccommodations: []
  }
];

const accommodations = [
  {
    name: "Romantische vuurtoren",
    location: "Scheveningen",
    favorite: false,
    images: [
      "http://infomarken.com/wp-content/uploads/2016/03/tourPaard1.jpg",
      "http://www.nieman.nl/wp-content/uploads/2017/08/Interieur-De-Vuurtoren-Kop-Noordereiland-Harderwijk.jpg",
      "https://static.webshopapp.com/shops/186977/files/089588126/image.jpg"
    ],
    amenities: [
      "stofzuiger",
      "strijkijzer",
      "WiFi",
      "droger",
      "verwarming",
      "TV",
      "wieg",
      "airconditioning",
      "verduisterende gordijnen",
      "centrale verwarming",
      "beddegoed",
      "parkeerplek",
      "feun",
      "shampoo en conditioner",
      "wasmachine",
      "droger",
      "zeep",
      "tuin",
      "schommel",
      "EHBO kit"
    ],
    description:
      "Een zeer romantische lokatie aan de zee. Verblijf in een authentieke vuurtoren en overzie vanaf grote hoogte de zee. Enkel voor gasten met een goede conditie."
  },
  {
    name: "Bezemkast in Amsterdam",
    location: "Amsterdam",
    favorite: false,
    images: [
      "https://i.pinimg.com/originals/db/2b/20/db2b207c1bb61e5b7d1bafe1c81455ff.jpg",
      "https://ronafischman.com/wp-content/uploads/2015/10/Understairs.bedroom.jpg"
    ],
    amenities: ["WiFi", "verwarming", "beddegoed", "zeep", "EHBO kit"],
    description:
      "De beste woning die je in Amsterdam gaat vinden onder de 500 euro per nacht. Accepteer de realiteit van de woningnood en zie de positieve kant in: het is erg knus."
  },
  {
    name: "Hutje op de hei",
    location: "De Veluwe",
    favorite: false,
    images: [
      "https://i.pinimg.com/originals/b6/e8/12/b6e812e996f90dc575acb6207235adf5.jpg",
      "https://roomed.nl/wp-content/uploads/2017/06/roomed-amsterdamse-loft4.jpg",
      "https://cdn.shopify.com/s/files/1/2954/9184/files/slow-cabins-interieur5_2048x2048.jpg?v=1520013611"
    ],
    amenities: [
      "stofzuiger",
      "strijkijzer",
      "verwarming",
      "wieg",
      "beddegoed",
      "parkeerplek",
      "kookgerei",
      "fornuis",
      "koffiezet apparaat",
      "eetgerei",
      "koelkast",
      "feun",
      "shampoo en conditioner",
      "zeep",
      "tuin",
      "schommel",
      "EHBO kit"
    ],
    description:
      "Wat is nou een klassiekere Nederlands verblijfsplaats dan een hutje op de hei? Als je even weg wil van de drukte en belachelijkhe huizenprijzen van de stad is dit een perfecte locatie"
  },
  {
    name: "Vakantievilla Vacuna",
    location: "Domburg",
    favorite: true,
    images: [
      "http://www.zeelandrelais.com/files/DSC00204.jpg",
      "https://static.ferienhausmiete.de/pictures/106343/bilder_original/106343_1462960274.jpg",
      "https://static.ferienhausmiete.de/pictures/106343/bilder_original/106343_1340009402.jpg"
    ],
    amenities: [
      "stofzuiger",
      "WiFi",
      "droger",
      "verwarming",
      "TV",
      "wieg",
      "centrale verwarming",
      "beddegoed",
      "parkeerplek",
      "kookgerei",
      "fornuis",
      "koffiezet apparaat",
      "eetgerei",
      "magnetron/oven combinatie",
      "koelkast",
      "vaatwasser",
      "feun",
      "shampoo en conditioner",
      "wasmachine",
      "droger",
      "zeep",
      "tuin",
      "EHBO kit"
    ],
    description:
      "Een rustieke vakantievilla gelegen in Domburg aan de zeeuwse kust. Uitstekende beheersing van de Duitse taal is helaas wel een vereist voor communicatie in de omgeving."
  },
  {
    name: "Appartement voor twee personen",
    location: "Utrecht",
    favorite: false,
    images: [
      "http://www.interieur-inrichting.net/afbeeldingen/knus-scandinavisch-appartement-645x484.jpg"
    ],
    amenities: [
      "WiFi",
      "droger",
      "verwarming",
      "TV",
      "verduisterende gordijnen",
      "centrale verwarming",
      "beddegoed",
      "kookgerei",
      "fornuis",
      "koffiezet apparaat",
      "eetgerei",
      "magnetron/oven combinatie",
      "koelkast",
      "vaatwasser"
    ],
    description:
      "Een appartement voor twee personen in Utrecht. Ingericht in typische vtwonen stijl. Mooi op het plaatje maar in de realiteit veel te wit."
  }
];

const getOptions = (path, body, token = undefined) => {
  const options = {
    url: `http://localhost:3030/${path}`,
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(body)
  };
  if (token) options.headers["Authorization"] = `Bearer ${token}`;
  return options;
};

const seed = async options => {
  await request(options, (err, res) => {
    if (err) console.log(err);
    if (res && res.statusCode === 200) console.log(`seeded on ${options.url}`);
    if (res && res.statusCode !== 200)
      console.log(`error: statuscode ${res.statusCode}`);
  });
};

// seed users
const userPromises = users.map(async user => {
  const options = getOptions("users", user);
  await seed(options);
});

// wait for all users to be seeded
let token = undefined;
Promise.all(userPromises).then(async () => {
  // get auth token for the first user
  await request(
    getOptions("auth", {
      ...users[0]
    }),
    (_, res) => {
      console.log(`got auth token`);
      token = JSON.parse(res.body).jwt;
      accommodations.map(acc => {
        const options = getOptions("accommodations", acc, token);
        seed(options);
      });
    }
  );
});
