"""Build the installable skill ZIP from the repository's tracked sources."""
from pathlib import Path
import subprocess
import zipfile

root = Path(__file__).resolve().parents[1]
prefix = "skills/video-studio/"
files = subprocess.check_output(["git", "ls-files", "-z", "--", prefix], cwd=root)
paths = [Path(p.decode()) for p in files.split(b"\0") if p]
if Path(prefix + "SKILL.md") not in paths:
    raise SystemExit("A skill deve estar registrada no Git antes do empacotamento.")
target = root / "dist" / "video-studio.zip"
target.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as archive:
    for source in sorted(paths):
        archive.write(root / source, source.relative_to("skills"))
print(target)
