import prisma from '../lib/prisma';

async function main() {
  try {
    // Test connection by fetching users count
    const userCount = await prisma.users.count();
    console.log(`Database connection successful! Found ${userCount} users.`);
    
    // Test a more complex query
    const leaveTypes = await prisma.leave_types.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        defaultDays: true
      }
    });
    
    console.log('Active leave types:');
    console.table(leaveTypes);
    
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();