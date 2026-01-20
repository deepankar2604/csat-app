import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../styles/theme";

export default function ThankYouScreen() {
  const params = useLocalSearchParams();
  const rating = Number(params.rating || 0);
  const isHigh = rating >= 4;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg, padding: 16 }}>
      {/* Header */}
      <View style={{ marginTop: 26 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "900",
            color: theme.colors.primary,
          }}
        >
          CSAT Survey
        </Text>
        <Text style={{ color: theme.colors.subText, marginTop: 6 }}>
          Your feedback matters ❤️
        </Text>
      </View>

      {/* Card */}
      <View
        style={{
          flex: 1,
          marginTop: 18,
          backgroundColor: theme.colors.card,
          borderRadius: theme.radius.card,
          padding: 18,
          borderWidth: 1,
          borderColor: theme.colors.border,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 14,
          elevation: 3,
          justifyContent: "center",
        }}
      >
        {/* Customer icon */}
        <View
          style={{
            alignSelf: "center",
            width: 90,
            height: 90,
            borderRadius: 999,
            backgroundColor: "#ffe0ec",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Text style={{ fontSize: 48 }}>{isHigh ? "🙂" : "🙁"}</Text>
        </View>

        <Text
          style={{
            fontSize: 24,
            fontWeight: "900",
            textAlign: "center",
            marginTop: 14,
            color: theme.colors.text,
          }}
        >
          {isHigh ? "Thank You!" : "We’re Sorry!"}
        </Text>

        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            color: theme.colors.subText,
          }}
        >
          {isHigh
            ? "We’re happy you had a great experience."
            : "We understand your concern. We will improve soon."}
        </Text>

        {/* Rating badge */}
        <View
          style={{
            alignSelf: "center",
            marginTop: 14,
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 999,
            backgroundColor: isHigh
              ? theme.colors.successBg
              : theme.colors.dangerBg,
          }}
        >
          <Text style={{ fontWeight: "900", color: theme.colors.text }}>
            ⭐ Your Rating: {rating}/5
          </Text>
        </View>

        {!isHigh && (
          <TouchableOpacity
            style={{ marginTop: 18, alignSelf: "center" }}
            onPress={() => alert("Contact Support clicked")}
          >
            <Text style={{ color: theme.colors.primary, fontWeight: "900" }}>
              Contact Support
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={{
            marginTop: 26,
            backgroundColor: theme.colors.primary,
            padding: 14,
            borderRadius: theme.radius.btn,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
