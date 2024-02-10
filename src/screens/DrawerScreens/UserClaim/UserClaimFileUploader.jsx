import { StyleSheet, TouchableOpacity, Image, View, Modal } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Path, Svg } from "react-native-svg";
import Text from "../../../components/Text/Text";
import { FontAwesome } from "@expo/vector-icons";
export default function UserClaimFileUploader({ placeholder, setValue }) {
  const [document, setDocument] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [nameDocument, setNameDocument] = useState("");
  // documentPicker
  const documentPicker = async (type) => {
    setIsVisible(false);

    //  camera
    let result;
    if (type === "camera") {
      const results = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        allowsEditing: true,
      });
      result = results?.assets[0]?.uri;
    } else {
      let results = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"], // type
        multiple: false,
      });
      result = results.uri;
    }

    setDocument(result); // set result
    const filename = result?.split("/").pop(); // get document name
    console.log("filename", filename);
    if (result == undefined) {
      setNameDocument(""); // if undefined  set Document null
      setValue(null);
    } else {
      setNameDocument(filename); // set document name
      setValue(filename);
    }
  };
  //

  const handelDocument = () => {
    setIsVisible(true);
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handelDocument}
        style={styles.button}
      >
        <Text
          preset="SL"
          color={nameDocument !== "" ? "#646464" : "#C7C7C7"}
          style={styles.title}
        >
          {placeholder}
        </Text>
        <Svg width={24} height={24} fill="none">
          <Path
            d="M19 9.633v5.224c0 .303-.127.594-.354.808a1.246 1.246 0 0 1-.855.335H1.209c-.32 0-.628-.12-.855-.335A1.112 1.112 0 0 1 0 14.857V9.633c0-.303.127-.594.354-.808.227-.215.534-.335.855-.335h4.146c.137 0 .269.051.366.143a.477.477 0 0 1 .152.347c0 .13-.055.254-.152.346a.534.534 0 0 1-.366.143H1.209a.178.178 0 0 0-.122.048.159.159 0 0 0-.05.116v5.224c0 .043.018.085.05.116.032.03.076.047.122.047h16.582c.046 0 .09-.017.122-.047a.159.159 0 0 0 .05-.116V9.633a.159.159 0 0 0-.05-.116.178.178 0 0 0-.122-.048h-4.146a.534.534 0 0 1-.366-.143.477.477 0 0 1-.152-.346c0-.13.055-.255.152-.347a.534.534 0 0 1 .367-.143h4.145c.32 0 .628.12.855.335.227.214.354.505.354.808ZM5.717 4.75l3.265-3.078V8.98c0 .13.054.254.152.346a.534.534 0 0 0 .366.143c.137 0 .27-.051.366-.143a.477.477 0 0 0 .152-.346V1.673l3.265 3.078a.517.517 0 0 0 .363.142.54.54 0 0 0 .362-.142.485.485 0 0 0 .15-.343.462.462 0 0 0-.15-.343L9.863.147A.502.502 0 0 0 9.5 0a.526.526 0 0 0-.363.147L4.992 4.065a.472.472 0 0 0-.15.343c0 .129.054.252.15.343.096.09.226.142.363.142a.528.528 0 0 0 .362-.142Zm9.829 7.494c0-.162-.051-.32-.146-.454a.855.855 0 0 0-.388-.3.91.91 0 0 0-.499-.047.88.88 0 0 0-.442.224.804.804 0 0 0-.236.418.776.776 0 0 0 .049.471c.065.15.176.277.318.367a.9.9 0 0 0 1.09-.102.794.794 0 0 0 .254-.577Z"
            fill="#5D5FEF"
          />
        </Svg>
      </TouchableOpacity>
      {/* Model */}
      <Modal animationType="fade" visible={isVisible} transparent={true}>
        <View style={styles.modalStyle}>
          <TouchableOpacity
            style={{
              height: "100%",
            }}
            onPress={() => {
              setIsVisible(false);
            }}
          />
          {/* View */}
          <View style={styles.card}>
            <Text preset="h5" style={styles.cardTitle}>
              File Upload
            </Text>
            <Text preset="h6" color={"#353131b1"} style={styles.cardTitle}>
              {placeholder}
            </Text>
            <View style={styles.cardButtons}>
              <TouchableOpacity
                onPress={() => {
                  const type = "camera";
                  documentPicker(type);
                }}
                activeOpacity={0.8}
                style={styles.cardButton}
              >
                <Text style={styles.cardBtnTitle}>Capture</Text>
                <Svg width={18} height={18} fill="none">
                  <Path
                    d="M13 17h2a2 2 0 0 0 2-2v-2M1 5V3a2 2 0 0 1 2-2h2L1 5Zm0 8v2a2 2 0 0 0 2 2h2l-4-4ZM13 1h2a2 2 0 0 1 2 2v2l-4-4ZM9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    stroke="#4F4F4F"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const type = "document";
                  documentPicker(type);
                }}
                activeOpacity={0.8}
                style={styles.cardButton}
              >
                <Text style={styles.cardBtnTitle}>Upload</Text>
                <FontAwesome name="upload" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 5,
    borderColor: "#E5EAFF",
    height: 45,
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  title: {
    width: "80%",
    fontWeight: "700",
  },
  // modalStyle
  modalStyle: {
    flex: 1,
    backgroundColor: "#00000037",
    paddingHorizontal: 20,
    // alignItems: "center",
    // justifyContent: "center",
    position: "relative",
  },
  //  card
  card: {
    backgroundColor: "#ffff",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 30,
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    top: "40%",
  },
  cardTitle: {
    fontWeight: "700",
    paddingBottom: 15,
  },
  cardButtons: {
    flexDirection: "row",
  },
  cardBtnTitle: {
    paddingHorizontal: 15,
  },
  cardButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 5,
    borderColor: "#E5EAFF",
    height: 45,
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
