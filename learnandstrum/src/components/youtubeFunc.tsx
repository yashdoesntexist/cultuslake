import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { WebView } from "react-native-webview";
import FilterBar from "./filterBar";
import Constants from "expo-constants";

const API_KEY = (
  Constants.expoConfig?.extra?.youtubeApiKey ||
  Constants.manifest?.extra?.youtubeApiKey ||
  process.env.EXPO_PUBLIC_YOUTUBE_API_KEY
)?.trim();

type YouTubeVideo = {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
    channelTitle: string;
  };
};

export default function YouTubeFunc() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

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

  const fetchVideos = async (filter: string) => {
    if (!API_KEY) {
      console.error("API_KEY is missing! Check your .env or app.json setup.");
      return;
    }

    setLoading(true);
    const query = getQueryFromFilter(filter);

    const params = new URLSearchParams({
      part: "snippet",
      q: query,
      type: "video",
      maxResults: "10",
      key: API_KEY,
    });

    const url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.error) {
        console.error("YouTube API Error:", data.error.message);
        setVideos([]);
        return;
      }

      const videoItems = (data.items ?? []).filter(
        (item: any) => item.id?.kind === "youtube#video",
      );

      setVideos(videoItems);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(selectedFilter);
  }, [selectedFilter]);

  return (
    <View style={styles.container}>
      <FilterBar selected={selectedFilter} onSelect={setSelectedFilter} />

      <FlatList<YouTubeVideo>
        data={videos}
        keyExtractor={(item) => item.id.videoId}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.videoCard}
            onPress={() => setPlayingVideoId(item.id.videoId)}
          >
            <Image
              source={{ uri: item.snippet.thumbnails.medium.url }}
              style={styles.thumbnail}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {item.snippet.title}
              </Text>
              <Text style={styles.channelTitle}>
                {item.snippet.channelTitle}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No videos found. Check your API key or filter.
          </Text>
        }
      />

      <Modal
        visible={!!playingVideoId}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setPlayingVideoId(null)}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
          {playingVideoId && (
            <WebView
              source={{
                uri: `https://www.youtube.com/watch?v=${playingVideoId}&autoplay=1&modestbranding=1&playsinline=1`,
              }}
              style={{ flex: 1 }}
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#000" },
  videoCard: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  thumbnail: { width: "100%", height: 200 },
  textContainer: { padding: 10 },
  title: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  channelTitle: { fontSize: 14, color: "#aaa", marginTop: 4 },
  emptyText: { textAlign: "center", marginTop: 50, color: "#888" },
  modalContainer: { flex: 1, backgroundColor: "#000" },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 8,
  },
  closeText: { color: "#fff", fontWeight: "bold" },
  webview: { flex: 1, marginTop: 60 },
});
