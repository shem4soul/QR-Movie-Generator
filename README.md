🎬 QR Code Movie Generator - NestJS + Prisma Backend
This is a full-stack-ready NestJS backend project that generates QR codes linked to dynamically created movie batches. Each QR code corresponds to a unique token representing a batch of 10 random movies stored in a PostgreSQL database using Prisma.

🚀 Features
✅ Generates a QR code linking to a batch of 10 randomly selected movies.

🔄 Generates a new QR and movie batch with every request.

🎥 Stores and fetches movies using PostgreSQL via Prisma ORM.

🧰 API endpoints to:

Seed movie data.

Generate new movie batches.

Retrieve movies using a batch token.

🌐 Built with NestJS, TypeScript, Prisma, and PostgreSQL.

🧪 Easily testable via Postman or browser.

📂 Project Structure
graphql
Copy
Edit
src/
├── movies/         # Movie logic (controllers, services)
├── prisma/         # Prisma service (DB access)
├── qr/             # QR code logic
├── app.module.ts   # App entry point
├── main.ts         # Server bootstrap
prisma/
├── schema.prisma   # Prisma schema
🏁 Getting Started
1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/your-username/qr-movie-generator.git
cd qr-movie-generator
2. Install Dependencies
bash
Copy
Edit
npm install
3. Set Up Prisma
Make sure your PostgreSQL database is running, then update your .env:

ini
Copy
Edit
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<db_name>?schema=public"
Then run:

bash
Copy
Edit
npx prisma generate
npx prisma migrate dev --name init
(Optional) Seed with movie data:

bash
Copy
Edit
npx ts-node prisma/seed.ts
4. Run the Server
bash
Copy
Edit
npm run start
🧪 API Testing (via Postman)
POST /movies/generate-batch
➤ Generates a new movie batch and returns a token.

GET /movies/batch/:token
➤ Returns movies associated with a given token.

GET /movies/:imdbID
➤ Returns a single movie by IMDB ID.

GET /qr
➤ Displays a rendered QR code linking to the batch.

🌐 Live Demo
👉 QR Movie Generator on Render

This opens a live NestJS backend that generates a QR code linking to a random batch of 10 movies.