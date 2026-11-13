import { ImageResponse } from "next/og";

export const alt = "Atilla Güngör — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
        style= {{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0a0a0b",
        backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(124,92,255,0.45), transparent 45%), radial-gradient(circle at 90% 95%, rgba(34,211,238,0.28), transparent 45%)",
        color: "white",
    }}
      >
    <div style={ { display: "flex", alignItems: "center", gap: 20 } }>
        <div
            style={
    {
        display: "flex",
            alignItems: "center",
                justifyContent: "center",
                    width: 72,
                        height: 72,
                            borderRadius: 20,
                                background: "linear-gradient(145deg, #9a80ff, #5b4bf0)",
                                    fontSize: 44,
            }
}
          >
    A
    </div>
    < div style = {{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.7)" }}>
        Portfolio
        </div>
        </div>

        < div style = {{ display: "flex", flexDirection: "column" }}>
            <div style={ { display: "flex", fontSize: 104, letterSpacing: -3, lineHeight: 1 } }>
                Atilla Güngör
                    </div>
                    < div style = {{ display: "flex", marginTop: 24, fontSize: 44, color: "#a996ff" }}>
                        Software Developer
                            </div>
                            < div style = {{ display: "flex", marginTop: 16, fontSize: 28, color: "rgba(255,255,255,0.6)" }}>
                                C# · SQL · Unity · TypeScript · DevOps
                                    </div>
                                    </div>
                                    </div>
    ),
{ ...size }
  );
}