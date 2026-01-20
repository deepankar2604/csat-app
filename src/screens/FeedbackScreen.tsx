import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { csatSchema, CsatForm } from "../validation/csatSchema";
import StarRating from "../components/StarRating";
import TagChips from "../components/TagChips";
import { csatConfig } from "../config/csatConfig";
import { api } from "../api/client";
import { theme } from "../styles/theme";

export default function FeedbackScreen() {
  const [loading, setLoading] = useState(false);

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CsatForm>({
    resolver: zodResolver(csatSchema),
    defaultValues: {
      rating: 0,
      feedback_option: "",
      additional_comments: "",
      tags: [],
    },
  });

  const rating = watch("rating");
  const selectedTags = watch("tags") || [];
  const comments = watch("additional_comments") || "";
  const feedbackOption = watch("feedback_option") || "";
  const isLowRating = rating > 0 && rating <= 3;

  const isValid = useMemo(() => {
    if (rating === 0) return false;
    if (isLowRating && !feedbackOption) return false;
    if (comments.length > 500) return false;
    if (selectedTags.length > 3) return false;
    return true;
  }, [rating, isLowRating, feedbackOption, comments, selectedTags]);

  const onSubmit = async (data: CsatForm) => {
    if (!isValid) return;

    try {
      setLoading(true);

      const payload = {
        campaign_id: csatConfig.campaign_id,
        rating: data.rating,
        feedback_option: isLowRating ? data.feedback_option : null,
        additional_comments: data.additional_comments || "",
        tags: data.tags || [],
        timestamp: new Date().toISOString(),
        source: csatConfig.source,
      };

      // Backend API call
      const res = await api.post(
        "/api/v1/campaigns/submit-csat-response/",
        payload
      );

      const showThankYou = res.data?.show_thank_you ?? true;

      if (showThankYou) {
        router.replace({
          pathname: "/thankyou",
          params: { rating: String(data.rating) },
        });
      } else {
        Alert.alert("Submitted", "Thanks for your feedback!");
      }
    } catch (err: any) {
      // If backend not ready, still go ThankYou
      router.replace({
        pathname: "/thankyou",
        params: { rating: String(data.rating) },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 60 }}>
        {/* Header */}
        <View style={{ marginTop: 12 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: "900", color: theme.colors.primary }}>
                CSAT Survey
              </Text>
              <Text style={{ marginTop: 6, color: theme.colors.subText }}>
                Tell us about your experience 💬
              </Text>
            </View>

            <TouchableOpacity
              accessibilityLabel="Close Survey"
              onPress={() => Alert.alert("Closed", "Survey closed")}
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: theme.colors.border,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "900" }}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Card */}
        <View
          style={{
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
          }}
        >
          {/* Customer Symbol */}
          <View
            style={{
              alignSelf: "center",
              width: 85,
              height: 85,
              borderRadius: 999,
              backgroundColor: "#ffe0ec",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Text style={{ fontSize: 42 }}>👤</Text>
          </View>

          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "900",
              marginTop: 12,
              color: theme.colors.text,
            }}
          >
            {csatConfig.title}
          </Text>

          <Text style={{ textAlign: "center", marginTop: 6, color: theme.colors.subText }}>
            {csatConfig.subtitle}
          </Text>

          {/* Rating */}
          <Text style={{ marginTop: 18, fontWeight: "800", color: theme.colors.text }}>
            Your Rating *
          </Text>

          <Controller
            control={control}
            name="rating"
            render={({ field: { value } }) => (
              <StarRating value={value || 0} onChange={(v) => setValue("rating", v)} />
            )}
          />

          {errors.rating && <Text style={{ color: "red" }}>{errors.rating.message}</Text>}

          {/* Low rating feedback */}
          {isLowRating && (
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: "900", color: theme.colors.text }}>
                What went wrong? *
              </Text>

              <Controller
                control={control}
                name="feedback_option"
                render={({ field: { value } }) => (
                  <View style={{ gap: 10, marginTop: 10 }}>
                    {csatConfig.lowRatingOptions.map((opt) => {
                      const active = value === opt;
                      return (
                        <TouchableOpacity
                          key={opt}
                          onPress={() => setValue("feedback_option", opt)}
                          style={{
                            padding: 12,
                            borderRadius: 14,
                            borderWidth: 1,
                            borderColor: active ? theme.colors.danger : theme.colors.border,
                            backgroundColor: active ? theme.colors.dangerBg : theme.colors.card,
                          }}
                        >
                          <Text style={{ fontWeight: active ? "900" : "700" }}>{opt}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              />

              {!feedbackOption && (
                <Text style={{ color: "red", marginTop: 8, fontWeight: "700" }}>
                  Please select one option.
                </Text>
              )}
            </View>
          )}

          {/* Comments */}
          <Text style={{ marginTop: 18, fontWeight: "900", color: theme.colors.text }}>
            Additional Comments
          </Text>

          <Controller
            control={control}
            name="additional_comments"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Write your comment..."
                  placeholderTextColor="#999"
                  multiline
                  style={{
                    height: 120,
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                    borderRadius: theme.radius.input,
                    padding: 12,
                    marginTop: 10,
                    textAlignVertical: "top",
                    backgroundColor: theme.colors.inputBg,
                  }}
                />
                <Text style={{ alignSelf: "flex-end", marginTop: 6, color: "#777" }}>
                  {value?.length || 0}/500
                </Text>
              </>
            )}
          />

          {/* Tags */}
          <Text style={{ marginTop: 6, fontWeight: "900", color: theme.colors.text }}>
            Tags (max 3)
          </Text>

          <Controller
            control={control}
            name="tags"
            render={({ field: { value } }) => (
              <TagChips
                tags={csatConfig.tags}
                selected={value || []}
                onChange={(next) => setValue("tags", next)}
              />
            )}
          />

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || loading}
            style={{
              marginTop: 22,
              backgroundColor: !isValid ? "#f4b6c8" : theme.colors.primary,
              padding: 14,
              borderRadius: theme.radius.btn,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.12,
              shadowRadius: 10,
              elevation: 3,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "white", fontWeight: "900", fontSize: 16 }}>
                Submit Feedback
              </Text>
            )}
          </TouchableOpacity>

          <Text style={{ textAlign: "center", marginTop: 12, color: "#777" }}>
            Thank you for helping us improve 💗
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
