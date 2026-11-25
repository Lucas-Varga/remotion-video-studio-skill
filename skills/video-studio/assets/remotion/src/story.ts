export type Scene = {
  title: string;
  time: string;
  seconds: number;
  image: string;
  sky: string;
  sun: string;
  sea: string;
  ink: string;
  ripple: string;
  sunX: number;
  sunY: number;
};

// Imagens são caminhos relativos a public/. Um caminho vazio usa a ilustração original.
export const dawn: Scene = {
  title: "O céu\nacorda.", time: "06h12", seconds: 3, image: "",
  sky: "#F1C9AA", sun: "#FF714F", sea: "#FBEEE0", ink: "#2F2324",
  ripple: "#E7C8B2", sunX: 0.66, sunY: 0.47,
};

export const noon: Scene = {
  title: "A luz\nesquenta.", time: "12h36", seconds: 3, image: "",
  sky: "#E78050", sun: "#FFE2A1", sea: "#A9362A", ink: "#FFF1D6",
  ripple: "#C44B35", sunX: 0.42, sunY: 0.32,
};

export const dusk: Scene = {
  title: "A noite\nrespira.", time: "18h48", seconds: 3, image: "",
  sky: "#38445E", sun: "#F1B595", sea: "#1C293C", ink: "#FAEADB",
  ripple: "#324058", sunX: 0.38, sunY: 0.49,
};

export const story = {
  series: "Um dia à beira-mar",
  fps: 30,
  width: 1080,
  height: 1920,
  // Para sincronizar, conte os tempos a partir do início do vídeo, em segundos.
  narration: {file: "", startSeconds: 0, volume: 0.9},
  music: {file: "", startSeconds: 0, volume: 0.17},
};

export const frames = (scene: Scene) => Math.max(1, Math.round(scene.seconds * story.fps));
export const totalFrames = frames(dawn) + frames(noon) + frames(dusk);
