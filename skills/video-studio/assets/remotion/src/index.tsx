import {Audio} from "@remotion/media";
import {AbsoluteFill, Composition, registerRoot, Series, staticFile, useVideoConfig} from "remotion";
import {Seascape} from "./Seascape";
import {dawn, dusk, frames, noon, story, totalFrames} from "./story";

function Film() {
  const {fps, durationInFrames} = useVideoConfig();
  const {narration, music} = story;
  const musicStart = Math.round(music.startSeconds * fps);
  const musicLength = durationInFrames - musicStart;
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence name="Amanhecer" durationInFrames={frames(dawn)} premountFor={fps}>
          <Seascape scene={dawn} />
        </Series.Sequence>
        <Series.Sequence name="Meio-dia" durationInFrames={frames(noon)} premountFor={fps}>
          <Seascape scene={noon} />
        </Series.Sequence>
        <Series.Sequence name="Entardecer" durationInFrames={frames(dusk)} premountFor={fps}>
          <Seascape scene={dusk} />
        </Series.Sequence>
      </Series>
      {music.file && <Audio name="Trilha" src={staticFile(music.file)} from={musicStart}
        premountFor={fps} loop loopVolumeCurveBehavior="extend"
        volume={(frame) => music.volume * Math.max(0, Math.min(1, frame / (fps * 0.3), (musicLength - 1 - frame) / (fps * 0.6)))} />}
      {narration.file && <Audio name="Narração" src={staticFile(narration.file)}
        from={Math.round(narration.startSeconds * fps)} volume={narration.volume} premountFor={fps} />}
    </AbsoluteFill>
  );
}

function Root() {
  return <Composition id="Filme" component={Film} durationInFrames={totalFrames}
    fps={story.fps} width={story.width} height={story.height} />;
}
registerRoot(Root);
