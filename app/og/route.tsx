import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle: string = searchParams.get("title");

  return new ImageResponse(
    (
      <div
        className={inter.className}
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-.02em",
          fontWeight: 700,
          background: "white",
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: "absolute",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="https://beratbozkurt.net/images/photo.jpg"
            alt="Berat Bozkurt"
            style={{
              borderRadius: 150,
            }}
            width={48}
            height={48}
          />
          <span
            style={{
              marginLeft: 8,
              fontSize: 34,
              fontWeight: "bold",
            }}
          >
            beratbozkurt.net
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "20px 50px",
            margin: "0 42px",
            fontSize: 40,
            width: "auto",
            maxWidth: 550,
            textAlign: "center",
            backgroundColor: "#f0f0f0",
            color: "black",
            lineHeight: 1.4,
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
    }
  );
}
