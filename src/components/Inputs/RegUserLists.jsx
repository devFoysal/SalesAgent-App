import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { COLOR, rf, rh } from "../../theme/Theme";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Text from "../Text/Text";
import { useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";

export default function RegUserList({
  label,
  required,
  valueProps,
  placeholder,
  styleInput,
  dropTop,
  labelStyle,
  data,
  setPersonalInfo,
  inputText,
  personalInfo,
  errorCheck,
  inputIndex,
  item,
  userInfo,
  setUserInfo,
  disable = false,
}) {
  // open list

  let filtData = {
    _index: "0",
    label: `${userInfo?.full_name?.split(" ")[0]} - ${
      userInfo?.contact_number
    }`,
    value: `${userInfo?.full_name?.split(" ")[0]}
                  -
                  ${userInfo?.contact_number}
                  `,
  };

  let defaultData = [];
  if (data) {
    for (let item of data) {
      defaultData = [
        ...defaultData,
        {
          label: `${item?.full_name?.split(" ")[0]} - ${item?.contact_number}`,
          value: `${item?.full_name?.split(" ")[0]} - ${item?.contact_number}`,
        },
      ];
    }
  }
  const languageState = useSelector(
    (state) => state.language.language.finalLanguage?.data
  );
  const [openList, setOpenList] = useState(false);
  const [selectItem, setSelectItem] = useState();
  const [borderColor, setBorderColor] = useState(COLOR.blue200);
  const [isFocus, setIsFocus] = useState(false);

  //  handel select
  const handelSelectItem = (item) => {
    let split_string = item?.value?.split(" ");
    setSelectItem(item);
    if (setUserInfo) {
      let filtData = data?.filter(
        (itm) => itm?.contact_number === split_string[2]
      );
      setUserInfo(filtData[0]);
    }
    setOpenList((prv) => !prv);
  };
  //
  useEffect(() => {
    if (required === "1" && errorCheck) {
      console.log("enter", selectItem);
      if (
        selectItem === null ||
        selectItem === undefined ||
        selectItem === "" ||
        Object.keys(userInfo)?.length < 1
      ) {
        if (Object.keys(userInfo)?.length < 1) {
          setBorderColor("red");
        } else {
          setBorderColor(COLOR.blue200);
        }
      } else {
        setBorderColor(COLOR.blue200);
      }
    }
  }, [errorCheck]);
  //
  return (
    <View style={styles.container}>
      {disable ? (
        <>
          <View style={styles.labelContainerStyle}>
            <Text preset="h5" style={[styles.label, labelStyle]}>
              {label !== undefined
                ? label
                : languageState?.registeredUsersTitle}
            </Text>
          </View>

          <>
            <TouchableOpacity
              disabled={disable}
              activeOpacity={1}
              onPress={() => setOpenList((prv) => !prv)}
              style={[styles.searchInputContainer]}
            >
              <View
                style={[
                  styles.labelContainer,
                  { borderColor: borderColor },
                  styleInput,
                ]}
              >
                {userInfo?.full_name === undefined ? (
                  <Text style={[styles.inputLabelStyle]} color={"#979797"}>
                    {"Select an user"}
                  </Text>
                ) : (
                  <Text style={[styles.inputLabelStyle]}>
                    {userInfo?.full_name?.split(" ")[0]}
                    {" ("}
                    {userInfo?.contact_number}
                    {")"}
                  </Text>
                )}

                <TouchableOpacity
                  disabled={disable}
                  onPress={() => setOpenList((prv) => !prv)}
                  style={[styles.searchArrIcon]}
                >
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={20}
                    color="#333d4464"
                    style={
                      openList && {
                        transform: [
                          {
                            rotate: "180deg",
                          },
                        ],
                      }
                    }
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </>

          {openList && (
            <View
              style={[
                styles.listContainer,
                label && {
                  marginTop: rh(9.6),
                },
                dropTop && {
                  bottom: 0,
                  marginBottom: rh(6),
                },
              ]}
            >
              <ScrollView nestedScrollEnabled={true}>
                {data?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.2}
                    onPress={() => handelSelectItem(item)}
                  >
                    <Text style={styles.listItem}>
                      {item?.full_name?.split(" ")[0]}
                      {" ("}
                      {item?.contact_number}
                      {")"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </>
      ) : (
        <>
          {label == undefined ? (
            ""
          ) : (
            <View style={styles.labelContainerStyle}>
              <Text preset="h5" style={[styles.label, labelStyle]}>
                {label}
              </Text>
              {required === "1" && (
                <FontAwesome
                  name="asterisk"
                  size={rh(1)}
                  color="red"
                  style={{ marginTop: rh(0.7), marginLeft: rh(1) }}
                />
              )}
            </View>
          )}

          <Dropdown
            style={[
              {
                borderColor: borderColor,
                borderWidth: 0.8,
                paddingHorizontal: rh(1.7),
                paddingVertical: rh(1),
                borderRadius: rh(1),
                backgroundColor: COLOR.white,
                maxHeight: rh(20),
              },
            ]}
            placeholderStyle={{ color: "#979797", fontSize: rf(1.8) }}
            selectedTextStyle={{ fontSize: rf(2) }}
            mode="default"
            data={defaultData}
            search={defaultData?.length > 10 ? true : false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            searchPlaceholder="Search..."
            value={selectItem ? selectItem : filtData}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              // setValue(item.value)
              handelSelectItem(item);
              setIsFocus(false);
            }}
            disable={disable}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainerStyle: {
    flexDirection: "row",
  },
  startIcon: {},
  label: {
    color: COLOR.gray400,
    marginBottom: rh(0.9),
  },
  inputLabelStyle: {
    color: COLOR.gray400,
    fontSize: rf(1.7),
  },
  container: {
    marginVertical: rh(1),
  },
  labelContainer: {
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: COLOR.blue200,
    paddingHorizontal: rh(1.2),
    color: COLOR.gray400,
    height: rh(6.5),
    borderRadius: rh(1.2),
  },
  searchArrIcon: {
    position: "absolute",
    right: 15,
  },
  // list
  listContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    zIndex: 10,
    marginTop: rh(9),
    width: "100%",
    // flex: 1,
    maxHeight: rh(20),
  },
  listContainerTop: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    zIndex: 10,
    marginTop: -130,
    width: "100%",
    top: 0,
    // maxHeight: 100,
    height: 150,
  },
  listItem: {
    paddingVertical: rh(0.8),
    color: COLOR.gray400,
  },
  errorLabel: {
    color: "red",
    marginBottom: 4,
    fontSize: 12,
  },
});
