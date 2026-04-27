import { PreviewFrame } from '../../../_layout';

const CSS = `
@keyframes sv-tv-noise { 100% { background-position: 50% 0, 60% 50%; } }

.sv-tv-wrap {
  display: flex; align-items: center; justify-content: center;
  min-height: 720px;
  font-family: 'Montserrat', 'Inter', sans-serif;
  position: relative; overflow: hidden;
}
.sv-tv-stage {
  width: 30em; height: 30em;
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.sv-tv-main {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  margin-top: 5em;
  position: relative; z-index: 5;
}

/* Antenna */
.sv-tv-antenna {
  width: 5em; height: 5em;
  border-radius: 50%;
  border: 2px solid black;
  background-color: #f27405;
  margin-bottom: -6em;
  position: relative;
  z-index: -1;
}
.sv-tv-antenna-shadow {
  position: absolute;
  background: transparent;
  width: 50px; height: 56px;
  margin-left: 1.68em;
  border-radius: 45%;
  transform: rotate(140deg);
  border: 4px solid transparent;
  box-shadow: inset 0 16px #a85103, inset 0 16px 1px 1px #a85103;
}
.sv-tv-antenna::after {
  content: ''; position: absolute;
  margin-top: -9.4em; margin-left: 0.4em;
  transform: rotate(-25deg);
  width: 1em; height: 0.5em; border-radius: 50%;
  background: #f69e50;
}
.sv-tv-antenna::before {
  content: ''; position: absolute;
  margin-top: 0.2em; margin-left: 1.25em;
  transform: rotate(-20deg);
  width: 1.5em; height: 0.8em; border-radius: 50%;
  background: #f69e50;
}
.sv-tv-a1 {
  position: relative; top: -102%; left: -130%;
  width: 12em; height: 5.5em; border-radius: 50px;
  background-image: linear-gradient(#171717, #171717, #353535, #353535, #171717);
  transform: rotate(-29deg);
  clip-path: polygon(50% 0%, 49% 100%, 52% 100%);
}
.sv-tv-a2 {
  position: relative; top: -210%; left: -10%;
  width: 12em; height: 4em; border-radius: 50px;
  background-color: #171717;
  background-image: linear-gradient(#171717, #171717, #353535, #353535, #171717);
  margin-right: 5em;
  clip-path: polygon(47% 0, 47% 0, 34% 34%, 54% 25%, 32% 100%, 29% 96%, 49% 32%, 30% 38%);
  transform: rotate(-8deg);
}

.sv-tv-notfound {
  background: black;
  padding-left: 0.3em; padding-right: 0.3em;
  font-size: 0.75em; color: white;
  letter-spacing: 0;
  border-radius: 5px;
  z-index: 10;
  font-weight: bold;
}

/* TV body · 织物纹理用 ::after 双重 repeating gradient */
.sv-tv-body {
  width: 17em; height: 9em;
  margin-top: 3em;
  border-radius: 15px;
  background: #d36604;
  display: flex; justify-content: center;
  border: 2px solid #1d0e01;
  box-shadow: inset 0.2em 0.2em #e69635;
  padding: 0.6em 0.6em;
  gap: 0.6em;
  position: relative;
}
.sv-tv-body::after {
  content: ''; position: absolute;
  inset: 0; border-radius: 15px;
  background:
    repeating-radial-gradient(#d36604 0 0.0001%, #00000070 0 0.0002%) 50% 0 / 2500px 2500px,
    repeating-conic-gradient(#d36604 0 0.0001%, #00000070 0 0.0002%) 60% 60% / 2500px 2500px;
  background-blend-mode: difference;
  opacity: 0.09;
  pointer-events: none;
}

.sv-tv-display {
  display: flex; align-items: center; justify-content: center;
  border-radius: 15px;
  box-shadow: 3.5px 3.5px 0 #e69635;
  flex: 1;
}
.sv-tv-screen {
  width: 100%; height: 100%;
  font-family: Montserrat;
  border: 2px solid #1d0e01;
  background:
    repeating-radial-gradient(#000 0 0.0001%, #fff 0 0.0002%) 50% 0 / 2500px 2500px,
    repeating-conic-gradient(#000 0 0.0001%, #fff 0 0.0002%) 60% 60% / 2500px 2500px;
  background-blend-mode: difference;
  animation: sv-tv-noise 0.2s infinite alternate;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-weight: bold; color: #252525;
  letter-spacing: 0.15em;
  text-align: center;
}

/* Knobs · 旋钮区 4.25em 橘色 + 2 圆形旋钮 + 喇叭 */
.sv-tv-knobs {
  width: 4.25em;
  background: #e69635;
  border: 2px solid #1d0e01;
  padding: 0.6em;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-direction: column;
  row-gap: 0.6em;
  flex-shrink: 0;
}
.sv-tv-knob {
  width: 1.65em; height: 1.65em;
  border-radius: 50%;
  background: #7f5934;
  border: 2px solid black;
  box-shadow: inset 2px 2px 1px #b49577, -2px 0 #513721, -2px 0 0 1px black;
  position: relative;
  flex-shrink: 0;
}
/* 旋钮 1 · 斜向 47deg 指针（一长一短） */
.sv-tv-knob-1::before {
  content: ''; position: absolute;
  top: 1em; left: 0.5em;
  transform: rotate(47deg);
  border-radius: 5px;
  width: 0.1em; height: 0.4em; background: #000;
}
.sv-tv-knob-1::after {
  content: ''; position: absolute;
  top: 0.9em; left: 0.8em;
  transform: rotate(47deg);
  border-radius: 5px;
  width: 0.1em; height: 0.55em; background: #000;
}
/* 旋钮 2 · -45deg 指针 */
.sv-tv-knob-2::before {
  content: ''; position: absolute;
  top: 1.05em; left: 0.8em;
  transform: rotate(-45deg);
  border-radius: 5px;
  width: 0.15em; height: 0.4em; background: #000;
}
.sv-tv-knob-2::after {
  content: ''; position: absolute;
  top: -0.1em; left: 0.65em;
  transform: rotate(-45deg);
  width: 0.15em; height: 1.5em; background: #000;
}

/* Speakers · 3 圆点 + 2 横线 */
.sv-tv-speakers {
  display: flex; flex-direction: column; row-gap: 0.5em;
}
.sv-tv-speaker-row {
  display: flex; column-gap: 0.25em;
}
.sv-tv-speaker-dot {
  width: 0.65em; height: 0.65em;
  border-radius: 50%;
  background: #7f5934;
  border: 2px solid black;
  box-shadow: inset 1.25px 1.25px 1px #b49577;
  display: inline-block;
}
.sv-tv-speaker-line {
  width: 100%; height: 2px;
  background: #171717;
}

/* Bottom · 支架 + 横杆 */
.sv-tv-bottom {
  width: 100%; display: flex;
  align-items: center; justify-content: center;
  column-gap: 8.7em;
  position: relative;
}
.sv-tv-base {
  height: 1em; width: 2em;
  border: 2px solid #171717;
  background: #4d4d4d;
  margin-top: -0.15em;
  z-index: -1;
}
.sv-tv-baseline {
  position: absolute;
  height: 0.15em; width: 17.5em;
  background: #171717;
  margin-top: 0.8em;
}

/* 巨大 4 0 4 背景 · scale 24.5 × 9 */
.sv-tv-404 {
  position: absolute;
  display: flex; flex-direction: row;
  column-gap: 6em;
  z-index: -1;
  align-items: center; justify-content: center;
  opacity: 0.1;
  pointer-events: none;
  font-family: Montserrat, 'Arial Black', sans-serif;
  font-weight: 900;
}
.sv-tv-404 div {
  transform: scaleY(20) scaleX(8);
  color: #1d0e01;
}
`;

