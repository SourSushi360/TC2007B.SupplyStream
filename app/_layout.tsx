import { SessionProvider } from "@/components/Session";
import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SessionProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
          <Stack.Screen name="index" options={{ headerShown: false }}/>
        </Stack>
    </SessionProvider>
  );
}
