const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Initial Data Seed if empty
async function initializeDB() {
  try {
    const configCount = await prisma.siteConfig.count();
    if (configCount === 0) {
      const initialConfig = {
        hero: {
          bg: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000&auto=format&fit=crop',
          title: 'The Standard of Elite Service in Kigali',
          subtitle: 'Weddings, protocol, and cultural experiences delivered with discipline, beauty, and excellence.',
          slides: []
        },
        services: {
          protocol: 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?q=80&w=1000&auto=format&fit=crop'
        },
        leadership: {
          photo: 'https://images.unsplash.com/photo-1544168190-79c17527004f',
          name: 'Executive Director',
          vision: 'In the heart of Kabuga, elite service is more than a protocol—it’s an art form.'
        },
        social: { instagram: '#', facebook: '#', mail: 'mailto:contact@alpha.rw' },
        contact: {
          phone: '+250 7XX XXX XXX',
          email: 'contact@alpha.rw',
          address: '26CF+FH5 Kabuga Bus Station, Kabuga, Kigali, Rwanda'
        }
      };
      await prisma.siteConfig.create({
        data: { id: 1, config: JSON.stringify(initialConfig) }
      });
    }

    const imageCount = await prisma.image.count();
    if (imageCount === 0) {
      await prisma.image.createMany({
        data: [
          { url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62', title: 'Coffee Ritual' },
          { url: 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb', title: 'Ingenzi Dancers' }
        ]
      });
    }
  } catch (err) {
    console.error("Initialization error (DB might not be ready):", err);
  }
}

// Run init asynchronously so the app doesn't block if Neon DB is connecting.
initializeDB();

module.exports = {
  // Bookings helpers
  getBookings: async () => {
    return await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' }
    });
  },
  addBooking: async (booking) => {
    return await prisma.booking.create({
      data: {
        id: booking.id,
        name: booking.name,
        email: booking.email,
        serviceType: booking.serviceType,
        eventDate: booking.eventDate,
        location: booking.location,
        message: booking.message,
        status: booking.status,
        createdAt: booking.createdAt
      }
    });
  },
  updateBookingStatus: async (id, status) => {
    try {
      await prisma.booking.update({
        where: { id },
        data: { status }
      });
      return true;
    } catch {
      return false;
    }
  },

  // Config helpers
  getConfig: async () => {
    const row = await prisma.siteConfig.findUnique({ where: { id: 1 } });
    return row ? JSON.parse(row.config) : null;
  },
  updateConfig: async (config) => {
    await prisma.siteConfig.upsert({
      where: { id: 1 },
      update: { config: JSON.stringify(config) },
      create: { id: 1, config: JSON.stringify(config) }
    });
    return config;
  },

  // Images helpers
  getImages: async () => {
    return await prisma.image.findMany();
  },
  addImage: async (image) => {
    return await prisma.image.create({
      data: { url: image.url, title: image.title }
    });
  },
  deleteImage: async (id) => {
    try {
      await prisma.image.delete({
        where: { id: parseInt(id) }
      });
      return true;
    } catch {
      return false;
    }
  }
};
