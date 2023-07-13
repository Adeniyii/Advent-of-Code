import fs from 'fs/promises'

async function main() {
    const data = await fs.readFile("./sample.txt", { encoding: "utf8" }) // read from the file
    const parsed = data.trim().split('\n').map((str) => str.split(','));
    const surface_area = parsed.length * 6;
    let joined = 0;
    let incremented = false;

    for (let i = 0; i < parsed.length; i++) {
        const ref_cube = parsed[i]

        for (let j = i + 1; j < parsed.length; j++) {   // [ [1,2,3], [1,2,4], [1,3,3] ]
            const curr_cube = parsed[j]
            incremented = false;

            // find first coordinate match between cubes
            for (let k = 0; k < ref_cube.length; k++) {
                if (ref_cube[k] === curr_cube[k]) {
                    // find second coordinate match between cubes
                    for (let m = k + 1; m < curr_cube.length; m++) {
                        if (ref_cube[m] === curr_cube[m]) {
                            const left_over_idx = findUnmatchedIdx(k, m);

                            // check if cubes' unmatched coordinate has diff === 1
                            if (Math.abs(Number.parseInt(ref_cube[left_over_idx]) - Number.parseInt(curr_cube[left_over_idx])) === 1) {
                                joined +=2;
                                incremented = true;
                                break;
                            }
                        }
                    }
                    if (incremented) break;
                }
                if (incremented) break;
            }
        }
    }
    return surface_area - joined;
}

function findUnmatchedIdx (k: number, m: number) {
    const dict: Record<number, number> = { 0: 0, 1: 1, 2: 2 };

    delete dict[k];
    delete dict[m];
    // find index of unmatched coordinate
    const left_over_idx = Object.values(dict)[0];
    return left_over_idx;
}

main().then(d => console.log(d))
