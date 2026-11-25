"""Render one approved narration take via OpenAI Realtime into a mono PCM WAV."""
import argparse
import base64
import io
import json
import os
from pathlib import Path
import wave

MODELS = ("gpt-realtime-2.1", "gpt-realtime-2.1-mini")
VOICES = "cedar marin alloy ash ballad coral echo sage shimmer verse".split()


def generate(connection, script, voice, direction):
    response = {
        "output_modalities": ["audio"],
        "audio": {"output": {"format": {"type": "audio/pcm", "rate": 24000}, "voice": voice}},
        "instructions": (
            "Leia integralmente o texto enviado pelo usuário, sem incluir introdução, "
            "comentários ou improviso. O texto contém apenas o que será falado. " + direction
        ),
        "input": [{"type": "message", "role": "user",
                   "content": [{"type": "input_text", "text": script}]}],
    }
    connection.send(json.dumps({"type": "response.create", "response": response}))
    pcm = bytearray()
    transcript = ""
    while True:
        event = json.loads(connection.recv(timeout=120))
        kind = event["type"]
        if kind == "response.output_audio.delta":
            pcm.extend(base64.b64decode(event["delta"], validate=True))
        elif kind == "response.output_audio_transcript.done":
            transcript = event["transcript"]
        elif kind == "error":
            raise RuntimeError("Realtime: " + event["error"].get("code", "falha na sessão"))
        elif kind == "response.done":
            status = event["response"]["status"]
            if status != "completed" or not pcm or len(pcm) % 2:
                raise RuntimeError(f"Resposta sem áudio completo (estado {status}).")
            break
    result = io.BytesIO()
    with wave.open(result, "wb") as audio:
        audio.setparams((1, 2, 24000, 0, "NONE", "not compressed"))
        audio.writeframes(pcm)
    return result.getvalue(), transcript


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--modelo", required=True, choices=MODELS)
    parser.add_argument("--voz", required=True, choices=VOICES)
    parser.add_argument("--texto", required=True, type=Path, help="Arquivo UTF-8 com uma tomada")
    parser.add_argument("--direcao", required=True, help="Idioma, interpretação, ritmo e pronúncia")
    parser.add_argument("--saida", required=True, type=Path)
    args = parser.parse_args()
    if args.saida.suffix.lower() != ".wav" or args.saida.exists():
        parser.error("Escolha uma saída .wav inédita.")
    script = args.texto.read_text(encoding="utf-8").strip()
    if not script:
        parser.error("O texto da tomada está vazio.")
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        parser.error("Configure OPENAI_API_KEY no ambiente local.")
    try:
        from websockets.sync.client import connect
    except ImportError:
        parser.error('Instale o extra opcional com python -m pip install "websockets>=15,<17".')
    args.saida.parent.mkdir(exist_ok=True, parents=True)
    url = f"wss://api.openai.com/v1/realtime?model={args.modelo}"
    with connect(url, additional_headers={"Authorization": f"Bearer {key}"}, open_timeout=30) as ws:
        data, transcript = generate(ws, script, args.voz, args.direcao)
    with args.saida.open("xb") as output:
        output.write(data)
    print(f"{args.saida}\nTranscrição da tomada: {transcript}")


if __name__ == "__main__":
    main()
