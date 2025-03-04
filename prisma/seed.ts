import { PrismaClient, Therapy } from "@prisma/client";
import { faker, th } from "@faker-js/faker";
const prisma = new PrismaClient();
async function main() {
  for (const i of Array(100).keys()) {
    let reviews = faker.number.int(7);
    await prisma.geriatric.create({
      data: {
        country: "Argentina",
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        province: faker.location.state(),
        name: faker.company.name(),
        description: faker.lorem.paragraph(),
        priceRangeMin: Number(faker.finance.amount({ min: 0, max: 10000 })),
        priceRangeMax: Number(faker.finance.amount({ min: 10000, max: 500000 })),

        hasDayCare: faker.datatype.boolean(),
        hasPermanentStay: faker.datatype.boolean(),
        hasPrivateRoom: faker.datatype.boolean(),
        hasSharedRoom: faker.datatype.boolean(),
        hasPrivateBath: faker.datatype.boolean(),
        hasSharedBath: faker.datatype.boolean(),
        hasBasicCare: faker.datatype.boolean(),
        hasSpecializedCare: faker.datatype.boolean(),
        hasAlzheimerCare: faker.datatype.boolean(),
        hasReducedMobility: faker.datatype.boolean(),
        has24hMedical: faker.datatype.boolean(),

        images: {
          createMany: {
            data: [1, 2, 3, 4].map((e) => ({ url: faker.image.url() })),
          },
        },

        reviews: {
          createMany: {
            data: Array(reviews)
              .fill(0)
              .map((e) => ({ rating: faker.number.int(10), userId: faker.string.ulid(), comment: faker.lorem.paragraph() })),
          },
        },
        reviewCount: reviews,
        therapies: {
          create: {
            therapy: faker.helpers.enumValue(Therapy),
          },
        },

        latitude: Number(faker.location.latitude()),
        longitude: Number(faker.location.longitude()),
        mainImage: faker.image.url(),

        street: faker.location.street(),
        streetNumber: String(faker.number.int(7000)),
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
