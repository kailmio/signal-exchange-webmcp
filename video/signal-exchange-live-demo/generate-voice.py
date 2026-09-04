"""Generate local Kokoro narration, keeping measured scene timing reproducible."""
import json
import sys
from pathlib import Path
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

root = Path(__file__).resolve().parent
model = Kokoro(sys.argv[1], sys.argv[2])
beats = json.loads((root / 'beats.json').read_text(encoding='utf-8'))
audio = []
timing = []
start = 0.0
for beat in beats:
    samples, rate = model.create(beat['text'], voice='af_nova', speed=0.92, lang='en-us')
    # A breath at the head and tail makes instruction easier to follow.
    samples = np.concatenate([np.zeros(int(rate * .35)), samples, np.zeros(int(rate * .8))])
    sf.write(root / 'voice' / (beat['id'] + '.wav'), samples, rate)
    duration = len(samples) / rate
    timing.append({**beat, 'start': round(start, 3), 'duration': round(duration, 3)})
    audio.append(samples)
    start += duration
    print(beat['id'], round(duration, 2), flush=True)
sf.write(root / 'narration.wav', np.concatenate(audio), rate)
(root / 'timing.json').write_text(json.dumps(timing, indent=2), encoding='utf-8')
print('Total seconds:', round(start, 3), flush=True)
if start >= 180:
    raise RuntimeError('Video narration must be shorter than 180 seconds; revise script before composing.')
