const { Campuses, Students } = require("./db/models");
const db = require("./db/db");
const { faker } = require("@faker-js/faker");

const generateDummyStudents = (count, campusIds) => {
  const students = [];
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({
      firstName: firstName,
      lastName: lastName,
    });
    const imageUrl = faker.image.avatar();
    const gpa = faker.number.float({ min: 0.0, max: 4.0 });
    const campusId = getRandomElement(campusIds);

    students.push({
      firstName,
      lastName,
      email,
      imageUrl,
      gpa,
      campusId,
    });
  }
  return students;
};

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const generateDummyCampuses = (count) => {
  const campuses = [];
  for (let i = 0; i < count; i++) {
    const name = faker.company.name();
    const imageUrl = faker.image.url();
    const address = faker.location.streetAddress();
    const description = faker.lorem.paragraph();

    campuses.push({
      name,
      imageUrl,
      address,
      description,
    });
  }
  return campuses;
};

const seed = async () => {
  await db.sync({ force: true });
  const seedCampuses = generateDummyCampuses(5);
  // Seed the campuses
  const createdCampuses = await Campuses.bulkCreate(seedCampuses, {
    returning: true,
  });
  // Get the campus IDs
  const campusIds = createdCampuses.map((campus) => campus.id);

  // Generate dummy students with foreign key references
  const seedStudents = generateDummyStudents(10, campusIds);
  // Seed the students
  await Students.bulkCreate(seedStudents);

  process.exit();
};

seed().catch((error) => {
  console.error("Seeding error:", error);
  process.exit(1);
});
