
import jwt, { type JwtPayload } from "jsonwebtoken";

type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN" | "SUPER_ADMIN";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
}

interface VerifyTokenResult {
  success: boolean;
  data?: CustomJwtPayload;
  error?: string;
}

const verifyToken = (
  token: string,
  secret: string,
): VerifyTokenResult => {
  try {
    // Validate inputs
    if (!token?.trim()) {
      throw new Error("Token is required");
    }

    if (!secret?.trim()) {
      throw new Error("JWT secret is required");
    }

    // Remove "Bearer " if it was included
    const accessToken = token.trim().replace(/^Bearer\s+/i, "");

 
 const decoded = jwt.decode(accessToken);
    // Validate required payload fields
    const { userId, name, email, role, iat, exp } = decoded as JwtPayload;

    if (
      typeof userId !== "string" ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      !["CUSTOMER", "PROVIDER", "ADMIN", "SUPER_ADMIN"].includes(
        role as UserRole,
      )
    ) {
      throw new Error("Invalid token payload");
    }

    const data: CustomJwtPayload = {
      userId,
      name,
      email,
      role: role as UserRole,
      ...(typeof iat === "number" ? { iat } : {}),
      ...(typeof exp === "number" ? { exp } : {}),
    };

    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Token verification failed";

    console.error("Token verification failed:", message);

    return {
      success: false,
      error: message,
    };
  }
};

export const jwtUtils = {
  verifyToken,
};
