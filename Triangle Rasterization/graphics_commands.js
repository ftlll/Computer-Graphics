// Placeholder routines for Project 3A - Rasterization
//
// These (currently empty) functions are for you to write.

// global variables to store information
// we assume we only have triangle in this project
// vertex_pos type: [3][]
let vertex_pos = [];
// global_color type: [3] or [] as not defined
let global_color = [];
// vertex_color type: [3][] or [] as not defined
let vertex_color = [];
// detect if it is global set color or vertex set color
let in_begin_shape = false;

function Set_Color (r, g, b) {
    if (in_begin_shape) {
        vertex_color.push([r, g, b])
    } else {
        global_color = [r, g, b];
    }
}

function Vertex(x, y, z) {
    // for this assignment, no need to check for too few or too many vertices
    vertex_pos.push([x, y, z]);
}

function Begin_Shape() {
    // reset all info
    in_begin_shape = true;
    vertex_pos = [];
    shape_colors = [];
}

function define_edges() {
    let y_min = min(vertex_pos[0][1], vertex_pos[1][1], vertex_pos[2][1]);
    let y_max = max(vertex_pos[0][1], vertex_pos[1][1], vertex_pos[2][1]);
    let min_idx = vertex_pos.findIndex(vtx => vtx[1] === y_min);
    let max_idx = vertex_pos.findIndex(vtx => vtx[1] === y_max);

    // trick: idx could be 0,1,2 and we already have rest idx
    let mid_idx = 3 - min_idx - max_idx;
    // find x_left, dx_left, x_right, dx_right
    let x_left = round(vertex_pos[min_idx][0], 6);
    let x_right = round(vertex_pos[min_idx][0], 6);

    // store left vertex index and right index here
    let left_vtx = max_idx;
    let right_vtx = mid_idx;
    let dx_left = 0;
    let dx_right = 0;

    let dx_y_max = (vertex_pos[max_idx][0] - x_left) / (vertex_pos[max_idx][1] - y_min);
    let dx_y_mid = (vertex_pos[mid_idx][0] - x_left) / (vertex_pos[mid_idx][1] - y_min);
    if (dx_y_max > dx_y_mid) {
        left_vtx = mid_idx;
        right_vtx = max_idx;
        dx_left = dx_y_mid;
        dx_right = dx_y_max;
    } else {
        dx_left = dx_y_max;
        dx_right = dx_y_mid;
    }

    let dx_left_2 = (vertex_pos[right_vtx][0] - vertex_pos[left_vtx][0]) / (vertex_pos[right_vtx][1] - vertex_pos[left_vtx][1]);
    let dx_right_2 = (vertex_pos[left_vtx][0] - vertex_pos[right_vtx][0]) / (vertex_pos[left_vtx][1] - vertex_pos[right_vtx][1]);

    return [min_idx, mid_idx, max_idx, left_vtx, right_vtx, y_max, y_min, round(x_left, 6), round(x_right, 6), round(dx_left, 6), round(dx_right, 6), round(dx_left_2, 6), round(dx_right_2, 6)];
}

