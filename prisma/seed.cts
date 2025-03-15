import { BlogStatus, PrismaClient, Therapy } from "@prisma/client";
import { faker } from "@faker-js/faker";
import slugify from "slugify";
const prisma = new PrismaClient();
async function main() {
  // await createGeriatrics();
  // await createTestimonials();
  // return;
  const categorias = {
    bienestar: "Bienestar",
    consejos: "Consejos",
    residencias: "Residencias",
    actividades: "Actividades",
  };
  for (const [slug, name] of Object.entries(categorias)) {
    await prisma.blogCategory.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    });
  }
  const blogPosts = [
    {
      id: 1,
      title: "Cómo elegir la residencia geriátrica adecuada para tu familiar",
      excerpt:
        "Factores clave a considerar al momento de seleccionar una residencia geriátrica que se adapte a las necesidades específicas de tu ser querido.",
      date: "15 de marzo, 2023",
      readTime: 8,
      author: "Dra. María Rodríguez",
      authorRole: "Especialista en Gerontología",
      category: "consejos",
      image: "/placeholder.svg?height=500&width=1000&text=Elegir+Residencia",
      content: `
        <p>Elegir una residencia geriátrica para un ser querido es una de las decisiones más importantes y emocionalmente desafiantes que muchas familias enfrentan. Esta elección puede tener un impacto significativo en la calidad de vida, la salud y el bienestar emocional del adulto mayor. Por eso, es fundamental abordar este proceso con información, paciencia y considerando múltiples factores.</p>
        
        <h2>Evalúa las necesidades específicas</h2>
        
        <p>Antes de comenzar la búsqueda, es esencial evaluar detalladamente las necesidades actuales y futuras de tu familiar:</p>
        
        <ul>
          <li><strong>Nivel de atención médica requerida:</strong> ¿Necesita supervisión constante, atención especializada para condiciones como Alzheimer o Parkinson, o simplemente asistencia con actividades básicas diarias?</li>
          <li><strong>Movilidad:</strong> ¿Utiliza silla de ruedas, andador o tiene dificultades para desplazarse?</li>
          <li><strong>Estado cognitivo:</strong> ¿Presenta deterioro cognitivo que requiera atención especializada?</li>
          <li><strong>Preferencias personales:</strong> Considera sus gustos, rutinas y actividades favoritas.</li>
        </ul>
        
        <p>Esta evaluación te ayudará a filtrar opciones y enfocarte en residencias que realmente puedan satisfacer sus necesidades específicas.</p>
        
        <h2>Factores clave a considerar</h2>
        
        <h3>1. Ubicación y accesibilidad</h3>
        
        <p>La ubicación es fundamental por varios motivos:</p>
        
        <ul>
          <li>Cercanía a familiares para facilitar visitas frecuentes</li>
          <li>Proximidad a centros médicos en caso de emergencias</li>
          <li>Entorno (urbano o tranquilo) según las preferencias del adulto mayor</li>
          <li>Accesibilidad mediante transporte público para visitantes</li>
        </ul>
        
        <h3>2. Instalaciones y ambiente</h3>
        
        <p>El espacio físico donde vivirá tu familiar debe ser seguro, cómodo y adaptado a sus necesidades:</p>
        
        <ul>
          <li>Limpieza e higiene de todas las áreas</li>
          <li>Adaptaciones para movilidad reducida (rampas, pasamanos, baños adaptados)</li>
          <li>Espacios comunes agradables y bien mantenidos</li>
          <li>Áreas verdes o jardines para actividades al aire libre</li>
          <li>Habitaciones privadas o compartidas según preferencia</li>
          <li>Sistemas de seguridad y prevención de incendios</li>
        </ul>
        
        <div class="my-8">
          <img src="/placeholder.svg?height=400&width=800&text=Instalaciones+Adecuadas" alt="Instalaciones adecuadas para adultos mayores" class="rounded-lg w-full" />
          <p class="text-sm text-gray-500 mt-2 text-center">Las instalaciones deben ser seguras y adaptadas a las necesidades de movilidad de los residentes.</p>
        </div>
        
        <h3>3. Personal y atención</h3>
        
        <p>La calidad del personal es quizás el factor más determinante en el bienestar diario de los residentes:</p>
        
        <ul>
          <li>Proporción adecuada de personal por residente</li>
          <li>Formación y experiencia del equipo</li>
          <li>Presencia de profesionales especializados (médicos, enfermeros, fisioterapeutas)</li>
          <li>Trato amable, respetuoso y paciente hacia los residentes</li>
          <li>Disponibilidad de atención médica las 24 horas</li>
        </ul>
        
        <p>No dudes en observar cómo interactúa el personal con los residentes durante tu visita. Esta observación puede revelar mucho sobre la cultura de cuidado de la institución.</p>
        
        <h3>4. Servicios y actividades</h3>
        
        <p>Una buena residencia debe ofrecer más que cuidados básicos; debe promover una vida activa y significativa:</p>
        
        <ul>
          <li>Programa de actividades variadas (físicas, cognitivas, sociales, culturales)</li>
          <li>Servicios de fisioterapia y rehabilitación</li>
          <li>Alimentación balanceada y adaptada a necesidades dietéticas</li>
          <li>Servicios adicionales como peluquería, podología, etc.</li>
          <li>Atención psicológica y emocional</li>
        </ul>
        
        <h3>5. Costos y transparencia</h3>
        
        <p>Es fundamental entender completamente la estructura de costos:</p>
        
        <ul>
          <li>Tarifa base y qué incluye</li>
          <li>Servicios adicionales y sus costos</li>
          <li>Políticas de aumento de tarifas</li>
          <li>Depósitos o pagos iniciales requeridos</li>
          <li>Opciones de financiamiento o cobertura por obras sociales</li>
        </ul>
        
        <p>Solicita siempre un desglose detallado por escrito de todos los costos para evitar sorpresas posteriores.</p>
        
        <h2>El proceso de selección</h2>
        
        <h3>1. Investigación inicial</h3>
        
        <p>Comienza recopilando opciones a través de:</p>
        
        <ul>
          <li>Recomendaciones de médicos o trabajadores sociales</li>
          <li>Plataformas especializadas como Abrazarte</li>
          <li>Opiniones de otras familias</li>
          <li>Directorios de residencias habilitadas</li>
        </ul>
        
        <h3>2. Visitas presenciales</h3>
        
        <p>Nada reemplaza la visita en persona. Recomendamos:</p>
        
        <ul>
          <li>Visitar sin previo aviso (si es posible)</li>
          <li>Programar visitas en diferentes horarios</li>
          <li>Observar la interacción entre personal y residentes</li>
          <li>Probar la comida si es posible</li>
          <li>Hablar con residentes actuales y sus familiares</li>
        </ul>
        
        <h3>3. Preguntas clave</h3>
        
        <p>Durante tus visitas, no dudes en preguntar sobre:</p>
        
        <ul>
          <li>Protocolos de emergencia</li>
          <li>Políticas de medicación</li>
          <li>Rotación de personal</li>
          <li>Manejo de situaciones difíciles (caídas, agitación)</li>
          <li>Flexibilidad para personalizar la atención</li>
          <li>Políticas de visitas y salidas</li>
        </ul>
        
        <div class="bg-primary/5 p-6 rounded-lg my-8">
          <h4 class="font-bold text-lg mb-2">Consejo profesional</h4>
          <p>Confía en tu intuición. Si algo no se siente bien durante la visita, probablemente haya una razón. La atmósfera general y cómo te sientes en el lugar son indicadores importantes que no deben ignorarse.</p>
        </div>
        
        <h2>La transición</h2>
        
        <p>Una vez elegida la residencia, es importante planificar cuidadosamente la transición:</p>
        
        <ul>
          <li>Personaliza el espacio con objetos familiares y fotografías</li>
          <li>Establece una rutina de visitas regulares</li>
          <li>Mantén comunicación constante con el personal</li>
          <li>Sé paciente con el proceso de adaptación</li>
          <li>Involúcrate en actividades y decisiones cuando sea apropiado</li>
        </ul>
        
        <h2>Conclusión</h2>
        
        <p>Elegir la residencia geriátrica adecuada requiere tiempo, investigación y consideración cuidadosa de múltiples factores. Recuerda que el objetivo final es proporcionar a tu ser querido un entorno seguro, estimulante y digno donde pueda disfrutar de esta etapa de su vida con la mejor calidad posible.</p>
        
        <p>En Abrazarte entendemos lo desafiante que puede ser este proceso, y estamos aquí para acompañarte en cada paso del camino. Nuestra plataforma te permite filtrar opciones según tus necesidades específicas, acceder a opiniones verificadas y comparar residencias de manera transparente.</p>
      `,
      tags: ["residencias geriátricas", "adultos mayores", "cuidado", "tercera edad", "elección"],
      relatedPosts: [2, 3, 4],
    },
    {
      id: 2,
      title: "Beneficios de las actividades recreativas para adultos mayores",
      excerpt:
        "Descubre cómo las actividades recreativas mejoran la calidad de vida, estimulan la mente y fortalecen las relaciones sociales en la tercera edad.",
      date: "28 de febrero, 2023",
      category: "bienestar",
      image: "/placeholder.svg?height=200&width=400&text=Actividades+Recreativas",
    },
    {
      id: 3,
      title: "Señales que indican que es momento de considerar una residencia geriátrica",
      excerpt:
        "Reconocer cuándo un adulto mayor necesita cuidados especializados es fundamental para garantizar su bienestar y seguridad.",
      date: "10 de febrero, 2023",
      category: "consejos",
      image: "/placeholder.svg?height=200&width=400&text=Señales+Importantes",
    },
    {
      id: 4,
      title: "Cómo manejar la transición a una residencia geriátrica",
      excerpt:
        "Estrategias para facilitar la adaptación de tu ser querido a su nuevo hogar y minimizar el impacto emocional del cambio.",
      date: "5 de febrero, 2023",
      category: "consejos",
      image: "/placeholder.svg?height=200&width=400&text=Transición",
    },
  ];
  for (const { relatedPosts, date, id, ...post } of blogPosts) {
    const category = await prisma.blogCategory.findFirst({
      where: {
        slug: post.category,
      },
    });
    if (category == null) continue;
    await prisma.blogPost.upsert({
      where: {
        id: String(id),
        slug: slugify(post.title, { lower: true }),
      },
      update: {
        ...post,
        slug: slugify(post.title, { lower: true }),
        category: { connect: { id: category.id } },
        tags: post.tags?.join(",") || "",
        author: post.author || "Pepe",
        authorRole: post.authorRole || "Autor",
        content: post.content || "Contenido de ejemlo",
        status: BlogStatus.PUBLISHED,
      },
      create: {
        ...post,
        slug: slugify(post.title, { lower: true }),
        category: { connect: { id: category.id } },
        tags: post.tags?.join(",") || "",
        author: post.author || "Pepe",
        authorRole: post.authorRole || "Autor",
        content: post.content || "Contenido de ejemlo",
        status: BlogStatus.PUBLISHED,
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

async function createGeriatrics() {
  for (let i = 0; i < 100; i++) {
    const reviews = faker.number.int(7);
    await prisma.geriatric.create({
      data: {
        country: "Argentina",
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        province: faker.location.state(),
        name: faker.company.name(),
        description: faker.lorem.paragraph(),
        priceRangeMin: Number(faker.finance.amount({ min: 0, max: 10000 })),
        priceRangeMax: Number(faker.finance.amount({ min: 10000, max: 10000000 })),
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
            data: [1, 2, 3, 4].map(() => ({ url: faker.image.url() })),
          },
        },

        reviews: {
          createMany: {
            data: Array(1)
              .fill(0)
              .map(() => ({
                rating: faker.number.int(10),
                userId: "cm7wfubdk0001hkh8d677tkrh",
                comment: faker.lorem.paragraph(),
              })),
          },
        },
        reviewCount: reviews,
        // therapies: {
        //   create: {
        //     therapy: faker.helpers.enumValue(Therapy),
        //   },
        // },

        latitude: Number(faker.location.latitude()),
        longitude: Number(faker.location.longitude()),
        mainImage: faker.image.url(),

        street: faker.location.street(),
        streetNumber: String(faker.number.int(7000)),
      },
    });
  }
}

async function createTestimonials() {
  for (let i = 0; i < 8; i++) {
    await prisma.testimonial.create({
      data: {
        quote: faker.lorem.sentence(),
        userId: faker.string.ulid(),
        location: faker.location.city() + ", " + faker.location.state(),
        rating: faker.number.int(5),
      },
    });
  }
}
