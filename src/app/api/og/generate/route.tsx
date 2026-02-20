import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { baseURL, person } from "@/resources";

// Node.js runtime kullan (Edge runtime'da image fetch sorunları olabiliyor)
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url);
    const { searchParams } = requestUrl;
    const title = searchParams.get("title") || person.name;
    const subtitle = searchParams.get("subtitle") || person.role;

    // Base URL'i request'ten al (Vercel'de otomatik olarak doğru URL'i verir)
    const origin = requestUrl.origin;
    
    // Avatar URL'ini absolute URL'e çevir
    const avatarUrl = person.avatar.startsWith("http")
      ? person.avatar
      : `${origin}${person.avatar}`;

    // Avatar'ı fetch et ve base64'e çevir (Node.js runtime'da Buffer kullanabiliriz)
    let avatarDataUrl = avatarUrl;
    try {
      const avatarResponse = await fetch(avatarUrl);
      if (avatarResponse.ok) {
        const avatarBuffer = await avatarResponse.arrayBuffer();
        const avatarBase64 = Buffer.from(avatarBuffer).toString('base64');
        const contentType = avatarResponse.headers.get('content-type') || 'image/png';
        avatarDataUrl = `data:${contentType};base64,${avatarBase64}`;
      }
    } catch (fetchError) {
      console.error("Failed to fetch avatar, using URL directly:", fetchError);
      // Fallback to URL if fetch fails
    }

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
              src={avatarDataUrl}
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
              src={avatarDataUrl}
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
