import { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import FilterBar from "./filterBar";
import Constants from "expo-constants";

// Get API key from app.json or .env
const API_KEY = Constants.manifest?.extra?.youtubeApiKey;

type YouTubeVideo = {
  id: { videoId: string };
  snippet: { title: string; thumbnails: { medium: { url: string } } };
};

export default function YouTubeFunc() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);

  // Map filter to search query
  const getQueryFromFilter = (filter: string) => {
    switch (filter) {
      case "Guitar":
        return "guitar tutorial";
      case "Piano":
        return "piano tutorial";
      case "Drums":
        return "drum tutorial";
      default:
        return "music tutorial";
    }
  };

  // Fetch videos from YouTube Data API v3
  const fetchVideos = async (filter: string) => {
    const query = getQueryFromFilter(filter);
    console.log("Fetching YouTube for query:", query);

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        query,
      )}&type=video&maxResults=10&key=${API_KEY}`,
    );

    const data = await res.json();
    console.log("YT API RAW RESPONSE:", data);

    // Filter only videos
    const videoItems = (data.items ?? []).filter(
      (item: any) => item.id?.kind === "youtube#video",
    );
    console.log(
      "VIDEOS SET:",
      videoItems.map((v: any) => v.snippet.title),
    );

    setVideos(videoItems);
  };

  // Trigger fetch when filter changes
  useEffect(() => {
    fetchVideos(selectedFilter);
  }, [selectedFilter]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Filter bar */}
      <FilterBar selected={selectedFilter} onSelect={setSelectedFilter} />

      {/* Video list */}
      <FlatList<YouTubeVideo>
        data={videos}
        keyExtractor={(item) => item.id.videoId}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <Image
              source={{ uri: item.snippet.thumbnails.medium.url }}
              style={{ width: "100%", height: 200 }}
            />
            <Text>{item.snippet.title}</Text>
          </View>
        )}
      />
    </View>
  );
}
