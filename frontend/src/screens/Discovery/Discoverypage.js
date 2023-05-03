import { View } from "react-native";
import * as React from "react";
import { PostList } from "../../components/Post/PostList";

function DiscoveryPage() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <PostList />
    </View>
  );
}

export default DiscoveryPage;
