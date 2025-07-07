
export const decodeJWT = (token: string): { id: string; email: string; role: string, name: string, avatar: string } | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
      name: payload.name,
      avatar: payload.avatar
    };
  } catch (error) {
    console.error("Invalid token");
    return null;
  }
};
