import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../styles/theme";

type Props = {
  tags: string[];
  selected: string[];
  onChange: (next: string[]) => void;
};

export default function TagChips({ tags, selected, onChange }: Props) {
  const toggle = (tag: string) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      if (selected.length >= 3) return; // max 3 tags
      onChange([...selected, tag]);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginTop: 8,
      }}
    >
      {tags.map((tag) => {
        const active = selected.includes(tag);

        return (
          <TouchableOpacity
            key={tag}
            onPress={() => toggle(tag)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: theme.radius.chip,
              borderWidth: 1,
              borderColor: active ? theme.colors.primary : theme.colors.border,
              backgroundColor: active ? "#ffe0ec" : theme.colors.card,
            }}
          >
            <Text
              style={{
                color: theme.colors.text,
                fontWeight: active ? "800" : "600",
              }}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
