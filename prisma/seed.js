import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const userId = "c6b042e9-e2ac-4302-83a9-f0ad7edc57ee";
const movies = [
    {
        "title": "The Shawshank Redemption",
        "overview": "Two imprisoned men bond over a number of years.",
        "releaseYear": 1994,
        "runtime": 142,
        "posterUrl": "https://example.com/shawshank.jpg",
        "createdBy": userId
    },
    {
        "title": "The Godfather",
        "overview": "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
        "releaseYear": 1972,
        "runtime": 175,
        "posterUrl": "https://example.com/godfather.jpg",
        "createdBy": userId
    },
    {
        "title": "Inception",
        "overview": "A thief who steals corporate secrets through dream-sharing technology is given the inverse task.",
        "releaseYear": 2010,
        "runtime": 148,
        "posterUrl": "https://example.com/inception.jpg",
        "createdBy": userId
    },
    {
        "title": "The Dark Knight",
        "overview": "Batman must accept one of the greatest psychological and physical tests to fight injustice.",
        "releaseYear": 2008,
        "runtime": 152,
        "posterUrl": "https://example.com/darkknight.jpg",
        "createdBy": userId
    },
    {
        "title": "Pulp Fiction",
        "overview": "The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine.",
        "releaseYear": 1994,
        "runtime": 154,
        "posterUrl": "https://example.com/pulpfiction.jpg",
        "createdBy": userId
    },
    {
        "title": "Forrest Gump",
        "overview": "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man.",
        "releaseYear": 1994,
        "runtime": 142,
        "posterUrl": "https://example.com/forrestgump.jpg",
        "createdBy": userId
    },
    {
        "title": "The Matrix",
        "overview": "A computer hacker learns about the true nature of his reality and his role in the war.",
        "releaseYear": 1999,
        "runtime": 136,
        "posterUrl": "https://example.com/matrix.jpg",
        "createdBy": userId
    },
    {
        "title": "Interstellar",
        "overview": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        "releaseYear": 2014,
        "runtime": 169,
        "posterUrl": "https://example.com/interstellar.jpg",
        "createdBy": userId
    },
    {
        "title": "The Lion King",
        "overview": "Lion prince Simba flees his kingdom only to learn the true meaning of responsibility.",
        "releaseYear": 1994,
        "runtime": 88,
        "posterUrl": "https://example.com/lionking.jpg",
        "createdBy": userId
    },
    {
        "title": "Gladiator",
        "overview": "A former Roman General sets out to exact vengeance against the corrupt emperor.",
        "releaseYear": 2000,
        "runtime": 155,
        "posterUrl": "https://example.com/gladiator.jpg",
        "createdBy": userId
    }
];
const main = async () => {
    console.log("Seeding movies");

    for (const movie of movies) {
        await prisma.movie.create({
            data: movie,
        })
        console.log(`Created movie : ${movie.title}`);

        console.log("Seeding completed");
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect()
})