function End_Shape() {
    let height = 500;
    // process color of vertices for two cases
    let colors = [global_color, global_color, global_color];
    if (vertex_color.length > 0) colors = vertex_color;

    let [min_idx, mid_idx, max_idx, left_vtx, right_vtx, y_max, y_min, x_left, x_right, dx_left, dx_right, dx_left_2, dx_right_2] = define_edges();

    // for color, do the same process as position
    let r_left = colors[min_idx][0];
    let g_left = colors[min_idx][1];
    let b_left = colors[min_idx][2];
    let r_right = colors[min_idx][0];
    let g_right = colors[min_idx][1];
    let b_right = colors[min_idx][2];

    let dr_left = (colors[left_vtx][0] - r_left) / (vertex_pos[left_vtx][1] - y_min);
    let dg_left = (colors[left_vtx][1] - g_left) / (vertex_pos[left_vtx][1] - y_min);
    let db_left = (colors[left_vtx][2] - b_left) / (vertex_pos[left_vtx][1] - y_min);

    let dr_right = (colors[right_vtx][0] - r_right) / (vertex_pos[right_vtx][1] - y_min);
    let dg_right = (colors[right_vtx][1] - g_right) / (vertex_pos[right_vtx][1] - y_min);
    let db_right = (colors[right_vtx][2] - b_right) / (vertex_pos[right_vtx][1] - y_min);

    // we ignore edge does not cross scanline
    // and here checks if it is a flat triangle
    if (floor(vertex_pos[mid_idx][1]) === floor(vertex_pos[min_idx][1])) {
        if (vertex_pos[min_idx][0] < vertex_pos[mid_idx][0]) {
            left_vtx = min_idx;
            right_vtx = mid_idx;
        } else {
            left_vtx = mid_idx;
            right_vtx = min_idx;
        }

        x_left = vertex_pos[left_vtx][0];
        x_right = vertex_pos[right_vtx][0];
        dx_left = (vertex_pos[max_idx][0] - x_left) / (vertex_pos[max_idx][1] - vertex_pos[min_idx][1]);
        dx_right = (vertex_pos[max_idx][0] - x_right) / (vertex_pos[max_idx][1] - vertex_pos[min_idx][1]);

        r_left = colors[left_vtx][0];
        dr_left = (colors[max_idx][0] - r_left) / (vertex_pos[max_idx][1] - vertex_pos[min_idx][1]);
        g_left = colors[left_vtx][1];
        dg_left = (colors[max_idx][1] - g_left) / (vertex_pos[max_idx][1] - vertex_pos[min_idx][1]);
        b_left = colors[left_vtx][2];
        db_left = (colors[max_idx][2] - b_left) / (vertex_pos[max_idx][1] - vertex_pos[min_idx][1]);

        r_right = colors[right_vtx][0];
        dr_right = (colors[max_idx][0] - r_right) / (vertex_pos[max_idx][1] - vertex_pos[min_idx][1]);
        g_right = colors[right_vtx][1];
        dg_right = (colors[max_idx][1] - g_right) / (vertex_pos[max_idx][1] - vertex_pos[min_idx][1]);
        b_right = colors[right_vtx][2];
        db_right = (colors[max_idx][2] - b_right) / (vertex_pos[max_idx][1] - vertex_pos[min_idx][1]);
    }

    for (let y = ceil(y_min); y <= y_max; y++) {
        for (let x = ceil(x_left); x < x_right; x++) {
            let r = r_left + (r_right - r_left) / (x_right - x_left) * (x - x_left);
            let g = g_left + (g_right - g_left) / (x_right - x_left) * (x - x_left);
            let b = b_left + (b_right - b_left) / (x_right - x_left) * (x - x_left);

            set(x, height - y, color(r * 255, g * 255, b * 255));
        }

        x_left += dx_left;
        x_right += dx_right;
        r_left += dr_left;
        r_right += dr_right;
        g_left += dg_left;
        g_right += dg_right;
        b_left += db_left;
        b_right += db_right;

        if (x_left < vertex_pos[left_vtx][0] && left_vtx === mid_idx) {
            dx_left = (vertex_pos[max_idx][0] - x_left) / (vertex_pos[max_idx][1] - y);
            left_vtx = max_idx;

            dr_left = (colors[max_idx][0] - r_left) / (vertex_pos[max_idx][1] - y);
            dg_left = (colors[max_idx][1] - g_left) / (vertex_pos[max_idx][1] - y);
            db_left = (colors[max_idx][2] - b_left) / (vertex_pos[max_idx][1] - y);
        } else if (x_right > vertex_pos[right_vtx][0] && right_vtx === mid_idx) {
            dx_right = (vertex_pos[max_idx][0] - x_right) / (vertex_pos[max_idx][1] - y);
            right_vtx = max_idx;

            dr_right = (colors[max_idx][0] - r_right) / (vertex_pos[max_idx][1] - y);
            dg_right = (colors[max_idx][1] - g_right) / (vertex_pos[max_idx][1] - y);
            db_right = (colors[max_idx][2] - b_right) / (vertex_pos[max_idx][1] - y);
        }
    }
    updatePixels();

    // cleanups
    in_begin_shape = false;
    vertex_color = [];
}
