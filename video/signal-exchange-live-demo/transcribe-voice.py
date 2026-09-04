"""Word timestamps for narration verification; local fallback to whisper-cpp CLI."""
import json
from pathlib import Path
from faster_whisper import WhisperModel

root = Path(__file__).resolve().parent
model = WhisperModel('base', device='cpu', compute_type='int8')
segments, info = model.transcribe(str(root / 'narration.wav'), language='en', word_timestamps=True)
words = []
for segment in segments:
    print(round(segment.start, 2), segment.text, flush=True)
    words.extend({'text': w.word.strip(), 'start': round(w.start, 3), 'end': round(w.end, 3)} for w in segment.words)
(root / 'transcript.json').write_text(json.dumps(words, indent=2), encoding='utf-8')
print('Transcribed', len(words), 'words.', flush=True)
