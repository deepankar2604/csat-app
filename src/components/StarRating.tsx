import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  value: number;
  onChange: (val: number) => void;
};

export default function StarRating({ value, onChange }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        marginTop: 14,
      }}
    >
      {[1, 2, 3, 4, 5].map((num) => {
        const active = num <= value;

        return (
          <TouchableOpacity
            key={num}
            onPress={() => onChange(num)}
            accessibilityLabel={`Rate ${num} star`}
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: active ? "#ff4d88" : "#fff",
              borderWidth: 1,
              borderColor: active ? "#ff4d88" : "#e9d6df",
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 10,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 24 }}>{active ? "⭐" : "☆"}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
