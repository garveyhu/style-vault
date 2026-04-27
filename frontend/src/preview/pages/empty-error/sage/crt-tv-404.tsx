import { PreviewFrame } from '../../../_layout';

const CSS = `
@keyframes sv-tv-noise { 100% { background-position: 50% 0, 60% 50%; } }

.sv-tv-wrap { display: flex; align-items: center; justify-content: center; min-height: 720px; font-family: 'Montserrat', sans-serif; position: relative; overflow: hidden; }
.sv-tv-stage { width: 30em; height: 30em; display: flex; align-items: center; justify-content: center; }
.sv-tv-main { display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 5em; position: relative; z-index: 5; }

/* Antenna */
.sv-tv-antenna { width: 5em; height: 5em; border-radius: 50%; border: 2px solid black; background-color: #f27405; margin-bottom: -6em; position: relative; }
.sv-tv-antenna::after { content:''; position:absolute; margin-top:-9.4em; margin-left:0.4em; transform:rotate(-25deg); width:1em; height:0.5em; border-radius:50%; background:#f69e50; }
.sv-tv-antenna::before { content:''; position:absolute; margin-top:0.2em; margin-left:1.25em; transform:rotate(-20deg); width:1.5em; height:0.8em; border-radius:50%; background:#f69e50; }
.sv-tv-a1 { position: absolute; top: -100%; left: -130%; width: 12em; height: 5.5em; border-radius: 50px; background-image: linear-gradient(#171717,#171717,#353535,#353535,#171717); transform: rotate(-29deg); clip-path: polygon(50% 0%,49% 100%,52% 100%); }
.sv-tv-a2 { position: absolute; top: -200%; left: -10%; width: 12em; height: 4em; border-radius: 50px; background:#171717; transform: rotate(-8deg); clip-path: polygon(47% 0,47% 0,34% 34%,54% 25%,32% 100%,29% 96%,49% 32%,30% 38%); }

/* TV body */
.sv-tv-body { width: 17em; height: 9em; margin-top: 3em; border-radius: 15px; background-color: #d36604; display: flex; justify-content: center; border: 2px solid #1d0e01; box-shadow: inset 0.2em 0.2em #e69635; position: relative; padding: 1em; gap: 1em; }
.sv-tv-display { display: flex; align-items: center; border-radius: 15px; box-shadow: 3.5px 3.5px 0 #e69635; flex: 1; }
.sv-tv-screen { width: 11em; height: 7em; border: 2px solid #1d0e01; background: repeating-radial-gradient(#000 0 0.0001%,#fff 0 0.0002%) 50% 0/2500px 2500px, repeating-conic-gradient(#000 0 0.0001%,#fff 0 0.0002%) 60% 60%/2500px 2500px; background-blend-mode: difference; animation: sv-tv-noise 0.2s infinite alternate; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.sv-tv-text { background-color: black; padding: 0.2em 0.4em; color: white; font-size: 0.85em; border-radius: 5px; font-weight: bold; letter-spacing: 0.05em; }

/* Knobs */
.sv-tv-knobs { width: 4em; background-color: #e69635; border: 2px solid #1d0e01; padding: 0.6em; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 0.6em; }
.sv-tv-knob { width: 1.4em; height: 1.4em; border-radius: 50%; background: #7f5934; border: 2px solid black; box-shadow: inset 2px 2px 1px #b49577, -2px 0 #513721, -2px 0 0 1px black; position: relative; }
.sv-tv-speakers { display: flex; flex-direction: column; gap: 0.4em; }
.sv-tv-speakers span { width: 0.5em; height: 0.5em; border-radius: 50%; background:#7f5934; border: 2px solid black; box-shadow: inset 1px 1px 1px #b49577; display: inline-block; }

/* Bottom */
.sv-tv-bottom { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8.7em; margin-top: -2px; }
.sv-tv-base { height: 1em; width: 2em; border: 2px solid #171717; background-color: #4d4d4d; }
.sv-tv-baseline { position: absolute; height: 0.15em; width: 17.5em; background-color: #171717; }

/* Big 4 0 4 */
.sv-tv-404 { position: absolute; display: flex; flex-direction: row; gap: 6em; z-index: -1; pointer-events: none; opacity: 0.4; align-items: center; justify-content: center; font-family: Montserrat; font-weight: 900; }
.sv-tv-404 div { transform: scaleY(20) scaleX(7); color: #d36604; }
`;

export default function CrtTv404Preview() {
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
              <div className="sv-tv-a1" />
              <div className="sv-tv-a2" />
            </div>
            <div className="sv-tv-body">
              <div className="sv-tv-display">
                <div className="sv-tv-screen">
                  <span className="sv-tv-text">NOT FOUND</span>
                </div>
              </div>
              <div className="sv-tv-knobs">
                <div className="sv-tv-knob" />
                <div className="sv-tv-knob" />
                <div className="sv-tv-speakers">
                  <span /><span /><span />
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
