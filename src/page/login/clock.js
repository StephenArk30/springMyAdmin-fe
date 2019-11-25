import React from "react";

export default class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.initCanvas = this.initCanvas.bind(this);
      this.state = {
        canvas_width: '400',
        canvas_height: '400',
        color: ['#3f51b5', '#2979FF', '#29B6F6', '#37474F', '#212121'],
        shadow_color: '#3b79b5',
        timer: setInterval(this.initCanvas, 50)
      };
    }

  componentDidMount() { this.initCanvas(); }

  componentDidUpdate(prevProps, prevState, snapshot) { this.initCanvas(); }

  componentWillUnmount() { let { timer } = this.state; clearInterval(timer); }

  initCanvas() {
    let canvas = document.getElementById("clock_canvas");
    let ctx = canvas.getContext("2d");
    let { canvas_width, canvas_height, color, shadow_color } = this.state;
    ctx.clearRect(0,0,canvas_width, canvas_height);
    let cx = canvas_width / 2;
    let cy = canvas_height / 2;
    let r = Math.min(canvas_width, canvas_height)/2 - 10;
    let line_width = r / 10;

    ctx.lineWidth = line_width;
    ctx.shadowBlur = line_width / 5;
    ctx.shadowColor = shadow_color;
    let now = new Date();
    let today = now.toLocaleDateString('chinese', { hour12: false }).replace("/", " ").replace("/", " ");
    let time = now.toLocaleTimeString('chinese', { hour12: false });
    let hrs = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    let mil = now.getMilliseconds();
    let smooth_sec = sec + (mil / 1000);
    let smooth_min = min + (smooth_sec / 60);

    let arc_end;
    // Hours
    ctx.strokeStyle = color[0];
    ctx.beginPath();
    arc_end = Clock.degToRad((hrs % 12 * 30) - 90);
    if (hrs > 12) { ctx.arc(cx, cy, r, arc_end, Clock.degToRad(270)); }
    else { ctx.arc(cx, cy, r, Clock.degToRad(270), arc_end); }
    ctx.stroke();
    // Minutes
    ctx.strokeStyle = color[1];
    ctx.beginPath();
    arc_end = Clock.degToRad((smooth_min * 6) - 90);
    if (hrs % 2 === 0) { ctx.arc(cx, cy, r - 2*line_width, arc_end, Clock.degToRad(270)); }
    else { ctx.arc(cx, cy, r - 2*line_width, Clock.degToRad(270), arc_end); }
    ctx.stroke();
    // Seconds
    ctx.strokeStyle = color[2];
    ctx.beginPath();
    arc_end = Clock.degToRad((smooth_sec * 6) - 90);
    if (min % 2 === 0) { ctx.arc(cx, cy, r - 4*line_width, arc_end, Clock.degToRad(270)); }
    else { ctx.arc(cx, cy, r - 4*line_width, Clock.degToRad(270), arc_end); }
    ctx.stroke();

    ctx.textAlign = 'center';
    // Date
    ctx.font = "30px Helvetica";
    ctx.fillStyle = color[3];
    ctx.fillText(today, cx, cy-3);
    // Time
    ctx.font = "37px Helvetica";
    ctx.fillStyle = color[4];
    ctx.fillText(time, cx, cy+32);
  }

  static degToRad(degree) {
    let factor = Math.PI / 180;
    return degree * factor;
  }

  render() {
    let { canvas_width, canvas_height } = this.state;
    return (
      <div>
        <canvas id="clock_canvas" width={canvas_width} height={canvas_height} style={{width: canvas_width / 2, height: canvas_height / 2}}/>
      </div>
    );
  }
}