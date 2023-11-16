export function drag(canvas: any, canvas_size: { x: number, y: number }, event: any) {
    const ctx = canvas.getContext('2d');

    const rect = event.target.getBoundingClientRect();

    const mouse_pos = event.clientX
        ? { x: (canvas_size.x * (event.clientX - rect.left) / canvas.clientWidth), y: (canvas_size.y * (event.clientY - rect.top) / canvas.clientHeight) }
        : { x: (canvas_size.x * (event.touches[0].clientX - rect.left) / canvas.clientWidth), y: (canvas_size.y * (event.touches[0].clientY - rect.top) / canvas.clientHeight) };
    console.log(mouse_pos);
    if (ctx !== null) {
        ctx.fillRect(mouse_pos.x - 10, mouse_pos.y - 10, 10, 10);
        // ctx.strokeStyle = "white"
        // ctx.fillRect(0, 0, 640, 640);

        // ctx.strokeStyle = "white"
        // ctx.lineWidth = 2;
        // ctx.beginPath();
        // for (let v = 96; v < 640; v += 96) {
        //     ctx.moveTo(v, 0);
        //     ctx.lineTo(v, 640);
        // }
        // for (let h = 96; h < 640; h += 96) {
        //     ctx.moveTo(0, h);
        //     ctx.lineTo(640, h);
        // }
        // ctx.stroke();
        // ctx.save();
    }
}