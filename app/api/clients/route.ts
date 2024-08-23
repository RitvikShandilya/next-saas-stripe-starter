import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export const GET = auth(async (req) => {
  if (!req.auth) {
    return new Response("Not authenticated", { status: 401 });
  }

  const currentUser = req.auth.user;
  if (!currentUser) {
    return new Response("Invalid user", { status: 401 });
  }

  try {
    const clients = await prisma.client.findMany({
      where: {
        users: {
          some: {
            userId: currentUser.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        vapi: true,
      },
    });

    return new Response(JSON.stringify(clients), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching client data:", error);
    return new Response("Internal server error", { status: 500 });
  }
});