export default function CrtTv404Page() {
  return (
    <PreviewFrame bg="#fff7e6" padded={false}>
      <style>{CSS}</style>
      <div className="sv-tv-wrap">
        <div className="sv-tv-404">
          <div>4</div><div>0</div><div>4</div>
        </div>

        <div className="sv-tv-stage">
          <div className="sv-tv-main">
            <div className="sv-tv-antenna">
              <div className="sv-tv-antenna-shadow" />
              <div className="sv-tv-a1" />
              <div className="sv-tv-a2" />
            </div>

            <div className="sv-tv-body">
              <div className="sv-tv-display">
                <div className="sv-tv-screen">
                  <span className="sv-tv-notfound">NOT FOUND</span>
                </div>
              </div>

              <div className="sv-tv-knobs">
                <div className="sv-tv-knob sv-tv-knob-1" />
                <div className="sv-tv-knob sv-tv-knob-2" />
                <div className="sv-tv-speakers">
                  <div className="sv-tv-speaker-row">
                    <span className="sv-tv-speaker-dot" />
                    <span className="sv-tv-speaker-dot" />
                    <span className="sv-tv-speaker-dot" />
                  </div>
                  <div className="sv-tv-speaker-line" />
                  <div className="sv-tv-speaker-line" />
                </div>
              </div>
            </div>

            <div className="sv-tv-bottom">
              <div className="sv-tv-base" />
              <div className="sv-tv-base" />
              <div className="sv-tv-baseline" />
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
