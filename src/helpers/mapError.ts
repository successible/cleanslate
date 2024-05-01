export const mapError = (error: any): string => {
  if (error && typeof error === "string") {
    if (error === "Login") {
      return "Your login have expired...";
    }
    if (
      // This only occurs when the auth server is down and the websocket client cannot refresh the token
      error === "Spotty" ||
      error === "start received before the connection is initialised" ||
      error.includes("Malformed Authorization header")
    ) {
      return "Your connection is spotty...";
    }
  }
  return "An error occurred!";
};
