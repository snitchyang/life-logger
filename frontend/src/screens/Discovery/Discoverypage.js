import { TouchableOpacity, View } from "react-native";
import * as React from "react";
import { useState } from "react";
import { PostList } from "../../components/Post/PostList";
import { FAB } from "@rneui/base";
import { PostAddPage } from "./PostAddPage";

function DiscoveryPage() {
  const [addPost, setAddPost] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <PostList />
      <TouchableOpacity
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          right: 20,
          top: 10,
        }}
      >
        <FAB
          icon={{ name: "add", color: "white" }}
          color={"black"}
          onPress={() => setAddPost(true)}
          size={"small"}
        />
      </TouchableOpacity>
      <PostAddPage visible={addPost} setVisible={setAddPost} />
    </View>
  );
}

export default DiscoveryPage;
