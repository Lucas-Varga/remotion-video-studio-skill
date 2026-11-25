import {AbsoluteFill, CanvasImage, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {story, type Scene} from "./story";

export function Seascape({scene}: {scene: Scene}) {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const unit = Math.min(width, height);
  const time = frame / fps;
  const reveal = interpolate(time, [0, 0.52], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const sunSize = unit * 0.51;
  const gutter = width * 0.09;
  const horizon = height * 0.53;
  return (
    <AbsoluteFill style={{backgroundColor: scene.sky, color: scene.ink, overflow: "hidden"}}>
      {scene.image ? (
        <>
          <CanvasImage src={staticFile(scene.image)} premountFor={fps} style={{
            width, height, objectFit: "cover", scale: 1.015 + time * 0.004,
          }} />
          <AbsoluteFill style={{background: "linear-gradient(180deg,rgba(0,0,0,.48),transparent 26%,transparent 42%,rgba(0,0,0,.8))"}} />
        </>
      ) : (
        <>
          <div style={{
            position: "absolute", left: width * scene.sunX - sunSize / 2,
            top: height * scene.sunY - sunSize / 2 - time * unit * 0.012,
            width: sunSize, height: sunSize, background: scene.sun, borderRadius: "50%",
          }} />
          <div style={{position: "absolute", top: horizon, bottom: 0, width: "100%", background: scene.sea}} />
          {Array.from({length: 20}, (_, i) => {
            const distance = (i + 1) / 20;
            const rippleWidth = unit * (0.17 + distance * 0.65);
            const center = width * scene.sunX + Math.sin(i * 1.72 + time * 0.44) * unit * 0.095;
            return <div key={i} style={{
              position: "absolute", left: center - rippleWidth / 2,
              top: horizon + height * distance ** 1.45 * 0.16,
              width: rippleWidth, height: unit * (0.003 + distance * 0.003),
              borderRadius: "50%", backgroundColor: scene.ripple, opacity: 1 - distance * 0.75,
            }} />;
          })}
        </>
      )}
      <div style={{
        position: "absolute", inset: `9% ${gutter}px auto`, color: scene.image ? "#FFF" : scene.ink,
        display: "flex", justifyContent: "space-between", alignItems: "baseline",
        paddingBottom: unit * 0.019, borderBottom: "2px solid currentColor",
        font: `500 ${unit * 0.031}px Arial, sans-serif`, letterSpacing: "0.035em",
      }}>
        <span>{story.series}</span><span>{scene.time}</span>
      </div>
      <div style={{
        position: "absolute", left: gutter, right: gutter, bottom: height * 0.145,
        font: `400 ${unit * 0.125}px/0.96 Georgia, 'Times New Roman', serif`,
        letterSpacing: "-0.053em", whiteSpace: "pre-line",
        color: scene.image ? "#FFF" : scene.ink, translate: `0 ${(1 - reveal) * unit * 0.04}px`,
        opacity: 0.35 + reveal * 0.65,
      }}>{scene.title}</div>
    </AbsoluteFill>
  );
}
