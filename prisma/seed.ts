import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, "../src/movies/movies.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const movies = JSON.parse(jsonData);

  for (const movie of movies) {
    await prisma.movie.upsert({
      where: { imdbID: movie.imdbID },
      update: {},
      create: {
        imdbID: movie.imdbID,
        title: movie.Title,
        poster: movie.Poster,
        year: movie.Year,
        rating: movie.Rated,
        plot: movie.Plot,
      },
    });
  }

  console.log("✅ Movies seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
