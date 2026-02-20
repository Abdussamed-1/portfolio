import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { baseURL, person } from "@/resources";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || person.name;
    const subtitle = searchParams.get("subtitle") || person.role;

    // Avatar URL'ini absolute URL'e çevir
    const avatarUrl = person.avatar.startsWith("http")
      ? person.avatar
      : `${baseURL}${person.avatar}`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0a0a0a",
            backgroundImage: "linear-gradient(to bottom, #1a1a1a, #0a0a0a)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            <img
              src={avatarUrl}
              alt={person.name}
              width={120}
              height={120}
              style={{
                borderRadius: "50%",
                border: "4px solid #ffffff",
              }}
            />
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "900px",
              padding: "0 40px",
            }}
          >
            <h1
              style={{
                fontSize: 64,
                fontWeight: "bold",
                color: "#ffffff",
                textAlign: "center",
                margin: 0,
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                style={{
                  fontSize: 32,
                  color: "#a0a0a0",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <img
              src={avatarUrl}
              alt={person.name}
              width={32}
              height={32}
              style={{
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                fontSize: 24,
                color: "#808080",
              }}
            >
              {person.name}
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("OG image generation error:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
