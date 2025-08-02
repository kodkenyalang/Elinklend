import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  console.warn("Thirdweb client ID not found. Please add NEXT_PUBLIC_THIRDWEB_CLIENT_ID to your environment variables.");
}

export const client = createThirdwebClient({
  clientId: clientId || "3ee25fd2f6865a2aea1c1acec675921f", // Fallback to public key
});
