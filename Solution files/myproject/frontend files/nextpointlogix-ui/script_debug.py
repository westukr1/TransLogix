from pathlib import Path
import re

path = Path(r"src/pages/RoutManager/PassengerList.jsx")
text = path.read_text(encoding="utf-8").replace("\r\n", "\n")
