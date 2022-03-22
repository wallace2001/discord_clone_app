import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import useColorScheme from "./src/hooks/useColorScheme";
import Navigation from "./src/navigation";

import { StreamChat } from "stream-chat";
import { useEffect, useState } from "react";
import { Channel as ChannelType } from 'stream-chat';
import { OverlayProvider, Chat, ChannelList, Channel, MessageInput } from "stream-chat-expo";

// Criando um client do streamChat
const API_KEY = "35ns2y4jqvfn";
const client = StreamChat.getInstance(API_KEY);
// ---

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>();

  const connectUser = async () => {
    // Create a User
    await client.connectUser(
      {
        id: "wallace",
        name: "Wallace",
        image: "https://avatars.githubusercontent.com/u/70642744?v=4",
      },
      client.devToken("wallace")
    );
    setIsReady(true);

    // Create a Channel
    // const channel = client.channel("team", "general", { name: "General" });

    // await channel.create();
  };

  useEffect(() => {
    connectUser();
  }, []);

  if (!isLoadingComplete || !isReady) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <OverlayProvider>
          <Chat client={client}>
            {/* <Navigation colorScheme={colorScheme} /> */}
            {selectedChannel ? (
              <Channel channel={selectedChannel}>
                <MessageInput />
              </Channel>
            ) : (
              <ChannelList onSelect={setSelectedChannel} />
            )}
          </Chat>
        </OverlayProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
